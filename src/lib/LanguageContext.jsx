// ============================================================================
// src/lib/LanguageContext.jsx
// Contexto global de idioma: guarda cuál está activo (es/en), lo persiste
// en localStorage, e intenta detectar el idioma del navegador la primera
// vez que alguien visita (si su navegador está en inglés, arranca en inglés).
//
// Además, refleja el idioma activo en la URL como ?lang=en (se omite el
// parámetro cuando el idioma es el default, es). Esto es necesario para que
// SeoHead.jsx pueda declarar hreflang de verdad: sin una URL distinta por
// idioma, no hay nada que anunciarle a Google. El parámetro se sincroniza
// con history.replaceState (no dispara recarga ni ensucia el botón "atrás")
// tanto al cambiar de idioma como al navegar entre páginas dentro del sitio.
// ============================================================================
import { createContext, useContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { DEFAULT_LANGUAGE, LANGUAGES, t } from "./i18n";

const LanguageContext = createContext(null);

function getUrlLang() {
  if (typeof window === "undefined") return null;
  const fromUrl = new URLSearchParams(window.location.search).get("lang");
  if (fromUrl && LANGUAGES.find((l) => l.code === fromUrl)) return fromUrl;
  return null;
}

function detectInitialLanguage() {
  const fromUrl = getUrlLang();
  if (fromUrl) return fromUrl;
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

function syncUrlLang(code) {
  if (typeof window === "undefined") return;
  const url = new URL(window.location.href);
  if (code === DEFAULT_LANGUAGE) {
    url.searchParams.delete("lang");
  } else {
    url.searchParams.set("lang", code);
  }
  const next = url.pathname + url.search + url.hash;
  if (next !== window.location.pathname + window.location.search + window.location.hash) {
    window.history.replaceState(null, "", next);
  }
}

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(DEFAULT_LANGUAGE);
  // Requiere estar DENTRO de <BrowserRouter> (ver App.jsx) para detectar
  // cada cambio de ruta y re-sincronizar ?lang= en la URL nueva.
  const location = useLocation();

  useEffect(() => {
    const initial = detectInitialLanguage();
    setLangState(initial);
    syncUrlLang(initial);
    // Solo al montar: es la detección inicial (URL > localStorage > navegador).
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Cada vez que cambia la ruta (navegación por <Link>), la URL nueva no
  // trae el ?lang= todavía -- se re-agrega acá para que quede consistente.
  useEffect(() => {
    syncUrlLang(lang);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const setLang = (code) => {
    setLangState(code);
    try {
      localStorage.setItem("preferredLanguage", code);
    } catch {}
    syncUrlLang(code);
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
