// ============================================================================
// src/components/DuelBar.jsx
// ============================================================================
import { COLORS } from "../data/theme";

export default function DuelBar({ label, scoreA, scoreB, detailA, detailB }) {
  const aWins = scoreA > scoreB;
  const bWins = scoreB > scoreA;
  return (
    <div className="py-3">
      <div className="flex items-center justify-between text-xs sm:text-sm mb-1.5 px-1 gap-2">
        <span className="font-medium truncate max-w-[35%]" style={{ color: aWins ? COLORS.a : COLORS.muted, fontFamily: "'IBM Plex Mono', monospace" }}>
          {detailA}
        </span>
        <span className="font-semibold uppercase tracking-wide text-center shrink-0" style={{ color: COLORS.ink, fontFamily: "'Space Grotesk', sans-serif" }}>
          {label}
        </span>
        <span className="font-medium truncate max-w-[35%] text-right" style={{ color: bWins ? COLORS.b : COLORS.muted, fontFamily: "'IBM Plex Mono', monospace" }}>
          {detailB}
        </span>
      </div>
      <div className="relative h-6 sm:h-7 rounded-sm overflow-hidden flex" style={{ backgroundColor: "#E2E5EB" }}>
        <div className="flex-1 flex justify-end">
          <div className="h-full flex items-center justify-end pr-2 transition-all duration-500 ease-out" style={{ width: `${scoreA}%`, backgroundColor: aWins ? COLORS.a : COLORS.aSoft }}>
            <span className="text-[11px] font-bold" style={{ color: aWins ? "#fff" : COLORS.a, fontFamily: "'IBM Plex Mono', monospace", opacity: scoreA > 14 ? 1 : 0 }}>
              {scoreA}
            </span>
          </div>
        </div>
        <div className="w-[2px] shrink-0" style={{ backgroundColor: COLORS.ink }} />
        <div className="flex-1 flex justify-start">
          <div className="h-full flex items-center justify-start pl-2 transition-all duration-500 ease-out" style={{ width: `${scoreB}%`, backgroundColor: bWins ? COLORS.b : COLORS.bSoft }}>
            <span className="text-[11px] font-bold" style={{ color: bWins ? "#fff" : COLORS.b, fontFamily: "'IBM Plex Mono', monospace", opacity: scoreB > 14 ? 1 : 0 }}>
              {scoreB}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
          }
