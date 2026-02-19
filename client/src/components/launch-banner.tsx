import { useState, useEffect } from "react";

const LAUNCH_DATE = new Date("2026-02-20T16:00:00Z");

export default function LaunchBanner() {
  const [isLive, setIsLive] = useState(() => Date.now() >= LAUNCH_DATE.getTime());

  useEffect(() => {
    if (isLive) return;
    const remaining = LAUNCH_DATE.getTime() - Date.now();
    if (remaining <= 0) {
      setIsLive(true);
      return;
    }
    const timer = setTimeout(() => setIsLive(true), remaining);
    return () => clearTimeout(timer);
  }, [isLive]);

  if (isLive) return null;

  return (
    <div className="bg-amber-50 border-b border-amber-200" data-testid="launch-banner">
      <div className="container mx-auto px-4 lg:px-8 py-3 flex items-center justify-center gap-3 text-center">
        <span className="text-amber-600 text-lg flex-shrink-0">⚠️</span>
        <p className="text-amber-800 text-sm font-medium">
          Estamos en modo de prueba. Las compras estarán disponibles el 20 de febrero a las 10:00 AM (hora CDMX). ¡Falta poco!
        </p>
      </div>
    </div>
  );
}
