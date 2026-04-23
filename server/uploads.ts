import type { Express, Request, Response, RequestHandler } from "express";
import { z } from "zod";
import { storage } from "./storage";
import {
  ObjectStorageService,
  ObjectNotFoundError,
} from "./replit_integrations/object_storage";
import { ObjectPermission } from "./replit_integrations/object_storage/objectAcl";

const ALLOWED_MIME = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/avif",
  "image/gif",
]);
const MAX_BYTES = 5 * 1024 * 1024;

const requestUrlSchema = z.object({
  name: z.string().min(1).max(255),
  size: z.number().int().nonnegative().max(MAX_BYTES),
  contentType: z.string().min(1),
});

const finalizeSchema = z.object({
  rawURL: z.string().url(),
  filename: z.string().min(1).max(255),
  size: z.number().int().nonnegative().max(MAX_BYTES),
  contentType: z.string().min(1),
});

/**
 * Admin-gated upload pipeline backed by Replit Object Storage.
 *
 * Flow:
 *   1. Client → POST /api/admin/upload-url  (with name/size/contentType)
 *      Server validates, returns { uploadURL, rawURL } presigned for PUT.
 *   2. Client → PUT uploadURL (raw file body, with Content-Type header).
 *   3. Client → POST /api/admin/upload-finalize  (with rawURL + metadata)
 *      Server normalizes path, sets public ACL, persists media_assets row,
 *      returns { url } pointing at the public /objects/<id> route.
 *
 * Public reads are served by /objects/:objectPath(*) (defined here).
 */
export function registerUploadRoutes(app: Express, requireAdminPassword: RequestHandler) {
  const objectStorageService = new ObjectStorageService();

  // 1) Request a presigned upload URL.
  app.post("/api/admin/upload-url", requireAdminPassword, async (req: Request, res: Response) => {
    try {
      const parsed = requestUrlSchema.parse(req.body);
      if (!ALLOWED_MIME.has(parsed.contentType)) {
        return res.status(400).json({
          message: "Tipo de archivo no permitido. Usa JPG, PNG, WEBP, AVIF o GIF.",
        });
      }
      const uploadURL = await objectStorageService.getObjectEntityUploadURL();
      res.json({ uploadURL, rawURL: uploadURL });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Datos inválidos para la subida." });
      }
      console.error("[uploads] upload-url failed", error);
      res.status(500).json({ message: "No se pudo preparar la subida." });
    }
  });

  // 2) Finalize: set ACL to public, persist asset row, return the canonical URL.
  app.post("/api/admin/upload-finalize", requireAdminPassword, async (req: Request, res: Response) => {
    try {
      const data = finalizeSchema.parse(req.body);
      if (!ALLOWED_MIME.has(data.contentType)) {
        return res.status(400).json({
          message: "Tipo de archivo no permitido.",
        });
      }
      const url = await objectStorageService.trySetObjectEntityAclPolicy(data.rawURL, {
        owner: "admin",
        visibility: "public",
      });
      const asset = await storage.createMediaAsset({
        url,
        filename: data.filename.slice(0, 255),
        mimeType: data.contentType,
        size: String(data.size),
      });
      res.json({ url, asset });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Datos inválidos al finalizar la subida." });
      }
      if (error instanceof ObjectNotFoundError) {
        return res.status(404).json({ message: "El archivo subido no se encontró en almacenamiento." });
      }
      console.error("[uploads] finalize failed", error);
      res.status(500).json({ message: "No se pudo finalizar la subida." });
    }
  });

  // List + delete admin media catalog (used by future media-library UI).
  app.get("/api/admin/media", requireAdminPassword, async (_req: Request, res: Response) => {
    try {
      const items = await storage.listMediaAssets();
      res.json(items);
    } catch (error) {
      console.error("[uploads] list media failed", error);
      res.status(500).json({ message: "Error al listar archivos." });
    }
  });

  app.delete("/api/admin/media/:id", requireAdminPassword, async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id, 10);
      if (Number.isNaN(id)) return res.status(400).json({ message: "ID inválido" });
      const assets = await storage.listMediaAssets();
      const target = assets.find((a) => a.id === id);
      if (target?.url?.startsWith("/objects/")) {
        try {
          await objectStorageService.deleteObjectEntity(target.url);
        } catch (err) {
          console.error("[uploads] delete object from storage failed", err);
        }
      }
      await storage.deleteMediaAsset(id);
      res.json({ success: true });
    } catch (error) {
      console.error("[uploads] delete media failed", error);
      res.status(500).json({ message: "Error al eliminar archivo." });
    }
  });

  // Read endpoint for uploaded objects. Enforces ACL: only objects whose ACL
  // visibility is "public" are served here. Anything else is rejected to avoid
  // leaking private files via guessable paths.
  app.get("/objects/:objectPath(*)", async (req: Request, res: Response) => {
    try {
      const objectFile = await objectStorageService.getObjectEntityFile(req.path);
      const allowed = await objectStorageService.canAccessObjectEntity({
        objectFile,
        requestedPermission: ObjectPermission.READ,
      });
      if (!allowed) {
        return res.status(403).json({ message: "Acceso no autorizado" });
      }
      await objectStorageService.downloadObject(objectFile, res);
    } catch (error) {
      if (error instanceof ObjectNotFoundError) {
        return res.status(404).json({ message: "Archivo no encontrado" });
      }
      console.error("[uploads] serve object failed", error);
      if (!res.headersSent) {
        res.status(500).json({ message: "Error al servir archivo" });
      }
    }
  });
}

// Backwards-compat: also export the public path helper for callers if needed.
export { ObjectStorageService };
