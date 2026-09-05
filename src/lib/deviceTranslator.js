// ============================================================================
// src/lib/deviceTranslator.js
// Traduce al vuelo el contenido de un dispositivo (details, specs) del
// español al inglés, SIN modificar los archivos de datos originales.
// Se usa así: const dev = translateDevice(originalDevice, lang);
//
// Estrategia (en este orden):
//   1. Diccionario de frases EXACTAS (las más comunes, repetidas en todo
//      el catálogo) — cobertura alta con lista corta.
//   2. Reglas de PATRÓN (regex) para números + unidades + conectores
//      ("Doble 50MP" -> "Dual 50MP", "12GB a 1TB" -> "12GB to 1TB", etc.)
//   3. Fallback: si nada matchea, se devuelve el texto original en
//      español — nunca rompe, nunca muestra undefined. Si ves frases
//      en español en la versión "en", es una señal de que faltan sumar
//      al diccionario, no un bug.
// ============================================================================

// --- 1. Diccionario de frases exactas (case-sensitive, tal cual aparecen) ---
const PHRASES = {
  // Frases genéricas de precioCalidad / veredicto de valor
  "Premium": "Premium",
  "Buen equilibrio": "Well balanced",
  "Muy buen equilibrio": "Very well balanced",
  "Bajó de precio": "Price has dropped",
  "Bajó bastante de precio": "Price has dropped a lot",
  "Gama premium": "Premium tier",
  "Muy buen valor": "Very good value",
  "Muy buen valor premium": "Very good premium value",
  "Excelente valor": "Excellent value",
  "Excelente valor global": "Excellent global value",
  "Muy económico": "Very affordable",
  "Económico": "Affordable",
  "Económica": "Affordable",
  "Económica regional": "Affordable regionally",
  "Buen valor": "Good value",
  "Buen valor gama media": "Good mid-range value",
  "Buen valor básico": "Good basic value",
  "Gama media, buen valor": "Mid-range, good value",
  "Gama media accesible": "Accessible mid-range",
  "Gama media": "Mid-range",
  "Muy popular en su gama": "Very popular in its tier",
  "Muy vendido en su gama": "Best-seller in its tier",
  "Muy vendido, buen precio": "Best-seller, good price",
  "Entrada muy económica": "Very affordable entry level",
  "Entrada de POCO": "POCO's entry model",
  "Entrada accesible": "Affordable entry level",
  "Buena entrada": "Good entry point",
  "Uno de los más baratos del mercado": "One of the cheapest on the market",
  "Lo más básico y barato": "The most basic and cheapest",
  "Ultra básico": "Ultra basic",
  "El más ambicioso de Lava": "Lava's most ambitious model",
  "Innovación premium": "Premium innovation",
  "Muy buena cámara con IA": "Very good AI camera",
  "Muy buena cámara": "Very good camera",
  "Cámara de referencia": "Benchmark camera",
  "Enfocado en cámara": "Camera-focused",
  "Cámara top en plegable": "Top camera for a foldable",
  "Gran cámara, limitado por software": "Great camera, limited by software",
  "Excelente cámara, limitado": "Excellent camera, limited",
  "Cámara excelente, software limitado": "Excellent camera, limited software",
  "Muy buena cámara premium": "Very good premium camera",
  "Caro y limitado fuera de China": "Expensive and limited outside China",
  "Caro y limitado": "Expensive and limited",
  "Muy caro y limitado": "Very expensive and limited",
  "Nicho y caro": "Niche and expensive",
  "Nicho, caro": "Niche, expensive",
  "Muy caro": "Very expensive",
  "Caro por el formato": "Expensive because of the form factor",
  "Caro pero dura años": "Expensive but lasts for years",
  "Caro pero pro": "Expensive but professional-grade",
  "Cara pero pro": "Expensive but professional-grade",
  "Caro pero eterno": "Expensive but built to last",
  "Solo para uso profesional extremo": "For extreme professional use only",
  "Tope de gama de Apple 2024": "Apple's top tier for 2024",
  "Tope de gama media": "Top of the mid-range",
  "Tope de gama profesional": "Professional top tier",
  "Gama alta profesional": "Professional high-end",
  "Gama alta muy accesible": "Very affordable high-end",
  "Compacto y potente": "Compact and powerful",
  "Bajó de precio con el tiempo": "Price dropped over time",
  "Muy accesible ya": "Very affordable by now",
  "Compacto ya económico": "Compact and now affordable",
  "El iPhone más barato": "The cheapest iPhone",
  "iPhone económico más reciente": "The newest budget iPhone",
  "Clásico aún vigente": "A classic that still holds up",
  "Sigue siendo muy sólida": "Still very solid",
  "Diseño ya antiguo": "Dated design by now",
  "Poco conocido pero potente": "Little known but powerful",
  "Flagship poco conocido": "Little known flagship",
  "Buen flagship de su época": "Good flagship for its time",
  "Especializado en gaming": "Gaming-specialized",
  "Referencia gaming": "Gaming benchmark",
  "Gran potencia por precio": "Great power for the price",
  "Excelente relación potencia-precio": "Excellent power-to-price ratio",
  "Excelente relación calidad-precio": "Excellent value for money",
  "Rendimiento a buen precio": "Performance at a good price",
  "Diseño distintivo": "Distinctive design",
  "Diseño cuidado en gama media": "Well-crafted mid-range design",
  "Diseño modular único": "Unique modular design",
  "Diseño futurista": "Futuristic design",
  "El plegable más delgado": "The thinnest foldable",
  "Batería enorme para ser plegable": "Huge battery for a foldable",
  "Buena cámara para ser plegable": "Good camera for a foldable",
  "Muy bien valorado como plegable": "Highly rated as a foldable",
  "Plegable premium chino": "Premium Chinese foldable",
  "Primer plegable de Google": "Google's first foldable",
  "El más delgado del mercado": "The thinnest on the market",
  "Batería muy grande": "Very large battery",
  "Batería enorme": "Huge battery",
  "Gran autonomía": "Great battery life",
  "Buena autonomía": "Good battery life",
  "Buena batería": "Good battery",
  "Diseño elegante, gran batería": "Elegant design, great battery",
  "Ligero para su gama": "Light for its tier",
  "Ligero para su tamaño": "Light for its size",
  "AMOLED en gama baja": "AMOLED at a low price",
  "AMOLED accesible": "Affordable AMOLED",
  "AMOLED gigante por $99": "Giant AMOLED for $99",
  "Pantalla resistente a caídas": "Drop-resistant screen",
  "Pantalla sobresaliente": "Outstanding display",
  "Carga muy rápida": "Very fast charging",
  "Carga rápida en su gama": "Fast charging for its tier",
  "Carga ultrarrápida": "Ultra-fast charging",
  "Sin 5G por sanciones": "No 5G due to sanctions",
  "Sin apps Google": "No Google apps",
  "Muy caro y limitado por sanciones": "Very expensive and limited by sanctions",
  "Buen equilibrio gama media": "Well balanced mid-range",
  "Buen punto medio": "Good middle ground",
  "Colaboración con Leica": "Leica collaboration",
  "Primera colaboración Hasselblad": "First Hasselblad collaboration",
  "Diseño único": "Unique design",
  "Buen valor, diseño único": "Good value, unique design",
  "Batería enorme, buen precio": "Huge battery, good price",
  "El favorito de corredores": "A favorite among runners",
  "El mejor reloj para iPhone": "The best watch for iPhone",
  "Para deporte extremo": "For extreme sports",
  "El Apple Watch accesible": "The affordable Apple Watch",
  "El mejor para Android": "The best for Android",
  "Rival del Ultra de Apple": "Apple Ultra's rival",
  "Wear OS económico": "Affordable Wear OS",
  "Integración Fitbit": "Fitbit integration",
  "Autonomía top por poco precio": "Top battery life for a low price",
  "De los más baratos con GPS": "One of the cheapest with GPS",
  "Bienestar y sueño avanzados": "Advanced wellness and sleep tracking",
  "Sin WhatsApp en algunos países": "No WhatsApp in some countries",
  "Muy completo por su precio": "Very complete for its price",
  "Salud y deporte serios": "Serious health and sports tracking",
  "Salud con app líder": "Health tracking with a leading app",
  "La mejor banda fitness": "The best fitness band",
  "Fuerte en mercados emergentes": "Strong in emerging markets",
  "Muy popular en mercados emergentes": "Very popular in emerging markets",
  "Popular en su momento": "Popular at the time",
  "Marca brasileña muy vendida": "Best-selling Brazilian brand",
  "Muy popular en Brasil": "Very popular in Brazil",
  "Marca india en crecimiento": "Growing Indian brand",
  "Muy popular en India": "Very popular in India",
  "Entre los más baratos de India": "Among the cheapest in India",
  "Pensado para el primer smartphone": "Designed for a first smartphone",
  "Popular en mercado hispano de EE.UU.": "Popular in the US Hispanic market",
  "Económico en Latinoamérica": "Affordable in Latin America",
  "Buen valor en su región": "Good value in its region",
  "Buen valor global": "Good global value",
  "Muy popular en su época": "Very popular at the time",
  "Buen valor en su momento": "Good value at the time",
  // Tools (precioCalidad / durabilidad / ergonomía)
  "Pro a buen precio": "Pro-level at a good price",
  "Confiable": "Reliable",
  "Estándar de taller": "Workshop standard",
  "Caro pero dura años.": "Expensive but lasts for years.",
  "Ideal primer taladro": "Ideal first drill",
  "Kit completo barato": "Cheap complete kit",
  "Popular en México": "Popular in Mexico",
  "Económico y disponible": "Affordable and available",
  "La más vendida": "The best-seller",
  "Clásica de taller": "Workshop classic",
  "Potencia pro": "Pro power",
  "Calidad alemana": "German quality",
  "Muy económica": "Very affordable",
  "La más barata usable": "The cheapest usable one",
  "Imbatible en precio": "Unbeatable on price",
  "Cara pero pro.": "Expensive but professional-grade.",
  "Confiable.": "Reliable.",
  "Para el hogar": "For home use",
  "Estándar SDS": "SDS standard",
  "Duradero": "Durable",
  "Potente": "Powerful",
  "Muy económico.": "Very affordable.",
  "La favorita para empezar": "The favorite to get started",
  "Cara pero pro": "Expensive but professional-grade",
  "Gran valor pro": "Great pro-level value",
  "Muy versátil por el precio": "Very versatile for the price",
  "Económica regional.": "Affordable regionally.",
  "Clásica confiable": "Reliable classic",
  "Versátil sin cable": "Versatile cordless",
  "Precisa": "Precise",
  "Estándar profesional": "Professional standard",
  "Muy buena": "Very good",
  "Duradera": "Durable",
  "Buena": "Good",
  "Sólido": "Solid",
  "Muy accesible": "Very affordable",
  "Buen tamaño": "Good size",
  "Duradero.": "Durable.",
  "Muy accesible.": "Very affordable.",
  "Líder del mercado": "Market leader",
  "Muy buena.": "Very good.",
  "Económica": "Affordable",
  // Rasgos comunes de baterías/energía inalámbrica
  "Muy eficiente": "Very efficient",
  "Consume mucho": "High power draw",
  "Consume muchísimo": "Very high power draw",
  "Eficiente para su potencia": "Efficient for its power",
  "ChromeOS ligero": "Lightweight ChromeOS",
  "Gran autonomía.": "Great battery life.",
  "Torre i5 eficiente": "Efficient i5 tower",
  "Muy eficiente (M3)": "Very efficient (M3)",
  "Muy eficiente (M4)": "Very efficient (M4)",
  "Ultra eficiente (M4)": "Ultra efficient (M4)",
  "Excelente para creadores": "Excellent for creators",
  "Carga estándar": "Standard charging",
  "Carga rápida": "Fast charging",
  "Carga simple": "Simple charging",
  "Carga magnética": "Magnetic charging",
  "Carga magnética rápida": "Fast magnetic charging",
  "Carga inalámbrica": "Wireless charging",
  "Carga inalámbrica rápida": "Fast wireless charging",
  "Carga propietaria": "Proprietary charging",
  "Con cable (sin batería)": "Corded (no battery)",
  "Plataforma M18": "M18 platform",
  "Sin música offline": "No offline music",
  "Sin música offline sin Premium": "No offline music without Premium",
  "Sin almacenamiento": "No storage",
  "Almacenamiento básico": "Basic storage",
  "Sin certificación": "No certification",
  // Frases nuevas: generación 2025-2026, tablets, drones, relojes extra
  "El iPhone más vendido de su año": "The best-selling iPhone of its year",
  "Bajó mucho de precio": "Price has dropped a lot",
  "Aún muy vigente y más barato": "Still very relevant and cheaper now",
  "El gama media más vendido de 2025": "The best-selling mid-ranger of 2025",
  "Muy equilibrado": "Very well balanced",
  "Superventas en Latinoamérica": "Best-seller in Latin America",
  "El gama media más completo": "The most complete mid-ranger",
  "Potencia de flagship a precio medio": "Flagship power at a mid-range price",
  "El favorito de los gamers económicos": "The favorite of budget gamers",
  "Muy querido en Latinoamérica": "Very popular in Latin America",
  "El indestructible de la gama media": "The indestructible mid-ranger",
  "El plegable más popular": "The most popular foldable",
  "Batería gigante en gama media": "Huge battery in a mid-ranger",
  "El gama media a vencer en 2026": "The mid-ranger to beat in 2026",
  "El iPhone más grande de su generación": "The largest iPhone of its generation",
  "Pantalla grande sin pagar precio Pro": "Big screen without the Pro price tag",
  "Ideal para quien prefiere celulares pequeños": "Ideal for those who prefer small phones",
  "El último iPhone mini de Apple": "Apple's last iPhone mini",
  "El iPhone más económico de su época": "The cheapest iPhone of its time",
  "Versión \"Fan Edition\" muy bien valorada en su momento": "The \"Fan Edition\" model, well regarded at the time",
  "Inició la numeración S20": "Started the S20 numbering",
  "Con lector de profundidad para retratos": "With a depth sensor for portraits",
  "Versión más accesible de la línea Note 20": "The most affordable model in the Note 20 line",
  "El Note más grande de su generación": "The largest Note of its generation",
  "De los mejores gama media de su año": "One of the best mid-rangers of its year",
  "Popularizó los Pixel \"a\" económicos": "Popularized the budget Pixel \"a\" line",
  "Muy bien valorado por su pantalla de 90Hz": "Well regarded for its 90Hz screen",
  "Uno de los gama de entrada más vendidos": "One of the best-selling entry-level phones",
  "Tope de gama deportivo": "Top-tier for sports",
  "El reloj más completo": "The most complete watch",
  "El mejor con Android": "The best for Android",
  "Wear OS barato": "Affordable Wear OS",
  "Diseño y Fitbit": "Design and Fitbit",
  "El favorito de runners serios": "The favorite of serious runners",
  "Indestructible": "Indestructible",
  "Garmin versátil": "Versatile Garmin",
  "Estilo y batería": "Style and battery life",
  "Clásico económico": "Affordable classic",
  "Muy barato para lo que da": "Very cheap for what it offers",
  "Entrada al 4K barato": "Affordable entry into 4K",
  "Alternativa a Mini de DJI": "Alternative to the DJI Mini",
  "Buen tamaño medio": "Good mid-size option",
  "Marca francesa, nicho": "French brand, niche",
  "Primer dron con GPS barato": "First affordable drone with GPS",
  "Ideal para aprender": "Ideal for learning",
  "El mejor valor premium": "The best premium value",
  "Premium actualizado": "Updated premium",
  "Potencia extrema pro": "Extreme pro-level power",
  "Corporativa accesible": "Affordable corporate laptop",
  "Gaming accesible 2024": "Affordable gaming, 2024",
  "Estudiantil popular": "Popular student laptop",
  "Delgada y barata": "Thin and cheap",
  "ChromeOS fluido": "Smooth ChromeOS",
  "Compacta premium": "Premium compact",
  "Ligereza extrema": "Extreme lightness",
  "Gaming a buen precio": "Gaming at a good price",
  "Pantalla grande accesible": "Affordable big screen",
  "Buen valor diario": "Good everyday value",
  "Pantalla top por el precio": "Top screen for the price",
  "La más económica del grupo": "The most affordable in the group",
  "Carga USB básica": "Basic USB charging",
  "Carga por cable": "Cable charging",
  "Carga solar": "Solar charging",
  "Carga USB-C": "USB-C charging",
  "Sin microSD": "No microSD",
  "Básica": "Basic",
};

// --- 2. Reglas de patrón (regex), aplicadas en orden ---
const PATTERN_RULES = [
  // "12GB a 1TB" -> "12GB to 1TB" (rango numérico con "a")
  [/(\d)\s+a\s+(\d)/g, "$1 to $2"],
  // Cantidad de cámaras
  [/\bDoble\b/g, "Dual"],
  [/\bTriple\b/g, "Triple"],
  [/\bCuádruple\b/g, "Quad"],
  [/\bCámara única\b/gi, "Single camera"],
  // Núcleos
  [/(\d+)\s*núcleos/gi, "$1 cores"],
  [/8 núcleos o más/gi, "8 cores or more"],
  // Video / duración
  [/Hasta (\d+)h video/gi, "Up to $1h video"],
  [/(\d+)\s*d[ií]as?/gi, "$1 days"],
  [/(\d+)\s*h\b/g, "$1h"],
  // Audio
  [/Altavoces estéreo/gi, "Stereo speakers"],
  [/Altavoz mono/gi, "Mono speaker"],
  // Resistencia / certificación
  [/hasta (\d+)\s*m\)/gi, "up to $1 m)"],
  [/según versión/gi, "depending on version"],
  [/certificación anti-caídas/gi, "drop-resistant certification"],
  // Vuelo (drones)
  [/(\d+)\s*min de vuelo/gi, "$1 min flight time"],
  // Conectores comunes
  [/\bcon\b/g, "with"],
  [/\by\b/g, "and"],
  [/\bsin\b/gi, "without"],
];

/**
 * Traduce un string suelto usando diccionario exacto primero, y si no hay
 * match, aplica las reglas de patrón sobre el texto original. Si nada
 * cambia nada, devuelve el texto tal cual (fallback en español).
 */
export function translateText(text) {
  if (!text || typeof text !== "string") return text;
  if (PHRASES[text]) return PHRASES[text];

  let result = text;
  let matchedAnyPattern = false;
  for (const [regex, replacement] of PATTERN_RULES) {
    if (regex.test(result)) {
      matchedAnyPattern = true;
    }
    result = result.replace(regex, replacement);
  }
  // Si no matcheó nada (ni diccionario ni patrones), devolvemos el
  // original en español -- mejor mostrar español que romper la UI.
  return result;
}

/**
 * Traduce un dispositivo completo. NO modifica el original: devuelve un
 * objeto nuevo. Si lang !== "en", devuelve el dispositivo sin tocar.
 */
export function translateDevice(device, lang) {
  if (lang !== "en" || !device) return device;

  const translatedDetails = {};
  if (device.details) {
    for (const [key, value] of Object.entries(device.details)) {
      translatedDetails[key] = translateText(value);
    }
  }

  const translatedSpecs = {};
  if (device.specs) {
    for (const [key, value] of Object.entries(device.specs)) {
      translatedSpecs[key] = translateText(value);
    }
  }

  return {
    ...device,
    details: translatedDetails,
    specs: device.specs ? translatedSpecs : device.specs,
  };
    }
  
