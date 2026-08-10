// ============================================================================
// src/components/ScoreDial.jsx
// ============================================================================
import { COLORS } from "../data/theme";

export default function ScoreDial({ value, color, label }) {
  return (
    <div className="flex flex-col items-center">
      <div className="text-5xl sm:text-6xl font-bold tabular-nums" style={{ fontFamily: "'IBM Plex Mono', monospace", color }}>
        {value}
      </div>
      <div className="text-xs uppercase tracking-widest mt-1" style={{ color: COLORS.muted }}>
        {label}
      </div>
    </div>
  );
}
