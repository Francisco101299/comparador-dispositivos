// ============================================================================
// src/components/Comments.jsx
// Comentarios de la comunidad vía Cusdis (sin cuenta para comentar).
// El widget se reinicia en CADA carga o navegación (corrige el bug de
// "solo sirve una vez").
// ============================================================================
import { useEffect } from "react";
import { COLORS } from "../data/theme";

const CUSDIS_APP_ID = "27195755-841e-4d7b-9839-b830e800fbf5";

export default function Comments() {
  useEffect(() => {
    // Quita la instancia anterior del script para que Cusdis se
    // redibuje en cada carga de página o navegación dentro del sitio.
    const old = document.getElementById("cusdis-script");
    if (old) old.remove();

    const s = document.createElement("script");
    s.id = "cusdis-script";
    s.src = "https://cusdis.com/js/cusdis.es.js";
    s.async = true;
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
