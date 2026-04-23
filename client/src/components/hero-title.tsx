import type { ReactNode } from "react";

// Renders a title string where text wrapped in *single asterisks* becomes the
// italic accent span used by the hero. Example:
//   "Manos limpias, *protección natural* todos los días"
export function renderHeroTitle(text: string): ReactNode {
  if (!text) return null;
  const parts = text.split(/(\*[^*]+\*)/g);
  return parts.map((part, i) => {
    const m = part.match(/^\*([^*]+)\*$/);
    if (m) {
      return (
        <span key={i} className="italic text-[hsl(99,30%,80%)]">{m[1]}</span>
      );
    }
    return <span key={i}>{part}</span>;
  });
}
