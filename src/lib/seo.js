// ============================================================================
// src/lib/seo.js
// Genera título, meta descripción, canonical, Open Graph y datos estructurados
// Schema.org únicos para cada tipo de página del sitio.
//
// Cambia SITE_URL por el dominio real antes de desplegar a producción — lo
// usan tanto el canonical/OG de cada página como el generador de sitemap.xml.
// ============================================================================
import { overallOf } from "../data/devices.js";

export const SITE_NAME = "Duelo de Especificaciones";
export const SITE_URL = "https://www.duelodeespecificaciones.com"; // TODO: reemplazar por el dominio real

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
export function categoryMeta(slugType, count) {
  const label = slugType === "celulares" ? "celulares" : slugType === "tablets" ? "tablets" : "computadoras";
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
  const label = device.type === "Celular" ? "celular" : "computadora";
  const overall = overallOf(device);
  const title = `${device.name}: ficha técnica, specs y precio (${device.year})`;
  const description = truncate(
    `${device.name} (${device.year}): ${device.details.rendimiento}, ${device.details.pantalla}, ${device.details.bateria}. Precio de referencia ${device.price}. Puntuación general ${overall}/100. Compáralo con otro ${label}.`,
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
  const description = truncate(
    winner
      ? `Comparamos ${devA.name} contra ${devB.name} en rendimiento, pantalla, batería, cámara, portabilidad y precio-calidad. ${winner.name} obtiene la mejor puntuación general.`
      : `Comparamos ${devA.name} contra ${devB.name} en rendimiento, pantalla, batería, cámara, portabilidad y precio-calidad, categoría por categoría.`,
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
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: device.name,
    brand: {
      "@type": "Brand",
      name: device.name.split(" ")[0],
    },
    category: device.type === "Celular" ? "Celular / Smartphone" : "Computadora",
    releaseDate: `${device.year}`,
    description: `${device.details.rendimiento}, ${device.details.pantalla}, ${device.details.bateria}, ${device.details.camara}.`,
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
