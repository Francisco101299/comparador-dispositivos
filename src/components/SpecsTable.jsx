// ============================================================================
// src/components/SpecsTable.jsx
// Ficha técnica comparada POR SECTORES (estilo versus.com): encabezados,
// filas lado a lado, puntuación del sector y sección "Conectividad y diseño"
// (red, núcleos, tipo de pantalla, resistencia, tamaño y audio).
// El tipo de pantalla y la certificación IP se detectan solos del texto.
// ============================================================================
import { COLORS } from "../data/theme";

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

function screenType(p) {
  if (!p) return null;
  if (/AMOLED|POLED/i.test(p)) return "AMOLED";
  if (/OLED/i.test(p)) return "OLED";
  if (/LCD/i.test(p)) return "LCD";
  return null;
}

function resistance(dev) {
  if (dev.specs && dev.specs.resistencia) return dev.specs.resistencia;
  const txt = `${(dev.details && dev.details.portabilidad) || ""} ${(dev.details && dev.details.pantalla) || ""}`;
  const m = txt.match(/IP\d{2}/);
  if (m) return m[0];
  if (/MIL-STD/i.test(txt)) return "MIL-STD-810";
  return null;
}

export default function SpecsTable({ devA, devB, priceA, priceB }) {
  const dA = devA.details || {};
  const dB = devB.details || {};
  const sA = devA.scores || {};
  const sB = devB.scores || {};
  const xA = devA.specs || {};
  const xB = devB.specs || {};

  const sections = [
    {
      title: "Rendimiento",
      scoreKey: "rendimiento",
      rows: [
        { label: "Chip / Procesador", a: dA.rendimiento, b: dB.rendimiento },
        { label: "Núcleos", a: xA.nucleos, b: xB.nucleos },
      ],
    },
    {
      title: "Pantalla",
      scoreKey: "pantalla",
      rows: [
        { label: "Pantalla", a: dA.pantalla, b: dB.pantalla },
        { label: "Tipo de pantalla", a: screenType(dA.pantalla), b: screenType(dB.pantalla) },
      ],
    },
    {
      title: "Batería",
      scoreKey: "bateria",
      rows: [
        { label: "Batería", a: dA.bateria, b: dB.bateria },
        { label: "Carga / Energía", a: dA.energia, b: dB.energia },
      ],
    },
    {
      title: "Cámara",
      scoreKey: "camara",
      rows: [{ label: "Cámara", a: dA.camara, b: dB.camara }],
    },
    {
      title: "Conectividad y diseño",
      rows: [
        { label: "Red móvil", a: xA.red, b: xB.red },
        { label: "Resistencia (agua / golpes)", a: resistance(devA), b: resistance(devB) },
        { label: "Tamaño", a: xA.tamano, b: xB.tamano },
        { label: "Audio", a: xA.audio, b: xB.audio },
      ],
    },
    {
      title: "Portabilidad",
      scoreKey: "portabilidad",
      rows: [{ label: "Peso / Diseño", a: dA.portabilidad, b: dB.portabilidad }],
    },
    {
      title: "Memoria y almacenamiento",
      scoreKey: "memoria",
      rows: [{ label: "RAM / Almacenamiento", a: dA.memoria, b: dB.memoria }],
    },
    {
      title: "General",
      scoreKey: "precioCalidad",
      rows: [
        { label: "Año", a: String(devA.year), b: String(devB.year) },
        { label: "Precio", a: (priceA && priceA.text) || devA.price, b: (priceB && priceB.text) || devB.price },
      ],
    },
  ];

  return (
    <div className="rounded-lg mt-6 overflow-hidden" style={{ backgroundColor: "#fff", border: `1px solid ${COLORS.line}` }}>
      <div className="p-4 pb-3 text-center" style={{ backgroundColor: COLORS.panelDark }}>
        <div className="text-xs uppercase tracking-widest" style={{ color: "#fff", fontFamily: "'Space Grotesk', sans-serif" }}>
          Ficha técnica por sectores
        </div>
      </div>

      {sections.map((sec) => (
        <div key={sec.title}>
          <div
            className="py-2 px-3 text-center text-xs sm:text-sm font-bold uppercase tracking-widest border-y"
            style={{ backgroundColor: "#F4F6F9", borderColor: COLORS.line, color: COLORS.ink, fontFamily: "'Space Grotesk', sans-serif" }}
          >
            {sec.title}
          </div>

          {sec.rows.map((r) =>
            (r.a || r.b) ? (
              <div key={r.label} className="py-2.5 border-b" style={{ borderColor: COLORS.line }}>
                <div className="text-[10px] uppercase tracking-widest text-center mb-1.5 px-2" style={{ color: COLORS.muted, fontFamily: "'Space Grotesk', sans-serif" }}>
                  {r.label}
                </div>
                <div className="grid grid-cols-2 gap-3 px-3 text-xs sm:text-sm">
                  <span className="font-medium break-words text-center" style={{ color: COLORS.a, fontFamily: "'IBM Plex Mono', monospace" }}>
                    {r.a || "—"}
                  </span>
                  <span className="font-medium break-words text-center" style={{ color: COLORS.b, fontFamily: "'IBM Plex Mono', monospace" }}>
                    {r.b || "—"}
                  </span>
                </div>
              </div>
            ) : null
          )}

          {sec.scoreKey && (typeof sA[sec.scoreKey] === "number" || typeof sB[sec.scoreKey] === "number") && (
            <div className="py-2.5 border-b" style={{ borderColor: COLORS.line }}>
              <div className="text-[10px] uppercase tracking-widest text-center mb-1.5" style={{ color: COLORS.muted, fontFamily: "'Space Grotesk', sans-serif" }}>
                Puntuación del sector
              </div>
              <div className="grid grid-cols-2 gap-3 px-3">
                <ScoreBar value={sA[sec.scoreKey]} color={COLORS.a} />
                <ScoreBar value={sB[sec.scoreKey]} color={COLORS.b} />
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
          }
