// ============================================================================
// src/pages/BlogPage.jsx
// Listado de todos los artículos del blog en /blog.
// ============================================================================
import { Link } from "react-router-dom";
import { COLORS, FONT_IMPORT } from "../data/theme";
import { ARTICLES } from "../data/articles";
import SeoHead from "../components/SeoHead";

export default function BlogPage() {
  const sorted = [...ARTICLES].sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div className="min-h-screen w-full" style={{ backgroundColor: COLORS.bg }}>
      <SeoHead
        title="Blog: guías y comparativas"
        description="Artículos y guías para elegir celulares, computadoras y tablets: comparativas de gama media, consejos de compra y más."
        canonical={typeof window !== "undefined" ? window.location.origin + "/blog" : "/blog"}
      />
      <style>{FONT_IMPORT}</style>

      <div className="relative overflow-hidden px-5 sm:px-10 pt-10 pb-8 sm:pb-10" style={{ backgroundColor: COLORS.panelDark }}>
        <div className="max-w-3xl mx-auto text-center">
          <nav className="text-[11px] mb-3" style={{ color: "#9BA1AD" }} aria-label="Ruta de navegación">
            <Link to="/" className="underline">Inicio</Link> · Blog
          </nav>
          <h1 className="text-3xl sm:text-5xl font-bold text-white leading-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Blog
          </h1>
          <p className="mt-2 text-sm sm:text-base" style={{ color: "#9BA1AD", fontFamily: "'Inter', sans-serif" }}>
            Guías y comparativas para elegir mejor.
          </p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-5 sm:px-10 py-10">
        <h2 className="sr-only">Listado de artículos</h2>
        <div className="flex flex-col gap-4">
          {sorted.map((a) => (
            <Link
              key={a.id}
              to={`/blog/${a.id}`}
              className="block rounded-lg p-5 hover:bg-[#F3F4F7] transition-colors"
              style={{ backgroundColor: "#fff", border: `1px solid ${COLORS.line}` }}
            >
              <div className="text-xs mb-1.5" style={{ color: COLORS.muted, fontFamily: "'Inter', sans-serif" }}>
                {new Date(a.date + "T00:00:00").toLocaleDateString("es-MX", { year: "numeric", month: "long", day: "numeric" })}
              </div>
              <div className="font-semibold text-base mb-1.5" style={{ color: COLORS.ink, fontFamily: "'Space Grotesk', sans-serif" }}>
                {a.title}
              </div>
              <p className="text-sm leading-relaxed" style={{ color: COLORS.muted, fontFamily: "'Inter', sans-serif" }}>
                {a.excerpt}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
                                                                                          }
