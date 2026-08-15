// ============================================================================
// src/components/DuelBar.jsx
// Duelo por categoría: cada dispositivo muestra su detalle COMPLETO con su
// propia barra de puntuación debajo. Rojo = dispositivo A, verde = B.
// ============================================================================
import { COLORS } from "../data/theme";

export default function DuelBar({ label, scoreA, scoreB, detailA, detailB }) {
  const hasA = typeof scoreA === "number";
  const hasB = typeof scoreB === "number";
  const hasBoth = hasA && hasB;

  const aWins = hasBoth && scoreA > scoreB;
  const bWins = hasBoth && scoreB > scoreA;

  return (
    <div className="py-3">
      <div
        className="text-xs sm:text-sm font-semibold uppercase tracking-wide text-center mb-2 px-1"
        style={{ color: COLORS.ink, fontFamily: "'Space Grotesk', sans-serif" }}
      >
        {label}
      </div>

      <div className="flex flex-col gap-2.5 px-1">
        <div>
          <div className="flex items-start justify-between gap-2 mb-1">
            <span className="font-medium break-words text-xs sm:text-sm" style={{ color: COLORS.a, fontFamily: "'IBM Plex Mono', monospace" }}>
              {hasA ? detailA : "No aplica"}
            </span>
            {hasA && (
              <span className="text-xs sm:text-sm font-bold shrink-0" style={{ color: aWins ? COLORS.a : COLORS.muted, fontFamily: "'IBM Plex Mono', monospace" }}>
                {scoreA}
              </span>
            )}
          </div>
          {hasA && (
            <div className="h-2.5 sm:h-3 rounded-full overflow-hidden" style={{ backgroundColor: "#E2E5EB" }}>
              <div
                className="h-full rounded-full transition-all duration-500 ease-out"
                style={{ width: `${scoreA}%`, backgroundColor: aWins ? COLORS.a : COLORS.aSoft }}
              />
            </div>
          )}
        </div>

        <div>
          <div className="flex items-start justify-between gap-2 mb-1">
            <span className="font-medium break-words text-xs sm:text-sm" style={{ color: COLORS.b, fontFamily: "'IBM Plex Mono', monospace" }}>
              {hasB ? detailB : "No aplica"}
            </span>
            {hasB && (
              <span className="text-xs sm:text-sm font-bold shrink-0" style={{ color: bWins ? COLORS.b : COLORS.muted, fontFamily: "'IBM Plex Mono', monospace" }}>
                {scoreB}
              </span>
            )}
          </div>
          {hasB && (
            <div className="h-2.5 sm:h-3 rounded-full overflow-hidden" style={{ backgroundColor: "#E2E5EB" }}>
              <div
                className="h-full rounded-full transition-all duration-500 ease-out"
                style={{ width: `${scoreB}%`, backgroundColor: bWins ? COLORS.b : COLORS.bSoft }}
              />
            </div>
          )}
        </div>

        {!hasBoth && (
          <div className="relative h-6 rounded-sm overflow-hidden flex items-center justify-center" style={{ backgroundColor: "#E2E5EB" }}>
            <span className="text-[11px]" style={{ color: COLORS.muted, fontFamily: "'Inter', sans-serif" }}>
              Sin datos de comparación
            </span>
          </div>
        )}
      </div>
    </div>
  );
            }
