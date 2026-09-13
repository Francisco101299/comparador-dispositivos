// ============================================================================
// src/components/UpdateBanner.jsx
// Banner de "novedades" en la home, para incentivar que la gente vuelva.
//
// Antes el texto y el link vivían escritos a mano en una constante
// (LATEST_UPDATE) que había que recordar actualizar cada vez que se
// publicaba un artículo -- por eso el banner se quedaba mostrando un
// artículo viejo mucho después de haber publicado uno nuevo. Ahora toma el
// artículo más reciente directamente de articles.js (por fecha), así que
// siempre está al día solo con publicar: no hay un segundo lugar que
// actualizar a mano.
//
// El id que se guarda en localStorage para "ya lo cerré" es el id del
// artículo mismo -- en cuanto se publica uno más nuevo, el banner vuelve a
// aparecer para todos automáticamente, sin tener que inventar una fecha
// aparte como identificador.
// ============================================================================
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Sparkles, X, ArrowRight } from "lucide-react";
import { COLORS } from "../data/theme";
import { ARTICLES } from "../data/articles";

const latest = [...ARTICLES].sort((a, b) => new Date(b.date) - new Date(a.date))[0];

export default function UpdateBanner() {
  const [dismissed, setDismissed] = useState(true);

  useEffect(() => {
    if (!latest) return;
    try {
      const seen = localStorage.getItem("dismissedUpdate");
      setDismissed(seen === latest.id);
    } catch {
      setDismissed(false);
    }
  }, []);

  const handleDismiss = () => {
    setDismissed(true);
    try {
      if (latest) localStorage.setItem("dismissedUpdate", latest.id);
    } catch {}
  };

  if (dismissed || !latest) return null;

  return (
    <div
      className="flex items-center justify-center gap-3 px-4 py-2.5 text-xs sm:text-sm flex-wrap border-b"
      style={{ backgroundColor: COLORS.panelDark, borderColor: "rgba(201, 154, 46, 0.35)", fontFamily: "'Inter', sans-serif" }}
    >
      <span
        className="hidden sm:inline-flex items-center gap-1 shrink-0 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide"
        style={{ backgroundColor: COLORS.gold, color: COLORS.panelDark, fontFamily: "'Space Grotesk', sans-serif" }}
      >
        <Sparkles size={11} /> Nuevo
      </span>
      <Link
        to={`/blog/${latest.id}`}
        className="inline-flex items-center gap-1.5 font-medium group"
        style={{ color: COLORS.gold }}
      >
        <Sparkles size={13} className="sm:hidden shrink-0" />
        <span className="group-hover:underline underline-offset-2">{latest.title}</span>
        <ArrowRight size={13} className="shrink-0 transition-transform group-hover:translate-x-0.5" />
      </Link>
      <button
        type="button"
        onClick={handleDismiss}
        aria-label="Cerrar aviso"
        className="ml-1 shrink-0 opacity-60 hover:opacity-100 transition-opacity"
        style={{ color: "#E7E9EE" }}
      >
        <X size={14} />
      </button>
    </div>
  );
}
