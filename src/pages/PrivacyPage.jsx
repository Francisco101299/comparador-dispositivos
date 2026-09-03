// ============================================================================
// src/pages/PrivacyPage.jsx
// Política de privacidad en /privacidad. Texto genérico y honesto para un
// sitio sin cuentas de usuario ni base de datos propia.
// ============================================================================
import { Link } from "react-router-dom";
import { COLORS, FONT_IMPORT } from "../data/theme";
import SeoHead from "../components/SeoHead";
import Logo from "../components/Logo";
import { useLanguage } from "../lib/LanguageContext";

export default function PrivacyPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen w-full" style={{ backgroundColor: COLORS.bg }}>
      <SeoHead
        title={t("footer.privacy")}
        description={t("privacy.seoDescription")}
        canonical={typeof window !== "undefined" ? window.location.origin + "/privacidad" : "/privacidad"}
      />
      

      <div className="relative overflow-hidden px-5 sm:px-10 pt-10 pb-8 sm:pb-10" style={{ backgroundColor: COLORS.panelDark }}>
        <div className="max-w-2xl mx-auto text-center">
          <div className="flex justify-center mb-3">
            <Logo size={28} />
          </div>
          <nav className="text-[11px] mb-3" style={{ color: "#9BA1AD" }} aria-label="Ruta de navegación">
            <Link to="/" className="underline">{t("breadcrumb.home")}</Link> · {t("privacy.breadcrumbLabel")}
          </nav>
          <h1 className="text-3xl sm:text-5xl font-bold text-white leading-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            {t("footer.privacy")}
          </h1>
          <p className="mt-2 text-xs" style={{ color: "#9BA1AD", fontFamily: "'Inter', sans-serif" }}>
            {t("privacy.lastUpdated")}
          </p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-5 sm:px-10 py-10">
        <div className="rounded-lg shadow-lg p-5 sm:p-7 flex flex-col gap-6" style={{ backgroundColor: "#fff", border: `1px solid ${COLORS.line}` }}>
          <section>
            <h2 className="text-base font-semibold mb-2" style={{ color: COLORS.ink, fontFamily: "'Space Grotesk', sans-serif" }}>
              {t("privacy.dataTitle")}
            </h2>
            <p className="text-sm leading-relaxed" style={{ color: COLORS.muted, fontFamily: "'Inter', sans-serif" }}>
              {t("privacy.dataBody")}
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold mb-2" style={{ color: COLORS.ink, fontFamily: "'Space Grotesk', sans-serif" }}>
              {t("privacy.suggestionTitle")}
            </h2>
            <p className="text-sm leading-relaxed" style={{ color: COLORS.muted, fontFamily: "'Inter', sans-serif" }}>
              {t("privacy.suggestionBody")}
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold mb-2" style={{ color: COLORS.ink, fontFamily: "'Space Grotesk', sans-serif" }}>
              {t("privacy.cookiesTitle")}
            </h2>
            <p className="text-sm leading-relaxed" style={{ color: COLORS.muted, fontFamily: "'Inter', sans-serif" }}>
              {t("privacy.cookiesBody")}
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold mb-2" style={{ color: COLORS.ink, fontFamily: "'Space Grotesk', sans-serif" }}>
              {t("privacy.linksTitle")}
            </h2>
            <p className="text-sm leading-relaxed" style={{ color: COLORS.muted, fontFamily: "'Inter', sans-serif" }}>
              {t("privacy.linksBody")}
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold mb-2" style={{ color: COLORS.ink, fontFamily: "'Space Grotesk', sans-serif" }}>
              {t("privacy.contactTitle")}
            </h2>
            <p className="text-sm leading-relaxed" style={{ color: COLORS.muted, fontFamily: "'Inter', sans-serif" }}>
              {t("privacy.contactBodyPrefix")}{" "}
              <Link to="/sugerir" className="underline" style={{ color: COLORS.ink }}>
                {t("nav.suggest")}
              </Link>
              .
            </p>
          </section>
        </div>
      </div>
    </div>
  );
          }
