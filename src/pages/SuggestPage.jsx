// ============================================================================
// src/components/SiteBanner.jsx
// Banner promocional con el logo, para la parte gris de las páginas.
// Responsive: columna en móvil, fila en desktop.
// ============================================================================
import { Link } from "react-router-dom";
import Logo from "../components/Logo";
import { COLORS } from "../data/theme";

export default function SiteBanner() {
  return (
    <div className="mb-6">
      <div
        className="rounded-xl shadow-md overflow-hidden"
        style={{ backgroundColor: COLORS.panelDark, border: "1px solid #2A2F3A" }}
      >
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 px-5 py-5 sm:py-4 text-center sm:text-left">
          <div className="flex justify-center sm:justify-start">
            <Logo size={64} />
          </div>
          <div className="min-w-0 flex-1">
            <p
              className="font-bold text-white text-lg sm:text-xl leading-tight break-words"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Duelo de <span style={{ color: "#D9A62E" }}>Características</span>
            </p>
            <p
              className="text-xs sm:text-sm mt-1"
              style={{ color: "#9BA1AD", fontFamily: "'Inter', sans-serif" }}
            >
              Compara celulares, computadoras, tablets y relojes en 8 categorías y descubre cuál gana.
            </p>
            <Link
              to="/"
              className="inline-block mt-2 text-xs font-semibold uppercase tracking-wide underline"
              style={{ color: "#E8573F", fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Hacer una comparación
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
