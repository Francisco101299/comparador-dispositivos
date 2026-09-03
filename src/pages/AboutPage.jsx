// ============================================================================
// src/pages/AboutPage.jsx
// Página "Acerca de": explica qué es el sitio y cómo se calculan las
// puntuaciones. Le da contexto y credibilidad al proyecto.
// ============================================================================
import { Link } from "react-router-dom";
import { COLORS, FONT_IMPORT } from "../data/theme";
import { DEVICES, CATS } from "../data/devices";
import SeoHead from "../components/SeoHead";
import Logo from "../components/Logo";
import { useLanguage } from "../lib/LanguageContext";

export default function AboutPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen w-full" style={{ backgroundColor: COLORS.bg }}>
      <SeoHead
        title={t("about.seoTitle")}
        description={t("about.seoDescription")}
        canonical={typeof window !== "undefined" ? window.location.origin + "/acerca-de" : "/acerca-de"}
      />
      

      <div className="relative overflow-hidden px-5 sm:px-10 pt-10 pb-8 sm:pb-10" style={{ backgroundColor: COLORS.panelDark }}>
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex justify-center mb-3">
            <Logo size={28} />
          </div>
          <nav className="text-[11px] mb-3" style={{ color: "#9BA1AD" }} aria-label="Ruta de navegación">
            <Link to="/" className="underline">{t("breadcrumb.home")}</Link> · {t("nav.about")}
          </nav>
          <h1 className="text-3xl sm:text-5xl font-bold text-white leading-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            {t("about.heading")}
          </h1>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-5 sm:px-10 py-10">
        <div className="rounded-lg shadow-lg p-5 sm:p-7 flex flex-col gap-6" style={{ backgroundColor: "#fff", border: `1px solid ${COLORS.line}` }}>
          <section>
            <h2 className="text-base font-semibold mb-2" style={{ color: COLORS.ink, fontFamily: "'Space Grotesk', sans-serif" }}>
              {t("about.whatIsTitle")}
            </h2>
            <p className="text-sm leading-relaxed" style={{ color: COLORS.muted, fontFamily: "'Inter', sans-serif" }}>
              {t("about.whatIsBody", { count: DEVICES.length })}
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold mb-2" style={{ color: COLORS.ink, fontFamily: "'Space Grotesk', sans-serif" }}>
              {t("about.scoresTitle")}
            </h2>
            <p className="text-sm leading-relaxed mb-2" style={{ color: COLORS.muted, fontFamily: "'Inter', sans-serif" }}>
              {t("about.scoresIntro")}
            </p>
            <ul className="text-sm leading-relaxed list-disc pl-5" style={{ color: COLORS.muted, fontFamily: "'Inter', sans-serif" }}>
              {CATS.map((c) => (
                <li key={c.key}>{c.label}</li>
              ))}
            </ul>
            <p className="text-sm leading-relaxed mt-2" style={{ color: COLORS.muted, fontFamily: "'Inter', sans-serif" }}>
              {t("about.scoresOutro")}
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold mb-2" style={{ color: COLORS.ink, fontFamily: "'Space Grotesk', sans-serif" }}>
              {t("about.missingTitle")}
            </h2>
            <p className="text-sm leading-relaxed" style={{ color: COLORS.muted, fontFamily: "'Inter', sans-serif" }}>
              {t("about.missingBodyPrefix")}{" "}
              <Link to="/sugerir" className="underline" style={{ color: COLORS.ink }}>
                {t("nav.suggest")}
              </Link>
              {t("about.missingBodySuffix")}
            </p>
          </section>
        </div>
      </div>
    </div>
  );
    }
