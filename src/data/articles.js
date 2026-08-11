// ============================================================================
// src/data/articles.js
// Catálogo de artículos del blog. Cada artículo es un objeto con id, título,
// resumen, fecha, y contenido (array de párrafos de texto simple).
// Para publicar un artículo nuevo, agrega un objeto más a este array.
// ============================================================================
import { slugify } from "../lib/slugify.js";

export const ARTICLES = [
  {
    id: "mejores-celulares-gama-media-2026",
    title: "Los mejores celulares gama media de 2026",
    excerpt: "Comparamos rendimiento, cámara y batería para encontrar el mejor equilibrio precio-calidad este año.",
    date: "2026-08-01",
    content: [
      "Elegir un celular de gama media en 2026 ya no significa sacrificar demasiado frente a la gama alta. Las diferencias en cámara y pantalla se han reducido mucho, y la mayoría de la gente no necesita el chip más potente del mercado.",
      "Al comparar opciones en esta categoría, lo primero que recomendamos revisar es la batería y la velocidad de carga — es donde más se nota la diferencia en el uso diario, más que el rendimiento puro del procesador.",
      "Usa el comparador para poner dos modelos de gama media frente a frente y revisar la categoría de precio-calidad, que resume qué tan bien aprovechado está cada dólar invertido.",
    ],
  },
  {
    id: "como-elegir-tablet",
    title: "Cómo elegir una tablet: guía rápida",
    excerpt: "Portabilidad, batería y para qué la vas a usar — las tres preguntas que debes hacerte antes de comprar.",
    date: "2026-07-20",
    content: [
      "Antes de comparar modelos específicos, conviene definir para qué vas a usar la tablet: ¿lectura y streaming, dibujo y productividad, o entretenimiento para niños? La respuesta cambia por completo qué modelo te conviene.",
      "Si el uso principal es dibujo o tomar notas, la compatibilidad con lápiz óptico y la calidad de pantalla pesan más que el rendimiento bruto. Si es solo para ver videos y navegar, casi cualquier modelo de gama media te va a servir bien.",
      "La portabilidad también importa más de lo que parece: una tablet que pesa 200g más se siente muy distinta después de sostenerla media hora leyendo.",
    ],
  },
];

export function getArticleById(id) {
  return ARTICLES.find((a) => a.id === id) || null;
}
