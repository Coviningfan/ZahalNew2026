import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Upload, Loader2, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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
  const { toast } = useToast();

  async function handleFile(file: File) {
    if (file.size > 5 * 1024 * 1024) {
      toast({ title: "Archivo muy grande", description: "El máximo es 5 MB.", variant: "destructive" });
      return;
    }
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        headers: { "x-admin-password": password },
        body: fd,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Error al subir");
      onChange(data.url);
      toast({ title: "Imagen subida" });
    } catch (e: any) {
      toast({ title: "Error", description: e.message, variant: "destructive" });
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  return (
    <div className="space-y-2">
      {label && <div className="text-sm font-medium">{label}</div>}
      <div className="flex gap-2">
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="https://… o sube una imagen"
          className="flex-1 text-xs font-mono"
          data-testid={testId}
        />
        <Button
          type="button"
          variant="outline"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="gap-1.5 flex-shrink-0"
        >
          {uploading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Upload className="h-3.5 w-3.5" />}
          {uploading ? "Subiendo…" : "Subir"}
        </Button>
        {value && (
          <Button type="button" variant="ghost" size="icon" onClick={() => onChange("")} className="flex-shrink-0">
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/avif,image/gif"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) handleFile(f);
        }}
      />
      {value && (
        <img src={value} alt="Vista previa" className="h-24 w-full object-cover rounded-lg border border-border/40" />
      )}
    </div>
  );
}
