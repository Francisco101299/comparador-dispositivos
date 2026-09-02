// ============================================================================
// src/components/LanguageSwitcher.jsx
// Botones pequeños para cambiar entre Español e Inglés.
// ============================================================================
import { LANGUAGES } from "../lib/i18n";
import { useLanguage } from "../lib/LanguageContext";

export default function LanguageSwitcher() {
  const { lang, setLang } = useLanguage();

  return (
    <div className="flex items-center gap-1">
      {LANGUAGES.map((l) => (
        <button
          key={l.code}
          type="button"
          onClick={() => setLang(l.code)}
          className="text-[11px] px-2 py-1 rounded-full font-medium uppercase transition-colors"
          style={{
            backgroundColor: lang === l.code ? "#fff" : "transparent",
            color: lang === l.code ? "#14181F" : "#9BA1AD",
            border: "1px solid #2A2F3A",
          }}
        >
          {l.code}
        </button>
      ))}
    </div>
  );
}
