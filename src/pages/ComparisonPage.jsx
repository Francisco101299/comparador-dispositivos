// ============================================================================
// src/pages/ComparisonPage.jsx
// Resultado de un duelo con URL propia /comparar/:slugA-vs-:slugB.
// ============================================================================
import { Link, useParams } from "react-router-dom";
import { COLORS, FONT_IMPORT } from "../data/theme";
import { getDeviceBySlugAny } from "../data/devices";
import { comparisonMeta, comparisonJsonLd, breadcrumbJsonLd } from "../lib/seo";
import SeoHead from "../components/SeoHead";
import DuelResult from "../components/DuelResult";
import Comments from "../components/Comments";
import Logo from "../components/Logo";

export default function ComparisonPage() {
  const { pair } = useParams();
  const parts = (pair || "").split("-vs-");

  if (parts.length !== 2) {
    return <NotFoundNotice />;
  }

  const [slugA, slugB] = parts;
  const devA = getDeviceBySlugAny(slugA);
  const devB = getDeviceBySlugAny(slugB);

  if (!devA || !devB || devA.id === devB.id) {
    return <NotFoundNotice />;
  }

  const meta = comparisonMeta(devA, devB);
  const jsonLd = [
    comparisonJsonLd(devA, devB),
    breadcrumbJsonLd([
      { name: "Inicio", path: "/" },
      { name: devA.name, path: `/${devA.slugType}/${devA.slug}` },
      { name: `${devA.name} vs ${devB.name}`, path: meta.path },
    ]),
  ];

  return (
    <div className="min-h-screen w-full" style={{ backgroundColor: COLORS.bg }}>
      <SeoHead title={meta.title} description={meta.description} canonical={meta.canonical} ogType="website" jsonLd={jsonLd} />
      

      <div className="relative overflow-hidden px-5 sm:px-10 pt-10 pb-8 sm:pb-10" style={{ backgroundColor: COLORS.panelDark }}>
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex justify-center mb-3">
            <Logo size={28} />
          </div>
          <nav className="text-[11px] mb-3" style={{ color: "#9BA1AD" }} aria-label="Ruta de navegación">
            <Link to="/" className="underline">Inicio</Link> / Comparación
          </nav>
          <h1 className="text-2xl sm:text-4xl font-bold text-white leading-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            {devA.name} vs {devB.name}
          </h1>
          <p className="mt-2 text-sm sm:text-base" style={{ color: "#9BA1AD", fontFamily: "'Inter', sans-serif" }}>
            Comparación categoría por categoría: rendimiento, pantalla, batería, cámara, portabilidad y precio-calidad.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-5 sm:px-10 py-10">
        <DuelResult devA={devA} devB={devB} resetTo="/" />
        <Comments />
      </div>
    </div>
  );
}

function NotFoundNotice() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center" style={{ backgroundColor: COLORS.bg }}>
      <SeoHead
        title="Comparación no encontrada"
        description="No encontramos esa comparación de dispositivos. Vuelve al inicio para elegir dos dispositivos válidos."
        canonical={typeof window !== "undefined" ? window.location.href : "/"}
      />
      <div className="text-center px-5" style={{ fontFamily: "'Inter', sans-serif" }}>
        <p className="mb-4" style={{ color: COLORS.muted }}>
          No encontramos esa comparación. Elige dos dispositivos desde el inicio.
        </p>
        <Link to="/" className="underline" style={{ color: COLORS.ink }}>
          Volver al comparador
        </Link>
      </div>
    </div>
  );
}
