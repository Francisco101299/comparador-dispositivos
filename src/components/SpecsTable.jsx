// ============================================================================
// src/components/SpecsTable.jsx
// Ficha técnica por sectores (estilo versus) para TODOS los dispositivos.
// Las características nuevas (red, núcleos, resistencia, audio) se deducen
// automáticamente del chip/gama cuando el dato exacto no existe.
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

const chipOf = (d) => (d.details && d.details.rendimiento) || "";

function priceNumber(p) {
  if (!p || typeof p !== "string") return 0;
  const n = parseInt(p.replace(/[^0-9]/g, ""), 10);
  return isNaN(n) ? 0 : n;
}

function screenType(p) {
  if (!p) return null;
  if (/AMOLED|POLED/i.test(p)) return "AMOLED";
  if (/OLED|Retina XDR/i.test(p)) return "OLED";
  if (/LCD|Retina/i.test(p)) return "LCD";
  return null;
}

function getRed(dev) {
  if (dev.specs && dev.specs.red) return dev.specs.red;
  if (dev.type !== "Celular") return null;
  const chip = chipOf(dev);
  if (/Dimensity/.test(chip)) return "5G";
  if (/4G/.test(chip)) return "4G";
  if (/Helio|Unisoc|SC98|QM215/.test(chip)) return "4G";
  if (/Snapdragon (680|685|662|665|670|730)/.test(chip)) return "4G";
  if (/Chip A/.test(chip)) {
    const m = chip.match(/A(\d+)/);
    return m && parseInt(m[1], 10) >= 14 ? "5G" : "4G";
  }
  return (dev.year || 0) >= 2019 ? "5G" : "4G";
}

function getNucleos(dev) {
  if (dev.specs && dev.specs.nucleos) return dev.specs.nucleos;
  const chip = chipOf(dev);
  if (!chip) return null;
  if (/Chip A/.test(chip)) return "6 núcleos";
  if (/Chip M/.test(chip)) return "8 núcleos o más";
  if (/SC9832|QM215/.test(chip)) return "4 núcleos";
  return "8 núcleos (octa-core)";
}

function getResistencia(dev) {
  if (dev.specs && dev.specs.resistencia) return dev.specs.resistencia;
  const txt = `${(dev.details && dev.details.portabilidad) || ""} ${(dev.details && dev.details.pantalla) || ""}`;
  const m = txt.match(/IP\d{2}/);
  if (m) return m[0];
  if (/MIL-STD/i.test(txt)) return "MIL-STD-810";
  if (dev.type !== "Celular") return null;
  const p = priceNumber(dev.price);
  if (p >= 800) return "IP68 (típico de gama alta)";
  if (p >= 400) return "IP54–IP67 (típico de gama media)";
  return "Sin certificación (típico de gama baja)";
}

function getAudio(dev) {
  if (dev.specs && dev.specs.audio) return dev.specs.audio;
  if (dev.type === "Celular") return priceNumber(dev.price) >= 250 ? "Altavoces estéreo" : "Altavoz mono";
  return "Altavoces estéreo";
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
        { label: "Núcleos", a: getNucleos(devA), b: getNucleos(devB) },
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
        { label: "Red móvil", a: getRed(devA), b: getRed(devB) },
        { label: "Resistencia (agua / golpes)", a: getResistencia(devA), b: getResistencia(devB) },
        { label: "Tamaño", a: xA.tamano, b: xB.tamano },
        { label: "Audio", a: getAudio(devA), b: getAudio(devB) },
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

      <p className="text-[9px] text-center px-4 py-2" style={{ color: COLORS.muted, fontFamily: "'Inter', sans-serif" }}>
        * Cuando el fabricante no especifica el dato aquí, se muestra el valor típico de su gama.
      </p>
    </div>
  );
        }
