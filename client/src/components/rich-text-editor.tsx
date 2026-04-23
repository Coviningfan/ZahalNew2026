import { useEffect, useState, useRef } from "react";
import { useEditor, EditorContent, type Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import { marked } from "marked";
import {
  Bold,
  Italic,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Link as LinkIcon,
  Image as ImageIcon,
  Code,
  Loader2,
  Undo2,
  Redo2,
  Strikethrough,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { uploadAdminImage } from "@/lib/uploadImage";
import { useToast } from "@/hooks/use-toast";

interface Props {
  value: string;
  onChange: (html: string) => void;
  password: string;
  testId?: string;
}

// Convert markdown content (legacy posts) to HTML on initial load.
// Detect by checking for HTML tags — if none, treat as markdown.
function normalizeInitialContent(content: string): string {
  if (!content) return "";
  if (/<\/?(p|div|h[1-6]|ul|ol|li|blockquote|img|a|strong|em|code|pre|br)\b/i.test(content)) {
    return content;
  }
  try {
    const html = marked.parse(content, { async: false }) as string;
    return html;
  } catch {
    return content;
  }
}

interface ToolbarButtonProps {
  onClick: () => void;
  active?: boolean;
  disabled?: boolean;
  title: string;
  testId?: string;
  children: React.ReactNode;
}

function ToolbarButton({ onClick, active, disabled, title, testId, children }: ToolbarButtonProps) {
  return (
    <Button
      type="button"
      size="sm"
      variant="ghost"
      onClick={onClick}
      disabled={disabled}
      title={title}
      data-testid={testId}
      className={`h-8 w-8 p-0 ${active ? "bg-primary/15 text-primary" : ""}`}
    >
      {children}
    </Button>
  );
}

function Toolbar({ editor, password, onImageUploadStart }: { editor: Editor | null; password: string; onImageUploadStart: () => void }) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();

  if (!editor) return null;

  function handleLink() {
    if (!editor) return;
    const previous = editor.getAttributes("link").href as string | undefined;
    const url = window.prompt("URL del enlace (deja vacío para quitar):", previous || "https://");
    if (url === null) return;
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  }

  async function handleImageFile(file: File) {
    onImageUploadStart();
    setUploading(true);
    try {
      const url = await uploadAdminImage(file, password);
      editor?.chain().focus().setImage({ src: url, alt: file.name }).run();
      toast({ title: "Imagen insertada" });
    } catch (e) {
      const message = e instanceof Error ? e.message : "Error desconocido";
      toast({ title: "Error al subir imagen", description: message, variant: "destructive" });
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-0.5 border border-border/40 rounded-lg bg-card p-1 mb-2">
      <ToolbarButton onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive("bold")} title="Negrita" testId="rt-bold">
        <Bold className="h-3.5 w-3.5" />
      </ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive("italic")} title="Itálica">
        <Italic className="h-3.5 w-3.5" />
      </ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().toggleStrike().run()} active={editor.isActive("strike")} title="Tachado">
        <Strikethrough className="h-3.5 w-3.5" />
      </ToolbarButton>
      <div className="w-px h-5 bg-border mx-1" />
      <ToolbarButton onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} active={editor.isActive("heading", { level: 2 })} title="Subtítulo">
        <Heading2 className="h-3.5 w-3.5" />
      </ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} active={editor.isActive("heading", { level: 3 })} title="Sub-subtítulo">
        <Heading3 className="h-3.5 w-3.5" />
      </ToolbarButton>
      <div className="w-px h-5 bg-border mx-1" />
      <ToolbarButton onClick={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive("bulletList")} title="Lista">
        <List className="h-3.5 w-3.5" />
      </ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().toggleOrderedList().run()} active={editor.isActive("orderedList")} title="Lista numerada">
        <ListOrdered className="h-3.5 w-3.5" />
      </ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().toggleBlockquote().run()} active={editor.isActive("blockquote")} title="Cita">
        <Quote className="h-3.5 w-3.5" />
      </ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().toggleCode().run()} active={editor.isActive("code")} title="Código">
        <Code className="h-3.5 w-3.5" />
      </ToolbarButton>
      <div className="w-px h-5 bg-border mx-1" />
      <ToolbarButton onClick={handleLink} active={editor.isActive("link")} title="Enlace" testId="rt-link">
        <LinkIcon className="h-3.5 w-3.5" />
      </ToolbarButton>
      <ToolbarButton onClick={() => fileRef.current?.click()} disabled={uploading} title="Insertar imagen" testId="rt-image">
        {uploading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <ImageIcon className="h-3.5 w-3.5" />}
      </ToolbarButton>
      <div className="w-px h-5 bg-border mx-1" />
      <ToolbarButton onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()} title="Deshacer">
        <Undo2 className="h-3.5 w-3.5" />
      </ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()} title="Rehacer">
        <Redo2 className="h-3.5 w-3.5" />
      </ToolbarButton>

      <input
        ref={fileRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/avif,image/gif"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) void handleImageFile(f);
        }}
      />
    </div>
  );
}

export default function RichTextEditor({ value, onChange, password, testId }: Props) {
  const [hydratedFor, setHydratedFor] = useState<string | null>(null);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: { rel: "noopener noreferrer", target: "_blank" },
      }),
      Image.configure({
        HTMLAttributes: { class: "rounded-xl my-4 max-w-full h-auto" },
      }),
      Placeholder.configure({
        placeholder: "Empieza a escribir tu artículo aquí…",
      }),
    ],
    content: normalizeInitialContent(value),
    editorProps: {
      attributes: {
        class:
          "prose prose-green max-w-none min-h-[400px] focus:outline-none p-5 bg-white rounded-lg border border-border/40 prose-headings:font-serif prose-img:rounded-xl prose-a:text-primary",
      },
    },
    onUpdate({ editor: ed }) {
      onChange(ed.getHTML());
    },
  });

  // When the parent value changes externally (e.g. switching posts, draft restore),
  // re-hydrate the editor with the new content. Track by content identity so we
  // don't fight live keystrokes.
  useEffect(() => {
    if (!editor) return;
    if (hydratedFor === value) return;
    if (editor.getHTML() === value) {
      setHydratedFor(value);
      return;
    }
    editor.commands.setContent(normalizeInitialContent(value), false);
    setHydratedFor(value);
  }, [value, editor, hydratedFor]);

  return (
    <div data-testid={testId}>
      <Toolbar editor={editor} password={password} onImageUploadStart={() => editor?.chain().focus().run()} />
      <EditorContent editor={editor} />
    </div>
  );
}
