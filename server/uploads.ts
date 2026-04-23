import type { Express, Request } from "express";
import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import crypto from "crypto";
import { storage } from "./storage";

const UPLOAD_DIR = path.resolve(process.cwd(), "uploads");
if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR, { recursive: true });

const ALLOWED_MIME = new Set(["image/jpeg", "image/png", "image/webp", "image/avif", "image/gif"]);
const MAX_BYTES = 5 * 1024 * 1024;

const storageEngine = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, UPLOAD_DIR),
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase().replace(/[^a-z0-9.]/g, "") || ".bin";
    const name = `${Date.now()}-${crypto.randomBytes(6).toString("hex")}${ext}`;
    cb(null, name);
  },
});

const upload = multer({
  storage: storageEngine,
  limits: { fileSize: MAX_BYTES },
  fileFilter: (_req, file, cb) => {
    if (!ALLOWED_MIME.has(file.mimetype)) {
      return cb(new Error("Tipo de archivo no permitido. Usa JPG, PNG, WEBP, AVIF o GIF."));
    }
    cb(null, true);
  },
});

export function registerUploadRoutes(app: Express, requireAdminPassword: any) {
  app.use("/uploads", express.static(UPLOAD_DIR, {
    maxAge: "365d",
    immutable: true,
    index: false,
  }));

  app.post("/api/admin/upload", requireAdminPassword, (req: Request, res) => {
    upload.single("file")(req as any, res as any, async (err: any) => {
      if (err) {
        const message = err instanceof multer.MulterError && err.code === "LIMIT_FILE_SIZE"
          ? "El archivo excede el límite de 5 MB."
          : err.message || "Error al subir el archivo.";
        return res.status(400).json({ message });
      }
      const file = (req as any).file;
      if (!file) return res.status(400).json({ message: "No se recibió ningún archivo." });
      const url = `/uploads/${file.filename}`;
      try {
        const asset = await storage.createMediaAsset({
          url,
          filename: file.filename,
          mimeType: file.mimetype,
          size: String(file.size),
        });
        res.json({ url, asset });
      } catch (e: any) {
        res.status(500).json({ message: "No se pudo guardar el registro del archivo." });
      }
    });
  });

  app.get("/api/admin/media", requireAdminPassword, async (_req, res) => {
    try {
      const items = await storage.listMediaAssets();
      res.json(items);
    } catch {
      res.status(500).json({ message: "Error al listar archivos." });
    }
  });

  app.delete("/api/admin/media/:id", requireAdminPassword, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) return res.status(400).json({ message: "ID inválido" });
      const items = await storage.listMediaAssets();
      const item = items.find((m) => m.id === id);
      if (item) {
        const filePath = path.join(UPLOAD_DIR, item.filename);
        fs.promises.unlink(filePath).catch(() => {});
      }
      await storage.deleteMediaAsset(id);
      res.json({ success: true });
    } catch {
      res.status(500).json({ message: "Error al eliminar archivo." });
    }
  });
}
