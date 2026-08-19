// ============================================================================
// src/components/ToolSpecsTable.jsx
// Ficha técnica para HERRAMIENTAS. Muestra SOLO los datos reales de cada
// herramienta (sin valores inventados): cada categoría con su texto y su
// barra de puntuación comparativa.
// ============================================================================
import { COLORS } from "../data/theme";
import { TOOL_CATS } from "../data/devices";

function ScoreBar({ value, color }) {
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ backgroundColor: "#E2E5EB" }}>
        <div className="h-full rounded-full" style={{ width: `${value || 0}%`, backgroundColor: color }} />
      </div>
      <span className="text-[10px] font-bold shrink-0" style={{ color, fontFamily: "'IBM Plex Mono', monospace" }}>
        {typeof value === "number" ? value : "—"}
      </span>
    </div>
  );
}

export default function ToolSpecsTable({ devA, devB, priceA, priceB }) {
  const dA = devA.details || {};
  const dB = devB.details || {};
  const sA = devA.scores || {};
  const sB = devB.scores || {};

  return (
    <div className="rounded-lg mt-6 overflow-hidden" style={{ backgroundColor: "#fff", border: `1px solid ${COLORS.line}` }}>
      <div className="p-4 pb-3 text-center" style={{ backgroundColor: COLORS.panelDark }}>
        <div className="text-xs uppercase tracking-widest" style={{ color: "#fff", fontFamily: "'Space Grotesk', sans-serif" }}>
          Ficha técnica por sectores
        </div>
      </div>

      {TOOL_CATS.map((c) => {
        const a = dA[c.key];
        const b = dB[c.key];
        if (!a && !b) return null;
        return (
          <div key={c.key}>
            <div
              className="py-2 px-3 text-center text-xs sm:text-sm font-bold uppercase tracking-widest border-y"
              style={{ backgroundColor: "#F4F6F9", borderColor: COLORS.line, color: COLORS.ink, fontFamily: "'Space Grotesk', sans-serif" }}
            >
              {c.label}
            </div>
            <div className="py-2.5 border-b" style={{ borderColor: COLORS.line }}>
              <div className="grid grid-cols-2 gap-3 px-3 text-xs sm:text-sm">
                <span className="font-medium break-words text-center" style={{ color: COLORS.a, fontFamily: "'IBM Plex Mono', monospace" }}>
                  {a || "—"}
                </span>
                <span className="font-medium break-words text-center" style={{ color: COLORS.b, fontFamily: "'IBM Plex Mono', monospace" }}>
                  {b || "—"}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-3 px-3 mt-1.5">
                <ScoreBar value={sA[c.key]} color={COLORS.a} />
                <ScoreBar value={sB[c.key]} color={COLORS.b} />
              </div>
            </div>
          </div>
        );
      })}

      <div>
        <div
          className="py-2 px-3 text-center text-xs sm:text-sm font-bold uppercase tracking-widest border-y"
          style={{ backgroundColor: "#F4F6F9", borderColor: COLORS.line, color: COLORS.ink, fontFamily: "'Space Grotesk', sans-serif" }}
        >
          General
        </div>
        <div className="py-2.5 border-b" style={{ borderColor: COLORS.line }}>
          <div className="text-[10px] uppercase tracking-widest text-center mb-1.5" style={{ color: COLORS.muted, fontFamily: "'Space Grotesk', sans-serif" }}>
            Año · Precio
          </div>
          <div className="grid grid-cols-2 gap-3 px-3 text-xs sm:text-sm">
            <span className="font-medium break-words text-center" style={{ color: COLORS.a, fontFamily: "'IBM Plex Mono', monospace" }}>
              {devA.year} · {(priceA && priceA.text) || devA.price}
            </span>
            <span className="font-medium break-words text-center" style={{ color: COLORS.b, fontFamily: "'IBM Plex Mono', monospace" }}>
              {devB.year} · {(priceB && priceB.text) || devB.price}
            </span>
          </div>
          <div className="grid grid-cols-2 gap-3 px-3 mt-1.5">
            <ScoreBar value={sA.precioCalidad} color={COLORS.a} />
            <ScoreBar value={sB.precioCalidad} color={COLORS.b} />
          </div>
        </div>
      </div>

      <p className="text-[9px] text-center px-4 py-2" style={{ color: COLORS.muted, fontFamily: "'Inter', sans-serif" }}>
        Puntuaciones comparativas de 0 a 100 por categoría. Los textos son las especificaciones reales de cada herramienta.
      </p>
    </div>
  );
  }
