// ============================================================================
// src/components/LanguageSwitcher.jsx
// Botones con banderas (emoji) para cambiar entre Español e Inglés.
// ============================================================================
import { LANGUAGES } from "../lib/i18n";
import { useLanguage } from "../lib/LanguageContext";

const FLAGS = {
  es: "🇪🇸",
  en: "🇺🇸",
};

export default function LanguageSwitcher() {
  const { lang, setLang } = useLanguage();

  return (
    <div className="flex items-center gap-1">
      {LANGUAGES.map((l) => (
        <button
          key={l.code}
          type="button"
          onClick={() => setLang(l.code)}
          aria-label={l.label}
          title={l.label}
          className="flex items-center justify-center text-base rounded-full transition-opacity"
          style={{
            width: 30,
            height: 30,
            backgroundColor: lang === l.code ? "#fff" : "transparent",
            border: "1px solid #2A2F3A",
            opacity: lang === l.code ? 1 : 0.6,
          }}
        >
          {FLAGS[l.code]}
        </button>
      ))}
    </div>
  );
  }
