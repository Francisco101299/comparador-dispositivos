// ============================================================================
// src/lib/LanguageContext.jsx
// Contexto global de idioma: guarda cuál está activo (es/en), lo persiste
// en localStorage, e intenta detectar el idioma del navegador la primera
// vez que alguien visita (si su navegador está en inglés, arranca en inglés).
// ============================================================================
import { createContext, useContext, useState, useEffect } from "react";
import { DEFAULT_LANGUAGE, LANGUAGES, t } from "./i18n";

const LanguageContext = createContext(null);

function detectInitialLanguage() {
  try {
    const saved = localStorage.getItem("preferredLanguage");
    if (saved && LANGUAGES.find((l) => l.code === saved)) return saved;
  } catch {}
  if (typeof navigator !== "undefined" && navigator.language) {
    const browserLang = navigator.language.slice(0, 2).toLowerCase();
    if (LANGUAGES.find((l) => l.code === browserLang)) return browserLang;
  }
  return DEFAULT_LANGUAGE;
}

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(DEFAULT_LANGUAGE);

  useEffect(() => {
    setLangState(detectInitialLanguage());
  }, []);

  const setLang = (code) => {
    setLangState(code);
    try {
      localStorage.setItem("preferredLanguage", code);
    } catch {}
  };

  const translate = (key, vars) => t(lang, key, vars);

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: translate }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage debe usarse dentro de LanguageProvider");
  return ctx;
      }
