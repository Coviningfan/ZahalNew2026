import { useRef, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bold, Italic, Heading2, Heading3, List, Quote, Link as LinkIcon, Image as ImageIcon, Code, Loader2 } from "lucide-react";
import MarkdownContent from "./markdown-content";
import { useToast } from "@/hooks/use-toast";

interface Props {
  value: string;
  onChange: (v: string) => void;
  password: string;
  testId?: string;
}

export default function MarkdownEditor({ value, onChange, password, testId }: Props) {
  const ref = useRef<HTMLTextAreaElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();

  function wrap(prefix: string, suffix: string = prefix, placeholder = "texto") {
    const ta = ref.current;
    if (!ta) return;
    const start = ta.selectionStart;
    const end = ta.selectionEnd;
    const selected = value.slice(start, end) || placeholder;
    const newValue = value.slice(0, start) + prefix + selected + suffix + value.slice(end);
    onChange(newValue);
    setTimeout(() => {
      ta.focus();
      ta.setSelectionRange(start + prefix.length, start + prefix.length + selected.length);
    }, 0);
  }

  function insertAtCursor(text: string) {
    const ta = ref.current;
    if (!ta) return;
    const start = ta.selectionStart;
    const newValue = value.slice(0, start) + text + value.slice(ta.selectionEnd);
    onChange(newValue);
    setTimeout(() => {
      ta.focus();
      ta.setSelectionRange(start + text.length, start + text.length);
    }, 0);
  }

  function insertLink() {
    const url = prompt("URL del enlace:");
    if (!url) return;
    wrap("[", `](${url})`, "texto del enlace");
  }

  async function handleImageFile(file: File) {
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
      insertAtCursor(`\n\n![${file.name}](${data.url})\n\n`);
      toast({ title: "Imagen insertada" });
    } catch (e: any) {
      toast({ title: "Error", description: e.message, variant: "destructive" });
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  }

  return (
    <Tabs defaultValue="edit" className="w-full">
      <div className="flex items-center justify-between mb-2 gap-2 flex-wrap">
        <div className="flex flex-wrap items-center gap-1 border border-border/40 rounded-lg bg-card p-1">
          <Button type="button" size="sm" variant="ghost" onClick={() => wrap("**")} title="Negrita" data-testid="md-bold"><Bold className="h-3.5 w-3.5" /></Button>
          <Button type="button" size="sm" variant="ghost" onClick={() => wrap("*")} title="Itálica"><Italic className="h-3.5 w-3.5" /></Button>
          <Button type="button" size="sm" variant="ghost" onClick={() => insertAtCursor("\n## ")} title="Subtítulo"><Heading2 className="h-3.5 w-3.5" /></Button>
          <Button type="button" size="sm" variant="ghost" onClick={() => insertAtCursor("\n### ")} title="Sub-subtítulo"><Heading3 className="h-3.5 w-3.5" /></Button>
          <Button type="button" size="sm" variant="ghost" onClick={() => insertAtCursor("\n- ")} title="Lista"><List className="h-3.5 w-3.5" /></Button>
          <Button type="button" size="sm" variant="ghost" onClick={() => insertAtCursor("\n> ")} title="Cita"><Quote className="h-3.5 w-3.5" /></Button>
          <Button type="button" size="sm" variant="ghost" onClick={insertLink} title="Enlace"><LinkIcon className="h-3.5 w-3.5" /></Button>
          <Button type="button" size="sm" variant="ghost" onClick={() => wrap("`")} title="Código"><Code className="h-3.5 w-3.5" /></Button>
          <Button type="button" size="sm" variant="ghost" onClick={() => fileRef.current?.click()} disabled={uploading} title="Insertar imagen" data-testid="md-image">
            {uploading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <ImageIcon className="h-3.5 w-3.5" />}
          </Button>
        </div>
        <TabsList>
          <TabsTrigger value="edit" data-testid="md-tab-edit">Editar</TabsTrigger>
          <TabsTrigger value="preview" data-testid="md-tab-preview">Vista previa</TabsTrigger>
        </TabsList>
      </div>
      <input
        ref={fileRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/avif,image/gif"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) handleImageFile(f);
        }}
      />
      <TabsContent value="edit" className="mt-0">
        <Textarea
          ref={ref}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Escribe el contenido del artículo. Puedes usar la barra de herramientas o Markdown directamente."
          rows={18}
          className="font-mono text-sm"
          data-testid={testId}
        />
      </TabsContent>
      <TabsContent value="preview" className="mt-0">
        <div className="border border-border/40 rounded-lg p-6 bg-white min-h-[400px]">
          {value.trim() ? (
            <MarkdownContent content={value} />
          ) : (
            <p className="text-sm text-muted-foreground italic">La vista previa aparecerá aquí…</p>
          )}
        </div>
      </TabsContent>
    </Tabs>
  );
}
