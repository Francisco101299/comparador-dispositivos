// ============================================================================
// src/components/DuelBar.jsx
// Barra de duelo por categoría. Los detalles de cada dispositivo se muestran
// COMPLETOS, uno debajo del otro (rojo = dispositivo A, verde = dispositivo B),
// para que se puedan leer sin cortes.
// ============================================================================
import { COLORS } from "../data/theme";

export default function DuelBar({ label, scoreA, scoreB, detailA, detailB }) {
  const hasA = typeof scoreA === "number";
  const hasB = typeof scoreB === "number";
  const hasBoth = hasA && hasB;

  if (!hasBoth) {
    return (
      <div className="py-3">
        <div
          className="text-xs sm:text-sm font-semibold uppercase tracking-wide text-center mb-1.5 px-1"
          style={{ color: COLORS.ink, fontFamily: "'Space Grotesk', sans-serif" }}
        >
          {label}
        </div>
        <div className="flex flex-col gap-0.5 mb-1.5 px-1 text-xs sm:text-sm">
          <span className="font-medium break-words" style={{ color: COLORS.a, fontFamily: "'IBM Plex Mono', monospace" }}>
            {hasA ? detailA : "No aplica"}
          </span>
          <span className="font-medium break-words" style={{ color: COLORS.b, fontFamily: "'IBM Plex Mono', monospace" }}>
            {hasB ? detailB : "No aplica"}
          </span>
        </div>
        <div className="relative h-6 sm:h-7 rounded-sm overflow-hidden flex items-center justify-center" style={{ backgroundColor: "#E2E5EB" }}>
          <span className="text-[11px]" style={{ color: COLORS.muted, fontFamily: "'Inter', sans-serif" }}>
            Sin datos de comparación
          </span>
        </div>
      </div>
    );
  }

  const aWins = scoreA > scoreB;
  const bWins = scoreB > scoreA;

  return (
    <div className="py-3">
      <div
        className="text-xs sm:text-sm font-semibold uppercase tracking-wide text-center mb-1.5 px-1"
        style={{ color: COLORS.ink, fontFamily: "'Space Grotesk', sans-serif" }}
      >
        {label}
      </div>
      <div className="flex flex-col gap-0.5 mb-1.5 px-1 text-xs sm:text-sm">
        <span className="font-medium break-words" style={{ color: COLORS.a, fontFamily: "'IBM Plex Mono', monospace" }}>
          {detailA}
        </span>
        <span className="font-medium break-words" style={{ color: COLORS.b, fontFamily: "'IBM Plex Mono', monospace" }}>
          {detailB}
        </span>
      </div>
      <div className="relative h-6 sm:h-7 rounded-sm overflow-hidden flex" style={{ backgroundColor: "#E2E5EB" }}>
        <div className="flex-1 flex justify-end">
          <div
            className="h-full flex items-center justify-end pr-2 transition-all duration-500 ease-out"
            style={{ width: `${scoreA}%`, backgroundColor: aWins ? COLORS.a : COLORS.aSoft }}
          >
            <span className="text-[11px] font-bold" style={{ color: aWins ? "#fff" : COLORS.a, fontFamily: "'IBM Plex Mono', monospace", opacity: scoreA > 14 ? 1 : 0 }}>
              {scoreA}
            </span>
          </div>
        </div>
        <div className="w-[2px] shrink-0" style={{ backgroundColor: COLORS.ink }} />
        <div className="flex-1 flex justify-start">
          <div
            className="h-full flex items-center justify-start pl-2 transition-all duration-500 ease-out"
            style={{ width: `${scoreB}%`, backgroundColor: bWins ? COLORS.b : COLORS.bSoft }}
          >
            <span className="text-[11px] font-bold" style={{ color: bWins ? "#fff" : COLORS.b, fontFamily: "'IBM Plex Mono', monospace", opacity: scoreB > 14 ? 1 : 0 }}>
              {scoreB}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
