// ============================================================================
// src/lib/slugify.js
// Convierte nombres de dispositivos en slugs amigables para URL.
// ============================================================================
export function slugify(str) {
  return str
    .toString()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
