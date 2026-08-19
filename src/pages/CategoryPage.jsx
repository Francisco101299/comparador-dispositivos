// ============================================================================
// src/pages/CategoryPage.jsx
// Catálogo de /celulares, /computadoras, /tablets o /relojes, con opción
// de ordenar por puntuación, precio o año.
// ============================================================================
import { useState, useMemo } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import { COLORS, FONT_IMPORT } from "../data/theme";
import { DEVICES, overallOf } from "../data/devices";
import { categoryMeta, breadcrumbJsonLd } from "../lib/seo";
import SeoHead from "../components/SeoHead";
import CategoryNav from "../components/CategoryNav";
import DeviceIcon from "../components/DeviceIcon";
import Logo from "../components/Logo";

const VALID_TYPES = {
  celulares: { types: ["Celular"], label: "Celulares" },
  computadoras: { types: ["Desktop", "Laptop"], label: "Computadoras" },
  tablets: { types: ["Tablet"], label: "Tablets" },
  relojes: { types: ["Smartwatch"], label: "Relojes" },
  drones: { types: ["Dron"], label: "Drones" },
  taladros: { types: ["Taladro"], label: "Taladros" },
  amoladoras: { types: ["Amoladora"], label: "Amoladoras" },
  atornilladores: { types: ["Atornillador"], label: "Atornilladores" },
  rotomartillos: { types: ["Rotomartillo"], label: "Rotomartillos" },
  herramientas: { types: ["Taladro", "Amoladora", "Atornillador", "Rotomartillo"], label: "Herramientas" },
  
};

const SORT_OPTIONS = [
  { key: "score", label: "Puntuación" },
  { key: "priceLow", label: "Precio: menor a mayor" },
  { key: "priceHigh", label: "Precio: mayor a menor" },
  { key: "yearNew", label: "Año: más reciente" },
];

function parsePriceNumber(priceStr) {
  if (!priceStr || typeof priceStr !== "string") return null;
  const n = parseFloat(priceStr.replace(/[^0-9.]/g, ""));
  return isNaN(n) ? null : n;
}

export default function CategoryPage() {
  const { slugType } = useParams();
  const [sortBy, setSortBy] = useState("score");
  const config = VALID_TYPES[slugType];
  if (!config) {
    return <Navigate to="/404" replace />;
  }

  const devices = DEVICES.filter((d) => config.types.includes(d.type));
  const label = config.label;
  const meta = categoryMeta(slugType, devices.length);
  const jsonLd = breadcrumbJsonLd([
    { name: "Inicio", path: "/" },
    { name: label, path: `/${slugType}` },
  ]);

  const sorted = useMemo(() => {
    const list = [...devices];
    if (sortBy === "priceLow" || sortBy === "priceHigh") {
      list.sort((a, b) => {
        const pa = parsePriceNumber(a.price);
        const pb = parsePriceNumber(b.price);
        if (pa === null) return 1;
        if (pb === null) return -1;
        return sortBy === "priceLow" ? pa - pb : pb - pa;
      });
    } else if (sortBy === "yearNew") {
      list.sort((a, b) => (b.year || 0) - (a.year || 0));
    } else {
      list.sort((a, b) => overallOf(b) - overallOf(a));
    }
    return list;
  }, [devices, sortBy]);

  return (
    <div className="min-h-screen w-full" style={{ backgroundColor: COLORS.bg }}>
      <SeoHead title={meta.title} description={meta.description} canonical={meta.canonical} jsonLd={jsonLd} />
      

      <div className="relative z-20 px-5 sm:px-10 pt-10 pb-8 sm:pb-10" style={{ backgroundColor: COLORS.panelDark }}>
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex justify-center mb-3">
            <Logo size={28} />
          </div>
          <nav className="text-[11px] mb-3" style={{ color: "#9BA1AD" }} aria-label="Ruta de navegación">
            <Link to="/" className="underline">Inicio</Link> · {label}
          </nav>
          <CategoryNav />
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

        <div className="flex items-center justify-center gap-2 flex-wrap mb-5">
          <span className="text-xs uppercase tracking-widest" style={{ color: COLORS.muted, fontFamily: "'Space Grotesk', sans-serif" }}>
            Ordenar por:
          </span>
          {SORT_OPTIONS.map((opt) => (
            <button
              key={opt.key}
              type="button"
              onClick={() => setSortBy(opt.key)}
              className="text-xs px-3 py-1.5 rounded-full font-medium transition-colors"
              style={{
                backgroundColor: sortBy === opt.key ? COLORS.ink : "#fff",
                color: sortBy === opt.key ? "#fff" : COLORS.ink,
                border: `1px solid ${sortBy === opt.key ? COLORS.ink : COLORS.line}`,
                fontFamily: "'Inter', sans-serif",
              }}
            >
              {opt.label}
            </button>
          ))}
        </div>

        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {sorted.map((d) => (
            <li key={d.id}>
              <Link
                to={`/${d.slugType}/${d.slug}`}
                className="flex items-center justify-between gap-3 rounded-md px-4 py-3 text-sm hover:bg-[#F3F4F7] transition-colors"
                style={{ backgroundColor: "#fff", border: `1px solid ${COLORS.line}`, fontFamily: "'Inter', sans-serif" }}
              >
                <span className="flex items-center gap-3 min-w-0">
                  <DeviceIcon device={d} size={36} />
                  <span style={{ color: COLORS.ink }} className="truncate">{d.name}</span>
                </span>
                <span className="text-xs shrink-0" style={{ color: COLORS.muted }}>{d.year} · {d.price}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
