// ============================================================================
// src/lib/i18n.js
// Sistema simple de traducción para la interfaz del sitio (menús, botones,
// títulos fijos). No traduce el contenido de los dispositivos ni el blog
// (eso seguiría en español por ahora).
//
// Cómo funciona: cada texto de la interfaz tiene una "clave" (ej. "nav.home")
// y un valor en cada idioma. Los componentes piden el texto con esa clave
// y reciben la traducción según el idioma activo.
// ============================================================================
export const LANGUAGES = [
  { code: "es", label: "Español" },
  { code: "en", label: "English" },
];

export const DEFAULT_LANGUAGE = "es";

export const TRANSLATIONS = {
  es: {
    "nav.categories": "Categorías",
    "nav.more": "Más",
    "nav.phones": "Celulares",
    "nav.computers": "Computadoras",
    "nav.tablets": "Tablets",
    "nav.watches": "Relojes",
    "nav.suggest": "¿Falta tu dispositivo?",
    "nav.blog": "Blog",
    "nav.faq": "Preguntas frecuentes",
    "nav.about": "Acerca de",
    "home.title": "¿Cuál gana?",
    "home.subtitle": "Elige una categoría (opcional) y dos dispositivos para comparar sus características al instante.",
    "home.deviceA": "Dispositivo A (ej. iPhone 16 Pro)",
    "home.deviceB": "Dispositivo B (ej. Galaxy S25 Ultra)",
    "home.compare": "Comparar",
    "home.pickTwo": "Elige dos dispositivos distintos.",
    "home.database": "Base de datos local de {count} celulares, computadoras, tablets y relojes. Empieza a escribir para ver sugerencias.",
    "footer.privacy": "Política de privacidad",
    "footer.contact": "Contacto",
  },
  en: {
    "nav.categories": "Categories",
    "nav.more": "More",
    "nav.phones": "Phones",
    "nav.computers": "Computers",
    "nav.tablets": "Tablets",
    "nav.watches": "Watches",
    "nav.suggest": "Missing your device?",
    "nav.blog": "Blog",
    "nav.faq": "FAQ",
    "nav.about": "About",
    "home.title": "Which one wins?",
    "home.subtitle": "Pick a category (optional) and two devices to compare their features instantly.",
    "home.deviceA": "Device A (e.g. iPhone 16 Pro)",
    "home.deviceB": "Device B (e.g. Galaxy S25 Ultra)",
    "home.compare": "Compare",
    "home.pickTwo": "Pick two different devices.",
    "home.database": "Local database of {count} phones, computers, tablets and watches. Start typing to see suggestions.",
    "footer.privacy": "Privacy policy",
    "footer.contact": "Contact",
  },
};

export function t(lang, key, vars = {}) {
  const dict = TRANSLATIONS[lang] || TRANSLATIONS[DEFAULT_LANGUAGE];
  let text = dict[key] || TRANSLATIONS[DEFAULT_LANGUAGE][key] || key;
  Object.entries(vars).forEach(([k, v]) => {
    text = text.replace(`{${k}}`, v);
  });
  return text;
    }
