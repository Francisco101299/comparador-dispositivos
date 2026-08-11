// ============================================================================
// src/components/Logo.jsx
// Marca visual del sitio: logo en public/logo.png + texto "Duelo de
// Características".
// ============================================================================
import { Link } from "react-router-dom";
import { COLORS } from "../data/theme";

export default function Logo({ size = 32, showText = true, dark = true }) {
  return (
    <Link to="/" className="inline-flex items-center gap-2">
      <img src="/logo.png" alt="Duelo de Características" width={size} height={size} style={{ width: size, height: size, borderRadius: "50%" }} />
      {showText && (
        <span
          className="font-bold tracking-tight"
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: size * 0.42,
            color: dark ? "#fff" : COLORS.ink,
          }}
        >
          Duelo de <span style={{ color: COLORS.gold }}>Características</span>
        </span>
      )}
    </Link>
  );
}
