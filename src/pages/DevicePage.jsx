// ============================================================================
// src/pages/DevicePage.jsx
// Ficha individual: foto, puntuación, especificaciones reales, botones de
// precios (Amazon / Mercado Libre / AliExpress) y duelos sugeridos.
// ============================================================================
import { Link, useParams, Navigate } from "react-router-dom";
import { COLORS } from "../data/theme";
import { DEVICES, getDeviceBySlug, overallOf } from "../data/devices";
import SeoHead from "../components/SeoHead";
import DeviceIcon from "../components/DeviceIcon";
import ScoreDial from "../components/ScoreDial";
import ShopButtons from "../components/ShopButtons";

const LABELS = {
  rendimiento: "Rendimiento",
  pantalla: "Pantalla",
  bateria: "Batería",
  camara: "Cámara",
  portabilidad: "Portabilidad",
  precioCalidad: "Precio-calidad",
  memoria: "Memoria y almacenamiento",
  energia: "Carga y energía",
  potencia: "Potencia",
  velocidad: "Velocidad y precisión",
  durabilidad: "Durabilidad",
  versatilidad: "Versatilidad",
  ergonomia: "Comodidad de uso",
};

const CATALOG_LABEL = {
  celulares: "Celulares",
  computadoras: "Computadoras",
  tablets: "Tablets",
  relojes: "Relojes",
  drones: "Drones",
  herramientas: "Herramientas",
  taladros: "Taladros",
  amoladoras: "Amoladoras",
  atornilladores: "Atornilladores",
  rotomartillos: "Rotomartillos",
  sierras: "Sierras",
  lijadoras: "Lijadoras",
  esmeriles: "Esmeriles",
  compresores: "Compresores",
  generadores: "Generadores",
  hidrolavadoras: "Hidrolavadoras",
  soldadoras: "Soldadoras",
};

function parsePrice(p) {
  const n = parseInt(String(p || "").replace(/[^0-9]/g, ""), 10);
  return isNaN(n) ? 0 : n;
}

export default function DevicePage() {
  const { slugType, slug } = useParams();
  const device = getDeviceBySlug(slugType, slug);
  if (!device) return <Navigate to="/404" replace />;

  const overall = overallOf(device);
  const price = parsePrice(device.price);
  const suggested = DEVICES.filter((d) => d.id !== device.id && d.type === device.type)
    .sort((a, b) => Math.abs(parsePrice(a.price) - price) - Math.abs(parsePrice(b.price) - price))
    .slice(0, 4);

  const title = `${device.name}: ficha técnica, precio y comparación`;
  const description = `Características de ${device.name} (${device.year}). Compara ${device.name} con otros dispositivos y mira su precio en Amazon, Mercado Libre y AliExpress.`;

  return (
    <div className="min-h-screen w-full" style={{ backgroundColor: COLORS.bg }}>
      <SeoHead title={title} description={description} canonical={`/${slugType}/${slug}`} />

      <div className="relative z-20 px-5 sm:px-10 pt-10 pb-8" style={{ backgroundColor: COLORS.panelDark }}>
        <div className="max-w-3xl mx-auto">
          <nav className="text-[11px] mb-4" style={{ color: "#9BA1AD" }} aria-label="Ruta de navegación">
            <Link to="/" className="underline">Inicio</Link> ·{" "}
            <Link to={`/${slugType}`} className="underline">{CATALOG_LABEL[slugType] || slugType}</Link> ·{" "}
            {device.name}
          </nav>
          <div className="flex items-center gap-4">
            <DeviceIcon device={device} size={72} />
            <div>
              <div className="text-xs uppercase tracking-widest mb-1" style={{ color: COLORS.gold, fontFamily: "'Space Grotesk', sans-serif" }}>
                {device.type} · {device.year}
              </div>
              <h1 className="text-2xl sm:text-4xl font-bold text-white leading-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                {device.name}
              </h1>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-5 sm:px-10 py-8">
        <div className="rounded-lg p-5 mb-6 flex flex-col sm:flex-row items-center gap-5" style={{ backgroundColor: "#fff", border: `1px solid ${COLORS.line}` }}>
          <ScoreDial value={overall} color={COLORS.a} label="Puntuación" />
          <div className="flex-1 text-center sm:text-left">
            <div className="text-lg font-bold" style={{ color: COLORS.ink, fontFamily: "'IBM Plex Mono', monospace" }}>
              {device.price}
            </div>
            <div className="text-[10px] uppercase tracking-widest mt-0.5" style={{ color: COLORS.muted, fontFamily: "'Space Grotesk', sans-serif" }}>
              Precio de referencia EE.UU.
            </div>
            <ShopButtons device={device} />
          </div>
        </div>

        <div className="rounded-lg p-5 mb-6" style={{ backgroundColor: "#fff", border: `1px solid ${COLORS.line}` }}>
          <div className="text-xs uppercase tracking-widest mb-3" style={{ color: COLORS.muted, fontFamily: "'Space Grotesk', sans-serif" }}>
            Especificaciones
          </div>
          {Object.entries(device.details || {}).map(([key, text]) => (
            <div key={key} className="py-2.5 border-b last:border-b-0" style={{ borderColor: COLORS.line }}>
              <div className="text-[10px] uppercase tracking-widest mb-1" style={{ color: COLORS.muted, fontFamily: "'Space Grotesk', sans-serif" }}>
                {LABELS[key] || key}
              </div>
              <div className="text-sm" style={{ color: COLORS.ink, fontFamily: "'Inter', sans-serif" }}>
                {text}
              </div>
            </div>
          ))}
        </div>

        {suggested.length > 0 && (
          <div className="rounded-lg p-5" style={{ backgroundColor: "#fff", border: `1px solid ${COLORS.line}` }}>
            <div className="text-xs uppercase tracking-widest mb-3" style={{ color: COLORS.muted, fontFamily: "'Space Grotesk', sans-serif" }}>
              🥊 Compáralo con su rival más cercano
            </div>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {suggested.map((d) => (
                <li key={d.id}>
                  <Link
                    to={`/comparar/${device.slug}-vs-${d.slug}`}
                    className="flex items-center justify-between gap-2 rounded-md px-3 py-2.5 text-sm hover:bg-[#F3F4F7] transition-colors"
                    style={{ border: `1px solid ${COLORS.line}`, fontFamily: "'Inter', sans-serif", color: COLORS.ink }}
                  >
                    <span className="truncate">vs {d.name}</span>
                    <span className="text-xs shrink-0" style={{ color: COLORS.muted }}>{d.price}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
  }
