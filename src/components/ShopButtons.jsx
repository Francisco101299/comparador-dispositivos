// ============================================================================
// src/components/ShopButtons.jsx
// Botones "Ver precios" (Amazon, Mercado Libre, AliExpress) listos para
// afiliados: cuando tengas tu tag de Amazon Asociados, pégalo en
// AFFILIATE.amazon y TODOS los links empezarán a generar comisión.
// ============================================================================
import { COLORS } from "../data/theme";

const AFFILIATE = {
  amazon: "", // ← pega aquí tu tag, ej: "comparadordis-20"
};

export default function ShopButtons({ device }) {
  if (!device) return null;
  const q = encodeURIComponent(device.name.trim());
  const links = [
    {
      label: "Amazon",
      url: AFFILIATE.amazon
        ? `https://www.amazon.com/s?k=${q}&tag=${AFFILIATE.amazon}`
        : `https://www.amazon.com/s?k=${q}`,
    },
    {
      label: "Mercado Libre",
      url: `https://listado.mercadolibre.com/${device.name.trim().replace(/\s+/g, "-")}`,
    },
    {
      label: "AliExpress",
      url: `https://www.aliexpress.com/wholesale?SearchText=${q}`,
    },
  ];

  return (
    <div className="mt-3">
      <div
        className="text-[9px] uppercase tracking-widest text-center mb-1.5"
        style={{ color: COLORS.muted, fontFamily: "'Space Grotesk', sans-serif" }}
      >
        Ver precios
      </div>
      <div className="flex flex-wrap justify-center gap-1.5">
        {links.map((l) => (
          <a
            key={l.label}
            href={l.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] font-semibold px-2.5 py-1.5 rounded-full transition-colors"
            style={{
              backgroundColor: "#F0F2F5",
              color: COLORS.ink,
              fontFamily: "'Inter', sans-serif",
              border: `1px solid ${COLORS.line}`,
            }}
          >
            🛒 {l.label}
          </a>
        ))}
      </div>
    </div>
  );
        }
