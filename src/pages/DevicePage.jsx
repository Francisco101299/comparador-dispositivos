// ============================================================================
// src/pages/DevicePage.jsx
// Ficha técnica individual de un dispositivo en /celulares/:slug o
// /computadoras/:slug. Contenido único indexable con Schema.org Product.
// ============================================================================
import { Link, useParams, Navigate } from "react-router-dom";
import { COLORS, FONT_IMPORT } from "../data/theme";
import { CATS, overallOf, getDeviceBySlug, getDevicesByType } from "../data/devices";
import { deviceMeta, deviceProductJsonLd, breadcrumbJsonLd, comparisonSlug } from "../lib/seo";
import SeoHead from "../components/SeoHead";
import ScoreDial from "../components/ScoreDial";
import DeviceIcon from "../components/DeviceIcon";
import Logo from "../components/Logo";

const CATEGORY_LABEL = { celulares: "Celulares", computadoras: "Computadoras", tablets: "Tablets", relojes: "Relojes" };

// Extrae el número de un precio tipo "$999" o "$1,199" para poder ordenar
// dispositivos por cercanía de precio (rivales de rango similar).
function parsePriceNumber(priceStr) {
  if (!priceStr || typeof priceStr !== "string") return null;
  const n = parseFloat(priceStr.replace(/[^0-9.]/g, ""));
  return isNaN(n) ? null : n;
}

export default function DevicePage() {
  const { slugType, slug } = useParams();
  const device = getDeviceBySlug(slugType, slug);

  if (!device) {
    return <Navigate to="/404" replace />;
  }

  const meta = deviceMeta(device);
  const overall = overallOf(device);
  const jsonLd = [
    deviceProductJsonLd(device),
    breadcrumbJsonLd([
      { name: "Inicio", path: "/" },
      { name: CATEGORY_LABEL[device.slugType], path: `/${device.slugType}` },
      { name: device.name, path: meta.path },
    ]),
  ];

  const currentPrice = parsePriceNumber(device.price);
  const others = getDevicesByType(device.type)
    .filter((d) => d.id !== device.id)
    .sort((a, b) => {
      // Si tenemos precio de referencia, prioriza rivales de precio similar
      // (comparaciones que la gente realmente busca en Google).
      if (currentPrice !== null) {
        const priceA = parsePriceNumber(a.price);
        const priceB = parsePriceNumber(b.price);
        const diffA = priceA !== null ? Math.abs(priceA - currentPrice) : Infinity;
        const diffB = priceB !== null ? Math.abs(priceB - currentPrice) : Infinity;
        return diffA - diffB;
      }
      return 0;
    })
    .slice(0, 6);
  return (
    <div className="min-h-screen w-full" style={{ backgroundColor: COLORS.bg }}>
      <SeoHead title={meta.title} description={meta.description} canonical={meta.canonical} ogType={meta.ogType} jsonLd={jsonLd} />
      

      <div className="relative overflow-hidden px-5 sm:px-10 pt-10 pb-8 sm:pb-10" style={{ backgroundColor: COLORS.panelDark }}>
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex justify-center mb-3">
            <Logo size={28} />
          </div>
          <nav className="text-[11px] mb-3" style={{ color: "#9BA1AD" }} aria-label="Ruta de navegación">
            <Link to="/" className="underline">Inicio</Link> ·{" "}
            <Link to={`/${device.slugType}`} className="underline">{CATEGORY_LABEL[device.slugType]}</Link> · {device.name}
          </nav>
          <div className="flex justify-center mb-3">
            <DeviceIcon device={device} size={64} color="#F0553B" bg="#1D2129" />
          </div>
          <div className="inline-flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase mb-3 px-3 py-1 rounded-full" style={{ color: "#B9BEC9", border: "1px solid #2A2F3A" }}>
            {device.type} · {device.year}
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold text-white leading-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            {device.name}
          </h1>
          <p className="mt-2 text-sm sm:text-base" style={{ color: "#9BA1AD", fontFamily: "'Inter', sans-serif" }}>
            Ficha técnica completa, puntuación por categoría y precio de referencia {device.price}.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-5 sm:px-10 -mt-6">
        <div className="rounded-lg shadow-lg p-6 text-center" style={{ backgroundColor: "#fff", border: `1px solid ${COLORS.line}` }}>
          <ScoreDial value={overall} color={COLORS.a} label="Puntuación general" />
          <div className="text-sm mt-2" style={{ color: COLORS.muted, fontFamily: "'Inter', sans-serif" }}>
            {device.year} · {device.price}
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-5 sm:px-10 py-10">
        <h2 className="text-lg font-semibold mb-4" style={{ color: COLORS.ink, fontFamily: "'Space Grotesk', sans-serif" }}>
          Especificaciones por categoría
        </h2>
        <div className="rounded-lg divide-y" style={{ backgroundColor: "#fff", border: `1px solid ${COLORS.line}` }}>
          {CATS.map((c) => (
            <div key={c.key} className="p-4 flex items-center justify-between gap-4">
              <div>
                <div className="text-sm font-medium" style={{ color: COLORS.ink, fontFamily: "'Inter', sans-serif" }}>{c.label}</div>
                <div className="text-xs mt-0.5" style={{ color: COLORS.muted, fontFamily: "'Inter', sans-serif" }}>{device.details[c.key]}</div>
              </div>
              <div className="text-xl font-bold tabular-nums shrink-0" style={{ fontFamily: "'IBM Plex Mono', monospace", color: COLORS.a }}>
                {device.scores[c.key]}
              </div>
            </div>
          ))}
        </div>

        <h2 className="text-lg font-semibold mt-10 mb-4" style={{ color: COLORS.ink, fontFamily: "'Space Grotesk', sans-serif" }}>
          Compara {device.name} con otro {device.type.toLowerCase()}
        </h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {others.map((o) => (
            <li key={o.id}>
              <Link
                to={`/comparar/${comparisonSlug(device, o)}`}
                className="block rounded-md px-4 py-3 text-sm hover:bg-[#F3F4F7] transition-colors"
                style={{ backgroundColor: "#fff", border: `1px solid ${COLORS.line}`, color: COLORS.ink, fontFamily: "'Inter', sans-serif" }}
              >
                {device.name} vs {o.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
          }
