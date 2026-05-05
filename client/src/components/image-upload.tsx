import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Loader2, Upload, X, Images } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { uploadAdminImage } from "@/lib/uploadImage";
import type { MediaAsset } from "@shared/schema";

interface Props {
  value: string;
  onChange: (url: string) => void;
  password: string;
  label?: string;
  testId?: string;
}

export function ImageUpload({ value, onChange, password, label, testId }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [libraryOpen, setLibraryOpen] = useState(false);
  const [libraryLoading, setLibraryLoading] = useState(false);
  const [libraryError, setLibraryError] = useState("");
  const [library, setLibrary] = useState<MediaAsset[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    if (!libraryOpen) return;
    let cancelled = false;
    setLibraryLoading(true);
    setLibraryError("");

    fetch("/api/admin/media", {
      headers: { "x-admin-password": password },
    })
      .then(async (res) => {
        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          throw new Error(data.message || "No se pudo cargar la biblioteca.");
        }
        return res.json() as Promise<MediaAsset[]>;
      })
      .then((items) => {
        if (!cancelled) setLibrary(items);
      })
      .catch((e) => {
        if (!cancelled) {
          setLibraryError(e instanceof Error ? e.message : "No se pudo cargar la biblioteca.");
        }
      })
      .finally(() => {
        if (!cancelled) setLibraryLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [libraryOpen, password]);

  async function handleFile(file: File) {
    setUploading(true);
    try {
      const url = await uploadAdminImage(file, password);
      onChange(url);
      toast({ title: "Imagen subida" });
    } catch (e) {
      const message = e instanceof Error ? e.message : "Error al subir";
      toast({ title: "Error", description: message, variant: "destructive" });
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  return (
    <div className="space-y-2">
      {label && <div className="text-sm font-medium">{label}</div>}
      <div className="flex items-center gap-2 flex-wrap">
        <Button
          type="button"
          variant="outline"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="gap-1.5"
          data-testid={testId}
        >
          {uploading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Upload className="h-3.5 w-3.5" />}
          {uploading ? "Subiendo..." : value ? "Reemplazar imagen" : "Subir imagen"}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => setLibraryOpen(true)}
          className="gap-1.5"
        >
          <Images className="h-3.5 w-3.5" />
          Biblioteca
        </Button>
        {value && (
          <>
            <span className="text-xs text-muted-foreground font-mono truncate max-w-[240px]" title={value}>
              {value.split("/").pop()}
            </span>
            <Button type="button" variant="ghost" size="icon" onClick={() => onChange("")} className="flex-shrink-0" aria-label="Quitar imagen">
              <X className="h-4 w-4" />
            </Button>
          </>
        )}
      </div>

      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="/objects/uploads/... o https://..."
        className="font-mono text-xs"
      />

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/avif"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) void handleFile(f);
        }}
      />

      {value && (
        <img src={value} alt="Vista previa" className="h-24 w-full object-cover rounded-lg border border-border/40" />
      )}

      <Dialog open={libraryOpen} onOpenChange={setLibraryOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Biblioteca de imagenes</DialogTitle>
            <DialogDescription>Selecciona una imagen ya subida para reutilizarla sin volver a cargar el archivo.</DialogDescription>
          </DialogHeader>

          {libraryLoading ? (
            <div className="h-40 flex items-center justify-center text-sm text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
              Cargando imagenes...
            </div>
          ) : libraryError ? (
            <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
              {libraryError}
            </div>
          ) : library.length === 0 ? (
            <div className="rounded-lg border border-border/40 p-8 text-center text-sm text-muted-foreground">
              Todavia no hay imagenes en la biblioteca.
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 max-h-[60vh] overflow-y-auto pr-1">
              {library.map((asset) => (
                <button
                  key={asset.id}
                  type="button"
                  onClick={() => {
                    onChange(asset.url);
                    setLibraryOpen(false);
                  }}
                  className="text-left rounded-lg border border-border/40 overflow-hidden bg-card hover:border-primary focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <img src={asset.url} alt="" className="h-28 w-full object-cover bg-muted" />
                  <span className="block p-2 text-xs font-mono truncate" title={asset.filename}>
                    {asset.filename}
                  </span>
                </button>
              ))}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
