// ============================================================================
// src/lib/normalize.js
// ============================================================================
export function normalize(str) {
  return str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}
