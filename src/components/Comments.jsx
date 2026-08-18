// ============================================================================
// src/components/Comments.jsx
// Comentarios de la comunidad vía Cusdis (sin cuenta para comentar).
// Si el navegador bloquea el widget (Brave/bloqueadores), siempre queda
// visible un botón alternativo para comentar en Facebook.
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
  const fbHref = "https://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent(pageUrl);

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

      <div className="mt-4 pt-3 border-t" style={{ borderColor: COLORS.line }}>
        <p className="text-[10px] text-center mb-2" style={{ color: COLORS.muted, fontFamily: "'Inter', sans-serif" }}>
          ¿No aparece el cuadro para escribir? Tu navegador lo está bloqueando (común en Brave). Usa esta alternativa:
        </p>
        <a
          href={fbHref}
          target="_blank"
          rel="noopener noreferrer"
          className="block text-center text-sm font-semibold py-2.5 rounded-md"
          style={{ backgroundColor: "#1877F2", color: "#fff", fontFamily: "'Inter', sans-serif" }}
        >
          💬 Comentar en Facebook
        </a>
      </div>
    </div>
  );
}
