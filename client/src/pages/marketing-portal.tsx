import { useState } from "react";
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
import { useToast } from "@/hooks/use-toast";
import {
  Lock, Eye, EyeOff, FileText, Image, Package, Plus, Pencil, Trash2, Save,
  ArrowLeft, LogOut, LayoutDashboard, ExternalLink, RefreshCw,
} from "lucide-react";
import type { BlogPost, Product } from "@shared/schema";

const PW_KEY = "zahal_mkt_pw";

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
    const data = await res.json().catch(() => ({}));
    throw new Error(data.message || "Error");
  }
  return res.json();
}

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
    } catch (err: any) {
      setError(err.message || "Contraseña incorrecta");
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
                onChange={e => setPw(e.target.value)}
                className="pr-10"
                data-testid="input-marketing-password"
              />
              <button type="button" onClick={() => setShow(s => !s)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
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

function BlogEditor({ password }: { password: string }) {
  const { toast } = useToast();
  const [editing, setEditing] = useState<BlogPost | null>(null);
  const [creating, setCreating] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const emptyPost = { title: "", slug: "", excerpt: "", content: "", coverImage: "", author: "Zahal", published: false };
  const [form, setForm] = useState(emptyPost);

  const { data: posts = [], isLoading } = useQuery<BlogPost[]>({
    queryKey: ["/api/admin/blog"],
    queryFn: () => adminFetch("/api/admin/blog", password),
  });

  const createMutation = useMutation({
    mutationFn: () => adminFetch("/api/admin/blog", password, { method: "POST", body: JSON.stringify(form) }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/blog"] });
      queryClient.invalidateQueries({ queryKey: ["/api/blog"] });
      setCreating(false);
      setForm(emptyPost);
      toast({ title: "Artículo creado" });
    },
    onError: (err: any) => toast({ title: "Error", description: err.message, variant: "destructive" }),
  });

  const updateMutation = useMutation({
    mutationFn: () => adminFetch(`/api/admin/blog/${editing!.id}`, password, { method: "PUT", body: JSON.stringify(form) }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/blog"] });
      queryClient.invalidateQueries({ queryKey: ["/api/blog"] });
      setEditing(null);
      setForm(emptyPost);
      toast({ title: "Artículo actualizado" });
    },
    onError: (err: any) => toast({ title: "Error", description: err.message, variant: "destructive" }),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => adminFetch(`/api/admin/blog/${id}`, password, { method: "DELETE" }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/blog"] });
      queryClient.invalidateQueries({ queryKey: ["/api/blog"] });
      setDeleteId(null);
      toast({ title: "Artículo eliminado" });
    },
    onError: (err: any) => toast({ title: "Error", description: err.message, variant: "destructive" }),
  });

  const syncMutation = useMutation({
    mutationFn: () => adminFetch("/api/admin/sync-articles", password, { method: "POST" }),
    onSuccess: (data: any) => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/blog"] });
      queryClient.invalidateQueries({ queryKey: ["/api/blog"] });
      toast({ title: "Sincronización completada", description: `${data.created} nuevos artículos importados, ${data.skipped} ya existían.` });
    },
    onError: (err: any) => toast({ title: "Error de sincronización", description: err.message, variant: "destructive" }),
  });

  function startCreate() {
    setForm(emptyPost);
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
    });
    setEditing(post);
    setCreating(false);
  }

  function autoSlug(title: string) {
    return title.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  }

  if (creating || editing) {
    return (
      <div>
        <button onClick={() => { setCreating(false); setEditing(null); setForm(emptyPost); }} className="flex items-center gap-1 text-sm text-primary hover:text-primary/80 mb-4">
          <ArrowLeft className="h-3.5 w-3.5" /> Volver a la lista
        </button>
        <h2 className="text-lg font-semibold text-foreground mb-4">{editing ? "Editar artículo" : "Nuevo artículo"}</h2>
        <div className="space-y-4 max-w-2xl">
          <div>
            <Label className="text-sm font-medium mb-1.5 block">Título</Label>
            <Input value={form.title} onChange={e => { setForm(f => ({ ...f, title: e.target.value, slug: editing ? f.slug : autoSlug(e.target.value) })); }} placeholder="Título del artículo" data-testid="input-blog-title" />
          </div>
          <div>
            <Label className="text-sm font-medium mb-1.5 block">Slug (URL)</Label>
            <Input value={form.slug} onChange={e => setForm(f => ({ ...f, slug: e.target.value }))} placeholder="titulo-del-articulo" data-testid="input-blog-slug" />
          </div>
          <div>
            <Label className="text-sm font-medium mb-1.5 block">Extracto</Label>
            <Textarea value={form.excerpt} onChange={e => setForm(f => ({ ...f, excerpt: e.target.value }))} placeholder="Breve descripción para la vista previa" rows={2} data-testid="input-blog-excerpt" />
          </div>
          <div>
            <Label className="text-sm font-medium mb-1.5 block">Imagen de portada (URL)</Label>
            <Input value={form.coverImage} onChange={e => setForm(f => ({ ...f, coverImage: e.target.value }))} placeholder="https://..." data-testid="input-blog-cover" />
            {form.coverImage && <img src={form.coverImage} alt="Preview" className="mt-2 h-32 rounded-lg object-cover" />}
          </div>
          <div>
            <Label className="text-sm font-medium mb-1.5 block">Autor</Label>
            <Input value={form.author} onChange={e => setForm(f => ({ ...f, author: e.target.value }))} placeholder="Zahal" data-testid="input-blog-author" />
          </div>
          <div>
            <Label className="text-sm font-medium mb-1.5 block">Contenido (Markdown)</Label>
            <Textarea value={form.content} onChange={e => setForm(f => ({ ...f, content: e.target.value }))} placeholder="Escribe el contenido del artículo. Soporta **negritas**, *cursivas*, ## títulos, y [links](url)." rows={16} className="font-mono text-sm" data-testid="input-blog-content" />
          </div>
          <div className="flex items-center gap-3">
            <Switch checked={form.published} onCheckedChange={v => setForm(f => ({ ...f, published: v }))} data-testid="switch-blog-published" />
            <Label className="text-sm">Publicado</Label>
          </div>
          <div className="flex gap-3 pt-2">
            <Button onClick={() => editing ? updateMutation.mutate() : createMutation.mutate()} disabled={!form.title || !form.slug || createMutation.isPending || updateMutation.isPending} className="bg-primary hover:bg-primary/90 text-white gap-2" data-testid="button-save-blog">
              <Save className="h-4 w-4" />
              {(createMutation.isPending || updateMutation.isPending) ? "Guardando..." : "Guardar"}
            </Button>
            <Button variant="outline" onClick={() => { setCreating(false); setEditing(null); setForm(emptyPost); }}>Cancelar</Button>
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
          <Button variant="outline" onClick={() => syncMutation.mutate()} disabled={syncMutation.isPending} className="gap-2" data-testid="button-sync-articles">
            <RefreshCw className={`h-4 w-4 ${syncMutation.isPending ? "animate-spin" : ""}`} /> {syncMutation.isPending ? "Sincronizando..." : "Sincronizar AI"}
          </Button>
          <Button onClick={startCreate} className="bg-primary hover:bg-primary/90 text-white gap-2" data-testid="button-new-blog-post">
            <Plus className="h-4 w-4" /> Nuevo artículo
          </Button>
        </div>
      </div>

      {isLoading ? (
        <div className="space-y-3">{[1, 2, 3].map(i => <div key={i} className="h-16 bg-muted/40 rounded-xl animate-pulse" />)}</div>
      ) : posts.length === 0 ? (
        <div className="bg-card border border-border/40 rounded-xl p-8 text-center">
          <FileText className="h-8 w-8 text-muted-foreground/40 mx-auto mb-3" />
          <p className="text-sm text-muted-foreground">Aún no hay artículos. Crea el primero.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {posts.map(post => (
            <div key={post.id} className="flex flex-col sm:flex-row sm:items-center gap-3 p-4 bg-card rounded-xl border border-border/40" data-testid={`blog-row-${post.id}`}>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium text-foreground text-sm truncate">{post.title}</span>
                  <Badge variant={post.published ? "default" : "secondary"} className={post.published ? "bg-emerald-100 text-emerald-700 border-emerald-200" : ""}>
                    {post.published ? "Publicado" : "Borrador"}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">/blog/{post.slug} · {post.author} · {new Date(post.createdAt).toLocaleDateString("es-MX")}</p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                {post.published && (
                  <a href={`/blog/${post.slug}`} target="_blank" rel="noopener noreferrer">
                    <Button size="sm" variant="ghost" className="h-8 gap-1"><ExternalLink className="h-3.5 w-3.5" /></Button>
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

function BannerManager({ password }: { password: string }) {
  const { toast } = useToast();

  const { data: bannerData, isLoading } = useQuery({
    queryKey: ["/api/admin/settings", "hero_banners"],
    queryFn: () => adminFetch("/api/admin/settings/hero_banners", password),
  });

  const defaultSlides = [
    { imageUrl: "", title: "Slide 1", description: "", ctaText: "Ver productos", ctaLink: "/productos" },
    { imageUrl: "", title: "Slide 2", description: "", ctaText: "Ver productos", ctaLink: "/productos" },
    { imageUrl: "", title: "Slide 3", description: "", ctaText: "Ver productos", ctaLink: "/productos" },
  ];

  const [slides, setSlides] = useState(defaultSlides);
  const [loaded, setLoaded] = useState(false);

  if (bannerData?.value && !loaded) {
    try {
      const parsed = JSON.parse(bannerData.value);
      if (Array.isArray(parsed) && parsed.length > 0) {
        setSlides(parsed);
      }
    } catch {}
    setLoaded(true);
  }

  const saveMutation = useMutation({
    mutationFn: () => adminFetch("/api/admin/settings/hero_banners", password, { method: "PUT", body: JSON.stringify({ value: JSON.stringify(slides) }) }),
    onSuccess: () => toast({ title: "Banners guardados", description: "Los cambios se verán en el sitio al recargar." }),
    onError: (err: any) => toast({ title: "Error", description: err.message, variant: "destructive" }),
  });

  function updateSlide(idx: number, field: string, value: string) {
    setSlides(s => s.map((sl, i) => i === idx ? { ...sl, [field]: value } : sl));
  }

  function addSlide() {
    setSlides(s => [...s, { imageUrl: "", title: `Slide ${s.length + 1}`, description: "", ctaText: "Ver productos", ctaLink: "/productos" }]);
  }

  function removeSlide(idx: number) {
    setSlides(s => s.filter((_, i) => i !== idx));
  }

  if (isLoading) return <div className="space-y-3">{[1, 2].map(i => <div key={i} className="h-32 bg-muted/40 rounded-xl animate-pulse" />)}</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Banners del Inicio</h2>
          <p className="text-xs text-muted-foreground mt-1">Configura las imágenes y texto de los slides del hero.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={addSlide} className="gap-1"><Plus className="h-4 w-4" /> Agregar slide</Button>
          <Button onClick={() => saveMutation.mutate()} className="bg-primary hover:bg-primary/90 text-white gap-2" disabled={saveMutation.isPending} data-testid="button-save-banners">
            <Save className="h-4 w-4" /> {saveMutation.isPending ? "Guardando..." : "Guardar"}
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {slides.map((slide, idx) => (
          <div key={idx} className="bg-card border border-border/40 rounded-xl p-5" data-testid={`banner-slide-${idx}`}>
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-semibold text-foreground">Slide {idx + 1}</span>
              {slides.length > 1 && (
                <Button size="sm" variant="ghost" className="h-7 text-red-500 hover:text-red-600" onClick={() => removeSlide(idx)}>
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              )}
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              <div>
                <Label className="text-xs mb-1 block">Título</Label>
                <Input value={slide.title} onChange={e => updateSlide(idx, "title", e.target.value)} placeholder="Título del slide" />
              </div>
              <div>
                <Label className="text-xs mb-1 block">URL de imagen</Label>
                <Input value={slide.imageUrl} onChange={e => updateSlide(idx, "imageUrl", e.target.value)} placeholder="https://..." />
              </div>
              <div className="sm:col-span-2">
                <Label className="text-xs mb-1 block">Descripción</Label>
                <Textarea value={slide.description} onChange={e => updateSlide(idx, "description", e.target.value)} rows={2} placeholder="Texto del slide" />
              </div>
              <div>
                <Label className="text-xs mb-1 block">Texto del botón</Label>
                <Input value={slide.ctaText} onChange={e => updateSlide(idx, "ctaText", e.target.value)} />
              </div>
              <div>
                <Label className="text-xs mb-1 block">Link del botón</Label>
                <Input value={slide.ctaLink} onChange={e => updateSlide(idx, "ctaLink", e.target.value)} />
              </div>
            </div>
            {slide.imageUrl && <img src={slide.imageUrl} alt="Preview" className="mt-3 h-24 rounded-lg object-cover" />}
          </div>
        ))}
      </div>
    </div>
  );
}

function ProductManager({ password }: { password: string }) {
  const { toast } = useToast();
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [editForm, setEditForm] = useState({ name: "", description: "", images: "", newPrice: "" });

  const { data: products = [], isLoading } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  const updateMutation = useMutation({
    mutationFn: async () => {
      const body: any = {};
      if (editForm.name && editForm.name !== editingProduct!.name) body.name = editForm.name;
      if (editForm.description !== editingProduct!.description) body.description = editForm.description;
      if (editForm.images) {
        body.images = editForm.images.split("\n").map(s => s.trim()).filter(Boolean);
      }
      if (editForm.newPrice) {
        body.newPrice = parseFloat(editForm.newPrice);
      }
      return adminFetch(`/api/admin/products/${editingProduct!.stripeProductId}`, password, { method: "PUT", body: JSON.stringify(body) });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/products"] });
      setEditingProduct(null);
      toast({ title: "Producto actualizado", description: "Los cambios pueden tardar hasta 60 segundos en reflejarse." });
    },
    onError: (err: any) => toast({ title: "Error", description: err.message, variant: "destructive" }),
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
        <div className="space-y-3">{[1, 2, 3].map(i => <div key={i} className="h-16 bg-muted/40 rounded-xl animate-pulse" />)}</div>
      ) : (
        <div className="space-y-3">
          {products.map(product => (
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
              <Input value={editForm.name} onChange={e => setEditForm(f => ({ ...f, name: e.target.value }))} data-testid="input-product-name" />
            </div>
            <div>
              <Label className="text-sm mb-1.5 block">Descripción</Label>
              <Textarea value={editForm.description} onChange={e => setEditForm(f => ({ ...f, description: e.target.value }))} rows={3} data-testid="input-product-description" />
            </div>
            <div>
              <Label className="text-sm mb-1.5 block">Imágenes (una URL por línea)</Label>
              <Textarea value={editForm.images} onChange={e => setEditForm(f => ({ ...f, images: e.target.value }))} rows={3} className="font-mono text-xs" placeholder="https://..." data-testid="input-product-images" />
            </div>
            <div>
              <Label className="text-sm mb-1.5 block">Nuevo precio (MXN) — dejar vacío para no cambiar</Label>
              <Input type="number" step="0.01" value={editForm.newPrice} onChange={e => setEditForm(f => ({ ...f, newPrice: e.target.value }))} placeholder={editingProduct?.price || ""} data-testid="input-product-price" />
              {editForm.newPrice && (
                <p className="text-xs text-amber-600 mt-1">Se creará un nuevo precio en Stripe y se desactivará el anterior.</p>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingProduct(null)}>Cancelar</Button>
            <Button onClick={() => updateMutation.mutate()} disabled={updateMutation.isPending} className="bg-primary hover:bg-primary/90 text-white gap-2" data-testid="button-save-product">
              <Save className="h-4 w-4" /> {updateMutation.isPending ? "Guardando..." : "Guardar"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

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

      <div className="container mx-auto px-4 lg:px-8 py-8 max-w-4xl">
        <Tabs defaultValue="blog">
          <TabsList className="mb-6 bg-card border border-border/40">
            <TabsTrigger value="blog" className="gap-1.5" data-testid="tab-blog">
              <FileText className="h-3.5 w-3.5" /> Blog
            </TabsTrigger>
            <TabsTrigger value="banners" className="gap-1.5" data-testid="tab-banners">
              <Image className="h-3.5 w-3.5" /> Banners
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
