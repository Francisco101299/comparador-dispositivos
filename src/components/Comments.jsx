// ============================================================================
// src/components/Comments.jsx
// Comentarios de la comunidad vía Facebook Comments. Los visitantes comentan
// con su cuenta de Facebook; los comentarios quedan guardados y visibles para
// todos en la URL actual (cada duelo tiene su propia conversación).
// ============================================================================
import { useEffect } from "react";
import { COLORS } from "../data/theme";

export default function Comments() {
  useEffect(() => {
    // Carga el SDK de Facebook una sola vez
    if (document.getElementById("facebook-jssdk")) return;
    const s = document.createElement("script");
    s.id = "facebook-jssdk";
    s.src = "https://connect.facebook.net/es_LA/sdk.js#xfbml=1&version=v19.0";
    s.async = true;
    s.defer = true;
    document.body.appendChild(s);
  }, []);

  return (
    <div className="rounded-lg p-4 sm:p-5 mt-6" style={{ backgroundColor: "#fff", border: `1px solid ${COLORS.line}` }}>
      <div className="text-xs uppercase tracking-widest mb-1 text-center" style={{ color: COLORS.muted, fontFamily: "'Space Grotesk', sans-serif" }}>
        Comentarios de la comunidad
      </div>
      <p className="text-xs text-center mb-3" style={{ color: COLORS.muted, fontFamily: "'Inter', sans-serif" }}>
        Deja tu opinión con tu cuenta de Facebook.
      </p>
      <div
        className="fb-comments"
        data-href={typeof window !== "undefined" ? window.location.href : "/"}
        data-width="100%"
        data-numposts="5"
        data-colorscheme="light"
      />
    </div>
  );
}
