// ============================================================================
// src/components/SpecsTable.jsx
// Ficha técnica lado a lado (estilo versus). Extrae correctamente los
// precios del sistema de pricing.js (objetos {text, label, isEstimate}).
// ============================================================================
import { COLORS } from "../data/theme";

export default function SpecsTable({ devA, devB, priceA, priceB }) {
  // Helper: extraer texto y etiqueta del precio (soporta objeto o string)
  const getPriceInfo = (priceObj, fallback) => {
    if (!priceObj) return { text: fallback, label: "", isEstimate: false };
    if (typeof priceObj === "string") return { text: priceObj, label: "", isEstimate: false };
    return {
      text: priceObj.text || fallback || "—",
      label: priceObj.label || "",
      isEstimate: priceObj.isEstimate || false,
    };
  };

  const infoA = getPriceInfo(priceA, devA.price);
  const infoB = getPriceInfo(priceB, devB.price);

  const rows = [
    { label: "Año", a: String(devA.year), b: String(devB.year) },
    {
      label: "Precio",
      a: infoA.text,
      aLabel: infoA.label,
      aEstimate: infoA.isEstimate,
      b: infoB.text,
      bLabel: infoB.label,
      bEstimate: infoB.isEstimate,
      isPrice: true,
    },
    { label: "Chip / Procesador", a: devA.details?.rendimiento, b: devB.details?.rendimiento },
    { label: "Pantalla", a: devA.details?.pantalla, b: devB.details?.pantalla },
    { label: "Batería", a: devA.details?.bateria, b: devB.details?.bateria },
    { label: "Cámara", a: devA.details?.camara, b: devB.details?.camara },
    { label: "Peso / Portabilidad", a: devA.details?.portabilidad, b: devB.details?.portabilidad },
    { label: "Memoria", a: devA.details?.memoria, b: devB.details?.memoria },
    { label: "Carga / Energía", a: devA.details?.energia, b: devB.details?.energia },
  ].filter((r) => (r.a || r.b) && (r.isPrice || true));

  return (
    <div className="rounded-lg p-4 sm:p-6 mt-6 mb-6" style={{ backgroundColor: "#fff", border: `1px solid ${COLORS.line}` }}>
      <div className="text-xs uppercase tracking-widest mb-3 text-center" style={{ color: COLORS.muted, fontFamily: "'Space Grotesk', sans-serif" }}>
        Ficha técnica
      </div>
      <div className="flex flex-col">
        {rows.map((r) => (
          <div key={r.label} className="py-2.5 border-b last:border-b-0" style={{ borderColor: COLORS.line }}>
            <div className="text-[10px] uppercase tracking-widest text-center mb-1" style={{ color: COLORS.muted, fontFamily: "'Space Grotesk', sans-serif" }}>
              {r.label}
            </div>
            <div className="grid grid-cols-2 gap-3 text-xs sm:text-sm px-1">
              <div>
                <span className="font-medium break-words block" style={{ color: COLORS.a, fontFamily: "'IBM Plex Mono', monospace" }}>
                  {r.a || "—"}
                </span>
                {r.isPrice && r.aLabel && (
                  <span className="text-[9px] uppercase tracking-widest mt-0.5 block" style={{ color: r.aEstimate ? COLORS.muted : COLORS.a, fontFamily: "'Space Grotesk', sans-serif" }}>
                    {r.aLabel}
                  </span>
                )}
              </div>
              <div className="text-right">
                <span className="font-medium break-words block" style={{ color: COLORS.b, fontFamily: "'IBM Plex Mono', monospace" }}>
                  {r.b || "—"}
                </span>
                {r.isPrice && r.bLabel && (
                  <span className="text-[9px] uppercase tracking-widest mt-0.5 block" style={{ color: r.bEstimate ? COLORS.muted : COLORS.b, fontFamily: "'Space Grotesk', sans-serif" }}>
                    {r.bLabel}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
     }
