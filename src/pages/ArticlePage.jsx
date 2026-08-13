// ============================================================================
// src/pages/ArticlePage.jsx
// Página de un artículo individual en /blog/:id.
// ============================================================================
import { Link, useParams, Navigate } from "react-router-dom";
import { COLORS, FONT_IMPORT } from "../data/theme";
import { getArticleById } from "../data/articles";
import SeoHead from "../components/SeoHead";
import Logo from "../components/Logo";

export default function ArticlePage() {
  const { id } = useParams();
  const article = getArticleById(id);

  if (!article) {
    return <Navigate to="/404" replace />;
  }

  return (
    <div className="min-h-screen w-full" style={{ backgroundColor: COLORS.bg }}>
      <SeoHead
        title={article.title}
        description={article.excerpt}
        canonical={typeof window !== "undefined" ? window.location.origin + "/blog/" + article.id : "/blog/" + article.id}
      />
      <style>{FONT_IMPORT}</style>

      <div className="relative overflow-hidden px-5 sm:px-10 pt-10 pb-8 sm:pb-10" style={{ backgroundColor: COLORS.panelDark }}>
        <div className="max-w-2xl mx-auto text-center">
          <div className="flex justify-center mb-3">
            <Logo size={28} />
          </div>
          <nav className="text-[11px] mb-3" style={{ color: "#9BA1AD" }} aria-label="Ruta de navegación">
            <Link to="/" className="underline">Inicio</Link> ·{" "}
            <Link to="/blog" className="underline">Blog</Link> · {article.title}
          </nav>
          <div className="text-xs mb-2" style={{ color: "#9BA1AD", fontFamily: "'Inter', sans-serif" }}>
            {new Date(article.date + "T00:00:00").toLocaleDateString("es-MX", { year: "numeric", month: "long", day: "numeric" })}
          </div>
          <h1 className="text-2xl sm:text-4xl font-bold text-white leading-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            {article.title}
          </h1>
        </div>
      </div>
<div className="max-w-2xl mx-auto px-5 sm:px-10 py-10">
        {article.image && (
          <img src={article.image} alt={article.title} className="w-full h-56 sm:h-72 object-cover rounded-lg mb-6" loading="lazy" />
        )}
        <div className="rounded-lg shadow-lg p-5 sm:p-7 flex flex-col gap-4" style={{ backgroundColor: "#fff", border: `1px solid ${COLORS.line}` }}>
          {article.content.map((paragraph, i) => (
            <p key={i} className="text-sm sm:text-base leading-relaxed" style={{ color: COLORS.ink, fontFamily: "'Inter', sans-serif" }}>
              {paragraph}
            </p>
          ))}
        </div>
        {article.links && article.links.length > 0 && (
          <div className="mt-6 rounded-lg p-4 flex flex-col gap-2" style={{ backgroundColor: "#fff", border: `1px solid ${COLORS.line}` }}>
            {article.links.map((l) => (
              <Link key={l.path} to={l.path} className="text-sm underline" style={{ color: COLORS.ink, fontFamily: "'Inter', sans-serif" }}>
                → {l.label}
              </Link>
            ))}
          </div>
        )}
        <div className="mt-6 text-center">
          <Link to="/blog" className="text-sm underline" style={{ color: COLORS.muted, fontFamily: "'Inter', sans-serif" }}>
            ← Volver al blog
          </Link>
        </div>
      </div>
    </div>
  );
}
