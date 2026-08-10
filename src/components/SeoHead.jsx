// ============================================================================
// src/components/SeoHead.jsx
// Gestiona el <head> por página: title, meta description, canonical,
// Open Graph/Twitter y JSON-LD. No depende de librerías externas.
// ============================================================================
import { useEffect } from "react";
import { SITE_NAME } from "../lib/seo.js";

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

export default function SeoHead({ title, description, canonical, ogType = "website", image, jsonLd }) {
  useEffect(() => {
    const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;
    document.title = fullTitle;

    setMetaByName("description", description);
    setCanonical(canonical);

    setMetaByProperty("og:type", ogType);
    setMetaByProperty("og:site_name", SITE_NAME);
    setMetaByProperty("og:title", fullTitle);
    setMetaByProperty("og:description", description);
    setMetaByProperty("og:url", canonical);
    if (image) setMetaByProperty("og:image", image);

    setMetaByName("twitter:card", image ? "summary_large_image" : "summary");
    setMetaByName("twitter:title", fullTitle);
    setMetaByName("twitter:description", description);
    if (image) setMetaByName("twitter:image", image);

    const items = Array.isArray(jsonLd) ? jsonLd : jsonLd ? [jsonLd] : [];
    items.forEach((data, i) => setJsonLd(`seo-jsonld-${i}`, data));
    for (let i = items.length; i < 4; i++) setJsonLd(`seo-jsonld-${i}`, null);
  }, [title, description, canonical, ogType, image, jsonLd]);

  return null;
}
