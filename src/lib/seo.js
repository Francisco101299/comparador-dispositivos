// ============================================================================
// src/lib/seo.js
// Genera título, meta descripción, canonical, Open Graph y datos estructurados
// Schema.org únicos para cada tipo de página del sitio.
//
// Cambia SITE_URL por el dominio real antes de desplegar a producción. Lo usa
// tanto el canonical/OG de cada página como scripts/generate-sitemap.mjs (que
// lo importa de aquí en vez de tener su propia copia, para que no se puedan
// desincronizar los dos como pasaba antes: este archivo decía
// "duelodeespecificaciones.com" -- la marca vieja -- y el generador de
// sitemap usaba "comparador-dispositivos.vercel.app" -- el dominio real
// donde está desplegado hoy. Mientras no haya dominio propio comprado, usa
// el subdominio gratuito de Vercel; si renombras el proyecto en Vercel o
// compras un dominio, solo hace falta cambiar esta línea.
// ============================================================================
import { overallOf, catsFor, catsForPair, CATEGORY_CONFIG } from "../data/devices.js";

// Nombre legible del tipo de dispositivo para meta descripciones y JSON-LD.
// Antes esto era un ternario binario Celular/Computadora: cualquier
// herramienta o dron heredaba "Computadora" en su <meta description> y en el
// campo "category" del JSON-LD de Producto, lo cual es información falsa
// para Google. Ahora cubre los 16 tipos reales del catálogo.
const TYPE_LABEL = {
  Celular: "celular",
  Laptop: "laptop",
  Desktop: "computadora de escritorio",
  Tablet: "tablet",
  Smartwatch: "reloj inteligente",
  Dron: "dron",
  Taladro: "taladro",
  Amoladora: "amoladora",
  Atornillador: "atornillador",
  Rotomartillo: "rotomartillo",
  Sierra: "sierra",
  Lijadora: "lijadora",
  Esmeril: "esmeril",
  Compresor: "compresor",
  Generador: "generador",
  Hidrolavadora: "hidrolavadora",
  Soldadora: "soldadora",
};
function typeLabel(type) {
  return TYPE_LABEL[type] || "dispositivo";
}

export const SITE_NAME = "Duelo de Características";
export const SITE_URL = "https://comparador-dispositivos.vercel.app"; // dominio real actual (gratuito, en Vercel)

function truncate(str, max) {
  if (str.length <= max) return str;
  return str.slice(0, max - 1).trimEnd() + "…";
}

export function absoluteUrl(path) {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

// ---------------------------------------------------------------------------
// Home / comparador general
// ---------------------------------------------------------------------------
export function homeMeta() {
  return {
    title: `${SITE_NAME}: compara celulares y computadoras al instante`,
    description:
      "Compara specs de celulares y computadoras cara a cara: rendimiento, pantalla, batería, cámara, portabilidad y precio-calidad. Elige dos dispositivos y ve quién gana.",
    canonical: absoluteUrl("/"),
    path: "/",
  };
}

// ---------------------------------------------------------------------------
// Página de categoría (/celulares, /computadoras)
// ---------------------------------------------------------------------------
export function categoryMeta(slugType, count, label) {
  // `label` ahora lo pasa el que llama (ya lo tiene traducido, ver
  // CategoryPage.jsx). Antes se adivinaba aquí con un ternario que solo
  // conocía celulares/tablets/relojes/drones y todo lo demás caía en
  // "computadoras" -- así que /taladros mostraba "Ficha técnica de
  // computadoras" en el título. Si no llega label (por compatibilidad),
  // se arma uno genérico a partir de CATEGORY_CONFIG.
  if (!label) {
    const cfg = CATEGORY_CONFIG[slugType];
    label = cfg ? typeLabel(cfg.types[0]) + "s" : "dispositivos";
  }
  return {
    title: `Ficha técnica de ${label}: catálogo completo con ${count} modelos`,
    description: `Explora la ficha técnica de ${count} ${label}: rendimiento, pantalla, batería, cámara y precio. Compara cualquier par en segundos.`,
    canonical: absoluteUrl(`/${slugType}`),
    path: `/${slugType}`,
  };
}

// ---------------------------------------------------------------------------
// Página individual de un dispositivo (/celulares/:slug, /computadoras/:slug)
// ---------------------------------------------------------------------------
export function deviceMeta(device) {
  const label = typeLabel(device.type);
  const overall = overallOf(device);
  const title = `${device.name}: ficha técnica, specs y precio (${device.year})`;
  // Antes citaba siempre device.details.rendimiento/pantalla/bateria, que no
  // existen en un dispositivo de herramienta (usa potencia/velocidad/etc.) y
  // salían como "undefined" en la meta descripción real. Ahora toma las
  // primeras categorías que SÍ existen para este tipo de dispositivo.
  const cats = catsFor(device);
  const highlights = cats
    .slice(0, 3)
    .map((c) => device.details[c.key])
    .filter(Boolean)
    .join(", ");
  const description = truncate(
    `${device.name} (${device.year}): ${highlights}. Precio de referencia ${device.price}. Puntuación general ${overall}/100. Compáralo con otro ${label}.`,
    160
  );
  return {
    title,
    description,
    canonical: absoluteUrl(`/${device.slugType}/${device.slug}`),
    path: `/${device.slugType}/${device.slug}`,
    ogType: "product",
  };
}

// ---------------------------------------------------------------------------
// Página de comparación entre dos dispositivos (/comparar/:slugA-vs-:slugB)
// ---------------------------------------------------------------------------
export function comparisonSlug(devA, devB) {
  return `${devA.slug}-vs-${devB.slug}`;
}

export function comparisonMeta(devA, devB) {
  const winner = overallOf(devA) === overallOf(devB) ? null : overallOf(devA) > overallOf(devB) ? devA : devB;
  const title = `${devA.name} vs ${devB.name}: comparación completa`;
  // Antes la lista de categorías era literal "rendimiento, pantalla, batería,
  // cámara, portabilidad y precio-calidad" sin importar qué se comparara --
  // para un duelo de dos taladros, la meta descripción real (la que Google
  // muestra) hablaba de "cámara" y "pantalla" en un taladro. Ahora sale de
  // catsForPair, igual que el resto de la UI del duelo.
  const catLabels = catsForPair(devA, devB).map((c) => c.label.toLowerCase());
  const catList =
    catLabels.length > 1
      ? `${catLabels.slice(0, -1).join(", ")} y ${catLabels[catLabels.length - 1]}`
      : catLabels[0] || "sus características principales";
  const description = truncate(
    winner
      ? `Comparamos ${devA.name} contra ${devB.name} en ${catList}. ${winner.name} obtiene la mejor puntuación general.`
      : `Comparamos ${devA.name} contra ${devB.name} en ${catList}, categoría por categoría.`,
    160
  );
  return {
    title,
    description,
    canonical: absoluteUrl(`/comparar/${comparisonSlug(devA, devB)}`),
    path: `/comparar/${comparisonSlug(devA, devB)}`,
  };
}

// ---------------------------------------------------------------------------
// JSON-LD Schema.org
// ---------------------------------------------------------------------------
export function deviceProductJsonLd(device) {
  const overall = overallOf(device);
  const priceNumber = Number(String(device.price).replace(/[^0-9.]/g, "")) || undefined;
  // Igual que en deviceMeta: category y description usaban campos fijos de
  // celular/computadora (rendimiento/pantalla/bateria/camara). Para una
  // herramienta o dron esos campos no existen y el JSON-LD de Producto salía
  // con "undefined" en la descripción -- dato estructurado incorrecto que
  // Google podía llegar a mostrar en resultados enriquecidos.
  const cats = catsFor(device);
  const jsonLdDescription = cats
    .slice(0, 4)
    .map((c) => device.details[c.key])
    .filter(Boolean)
    .join(", ");
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: device.name,
    brand: {
      "@type": "Brand",
      name: device.name.split(" ")[0],
    },
    category: typeLabel(device.type),
    releaseDate: `${device.year}`,
    description: `${jsonLdDescription}.`,
    offers: priceNumber
      ? {
          "@type": "Offer",
          priceCurrency: "USD",
          price: priceNumber,
          availability: "https://schema.org/InStock",
          url: absoluteUrl(`/${device.slugType}/${device.slug}`),
        }
      : undefined,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: overall,
      bestRating: 100,
      worstRating: 0,
      ratingCount: 1,
    },
  };
}

export function comparisonJsonLd(devA, devB) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${devA.name} vs ${devB.name}`,
    itemListElement: [
      { "@type": "ListItem", position: 1, item: deviceProductJsonLd(devA) },
      { "@type": "ListItem", position: 2, item: deviceProductJsonLd(devB) },
    ],
  };
}

export function breadcrumbJsonLd(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: absoluteUrl(it.path),
    })),
  };
         }
      
