import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Cookie, Settings, X } from "lucide-react";
import { Link } from "wouter";

const CONSENT_KEY = "zahal-cookie-consent";
const CONSENT_VERSION = "2";
const COOKIE_CONSENT_OPEN_EVENT = "zahal-open-cookie-consent";

type ConsentState = {
  version: string;
  necessary: true;
  analytics: boolean;
  marketing: boolean;
  timestamp: number;
};

function gtag(...args: any[]) {
  const w = window as any;
  w.dataLayer = w.dataLayer || [];
  w.gtag = gtag;
  w.dataLayer.push(arguments);
}

function getStoredConsent(): ConsentState | null {
  try {
    const raw = localStorage.getItem(CONSENT_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as ConsentState;
    if (parsed.version !== CONSENT_VERSION) return null;
    return parsed;
  } catch {
    return null;
  }
}

function storeConsent(consent: ConsentState) {
  localStorage.setItem(CONSENT_KEY, JSON.stringify(consent));
}

function syncConsentState(setAnalytics: (value: boolean) => void, setMarketing: (value: boolean) => void) {
  const existing = getStoredConsent();
  setAnalytics(existing?.analytics ?? true);
  setMarketing(existing?.marketing ?? true);
}

function setConsentDefaults() {
  gtag("consent", "default", {
    analytics_storage: "denied",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    wait_for_update: 500,
  });
}

function updateConsentState(analyticsGranted: boolean, marketingGranted: boolean) {
  gtag("consent", "update", {
    analytics_storage: analyticsGranted ? "granted" : "denied",
    ad_storage: marketingGranted ? "granted" : "denied",
    ad_user_data: marketingGranted ? "granted" : "denied",
    ad_personalization: marketingGranted ? "granted" : "denied",
  });
}

function loadGtagScript() {
  if (document.querySelector('script[src*="googletagmanager.com/gtag"]')) return;

  const script = document.createElement("script");
  script.async = true;
  script.src = "https://www.googletagmanager.com/gtag/js?id=GT-WVC25M7P";
  document.head.appendChild(script);

  gtag("js", new Date());
  gtag("config", "GT-WVC25M7P");
  gtag("config", "G-NNR6S8V151");
  gtag("config", "AW-17964557666");
}

export function initConsentOnLoad() {
  setConsentDefaults();

  const consent = getStoredConsent();
  if (consent) {
    updateConsentState(consent.analytics, consent.marketing);
    if (consent.analytics || consent.marketing) {
      loadGtagScript();
    }
  }
}

export function openCookieConsent(showDetails = true) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(
    new CustomEvent(COOKIE_CONSENT_OPEN_EVENT, {
      detail: { showDetails },
    }),
  );
}

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [analytics, setAnalytics] = useState(true);
  const [marketing, setMarketing] = useState(true);

  useEffect(() => {
    const existing = getStoredConsent();
    if (!existing) {
      const timer = setTimeout(() => setVisible(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    const handleOpen = (event: Event) => {
      const customEvent = event as CustomEvent<{ showDetails?: boolean }>;
      syncConsentState(setAnalytics, setMarketing);
      setShowDetails(customEvent.detail?.showDetails ?? true);
      setVisible(true);
    };

    window.addEventListener(COOKIE_CONSENT_OPEN_EVENT, handleOpen as EventListener);
    return () => {
      window.removeEventListener(COOKIE_CONSENT_OPEN_EVENT, handleOpen as EventListener);
    };
  }, []);

  const accept = useCallback((analyticsOn: boolean, marketingOn: boolean) => {
    const consent: ConsentState = {
      version: CONSENT_VERSION,
      necessary: true,
      analytics: analyticsOn,
      marketing: marketingOn,
      timestamp: Date.now(),
    };
    storeConsent(consent);
    updateConsentState(analyticsOn, marketingOn);
    if (analyticsOn || marketingOn) {
      loadGtagScript();
    }
    setVisible(false);
  }, []);

  const acceptAll = useCallback(() => accept(true, true), [accept]);
  const rejectAll = useCallback(() => accept(false, false), [accept]);
  const savePreferences = useCallback(() => accept(analytics, marketing), [accept, analytics, marketing]);

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-[9999] p-4 md:p-6 animate-in slide-in-from-bottom-4 duration-500"
      role="dialog"
      aria-label="Consentimiento de cookies"
      data-testid="cookie-consent-banner"
    >
      <div className="max-w-3xl mx-auto bg-white border border-border rounded-2xl shadow-2xl shadow-black/15 overflow-hidden">
        <div className="p-5 md:p-6">
          <div className="flex items-start gap-4">
            <div className="hidden sm:flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
              <Cookie className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-base font-semibold text-foreground mb-1" data-testid="text-cookie-title">
                Usamos cookies
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Utilizamos cookies para analizar el tráfico y mejorar tu experiencia. 
                Puedes aceptar todas, rechazarlas o personalizar tus preferencias.{" "}
                <Link href="/privacidad" className="underline hover:text-foreground transition-colors" data-testid="link-cookie-privacy">
                  Política de Privacidad
                </Link>
              </p>
            </div>
            <button
              onClick={rejectAll}
              className="shrink-0 text-muted-foreground hover:text-foreground transition-colors p-1"
              aria-label="Rechazar cookies"
              data-testid="button-cookie-close"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {showDetails && (
            <div className="mt-4 pt-4 border-t border-border space-y-3" data-testid="cookie-details-panel">
              <label className="flex items-center gap-3 cursor-not-allowed opacity-70">
                <input type="checkbox" checked disabled className="h-4 w-4 rounded accent-primary" />
                <div>
                  <span className="text-sm font-medium text-foreground">Necesarias</span>
                  <span className="text-xs text-muted-foreground ml-2">Siempre activas</span>
                </div>
              </label>
              <label className="flex items-center gap-3 cursor-pointer" data-testid="checkbox-analytics">
                <input
                  type="checkbox"
                  checked={analytics}
                  onChange={e => setAnalytics(e.target.checked)}
                  className="h-4 w-4 rounded accent-primary"
                />
                <div>
                  <span className="text-sm font-medium text-foreground">Analíticas</span>
                  <span className="text-xs text-muted-foreground ml-2">Google Analytics</span>
                </div>
              </label>
              <label className="flex items-center gap-3 cursor-pointer" data-testid="checkbox-marketing">
                <input
                  type="checkbox"
                  checked={marketing}
                  onChange={e => setMarketing(e.target.checked)}
                  className="h-4 w-4 rounded accent-primary"
                />
                <div>
                  <span className="text-sm font-medium text-foreground">Marketing</span>
                  <span className="text-xs text-muted-foreground ml-2">Google Ads</span>
                </div>
              </label>
            </div>
          )}

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 mt-4">
            {showDetails ? (
              <Button
                onClick={savePreferences}
                className="bg-primary text-white hover:bg-primary/90 h-9 px-5 text-sm font-semibold rounded-lg"
                data-testid="button-cookie-save"
              >
                Guardar preferencias
              </Button>
            ) : (
              <>
                <Button
                  onClick={acceptAll}
                  className="bg-primary text-white hover:bg-primary/90 h-9 px-5 text-sm font-semibold rounded-lg"
                  data-testid="button-cookie-accept"
                >
                  Aceptar todas
                </Button>
                <Button
                  variant="outline"
                  onClick={rejectAll}
                  className="h-9 px-5 text-sm font-semibold rounded-lg"
                  data-testid="button-cookie-reject"
                >
                  Rechazar
                </Button>
              </>
            )}
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors px-2 py-1 sm:ml-auto"
              data-testid="button-cookie-settings"
            >
              <Settings className="h-3.5 w-3.5" />
              {showDetails ? "Menos opciones" : "Personalizar"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
