// ============================================================================
// src/components/WeightPicker.jsx
// Controles deslizantes para que el usuario indique qué tan importante es
// cada categoría para él. El resultado de la comparación se recalcula según
// estos pesos (1 = poco importante, 5 = muy importante).
// ============================================================================
import { CATS } from "../data/devices";
import { COLORS } from "../data/theme";

export const DEFAULT_WEIGHTS = CATS.reduce((acc, c) => {
  acc[c.key] = 3;
  return acc;
}, {});

export default function WeightPicker({ weights, onChange, onReset }) {
  const isCustom = CATS.some((c) => weights[c.key] !== 3);

  return (
    <div className="rounded-lg p-4 sm:p-5" style={{ backgroundColor: "#fff", border: `1px solid ${COLORS.line}` }}>
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs uppercase tracking-widest" style={{ color: COLORS.muted, fontFamily: "'Space Grotesk', sans-serif" }}>
          ¿Qué te importa más?
        </span>
        {isCustom && (
          <button
            type="button"
            onClick={onReset}
            className="text-xs underline"
            style={{ color: COLORS.muted, fontFamily: "'Inter', sans-serif" }}
          >
            Restablecer
          </button>
        )}
      </div>
      <div className="flex flex-col gap-4">
        {CATS.map((c) => (
          <div key={c.key}>
            <div className="flex items-center justify-between text-xs mb-1" style={{ fontFamily: "'Inter', sans-serif" }}>
              <span style={{ color: COLORS.ink }}>{c.label}</span>
              <span style={{ color: COLORS.muted }}>
                {weights[c.key] === 1 && "Poco importante"}
                {weights[c.key] === 2 && "Algo importante"}
                {weights[c.key] === 3 && "Normal"}
                {weights[c.key] === 4 && "Importante"}
                {weights[c.key] === 5 && "Muy importante"}
              </span>
            </div>
            <input
              type="range"
              min={1}
              max={5}
              step={1}
              value={weights[c.key]}
              onChange={(e) => onChange({ ...weights, [c.key]: Number(e.target.value) })}
              className="w-full"
              style={{ accentColor: COLORS.a }}
              aria-label={`Importancia de ${c.label}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
      }
