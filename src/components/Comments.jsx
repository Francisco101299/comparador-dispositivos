// ============================================================================
// src/components/Comments.jsx
// Comentarios escritos DIRECTAMENTE en la página (sin Facebook), guardados y
// visibles para todos vía Cusdis (gratis, sin cuenta para comentar).
// ============================================================================
import { useEffect } from "react";
import { COLORS } from "../data/theme";

const CUSDIS_APP_ID = "27195755-841e-4d7b-9839-b830e800fbf5";

export default function Comments() {
  useEffect(() => {
    if (document.getElementById("cusdis-script")) return;
    const s = document.createElement("script");
    s.id = "cusdis-script";
    s.src = "https://cusdis.com/js/cusdis.es.js";
    s.async = true;
    s.defer = true;
    document.body.appendChild(s);
  }, []);

  const pageId = typeof window !== "undefined" ? window.location.pathname : "/";
  const pageTitle = typeof window !== "undefined" ? document.title : "Duelo de Características";
  const pageUrl = typeof window !== "undefined" ? window.location.href : "/";

  return (
    <div className="rounded-lg p-4 sm:p-5 mt-6" style={{ backgroundColor: "#fff", border: `1px solid ${COLORS.line}` }}>
      <div className="text-xs uppercase tracking-widest mb-1 text-center" style={{ color: COLORS.muted, fontFamily: "'Space Grotesk', sans-serif" }}>
        Comentarios de la comunidad
      </div>
      <p className="text-xs text-center mb-4" style={{ color: COLORS.muted, fontFamily: "'Inter', sans-serif" }}>
        Escribe tu opinión aquí mismo — no necesitas cuenta ni Facebook.
      </p>
      <div
        id="cusdis_thread"
        data-host="https://cusdis.com"
        data-app-id={CUSDIS_APP_ID}
        data-page-id={pageId}
        data-page-url={pageUrl}
        data-page-title={pageTitle}
      />
    </div>
  );
}
