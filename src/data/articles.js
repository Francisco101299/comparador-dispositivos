// ============================================================================
// src/data/articles.js
// Artículos del blog. Cada artículo tiene: id, title, excerpt, date, content
// (array de párrafos) y links (array de enlaces internos opcionales).
// ============================================================================

export const ARTICLES = [
  {
    id: "samsung-galaxy-s26-ultra-vs-s25-ultra",
    title: "Samsung Galaxy S26 Ultra vs Galaxy S25 Ultra: ¿vale la pena el cambio?",
    excerpt: "El Galaxy S26 Ultra estrena carga de 60W, cámara 200MP f/1.4 y Privacy Display manteniendo el precio de $1,299. Te contamos qué cambia frente al S25 Ultra.",
    date: "2026-08-12",
    content: [
      "El Samsung Galaxy S26 Ultra ya está aquí, y la gran noticia no es solo su chip Snapdragon 8 Elite Gen 5: es que Samsung mantuvo el mismo precio del S25 Ultra ($1,299) mientras mejora en lo que más se pedía.",
      "Por fin carga rápida de verdad: 60W. Históricamente el punto débil de los Galaxy. El S26 Ultra es el primero de la serie en subir a 60W, recortando minutos valiosos frente a los 45W del S25 Ultra.",
      "Cámara más luminosa. Mantiene los 200MP, pero con apertura f/1.4: más luz de noche y mejor desenfoque natural sin modo retrato.",
      "Privacy Display. Su pantalla AMOLED de 6.9 pulgadas estrena un modo de privacidad que oscurece el contenido a quien mire de lado. Ideal para el transporte público.",
      "Más ligero y delgado. Baja a 214g (vs 218g del S25 Ultra): se siente menos ladrillo en el bolsillo.",
      "¿Y el rendimiento y la batería? En nuestra base de datos el duelo está cerradísimo: el S25 Ultra aún aguanta el tipo en batería y potencia bruta, mientras el S26 Ultra gana en cámara, portabilidad y calidad-precio.",
      "Veredicto: si vienes de un S24 Ultra o anterior, el salto es claro. Si tienes el S25 Ultra, la carga de 60W y la cámara f/1.4 tentarán, pero no es un cambio obligatorio."
    ],
    links: [
      { path: "/comparar/samsung-galaxy-s26-ultra-vs-samsung-galaxy-s25-ultra", label: "Galaxy S26 Ultra vs Galaxy S25 Ultra: comparación completa" },
      { path: "/celulares", label: "Explorar todo el catálogo de celulares" }
    ]
  },
  {
    id: "iphone-plegable-bomba-2026",
    title: "iPhone plegable: el teléfono que va a sacudir la industria",
    excerpt: "Apple prepara su primer iPhone plegable: pantalla de 7.8 pulgadas sin pliegue visible, chip A20 de 2nm y precio superior a $2,000. Te contamos por qué será una bomba en la industria móvil.",
    date: "2026-08-13",
    content: [
      "La industria móvil lleva años esperando este momento: Apple finalmente entraría al mercado de los plegables. Y cuando Apple llega tarde a una categoría, suele llegar a redefinirla — pasó con el iPhone original, con el iPad y con el Apple Watch. Esto es todo lo que sabemos del llamado iPhone Fold.",
      "Diseño tipo libro, sin pliegue visible. Los reportes apuntan a un plegable tipo libro que se abre como un mini iPad: pantalla interna de aproximadamente 7.8 pulgadas y externa de 5.5 pulgadas. La gran promesa: una bisagra de metal líquido que eliminaría el pliegue visible, el mayor defecto de los plegables actuales.",
      "Chip A20 de 2 nanómetros. Sería de los primeros teléfonos con chip de 2nm: más potencia y mejor eficiencia para mover dos pantallas y multitarea real al mismo tiempo.",
      "Cámaras bajo la pantalla. Face ID y la cámara frontal quedarían escondidos bajo el panel: cero perforaciones en la pantalla interna. Una pantalla totalmente limpia.",
      "El precio: el iPhone más caro de la historia. Se estima entre $2,000 y $2,500 dólares. Apple no competirá en precio: creará la categoría del ultra premium plegable.",
      "¿Por qué será una bomba en la industria? Porque obligará a Samsung, Google y Xiaomi a responder rápido. El mercado plegable, que hoy es de nicho, podría volverse mainstream de la noche a la mañana — igual que pasó cuando el iPhone original obligó a reinventar todos los celulares.",
      "¿Esperarlo o comprar ahora? Si estás en el ecosistema Apple y te llaman los plegables: espera unos meses. Si necesitas teléfono hoy, los reyes actuales siguen siendo excelentes compras y no te vas a arrepentir."
    ],
    links: [
      { path: "/comparar/iphone-16-pro-max-vs-samsung-galaxy-s25-ultra", label: "iPhone 16 Pro Max vs Galaxy S25 Ultra: la comparación completa" },
      { path: "/celulares", label: "Explorar todo el catálogo de celulares" }
    ]
  }
];

export function getArticleById(id) {
  return ARTICLES.find((a) => a.id === id) || null;
    }
