import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Upload, Loader2, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { uploadAdminImage } from "@/lib/uploadImage";

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
      <div className="flex items-center gap-2">
        <Button
          type="button"
          variant="outline"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="gap-1.5"
          data-testid={testId}
        >
          {uploading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Upload className="h-3.5 w-3.5" />}
          {uploading ? "Subiendo…" : value ? "Reemplazar imagen" : "Subir imagen"}
        </Button>
        {value && (
          <>
            <span className="text-xs text-muted-foreground font-mono truncate max-w-[240px]" title={value}>{value.split("/").pop()}</span>
            <Button type="button" variant="ghost" size="icon" onClick={() => onChange("")} className="flex-shrink-0" aria-label="Quitar imagen">
              <X className="h-4 w-4" />
            </Button>
          </>
        )}
      </div>
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
    </div>
  );
}
