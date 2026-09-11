// ============================================================================
// src/pages/BlogPage.jsx
// Listado de todos los artículos del blog en /blog. El título/extracto de
// cada tarjeta se traduce al inglés vía articleTranslator.js (import()
// dinámico, solo se descarga si lang === "en") cuando el idioma activo es
// inglés; en español se muestran directo desde articles.js, sin descarga
// extra.
// ============================================================================
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { COLORS, FONT_IMPORT } from "../data/theme";
import { ARTICLES } from "../data/articles";
import SeoHead from "../components/SeoHead";
import Logo from "../components/Logo";
import { useLanguage } from "../lib/LanguageContext";

export default function BlogPage() {
  const { t, lang } = useLanguage();
  const dateLocale = lang === "en" ? "en-US" : "es-MX";
  const sorted = [...ARTICLES].sort((a, b) => new Date(b.date) - new Date(a.date));

  const [translateFn, setTranslateFn] = useState(null);
  useEffect(() => {
    if (lang !== "en") {
      setTranslateFn(null);
      return;
    }
    let cancelled = false;
    import("../lib/articleTranslator").then(({ translateArticle }) => {
      if (!cancelled) setTranslateFn(() => translateArticle);
    });
    return () => {
      cancelled = true;
    };
  }, [lang]);

  // Mientras carga la traducción (o si el idioma es español), se muestra el
  // artículo tal cual viene de articles.js -- nunca undefined, nunca roto.
  const display = (a) => (translateFn ? translateFn(a, lang) : a);

  return (
    <div className="min-h-screen w-full" style={{ backgroundColor: COLORS.bg }}>
      <SeoHead
        title={t("blog.seoTitle")}
        description={t("blog.seoDescription")}
        canonical={typeof window !== "undefined" ? window.location.origin + "/blog" : "/blog"}
      />
      

      <div className="relative overflow-hidden px-5 sm:px-10 pt-10 pb-8 sm:pb-10" style={{ backgroundColor: COLORS.panelDark }}>
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex justify-center mb-3">
            <Logo size={28} />
          </div>
          <nav className="text-[11px] mb-3" style={{ color: "#9BA1AD" }} aria-label="Ruta de navegación">
            <Link to="/" className="underline">{t("breadcrumb.home")}</Link> · Blog
          </nav>
          <h1 className="text-3xl sm:text-5xl font-bold text-white leading-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Blog
          </h1>
          <p className="mt-2 text-sm sm:text-base" style={{ color: "#9BA1AD", fontFamily: "'Inter', sans-serif" }}>
            {t("blog.subtitle")}
          </p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-5 sm:px-10 py-10">
        <h2 className="sr-only">{t("blog.articlesListSrOnly")}</h2>
        <div className="flex flex-col gap-4">
          {sorted.map((raw) => {
            const a = display(raw);
            return (
            <Link
              key={a.id}
              to={`/blog/${a.id}`}
              className="block rounded-lg overflow-hidden hover:bg-[#F3F4F7] transition-colors"
              style={{ backgroundColor: "#fff", border: `1px solid ${COLORS.line}` }}
            >
              {a.image && (
                <img src={a.image} alt={a.title} className="w-full h-40 object-cover" loading="lazy" />
              )}
              <div className="p-5">
              <div className="text-xs mb-1.5" style={{ color: COLORS.muted, fontFamily: "'Inter', sans-serif" }}>
                {new Date(a.date + "T00:00:00").toLocaleDateString(dateLocale, { year: "numeric", month: "long", day: "numeric" })}
              </div>
              <div className="font-semibold text-base mb-1.5" style={{ color: COLORS.ink, fontFamily: "'Space Grotesk', sans-serif" }}>
                {a.title}
              </div>
              <p className="text-sm leading-relaxed" style={{ color: COLORS.muted, fontFamily: "'Inter', sans-serif" }}>
                {a.excerpt}
              </p>
              </div>
            </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
              }
