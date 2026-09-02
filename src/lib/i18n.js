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
    "category.subtitle": "{count} modelos con ficha técnica completa. Toca cualquiera para ver su detalle o compararlo.",
    "category.sortBy": "Ordenar por:",
    "category.sortScore": "Puntuación",
    "category.sortPriceLow": "Precio: menor a mayor",
    "category.sortPriceHigh": "Precio: mayor a menor",
    "category.sortYear": "Año: más reciente",
    "breadcrumb.home": "Inicio",
    "device.subtitle": "Ficha técnica completa, puntuación por categoría y precio de referencia {price}.",
    "device.specsTitle": "Especificaciones por categoría",
    "device.overallScore": "Puntuación general",
"device.compareTitle": "Compara {name} con otro {type}",
    "type.Celular": "celular",
    "type.Desktop": "computadora",
    "type.Laptop": "laptop",
    "type.Tablet": "tablet",
    "type.Smartwatch": "reloj",
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
    "category.subtitle": "{count} models with full specs. Tap any to see details or compare it.",
    "category.sortBy": "Sort by:",
    "category.sortScore": "Score",
    "category.sortPriceLow": "Price: low to high",
    "category.sortPriceHigh": "Price: high to low",
    "category.sortYear": "Year: newest",
    "breadcrumb.home": "Home",
    "device.subtitle": "Full specs, category scores and reference price of {price}.",
    "device.specsTitle": "Specifications by category",
    "device.overallScore": "Overall score",
    "device.compareTitle": "Compare {name} with another {type}",
    "type.Celular": "phone",
    "type.Desktop": "computer",
    "type.Laptop": "laptop",
    "type.Tablet": "tablet",
    "type.Smartwatch": "watch",
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
