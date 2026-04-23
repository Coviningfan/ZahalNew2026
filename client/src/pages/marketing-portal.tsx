import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/hooks/use-toast";
import {
  Lock, Eye, EyeOff, FileText, Image as ImageIcon, Package, Plus, Pencil, Trash2, Save,
  ArrowLeft, LogOut, LayoutDashboard, ExternalLink, RefreshCw, AlertCircle, GripVertical,
} from "lucide-react";
import type { BlogPost, Product, HeroSlide } from "@shared/schema";
import { ImageUpload } from "@/components/image-upload";
import RichTextEditor from "@/components/rich-text-editor";

const PW_KEY = "zahal_mkt_pw";
const DRAFT_PREFIX = "zahal_blog_draft_";

class AdminFetchError extends Error {
  code?: string;
  status?: number;
  constructor(message: string, opts?: { code?: string; status?: number }) {
    super(message);
    this.code = opts?.code;
    this.status = opts?.status;
  }
}

async function adminFetch(path: string, password: string, options: RequestInit = {}) {
  const res = await fetch(path, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      "x-admin-password": password,
      ...(options.headers || {}),
    },
  });
  if (!res.ok) {
    const data = (await res.json().catch(() => ({}))) as { message?: string; code?: string };
    throw new AdminFetchError(data.message || "Error", { code: data.code, status: res.status });
  }
  return res.json();
}

function errorMessage(err: unknown): string {
  if (err instanceof Error) return err.message;
  return "Error desconocido";
}

function errorCode(err: unknown): string | undefined {
  return err instanceof AdminFetchError ? err.code : undefined;
}

function autoSlug(title: string) {
  return title.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

// ─── Login ────────────────────────────────────────────────────────────────

function Login({ onLogin }: { onLogin: (pw: string) => void }) {
  const [pw, setPw] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await adminFetch("/api/admin/blog", pw);
      sessionStorage.setItem(PW_KEY, pw);
      onLogin(pw);
    } catch (err) {
      setError(errorMessage(err) || "Contraseña incorrecta");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
            <Lock className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold text-foreground font-serif">Marketing — Zahal</span>
        </div>
        <div className="bg-card border border-border/40 rounded-2xl p-8 shadow-sm">
          <h1 className="text-lg font-semibold text-foreground mb-1">Acceso Marketing</h1>
          <p className="text-sm text-muted-foreground mb-6">Ingresa la contraseña de equipo</p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <Input
                type={show ? "text" : "password"}
                placeholder="Contraseña"
                value={pw}
                onChange={(e) => setPw(e.target.value)}
                className="pr-10"
                data-testid="input-marketing-password"
              />
              <button type="button" onClick={() => setShow((s) => !s)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {error && <p className="text-sm text-red-500">{error}</p>}
            <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white" disabled={loading} data-testid="button-marketing-login">
              {loading ? "Verificando..." : "Entrar"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

// ─── Blog editor ──────────────────────────────────────────────────────────

interface BlogForm {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  author: string;
  published: boolean;
  tags: string[];
  seoTitle: string;
  seoDescription: string;
}

const emptyPost: BlogForm = {
  title: "", slug: "", excerpt: "", content: "", coverImage: "",
  author: "Zahal", published: false, tags: [], seoTitle: "", seoDescription: "",
};

function BlogEditor({ password }: { password: string }) {
  const { toast } = useToast();
  const [editing, setEditing] = useState<BlogPost | null>(null);
  const [creating, setCreating] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(false);
  const [tagInput, setTagInput] = useState("");

  const [form, setForm] = useState<BlogForm>(emptyPost);

  const draftKey = editing ? `${DRAFT_PREFIX}${editing.id}` : creating ? `${DRAFT_PREFIX}new` : null;

  // Restore draft on mount of editor
  useEffect(() => {
    if (!draftKey) return;
    const saved = localStorage.getItem(draftKey);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setForm((f) => ({ ...f, ...parsed }));
        toast({ title: "Borrador restaurado", description: "Recuperamos tus cambios sin guardar." });
      } catch {}
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [draftKey]);

  // Autosave to localStorage
  useEffect(() => {
    if (!draftKey || (!creating && !editing)) return;
    const t = setTimeout(() => {
      localStorage.setItem(draftKey, JSON.stringify(form));
    }, 800);
    return () => clearTimeout(t);
  }, [form, draftKey, creating, editing]);

  const { data: posts = [], isLoading } = useQuery<BlogPost[]>({
    queryKey: ["/api/admin/blog"],
    queryFn: () => adminFetch("/api/admin/blog", password),
  });

  const { data: syncStatus } = useQuery<{ configured: boolean }>({
    queryKey: ["/api/admin/sync-articles/status"],
    queryFn: () => adminFetch("/api/admin/sync-articles/status", password),
  });

  function clearDraft() {
    if (draftKey) localStorage.removeItem(draftKey);
  }

  const createMutation = useMutation({
    mutationFn: () => adminFetch("/api/admin/blog", password, { method: "POST", body: JSON.stringify(form) }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/blog"] });
      queryClient.invalidateQueries({ queryKey: ["/api/blog"] });
      clearDraft();
      setCreating(false);
      setForm(emptyPost);
      toast({ title: "Artículo creado" });
    },
    onError: (err: unknown) => toast({ title: "Error", description: errorMessage(err), variant: "destructive" }),
  });

  const updateMutation = useMutation({
    mutationFn: () => adminFetch(`/api/admin/blog/${editing!.id}`, password, { method: "PUT", body: JSON.stringify(form) }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/blog"] });
      queryClient.invalidateQueries({ queryKey: ["/api/blog"] });
      clearDraft();
      setEditing(null);
      setForm(emptyPost);
      toast({ title: "Artículo actualizado" });
    },
    onError: (err: unknown) => toast({ title: "Error", description: errorMessage(err), variant: "destructive" }),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => adminFetch(`/api/admin/blog/${id}`, password, { method: "DELETE" }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/blog"] });
      queryClient.invalidateQueries({ queryKey: ["/api/blog"] });
      setDeleteId(null);
      toast({ title: "Artículo eliminado" });
    },
    onError: (err: unknown) => toast({ title: "Error", description: errorMessage(err), variant: "destructive" }),
  });

  const syncMutation = useMutation<{ created: number; skipped: number }>({
    mutationFn: () => adminFetch("/api/admin/sync-articles", password, { method: "POST" }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/blog"] });
      queryClient.invalidateQueries({ queryKey: ["/api/blog"] });
      toast({ title: "Sincronización completada", description: `${data.created} nuevos, ${data.skipped} ya existían.` });
    },
    onError: (err: unknown) => {
      if (errorCode(err) === "BABYLOVE_NOT_CONFIGURED") {
        toast({ title: "Configura tu clave AI", description: "Pide al admin que añada BABYLOVE_API_KEY.", variant: "destructive" });
      } else {
        toast({ title: "Error de sincronización", description: errorMessage(err), variant: "destructive" });
      }
    },
  });

  function startCreate() {
    setForm(emptyPost);
    setSlugManuallyEdited(false);
    setCreating(true);
    setEditing(null);
  }

  function startEdit(post: BlogPost) {
    setForm({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      content: post.content,
      coverImage: post.coverImage,
      author: post.author,
      published: post.published,
      tags: post.tags || [],
      seoTitle: post.seoTitle || "",
      seoDescription: post.seoDescription || "",
    });
    setSlugManuallyEdited(true);
    setEditing(post);
    setCreating(false);
  }

  function cancelEdit() {
    if (window.confirm("¿Descartar los cambios? Se perderá el borrador.")) {
      clearDraft();
      setCreating(false);
      setEditing(null);
      setForm(emptyPost);
    }
  }

  function addTag() {
    const t = tagInput.trim().toLowerCase();
    if (!t || form.tags.includes(t)) return;
    setForm((f) => ({ ...f, tags: [...f.tags, t] }));
    setTagInput("");
  }

  function removeTag(t: string) {
    setForm((f) => ({ ...f, tags: f.tags.filter((x) => x !== t) }));
  }

  if (creating || editing) {
    return (
      <div>
        <button onClick={cancelEdit} className="flex items-center gap-1 text-sm text-primary hover:text-primary/80 mb-4" data-testid="button-back-to-list">
          <ArrowLeft className="h-3.5 w-3.5" /> Volver a la lista
        </button>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-foreground">{editing ? "Editar artículo" : "Nuevo artículo"}</h2>
          <span className="text-xs text-muted-foreground italic">Autoguardado activado</span>
        </div>
        <div className="space-y-5 max-w-3xl">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <Label className="text-sm font-medium mb-1.5 block">Título</Label>
              <Input
                value={form.title}
                onChange={(e) => {
                  const title = e.target.value;
                  setForm((f) => ({ ...f, title, slug: slugManuallyEdited ? f.slug : autoSlug(title) }));
                }}
                placeholder="Título del artículo"
                data-testid="input-blog-title"
              />
            </div>
            <div>
              <Label className="text-sm font-medium mb-1.5 block">Slug (URL)</Label>
              <Input
                value={form.slug}
                onChange={(e) => { setSlugManuallyEdited(true); setForm((f) => ({ ...f, slug: e.target.value })); }}
                placeholder="titulo-del-articulo"
                data-testid="input-blog-slug"
              />
            </div>
          </div>

          <div>
            <Label className="text-sm font-medium mb-1.5 block">Extracto</Label>
            <Textarea
              value={form.excerpt}
              onChange={(e) => setForm((f) => ({ ...f, excerpt: e.target.value }))}
              placeholder="Breve descripción para la vista previa"
              rows={2}
              data-testid="input-blog-excerpt"
            />
          </div>

          <div>
            <Label className="text-sm font-medium mb-1.5 block">Imagen de portada</Label>
            <ImageUpload
              value={form.coverImage}
              onChange={(url) => setForm((f) => ({ ...f, coverImage: url }))}
              password={password}
              testId="input-blog-cover"
            />
          </div>

          <div>
            <Label className="text-sm font-medium mb-1.5 block">Autor</Label>
            <Input value={form.author} onChange={(e) => setForm((f) => ({ ...f, author: e.target.value }))} placeholder="Zahal" data-testid="input-blog-author" />
          </div>

          <div>
            <Label className="text-sm font-medium mb-1.5 block">Etiquetas</Label>
            <div className="flex gap-2 mb-2">
              <Input
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addTag(); } }}
                placeholder='Ej. "cuidado-natural" — presiona Enter'
                data-testid="input-blog-tag"
              />
              <Button type="button" variant="outline" onClick={addTag}>Añadir</Button>
            </div>
            {form.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {form.tags.map((t) => (
                  <Badge key={t} variant="secondary" className="gap-1 pr-1" data-testid={`tag-${t}`}>
                    {t}
                    <button type="button" onClick={() => removeTag(t)} className="ml-1 hover:text-red-600">
                      <Trash2 className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>

          <div>
            <Label className="text-sm font-medium mb-1.5 block">Contenido</Label>
            <RichTextEditor
              value={form.content}
              onChange={(v) => setForm((f) => ({ ...f, content: v }))}
              password={password}
              testId="input-blog-content"
            />
          </div>

          <details className="border border-border/40 rounded-lg p-4">
            <summary className="text-sm font-medium cursor-pointer">SEO (avanzado, opcional)</summary>
            <div className="mt-3 space-y-3">
              <div>
                <Label className="text-xs mb-1 block">Título para buscadores</Label>
                <Input value={form.seoTitle} onChange={(e) => setForm((f) => ({ ...f, seoTitle: e.target.value }))} placeholder="Por defecto usa el título del artículo" data-testid="input-blog-seo-title" />
              </div>
              <div>
                <Label className="text-xs mb-1 block">Descripción para buscadores</Label>
                <Textarea value={form.seoDescription} onChange={(e) => setForm((f) => ({ ...f, seoDescription: e.target.value }))} rows={2} placeholder="Por defecto usa el extracto" data-testid="input-blog-seo-desc" />
              </div>
            </div>
          </details>

          <div className="flex items-center gap-3 pt-2 border-t border-border/40">
            <Switch checked={form.published} onCheckedChange={(v) => setForm((f) => ({ ...f, published: v }))} data-testid="switch-blog-published" />
            <Label className="text-sm">{form.published ? "Publicado" : "Borrador"}</Label>
          </div>

          <div className="flex gap-3 pt-2">
            <Button onClick={() => editing ? updateMutation.mutate() : createMutation.mutate()} disabled={!form.title || !form.slug || createMutation.isPending || updateMutation.isPending} className="bg-primary hover:bg-primary/90 text-white gap-2" data-testid="button-save-blog">
              <Save className="h-4 w-4" />
              {(createMutation.isPending || updateMutation.isPending) ? "Guardando..." : "Guardar"}
            </Button>
            <Button variant="outline" onClick={cancelEdit}>Cancelar</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-foreground">Artículos del Blog</h2>
        <div className="flex gap-2">
          {syncStatus?.configured ? (
            <Button variant="outline" onClick={() => syncMutation.mutate()} disabled={syncMutation.isPending} className="gap-2" data-testid="button-sync-articles">
              <RefreshCw className={`h-4 w-4 ${syncMutation.isPending ? "animate-spin" : ""}`} /> {syncMutation.isPending ? "Sincronizando..." : "Sincronizar AI"}
            </Button>
          ) : null}
          <Button onClick={startCreate} className="bg-primary hover:bg-primary/90 text-white gap-2" data-testid="button-new-blog-post">
            <Plus className="h-4 w-4" /> Nuevo artículo
          </Button>
        </div>
      </div>

      {syncStatus && !syncStatus.configured && (
        <div className="mb-4 flex items-start gap-3 p-3 bg-amber-50 border border-amber-200 rounded-lg text-amber-900">
          <AlertCircle className="h-4 w-4 flex-shrink-0 mt-0.5" />
          <div className="text-xs flex-1">
            <p className="font-medium">Sincronización AI no configurada</p>
            <p className="mt-0.5">Para importar artículos automáticamente hace falta la clave <code className="bg-amber-100 px-1 rounded">BABYLOVE_API_KEY</code>.</p>
            <div className="flex flex-wrap gap-2 mt-2">
              <Button
                size="sm"
                variant="outline"
                className="h-7 text-xs gap-1 border-amber-300 bg-white hover:bg-amber-100"
                onClick={() => {
                  void navigator.clipboard.writeText("BABYLOVE_API_KEY").then(() => {
                    toast({ title: "Copiado", description: "Pega este nombre al añadir el secreto." });
                  });
                }}
                data-testid="button-copy-secret-name"
              >
                Copiar nombre del secreto
              </Button>
              <a
                href="https://docs.replit.com/cloud-services/deployments/environment-variables-and-secrets"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  size="sm"
                  variant="outline"
                  className="h-7 text-xs gap-1 border-amber-300 bg-white hover:bg-amber-100"
                  data-testid="button-open-secrets-help"
                >
                  Cómo añadirlo <ExternalLink className="h-3 w-3" />
                </Button>
              </a>
            </div>
          </div>
        </div>
      )}

      {isLoading ? (
        <div className="space-y-3">{[1, 2, 3].map((i) => <div key={i} className="h-16 bg-muted/40 rounded-xl animate-pulse" />)}</div>
      ) : posts.length === 0 ? (
        <div className="bg-card border border-border/40 rounded-xl p-8 text-center">
          <FileText className="h-8 w-8 text-muted-foreground/40 mx-auto mb-3" />
          <p className="text-sm text-muted-foreground">Aún no hay artículos. Crea el primero.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {posts.map((post) => (
            <div key={post.id} className="flex flex-col sm:flex-row sm:items-center gap-3 p-4 bg-card rounded-xl border border-border/40" data-testid={`blog-row-${post.id}`}>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span className="font-medium text-foreground text-sm truncate">{post.title}</span>
                  <Badge variant={post.published ? "default" : "secondary"} className={post.published ? "bg-emerald-100 text-emerald-700 border-emerald-200" : ""}>
                    {post.published ? "Publicado" : "Borrador"}
                  </Badge>
                  {post.tags?.slice(0, 3).map((t) => (
                    <span key={t} className="text-[10px] bg-primary/10 text-primary px-1.5 py-0.5 rounded">{t}</span>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground">/blog/{post.slug} · {post.author} · {new Date(post.createdAt).toLocaleDateString("es-MX")}</p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                {post.published && (
                  <a href={`/blog/${post.slug}`} target="_blank" rel="noopener noreferrer">
                    <Button size="sm" variant="ghost" className="h-8 gap-1" data-testid={`button-view-blog-${post.id}`}><ExternalLink className="h-3.5 w-3.5" /></Button>
                  </a>
                )}
                <Button size="sm" variant="outline" className="h-8 gap-1" onClick={() => startEdit(post)} data-testid={`button-edit-blog-${post.id}`}>
                  <Pencil className="h-3.5 w-3.5" /> Editar
                </Button>
                <Button size="sm" variant="outline" className="h-8 gap-1 border-red-200 text-red-600 hover:bg-red-50" onClick={() => setDeleteId(post.id)} data-testid={`button-delete-blog-${post.id}`}>
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Dialog open={deleteId !== null} onOpenChange={() => setDeleteId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>¿Eliminar artículo?</DialogTitle>
            <DialogDescription>Esta acción no se puede deshacer.</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteId(null)}>Cancelar</Button>
            <Button variant="destructive" onClick={() => deleteId && deleteMutation.mutate(deleteId)} disabled={deleteMutation.isPending}>
              {deleteMutation.isPending ? "Eliminando..." : "Eliminar"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// ─── Banner manager (wired to real hero) ─────────────────────────────────

const emptySlide: HeroSlide = {
  badge: "",
  title: "",
  mobileTitle: "",
  description: "",
  mobileDescription: "",
  ctaLabel: "",
  ctaHref: "",
  ctaSecondaryLabel: "",
  ctaSecondaryHref: "",
  bgImage: "",
  bgPosition: "center center",
  alignRight: true,
  externalLink: false,
  showLogos: false,
  hideBadge: false,
};

function parseBgVerticalPercent(pos: string): number {
  // "center 80%" or "center center" → 80 or 50
  const parts = (pos || "center center").trim().split(/\s+/);
  const v = parts[1] || "50%";
  if (v === "center") return 50;
  if (v === "top") return 0;
  if (v === "bottom") return 100;
  const m = v.match(/(\d+)%/);
  return m ? parseInt(m[1]) : 50;
}

function buildBgPosition(verticalPercent: number): string {
  return `center ${verticalPercent}%`;
}

function BannerManager({ password }: { password: string }) {
  const { toast } = useToast();
  const [slides, setSlides] = useState<HeroSlide[]>([]);
  const [serverSnapshot, setServerSnapshot] = useState<string | null>(null);

  const { data: bannerData, isLoading } = useQuery<{ key: string; value: string | null }>({
    queryKey: ["/api/admin/settings", "hero_banners"],
    queryFn: () => adminFetch("/api/admin/settings/hero_banners", password),
  });

  // Rehydrate from server data whenever it actually changes (e.g., after reset/save invalidation).
  useEffect(() => {
    if (!bannerData) return;
    const incoming = bannerData.value || "";
    if (incoming === serverSnapshot) return;
    setServerSnapshot(incoming);
    if (incoming.trim()) {
      try {
        const parsed = JSON.parse(incoming);
        if (Array.isArray(parsed)) {
          setSlides(parsed.map((s: unknown) => ({ ...emptySlide, ...(s as Partial<HeroSlide>) })));
          return;
        }
      } catch {}
    }
    setSlides([]);
  }, [bannerData, serverSnapshot]);

  const saveMutation = useMutation({
    mutationFn: () => adminFetch("/api/admin/settings/hero_banners", password, {
      method: "PUT",
      body: JSON.stringify({ value: JSON.stringify(slides) }),
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/hero-banners"] });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/settings", "hero_banners"] });
      toast({ title: "Banners guardados", description: "Los cambios se verán en el sitio al recargar." });
    },
    onError: (err: unknown) => toast({ title: "Error", description: errorMessage(err), variant: "destructive" }),
  });

  const resetMutation = useMutation({
    mutationFn: () => adminFetch("/api/admin/settings/hero_banners", password, {
      method: "PUT",
      body: JSON.stringify({ value: "" }),
    }),
    onSuccess: () => {
      // Reset local UI immediately to the empty/defaults state.
      setSlides([]);
      setServerSnapshot("");
      queryClient.invalidateQueries({ queryKey: ["/api/hero-banners"] });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/settings", "hero_banners"] });
      toast({ title: "Restaurado", description: "Volvimos a los banners por defecto." });
    },
  });

  function update<K extends keyof HeroSlide>(idx: number, field: K, value: HeroSlide[K]) {
    setSlides((s) => s.map((sl, i) => i === idx ? { ...sl, [field]: value } : sl));
  }

  function addSlide() {
    setSlides((s) => [...s, { ...emptySlide, title: "Nuevo slide", ctaLabel: "Ver productos", ctaHref: "/productos" }]);
  }

  function removeSlide(idx: number) {
    if (!window.confirm("¿Eliminar este slide?")) return;
    setSlides((s) => s.filter((_, i) => i !== idx));
  }

  function moveSlide(idx: number, dir: -1 | 1) {
    setSlides((s) => {
      const next = [...s];
      const j = idx + dir;
      if (j < 0 || j >= next.length) return s;
      [next[idx], next[j]] = [next[j], next[idx]];
      return next;
    });
  }

  if (isLoading) return <div className="space-y-3">{[1, 2].map((i) => <div key={i} className="h-32 bg-muted/40 rounded-xl animate-pulse" />)}</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Banners del Inicio</h2>
          <p className="text-xs text-muted-foreground mt-1">Edita los slides del hero. Envuelve una palabra del título en *asteriscos* para resaltarla en cursiva.</p>
        </div>
        <div className="flex gap-2 flex-wrap">
          <Button variant="ghost" size="sm" onClick={() => resetMutation.mutate()} className="text-muted-foreground">
            Restaurar por defecto
          </Button>
          <Button variant="outline" onClick={addSlide} className="gap-1"><Plus className="h-4 w-4" /> Agregar slide</Button>
          <Button onClick={() => saveMutation.mutate()} className="bg-primary hover:bg-primary/90 text-white gap-2" disabled={saveMutation.isPending || slides.length === 0} data-testid="button-save-banners">
            <Save className="h-4 w-4" /> {saveMutation.isPending ? "Guardando..." : "Guardar"}
          </Button>
        </div>
      </div>

      {slides.length === 0 ? (
        <div className="bg-card border border-border/40 rounded-xl p-8 text-center mt-6">
          <ImageIcon className="h-8 w-8 text-muted-foreground/40 mx-auto mb-3" />
          <p className="text-sm text-muted-foreground mb-2">Estás usando los banners por defecto del sitio.</p>
          <p className="text-xs text-muted-foreground">Pulsa "Agregar slide" para personalizarlos.</p>
        </div>
      ) : (
        <div className="space-y-4 mt-4">
          {slides.map((slide, idx) => (
            <div key={idx} className="bg-card border border-border/40 rounded-xl p-5" data-testid={`banner-slide-${idx}`}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <GripVertical className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-semibold text-foreground">Slide {idx + 1}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Button size="sm" variant="ghost" className="h-7 px-2" onClick={() => moveSlide(idx, -1)} disabled={idx === 0}>↑</Button>
                  <Button size="sm" variant="ghost" className="h-7 px-2" onClick={() => moveSlide(idx, 1)} disabled={idx === slides.length - 1}>↓</Button>
                  <Button size="sm" variant="ghost" className="h-7 text-red-500 hover:text-red-600" onClick={() => removeSlide(idx)}>
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>

              <div className="grid lg:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div>
                    <Label className="text-xs mb-1 block">Imagen de fondo</Label>
                    <ImageUpload value={slide.bgImage} onChange={(url) => update(idx, "bgImage", url)} password={password} />
                  </div>
                  <div>
                    <Label className="text-xs mb-1 block">Posición vertical de la imagen ({parseBgVerticalPercent(slide.bgPosition || "")}%)</Label>
                    <Slider
                      min={0}
                      max={100}
                      step={5}
                      value={[parseBgVerticalPercent(slide.bgPosition || "")]}
                      onValueChange={([v]) => update(idx, "bgPosition", buildBgPosition(v))}
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <Label className="text-xs mb-1 block">Texto del badge</Label>
                    <Input value={slide.badge || ""} onChange={(e) => update(idx, "badge", e.target.value)} placeholder='Ej. "Productos naturales"' />
                  </div>
                  <div>
                    <Label className="text-xs mb-1 block">Título (usa *texto* para cursiva)</Label>
                    <Textarea value={slide.title} onChange={(e) => update(idx, "title", e.target.value)} rows={2} placeholder="Manos limpias, *protección natural* todos los días" />
                  </div>
                  <div>
                    <Label className="text-xs mb-1 block">Título móvil (opcional, usa el desktop si está vacío)</Label>
                    <Textarea value={slide.mobileTitle || ""} onChange={(e) => update(idx, "mobileTitle", e.target.value)} rows={2} />
                  </div>
                </div>

                <div className="lg:col-span-2 grid sm:grid-cols-2 gap-3">
                  <div>
                    <Label className="text-xs mb-1 block">Descripción</Label>
                    <Textarea value={slide.description || ""} onChange={(e) => update(idx, "description", e.target.value)} rows={2} />
                  </div>
                  <div>
                    <Label className="text-xs mb-1 block">Descripción móvil (opcional)</Label>
                    <Textarea value={slide.mobileDescription || ""} onChange={(e) => update(idx, "mobileDescription", e.target.value)} rows={2} />
                  </div>
                </div>

                <div className="lg:col-span-2 grid sm:grid-cols-2 gap-3">
                  <div>
                    <Label className="text-xs mb-1 block">Texto botón principal</Label>
                    <Input value={slide.ctaLabel || ""} onChange={(e) => update(idx, "ctaLabel", e.target.value)} />
                  </div>
                  <div>
                    <Label className="text-xs mb-1 block">Link botón principal</Label>
                    <Input value={slide.ctaHref || ""} onChange={(e) => update(idx, "ctaHref", e.target.value)} placeholder="/productos o https://…" />
                  </div>
                  <div>
                    <Label className="text-xs mb-1 block">Texto botón secundario (opcional)</Label>
                    <Input value={slide.ctaSecondaryLabel || ""} onChange={(e) => update(idx, "ctaSecondaryLabel", e.target.value)} />
                  </div>
                  <div>
                    <Label className="text-xs mb-1 block">Link botón secundario</Label>
                    <Input value={slide.ctaSecondaryHref || ""} onChange={(e) => update(idx, "ctaSecondaryHref", e.target.value)} />
                  </div>
                </div>

                <div className="lg:col-span-2 flex flex-wrap gap-4 pt-2 border-t border-border/40">
                  <label className="flex items-center gap-2 text-xs">
                    <Switch checked={slide.alignRight} onCheckedChange={(v) => update(idx, "alignRight", v)} /> Alinear a la derecha
                  </label>
                  <label className="flex items-center gap-2 text-xs">
                    <Switch checked={slide.externalLink} onCheckedChange={(v) => update(idx, "externalLink", v)} /> Link externo
                  </label>
                  <label className="flex items-center gap-2 text-xs">
                    <Switch checked={slide.showLogos} onCheckedChange={(v) => update(idx, "showLogos", v)} /> Mostrar logos partner
                  </label>
                  <label className="flex items-center gap-2 text-xs">
                    <Switch checked={slide.hideBadge} onCheckedChange={(v) => update(idx, "hideBadge", v)} /> Ocultar badge
                  </label>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Product manager ─────────────────────────────────────────────────────

function ProductManager({ password }: { password: string }) {
  const { toast } = useToast();
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [editForm, setEditForm] = useState({ name: "", description: "", images: "", newPrice: "" });

  const { data: products = [], isLoading } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  type ProductUpdateBody = {
    name?: string;
    description?: string;
    images?: string[];
    newPrice?: number;
  };

  const updateMutation = useMutation({
    mutationFn: async () => {
      const body: ProductUpdateBody = {};
      if (editForm.name && editForm.name !== editingProduct!.name) body.name = editForm.name;
      if (editForm.description !== editingProduct!.description) body.description = editForm.description;
      if (editForm.images) body.images = editForm.images.split("\n").map((s) => s.trim()).filter(Boolean);
      if (editForm.newPrice) body.newPrice = parseFloat(editForm.newPrice);
      return adminFetch(`/api/admin/products/${editingProduct!.stripeProductId}`, password, { method: "PUT", body: JSON.stringify(body) });
    },
    onMutate: () => {
      toast({
        title: "Actualizando en Stripe…",
        description: "Sincronizando los cambios con tu cuenta de Stripe.",
        duration: 8000,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/products"] });
      setEditingProduct(null);
      toast({
        title: "Los cambios pueden tardar hasta 60 segundos en aparecer en el sitio.",
        description: "Cambios guardados correctamente en Stripe.",
        duration: 9000,
      });
    },
    onError: (err: unknown) => toast({ title: "Error", description: errorMessage(err), variant: "destructive" }),
  });

  function startEdit(product: Product) {
    setEditForm({
      name: product.name,
      description: product.description,
      images: product.images.join("\n"),
      newPrice: "",
    });
    setEditingProduct(product);
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-foreground">Productos</h2>
        <p className="text-xs text-muted-foreground mt-1">Edita nombre, descripción, imágenes y precios. Los cambios se actualizan directamente en Stripe.</p>
      </div>

      {isLoading ? (
        <div className="space-y-3">{[1, 2, 3].map((i) => <div key={i} className="h-16 bg-muted/40 rounded-xl animate-pulse" />)}</div>
      ) : (
        <div className="space-y-3">
          {products.map((product) => (
            <div key={product.id} className="flex items-center gap-4 p-4 bg-card rounded-xl border border-border/40" data-testid={`product-row-${product.id}`}>
              {product.images[0] ? (
                <img src={product.images[0]} alt={product.name} className="w-12 h-12 rounded-lg object-cover flex-shrink-0" />
              ) : (
                <div className="w-12 h-12 rounded-lg bg-primary/5 flex items-center justify-center flex-shrink-0">
                  <Package className="h-5 w-5 text-primary/30" />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{product.name}</p>
                <p className="text-xs text-muted-foreground">${product.price} MXN · {product.category}</p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <Badge variant={product.inStock ? "default" : "secondary"} className={product.inStock ? "bg-emerald-100 text-emerald-700 border-emerald-200" : "bg-red-100 text-red-700 border-red-200"}>
                  {product.inStock ? "En stock" : "Agotado"}
                </Badge>
                <Button size="sm" variant="outline" className="h-8 gap-1" onClick={() => startEdit(product)} data-testid={`button-edit-product-${product.id}`}>
                  <Pencil className="h-3.5 w-3.5" /> Editar
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Dialog open={editingProduct !== null} onOpenChange={(open) => { if (!open) setEditingProduct(null); }}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Editar producto</DialogTitle>
            <DialogDescription>Los cambios se guardan directamente en Stripe.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div>
              <Label className="text-sm mb-1.5 block">Nombre</Label>
              <Input value={editForm.name} onChange={(e) => setEditForm((f) => ({ ...f, name: e.target.value }))} data-testid="input-product-name" />
            </div>
            <div>
              <Label className="text-sm mb-1.5 block">Descripción</Label>
              <Textarea value={editForm.description} onChange={(e) => setEditForm((f) => ({ ...f, description: e.target.value }))} rows={3} data-testid="input-product-description" />
            </div>
            <div>
              <Label className="text-sm mb-1.5 block">Imágenes (una URL por línea)</Label>
              <Textarea value={editForm.images} onChange={(e) => setEditForm((f) => ({ ...f, images: e.target.value }))} rows={3} className="font-mono text-xs" placeholder="https://..." data-testid="input-product-images" />
            </div>
            <div>
              <Label className="text-sm mb-1.5 block">Nuevo precio (MXN) — dejar vacío para no cambiar</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">$</span>
                <Input
                  type="number"
                  step="0.01"
                  min="0"
                  value={editForm.newPrice}
                  onChange={(e) => setEditForm((f) => ({ ...f, newPrice: e.target.value }))}
                  className="pl-7"
                  placeholder={`Actual: ${editingProduct?.price || ""}`}
                  data-testid="input-product-price"
                />
              </div>
              {editForm.newPrice && (
                <p className="text-xs text-amber-600 mt-1">Se creará un nuevo precio en Stripe y se desactivará el anterior.</p>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingProduct(null)}>Cancelar</Button>
            <Button onClick={() => updateMutation.mutate()} disabled={updateMutation.isPending} className="bg-primary hover:bg-primary/90 text-white gap-2" data-testid="button-save-product">
              <Save className="h-4 w-4" /> {updateMutation.isPending ? "Guardando en Stripe..." : "Guardar"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// ─── Dashboard / shell ───────────────────────────────────────────────────

function Dashboard({ password, onLogout }: { password: string; onLogout: () => void }) {
  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border/40 bg-card">
        <div className="container mx-auto px-4 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <LayoutDashboard className="h-4 w-4 text-white" />
            </div>
            <div>
              <h1 className="text-base font-bold text-foreground">Marketing — Zahal</h1>
              <p className="text-xs text-muted-foreground">Panel de contenido</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={onLogout} className="text-muted-foreground gap-1">
            <LogOut className="h-3.5 w-3.5" /> Salir
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 py-8 max-w-5xl">
        <Tabs defaultValue="blog">
          <TabsList className="mb-6 bg-card border border-border/40">
            <TabsTrigger value="blog" className="gap-1.5" data-testid="tab-blog">
              <FileText className="h-3.5 w-3.5" /> Blog
            </TabsTrigger>
            <TabsTrigger value="banners" className="gap-1.5" data-testid="tab-banners">
              <ImageIcon className="h-3.5 w-3.5" /> Banners
            </TabsTrigger>
            <TabsTrigger value="products" className="gap-1.5" data-testid="tab-products">
              <Package className="h-3.5 w-3.5" /> Productos
            </TabsTrigger>
          </TabsList>

          <TabsContent value="blog">
            <BlogEditor password={password} />
          </TabsContent>
          <TabsContent value="banners">
            <BannerManager password={password} />
          </TabsContent>
          <TabsContent value="products">
            <ProductManager password={password} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default function MarketingPortal() {
  const saved = sessionStorage.getItem(PW_KEY);
  const [password, setPassword] = useState<string | null>(saved);

  if (!password) return <Login onLogin={setPassword} />;
  return <Dashboard password={password} onLogout={() => { sessionStorage.removeItem(PW_KEY); setPassword(null); }} />;
}
