// ============================================================================
// src/lib/verdict.js
// ============================================================================
import { CATS, overallOf } from "../data/devices.js";

export function verdictText(devA, devB) {
  const overallA = overallOf(devA);
  const overallB = overallOf(devB);
  if (overallA === overallB) {
    return `${devA.name} y ${devB.name} quedan prácticamente empatados en general. La elección depende de qué categoría te importa más.`;
  }
  const winner = overallA > overallB ? devA : devB;
  const loser = overallA > overallB ? devB : devA;
  const wCats = CATS.filter((c) => winner.scores[c.key] > loser.scores[c.key]).map((c) => c.label.toLowerCase());
  const strength = wCats.length ? wCats.slice(0, 2).join(" y ") : "el balance general";
  return `${winner.name} sale mejor posicionado en general, sobre todo en ${strength}. ${loser.name} sigue siendo válido si priorizas ${CATS.filter((c) => loser.scores[c.key] >= winner.scores[c.key]).map((c) => c.label.toLowerCase())[0] || "el precio"}.`;
}
