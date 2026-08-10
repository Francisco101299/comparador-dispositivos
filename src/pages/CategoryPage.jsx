// ============================================================================
// src/pages/CategoryPage.jsx
// Catálogo de /celulares o /computadoras.
// ============================================================================
import { Link, useParams, Navigate } from "react-router-dom";
import { COLORS, FONT_IMPORT } from "../data/theme";
import { DEVICES, overallOf } from "../data/devices";
import { categoryMeta, breadcrumbJsonLd } from "../lib/seo";
import SeoHead from "../components/SeoHead";

export default function CategoryPage() {
  const { slugType } = useParams();
  if (slugType !== "celulares" && slugType !== "computadoras") {
    return <Navigate to="/404" replace />;
  }

  const devices =
    slugType === "celulares"
      ? DEVICES.filter((d) => d.type === "Celular")
      : DEVICES.filter((d) => d.type === "Desktop" || d.type === "Laptop");

  const label = slugType === "celulares" ? "Celulares" : "Computadoras";
  const meta = categoryMeta(slugType, devices.length);
  const jsonLd = breadcrumbJsonLd([
    { name: "Inicio", path: "/" },
    { name: label, path: `/${slugType}` },
  ]);

  const sorted = [...devices].sort((a, b) => overallOf(b) - overallOf(a));

  return (
    <div className="min-h-screen w-full" style={{ backgroundColor: COLORS.bg }}>
      <SeoHead title={meta.title} description={meta.description} canonical={meta.canonical} jsonLd={jsonLd} />
      <style>{FONT_IMPORT}</style>

      <div className="relative overflow-hidden px-5 sm:px-10 pt-10 pb-8 sm:pb-10" style={{ backgroundColor: COLORS.panelDark }}>
        <div className="max-w-3xl mx-auto text-center">
          <nav className="text-[11px] mb-3" style={{ color: "#9BA1AD" }} aria-label="Ruta de navegación">
            <Link to="/" className="underline">Inicio</Link> · {label}
          </nav>
          <h1 className="text-3xl sm:text-5xl font-bold text-white leading-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            {label}
          </h1>
          <p className="mt-2 text-sm sm:text-base" style={{ color: "#9BA1AD", fontFamily: "'Inter', sans-serif" }}>
            {devices.length} modelos con ficha técnica completa. Toca cualquiera para ver su detalle o compararlo.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-5 sm:px-10 py-10">
        <h2 className="sr-only">Listado de {label.toLowerCase()}</h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {sorted.map((d) => (
            <li key={d.id}>
              <Link
                to={`/${d.slugType}/${d.slug}`}
                className="flex items-center justify-between gap-3 rounded-md px-4 py-3 text-sm hover:bg-[#F3F4F7] transition-colors"
                style={{ backgroundColor: "#fff", border: `1px solid ${COLORS.line}`, fontFamily: "'Inter', sans-serif" }}
              >
                <span style={{ color: COLORS.ink }}>{d.name}</span>
                <span className="text-xs shrink-0" style={{ color: COLORS.muted }}>{d.year} · {d.price}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
