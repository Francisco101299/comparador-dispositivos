// ============================================================================
// src/pages/FaqPage.jsx
// Preguntas frecuentes en /preguntas-frecuentes, con acordeón desplegable
// y datos estructurados Schema.org FAQPage (para aparecer en Google como
// acordeón directamente en los resultados de búsqueda).
// ============================================================================
import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { COLORS, FONT_IMPORT } from "../data/theme";
import { FAQS } from "../data/faqs";
import SeoHead from "../components/SeoHead";
import Logo from "../components/Logo";
import { useLanguage } from "../lib/LanguageContext";

function faqJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer,
      },
    })),
  };
}

export default function FaqPage() {
  const { t } = useLanguage();
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="min-h-screen w-full" style={{ backgroundColor: COLORS.bg }}>
      <SeoHead
        title={t("nav.faq")}
        description={t("faq.seoDescription")}
        canonical={typeof window !== "undefined" ? window.location.origin + "/preguntas-frecuentes" : "/preguntas-frecuentes"}
        jsonLd={faqJsonLd()}
      />
      

      <div className="relative overflow-hidden px-5 sm:px-10 pt-10 pb-8 sm:pb-10" style={{ backgroundColor: COLORS.panelDark }}>
        <div className="max-w-2xl mx-auto text-center">
         <div className="flex justify-center mb-3">
            <Logo size={28} />
          </div>
          <nav className="text-[11px] mb-3" style={{ color: "#9BA1AD" }} aria-label="Ruta de navegación">
            <Link to="/" className="underline">{t("breadcrumb.home")}</Link> · {t("nav.faq")}
          </nav>
          <h1 className="text-3xl sm:text-5xl font-bold text-white leading-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            {t("nav.faq")}
          </h1>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-5 sm:px-10 py-10">
        <h2 className="sr-only">{t("faq.listSrOnly")}</h2>
        <div className="flex flex-col gap-3">
          {FAQS.map((faq, i) => {
            const open = openIndex === i;
            return (
              <div key={i} className="rounded-lg overflow-hidden" style={{ backgroundColor: "#fff", border: `1px solid ${COLORS.line}` }}>
                <button
                  type="button"
                  onClick={() => setOpenIndex(open ? null : i)}
                  aria-expanded={open}
                  className="w-full flex items-center justify-between gap-3 text-left px-4 py-3.5"
                >
                  <span className="font-medium text-sm sm:text-base" style={{ color: COLORS.ink, fontFamily: "'Inter', sans-serif" }}>
                    {faq.question}
                  </span>
                  <ChevronDown
                    size={18}
                    className="shrink-0 transition-transform"
                    style={{ color: COLORS.muted, transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
                  />
                </button>
                {open && (
                  <div className="px-4 pb-4 text-sm leading-relaxed" style={{ color: COLORS.muted, fontFamily: "'Inter', sans-serif" }}>
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
                }
                      
