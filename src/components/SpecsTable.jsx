// ============================================================================
// src/components/SpecsTable.jsx
// Ficha técnica lado a lado (estilo versus). Usa los datos que YA existen en
// `details` de cada dispositivo — no requiere datos nuevos.
// ============================================================================
import { COLORS } from "../data/theme";

export default function SpecsTable({ devA, devB, priceA, priceB }) {
  const rows = [
    { label: "Año", a: String(devA.year), b: String(devB.year) },
    { label: "Precio", a: priceA || devA.price, b: priceB || devB.price },
    { label: "Chip / Procesador", a: devA.details?.rendimiento, b: devB.details?.rendimiento },
    { label: "Pantalla", a: devA.details?.pantalla, b: devB.details?.pantalla },
    { label: "Batería", a: devA.details?.bateria, b: devB.details?.bateria },
    { label: "Cámara", a: devA.details?.camara, b: devB.details?.camara },
    { label: "Peso / Portabilidad", a: devA.details?.portabilidad, b: devB.details?.portabilidad },
    { label: "Memoria", a: devA.details?.memoria, b: devB.details?.memoria },
    { label: "Carga / Energía", a: devA.details?.energia, b: devB.details?.energia },
  ].filter((r) => r.a || r.b);

  return (
    <div className="rounded-lg p-4 sm:p-6 mt-6" style={{ backgroundColor: "#fff", border: `1px solid ${COLORS.line}` }}>
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
              <span className="font-medium break-words" style={{ color: COLORS.a, fontFamily: "'IBM Plex Mono', monospace" }}>
                {r.a || "—"}
              </span>
              <span className="font-medium break-words text-right" style={{ color: COLORS.b, fontFamily: "'IBM Plex Mono', monospace" }}>
                {r.b || "—"}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
     }
