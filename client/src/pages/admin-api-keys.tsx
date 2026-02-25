import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Key, Plus, Trash2, Copy, Check, Eye, EyeOff, Lock } from "lucide-react";
import type { ApiKey } from "@shared/schema";

const STORAGE_KEY = "zahal_admin_pw";

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
      await adminFetch("/api/admin/api-keys", pw);
      sessionStorage.setItem(STORAGE_KEY, pw);
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
          <span className="text-xl font-bold text-foreground font-serif">Administrador Zahal</span>
        </div>
        <div className="bg-card border border-border/40 rounded-2xl p-8 shadow-sm">
          <h1 className="text-lg font-semibold text-foreground mb-1">Acceso seguro</h1>
          <p className="text-sm text-muted-foreground mb-6">Ingresa tu contraseña de administrador</p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <Input
                type={show ? "text" : "password"}
                placeholder="Contraseña"
                value={pw}
                onChange={e => setPw(e.target.value)}
                className="pr-10"
                data-testid="input-admin-password"
              />
              <button
                type="button"
                onClick={() => setShow(s => !s)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {error && <p className="text-sm text-red-500">{error}</p>}
            <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white" disabled={loading} data-testid="button-admin-login">
              {loading ? "Verificando..." : "Entrar"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

function KeyRow({ apiKey, password, onRevoke }: { apiKey: ApiKey; password: string; onRevoke: () => void }) {
  const [copied, setCopied] = useState(false);
  const [visible, setVisible] = useState(false);
  const { toast } = useToast();

  const revokeMutation = useMutation({
    mutationFn: () => adminFetch(`/api/admin/api-keys/${apiKey.id}`, password, { method: "DELETE" }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/api-keys"] });
      onRevoke();
      toast({ title: "Clave revocada", description: "La API key ya no es válida." });
    },
    onError: (err: any) => toast({ title: "Error", description: err.message, variant: "destructive" }),
  });

  function copyKey() {
    navigator.clipboard.writeText(apiKey.key);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const maskedKey = `zahal_live_${"•".repeat(20)}`;

  return (
    <div className={`flex flex-col sm:flex-row sm:items-center gap-3 p-4 rounded-xl border ${apiKey.active ? "border-border/40 bg-card" : "border-border/20 bg-muted/30 opacity-60"}`} data-testid={`api-key-row-${apiKey.id}`}>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-medium text-foreground text-sm">{apiKey.label}</span>
          <Badge variant={apiKey.active ? "default" : "secondary"} className={apiKey.active ? "bg-emerald-100 text-emerald-700 border-emerald-200" : ""}>
            {apiKey.active ? "Activa" : "Revocada"}
          </Badge>
        </div>
        <div className="flex items-center gap-2">
          <code className="text-xs text-muted-foreground font-mono truncate">
            {visible ? apiKey.key : maskedKey}
          </code>
          <button onClick={() => setVisible(v => !v)} className="text-muted-foreground hover:text-foreground flex-shrink-0" data-testid={`button-toggle-key-${apiKey.id}`}>
            {visible ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
          </button>
        </div>
        <p className="text-xs text-muted-foreground mt-1">
          Creada: {new Date(apiKey.createdAt).toLocaleDateString("es-MX", { day: "numeric", month: "long", year: "numeric" })}
        </p>
      </div>
      <div className="flex items-center gap-2 flex-shrink-0">
        {apiKey.active && (
          <>
            <Button size="sm" variant="outline" onClick={copyKey} className="gap-1.5 h-8" data-testid={`button-copy-key-${apiKey.id}`}>
              {copied ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
              {copied ? "Copiada" : "Copiar"}
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => revokeMutation.mutate()}
              disabled={revokeMutation.isPending}
              className="gap-1.5 h-8 border-red-200 text-red-600 hover:bg-red-50"
              data-testid={`button-revoke-key-${apiKey.id}`}
            >
              <Trash2 className="h-3.5 w-3.5" />
              Revocar
            </Button>
          </>
        )}
      </div>
    </div>
  );
}

function Dashboard({ password, onLogout }: { password: string; onLogout: () => void }) {
  const [label, setLabel] = useState("");
  const { toast } = useToast();

  const { data: keys = [], isLoading } = useQuery<ApiKey[]>({
    queryKey: ["/api/admin/api-keys"],
    queryFn: () => adminFetch("/api/admin/api-keys", password),
    refetchOnWindowFocus: false,
  });

  const createMutation = useMutation({
    mutationFn: () => adminFetch("/api/admin/api-keys", password, {
      method: "POST",
      body: JSON.stringify({ label }),
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/api-keys"] });
      setLabel("");
      toast({ title: "API key creada", description: "La nueva clave está lista para usar." });
    },
    onError: (err: any) => toast({ title: "Error", description: err.message, variant: "destructive" }),
  });

  const activeKeys = keys.filter(k => k.active);
  const revokedKeys = keys.filter(k => !k.active);

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border/40 bg-card">
        <div className="container mx-auto px-4 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Key className="h-4 w-4 text-white" />
            </div>
            <div>
              <h1 className="text-base font-bold text-foreground">API Keys — Zahal</h1>
              <p className="text-xs text-muted-foreground">Panel de administración</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={onLogout} className="text-muted-foreground">
            Cerrar sesión
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 py-8 max-w-3xl">
        <div className="bg-card border border-border/40 rounded-2xl p-6 mb-6">
          <h2 className="text-sm font-semibold text-foreground mb-1">Crear nueva API key</h2>
          <p className="text-xs text-muted-foreground mb-4">Asigna un nombre descriptivo para identificar para qué se usará esta clave.</p>
          <div className="flex gap-3">
            <Input
              placeholder='Ej. "Baby Love Growth Ai"'
              value={label}
              onChange={e => setLabel(e.target.value)}
              onKeyDown={e => e.key === "Enter" && label.trim() && createMutation.mutate()}
              className="flex-1"
              data-testid="input-api-key-label"
            />
            <Button
              onClick={() => createMutation.mutate()}
              disabled={!label.trim() || createMutation.isPending}
              className="bg-primary hover:bg-primary/90 text-white gap-2 flex-shrink-0"
              data-testid="button-create-api-key"
            >
              <Plus className="h-4 w-4" />
              {createMutation.isPending ? "Creando..." : "Crear"}
            </Button>
          </div>
        </div>

        <div className="mb-2 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-foreground">Claves activas ({activeKeys.length})</h2>
        </div>

        {isLoading ? (
          <div className="space-y-3">
            {[1, 2].map(i => (
              <div key={i} className="h-20 bg-muted/40 rounded-xl animate-pulse" />
            ))}
          </div>
        ) : activeKeys.length === 0 ? (
          <div className="bg-card border border-border/40 rounded-xl p-8 text-center">
            <Key className="h-8 w-8 text-muted-foreground/40 mx-auto mb-3" />
            <p className="text-sm text-muted-foreground">Aún no hay claves activas.</p>
            <p className="text-xs text-muted-foreground mt-1">Crea una arriba para conectar servicios externos.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {activeKeys.map(k => (
              <KeyRow key={k.id} apiKey={k} password={password} onRevoke={() => {}} />
            ))}
          </div>
        )}

        {revokedKeys.length > 0 && (
          <div className="mt-8">
            <h2 className="text-sm font-semibold text-muted-foreground mb-2">Claves revocadas ({revokedKeys.length})</h2>
            <div className="space-y-3">
              {revokedKeys.map(k => (
                <KeyRow key={k.id} apiKey={k} password={password} onRevoke={() => {}} />
              ))}
            </div>
          </div>
        )}

        <div className="mt-8 bg-primary/5 border border-primary/10 rounded-xl p-5">
          <h3 className="text-sm font-semibold text-foreground mb-2">Cómo usar la API key</h3>
          <p className="text-xs text-muted-foreground mb-3">Incluye la clave en el header de cada solicitud a la API de Zahal:</p>
          <code className="block bg-white border border-border/40 rounded-lg p-3 text-xs font-mono text-foreground">
            Authorization: Bearer zahal_live_...
          </code>
        </div>
      </div>
    </div>
  );
}

export default function AdminApiKeys() {
  const saved = sessionStorage.getItem(STORAGE_KEY);
  const [password, setPassword] = useState<string | null>(saved);

  function handleLogin(pw: string) {
    setPassword(pw);
  }

  function handleLogout() {
    sessionStorage.removeItem(STORAGE_KEY);
    setPassword(null);
  }

  if (!password) return <Login onLogin={handleLogin} />;
  return <Dashboard password={password} onLogout={handleLogout} />;
}
