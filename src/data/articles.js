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
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&q=80",
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
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800&q=80",
    excerpt: "Portabilidad, batería y para qué la vas a usar — las tres preguntas que debes hacerte antes de comprar.",
    date: "2026-07-20",
    content: [
      "Antes de comparar modelos específicos, conviene definir para qué vas a usar la tablet: ¿lectura y streaming, dibujo y productividad, o entretenimiento para niños? La respuesta cambia por completo qué modelo te conviene.",
      "Si el uso principal es dibujo o tomar notas, la compatibilidad con lápiz óptico y la calidad de pantalla pesan más que el rendimiento bruto. Si es solo para ver videos y navegar, casi cualquier modelo de gama media te va a servir bien.",
      "La portabilidad también importa más de lo que parece: una tablet que pesa 200g más se siente muy distinta después de sostenerla media hora leyendo.",
      ],
  },
  {
    id: "galaxy-s26-ultra-vs-s25-ultra",  title: "Samsung Galaxy S26 Ultra vs Galaxy S25 Ultra: ¿vale la pena el cambio?",
    image: "https://images.unsplash.com/photo-1592286927505-1def25115e04?w=800&q=80",
    excerpt: "El Galaxy S26 Ultra estrena carga de 60W, cámara 200MP f/1.4 más luminosa y Privacy Display manteniendo el precio de $1,299. Te contamos qué cambia frente al S25 Ultra.",
    date: "2026-08-12",
    content: [
      "El Galaxy S26 Ultra llega con tres cambios concretos frente a su antecesor: carga de 60W (la primera vez que un Galaxy S Ultra supera los 45W), una cámara principal de 200MP con apertura f/1.4 más luminosa para fotos con poca luz, y la nueva pantalla Privacy Display, que oscurece la vista lateral para que nadie más pueda ver tu pantalla en público.",
      "El cuerpo también se adelgazó a 214g, unos gramos menos que el S25 Ultra, sin sacrificar batería. Y quizás lo más importante para quien está decidiendo: Samsung mantuvo el mismo precio de $1,299 que tenía el modelo anterior, así que la actualización no viene con sobrecosto.",
      "¿Vale la pena cambiar? Si vienes de un Galaxy S24 Ultra o algo más antiguo, el salto se siente en carga, cámara y pantalla, y es un buen momento para actualizar. Si ya tienes un S25 Ultra, los cambios son notorios pero no urgentes — es una mejora de un año, no un rediseño completo.",
    ],
    links: [
      { label: "Ver comparación completa: Galaxy S26 Ultra vs Galaxy S25 Ultra", path: "/comparar/samsung-galaxy-s26-ultra-vs-samsung-galaxy-s25-ultra" },
      { label: "Explorar el catálogo de celulares", path: "/celulares" },
    ],
  },
  
];

export function getArticleById(id) {
  return ARTICLES.find((a) => a.id === id) || null;
}
