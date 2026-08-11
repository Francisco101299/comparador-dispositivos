// ============================================================================
// src/components/Logo.jsx
// Marca visual del sitio: un círculo dividido en rojo/verde (los mismos
// colores de Dispositivo A/B) con una "X" central que representa el duelo.
// ============================================================================
import { Link } from "react-router-dom";
import { COLORS } from "../data/theme";

export function LogoMark({ size = 32 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true">
      <defs>
        <clipPath id="logo-clip-left">
          <path d="M16 0 A16 16 0 0 0 16 32 Z" />
        </clipPath>
        <clipPath id="logo-clip-right">
          <path d="M16 0 A16 16 0 0 1 16 32 Z" />
        </clipPath>
      </defs>
      <rect x="0" y="0" width="32" height="32" fill={COLORS.a} clipPath="url(#logo-clip-left)" />
      <rect x="0" y="0" width="32" height="32" fill={COLORS.b} clipPath="url(#logo-clip-right)" />
      <path d="M12 12 L20 20 M20 12 L12 20" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  );
}

export default function Logo({ size = 32, showText = true, dark = true }) {
  return (
    <Link to="/" className="inline-flex items-center gap-2">
      <LogoMark size={size} />
      {showText && (
        <span
          className="font-bold tracking-tight"
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: size * 0.5,
            color: dark ? "#fff" : COLORS.ink,
          }}
        >
          Duelo<span style={{ color: COLORS.gold }}>DE</span>
        </span>
      )}
    </Link>
  );
}
