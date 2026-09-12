// ============================================================================
// src/components/SeoHead.jsx
// Gestiona el <head> por página: title, meta description, canonical,
// Open Graph/Twitter y JSON-LD. No depende de librerías externas.
// ============================================================================
import { useEffect } from "react";
import { SITE_NAME } from "../lib/seo.js";
import { useLanguage } from "../lib/LanguageContext.jsx";

function setMetaByName(name, content) {
  if (!content) return;
  let tag = document.querySelector(`meta[name="${name}"]`);
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute("name", name);
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", content);
}

function setMetaByProperty(property, content) {
  if (!content) return;
  let tag = document.querySelector(`meta[property="${property}"]`);
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute("property", property);
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", content);
}

function setCanonical(href) {
  if (!href) return;
  let link = document.querySelector('link[rel="canonical"]');
  if (!link) {
    link = document.createElement("link");
    link.setAttribute("rel", "canonical");
    document.head.appendChild(link);
  }
  link.setAttribute("href", href);
}

// Antes no existía ninguna. Sin hreflang, la traducción al inglés de
// articleTranslator.js/deviceTranslator.js es invisible para Google: el
// idioma vivía solo en localStorage, sin URL propia que anunciar. Ahora cada
// página declara sus dos versiones (es/en) usando ?lang=en como variante de
// URL (ver LanguageContext.jsx), sin tener que duplicar las 700+ rutas.
function setAlternate(hreflang, href) {
  let link = document.querySelector(`link[rel="alternate"][hreflang="${hreflang}"]`);
  if (!link) {
    link = document.createElement("link");
    link.setAttribute("rel", "alternate");
    link.setAttribute("hreflang", hreflang);
    document.head.appendChild(link);
  }
  link.setAttribute("href", href);
}

function setJsonLd(id, data) {
  let script = document.getElementById(id);
  if (!data) {
    if (script) script.remove();
    return;
  }
  if (!script) {
    script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = id;
    document.head.appendChild(script);
  }
  script.textContent = JSON.stringify(data);
}

// `canonical` llega SIN parámetro de idioma (siempre la versión es, tal como
// la arman las funciones de seo.js). Acá se deriva la versión en inglés y se
// decide cuál de las dos es el canonical "propio" de esta carga según el
// idioma activo -- Google pide que cada versión de idioma sea autorreferencial,
// no que todas apunten siempre a la misma canonical.
export default function SeoHead({ title, description, canonical, ogType = "website", image, jsonLd }) {
  const { lang } = useLanguage();

  useEffect(() => {
    const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;
    document.title = fullTitle;

    setMetaByName("description", description);

    if (canonical) {
      const sep = canonical.includes("?") ? "&" : "?";
      const esUrl = canonical;
      const enUrl = `${canonical}${sep}lang=en`;
      const selfUrl = lang === "en" ? enUrl : esUrl;

      setCanonical(selfUrl);
      setAlternate("es", esUrl);
      setAlternate("en", enUrl);
      setAlternate("x-default", esUrl);
      setMetaByProperty("og:url", selfUrl);
    }

    setMetaByProperty("og:type", ogType);
    setMetaByProperty("og:site_name", SITE_NAME);
    setMetaByProperty("og:title", fullTitle);
    setMetaByProperty("og:description", description);
    if (image) setMetaByProperty("og:image", image);

    setMetaByName("twitter:card", image ? "summary_large_image" : "summary");
    setMetaByName("twitter:title", fullTitle);
    setMetaByName("twitter:description", description);
    if (image) setMetaByName("twitter:image", image);

    const items = Array.isArray(jsonLd) ? jsonLd : jsonLd ? [jsonLd] : [];
    items.forEach((data, i) => setJsonLd(`seo-jsonld-${i}`, data));
    for (let i = items.length; i < 4; i++) setJsonLd(`seo-jsonld-${i}`, null);
  }, [title, description, canonical, ogType, image, jsonLd, lang]);

  return null;
}
