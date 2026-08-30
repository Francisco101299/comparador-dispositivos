// ============================================================================
// src/components/UpdateBanner.jsx
// Banner de "novedades" en la home, para incentivar que la gente vuelva.
// Se controla con un solo texto y fecha aquí abajo (LATEST_UPDATE) — cuando
// publiques algo nuevo, solo cambia el texto y la fecha, y el banner vuelve
// a aparecer para todos (incluso quienes ya cerraron uno anterior).
// ============================================================================
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Sparkles, X } from "lucide-react";
import { COLORS } from "../data/theme";

// Cambia este texto y la fecha cada vez que publiques algo nuevo.
// La fecha es solo un identificador — no se muestra, solo sirve para que
// el banner "se resetee" y vuelva a aparecer aunque alguien ya haya
// cerrado uno anterior.
const LATEST_UPDATE = {
  id: "2026-08-16",
  text: "🆕 Nuevo artículo: Honor Robot Phone, el celular con brazo robótico",
  link: "/blog/honor-robot-phone",
};

export default function UpdateBanner() {
  const [dismissed, setDismissed] = useState(true);

  useEffect(() => {
    try {
      const seen = localStorage.getItem("dismissedUpdate");
      setDismissed(seen === LATEST_UPDATE.id);
    } catch {
      setDismissed(false);
    }
  }, []);

  const handleDismiss = () => {
    setDismissed(true);
    try {
      localStorage.setItem("dismissedUpdate", LATEST_UPDATE.id);
    } catch {}
  };

  if (dismissed) return null;

  return (
    <div
      className="flex items-center justify-center gap-2 px-4 py-2.5 text-xs sm:text-sm flex-wrap"
      style={{ backgroundColor: COLORS.gold, color: "#14181F", fontFamily: "'Inter', sans-serif" }}
    >
      <Sparkles size={14} className="shrink-0" />
      <Link to={LATEST_UPDATE.link} className="font-medium underline underline-offset-2">
        {LATEST_UPDATE.text}
      </Link>
      <button
        type="button"
        onClick={handleDismiss}
        aria-label="Cerrar aviso"
        className="ml-1 shrink-0 opacity-70 hover:opacity-100"
      >
        <X size={14} />
      </button>
    </div>
  );
}
