// ============================================================================
// src/lib/articleTranslator.js
// Traduce título, extracto, contenido y enlaces de un artículo del blog al
// inglés, SIN modificar src/data/articles.js (que sigue siendo la fuente
// canónica en español). Se usa así: const art = translateArticle(original, lang);
//
// A diferencia de deviceTranslator.js (diccionario de frases cortas + regex,
// pensado para specs tipo "Doble 50MP"), acá cada artículo es prosa larga y
// única, así que se traduce completo por id en vez de por fragmentos.
//
// Si un artículo nuevo no tiene entrada acá todavía, translateArticle()
// devuelve el original en español sin romper nada -- es la señal de que
// falta agregar su traducción, no un bug.
// ============================================================================

const ARTICLE_TRANSLATIONS = {
  "mejores-celulares-gama-media-2026": {
    title: "The best mid-range phones of 2026",
    excerpt: "We compare performance, camera and battery to find the best value for money this year.",
    content: [
      "Choosing a mid-range phone in 2026 no longer means giving up much compared to flagships. Camera and display differences have narrowed significantly, and most people don't need the most powerful chip on the market.",
      "When comparing options in this category, the first thing we recommend checking is battery life and charging speed — that's where you'll notice the difference in daily use more than raw processor performance.",
      "Use the comparator to put two mid-range models side by side and check the value-for-money category, which sums up how well each dollar spent is used.",
    ],
  },
  "como-elegir-tablet": {
    title: "How to choose a tablet: quick guide",
    excerpt: "Portability, battery life, and what you'll use it for — the three questions to ask yourself before buying.",
    content: [
      "Before comparing specific models, it's worth defining what you'll mainly use the tablet for: reading and streaming, drawing and productivity, or entertainment for kids? The answer completely changes which model suits you.",
      "If the main use is drawing or note-taking, stylus support and display quality matter more than raw performance. If it's just for watching videos and browsing, almost any mid-range model will serve you well.",
      "Portability also matters more than it seems: a tablet that weighs 200g more feels very different after holding it for half an hour while reading.",
    ],
  },
  "galaxy-s26-ultra-vs-s25-ultra": {
    title: "Samsung Galaxy S26 Ultra vs Galaxy S25 Ultra: is the upgrade worth it?",
    excerpt: "The Galaxy S26 Ultra debuts 60W charging, a brighter 200MP f/1.4 camera, and Privacy Display while keeping the $1,299 price. Here's what changes versus the S25 Ultra.",
    content: [
      "The Galaxy S26 Ultra arrives with three concrete changes over its predecessor: 60W charging (the first time a Galaxy S Ultra has topped 45W), a 200MP main camera with a brighter f/1.4 aperture for low-light photos, and the new Privacy Display, which dims the side view so no one else can see your screen in public.",
      "The body also got thinner at 214g, a few grams less than the S25 Ultra, without sacrificing battery life. And perhaps most important for anyone deciding: Samsung kept the same $1,299 price as the previous model, so the upgrade doesn't come with a markup.",
      "Is it worth switching? If you're coming from a Galaxy S24 Ultra or older, the jump is noticeable in charging, camera, and display, and it's a good time to upgrade. If you already have an S25 Ultra, the changes are noticeable but not urgent — it's a one-year refinement, not a full redesign.",
    ],
    links: [
      { label: "See the full comparison: Galaxy S26 Ultra vs Galaxy S25 Ultra" },
      { label: "Browse the phone catalog" },
    ],
  },
  "iphone-plegable-bomba-2026": {
    title: "Foldable iPhone: the phone that's about to shake up the industry",
    excerpt: "Apple is preparing its first foldable iPhone: a 7.8-inch screen with no visible crease, a 2nm A20 chip, and a price above $2,000. Here's why it'll be huge for the mobile industry.",
    content: [
      "The mobile industry has been waiting years for this moment: Apple is finally entering the foldable market. And when Apple arrives late to a category, it tends to redefine it — it happened with the original iPhone, the iPad, and the Apple Watch. Here's everything we know about the so-called iPhone Fold.",
      "Book-style design, no visible crease. Reports point to a book-style foldable that opens like a mini iPad: an inner display of roughly 7.8 inches and an outer one of 5.5 inches. The big promise: a liquid-metal hinge that would eliminate the visible crease, the biggest flaw of current foldables.",
      "2-nanometer A20 chip. It would be among the first phones with a 2nm chip: more power and better efficiency to drive two screens and real multitasking at once.",
      "Under-display cameras. Face ID and the front camera would be hidden under the panel: zero cutouts on the inner screen. A completely clean display.",
      "The price: the most expensive iPhone ever. Estimated between $2,000 and $2,500. Apple won't compete on price — it'll create the ultra-premium foldable category.",
      "Why will it shake up the industry? Because it will force Samsung, Google, and Xiaomi to respond fast. The foldable market, still a niche today, could go mainstream overnight — just like when the original iPhone forced every phone to be reinvented.",
      "Wait for it or buy now? If you're in the Apple ecosystem and foldables appeal to you: wait a few months. If you need a phone today, the current flagships are still excellent buys and you won't regret it.",
    ],
    links: [
      { label: "See the comparison: iPhone 16 Pro Max vs Galaxy S25 Ultra" },
      { label: "Browse the phone catalog" },
    ],
  },
  "honor-robot-phone": {
    title: "Honor Robot Phone: the phone with a robotic arm is real",
    excerpt: "Honor launched the Robot Phone, a phone with a titanium robotic arm that moves its 200MP camera to automatically track subjects. Starting at $1,500, for now only in China.",
    content: [
      "Honor has officially launched the Robot Phone, a phone that departs completely from traditional design. Its main feature is a titanium robotic arm with 4 degrees of freedom built into the back, which physically moves the 200MP main camera to track moving subjects, capture automatic cinematic shots, and offer professional-grade stabilization.",
      "The camera system was developed in collaboration with ARRI (the brand behind cameras used in professional filmmaking), giving the Robot Phone cinema-grade color profile recording — something no other phone offers natively. Besides the gimbal-mounted main camera, it includes a telephoto lens and a 50MP ultra-wide.",
      "Inside, it runs Qualcomm's latest processor (Snapdragon 8 Elite Gen 5), a flat 1.5K display with ultra-thin bezels, a large-capacity battery, and 120W fast charging. The starting price is around $1,500, and for now it's only available in China — it's not yet confirmed whether it will reach other countries.",
      "It's a device aimed more at video content creators than everyday use, but it points to an interesting direction: cameras that physically move instead of relying only on software stabilization. It remains to be seen whether other brands follow suit.",
    ],
    links: [
      { label: "See the full Honor Robot Phone spec sheet" },
      { label: "Browse the phone catalog" },
    ],
  },
  "honor-600-vs-redmi-note-15-pro-plus": {
    title: "HONOR 600 vs Redmi Note 15 Pro+: which one wins in 2026",
    excerpt: "Same price ($499), but different priorities: a massive 7000mAh battery on the HONOR versus 100W charging, IP68, and 512GB on the Redmi. Here's which one suits you.",
    content: [
      "The HONOR 600 and the Redmi Note 15 Pro+ are the two most talked-about mid-rangers of 2026, and both cost $499. At first glance they look similar — 200MP cameras, 120Hz AMOLED screens, and huge batteries — but in daily use each one shines in different ways.",
      "On battery, the HONOR 600 is the king of endurance: 7000mAh with 80W charging, one of the largest batteries in the category. The Redmi Note 15 Pro+ comes in at 6500mAh but charges faster (100W). If your day is long and you don't always have an outlet nearby, the HONOR gives you more peace of mind; if you'd rather top up in minutes, go with the Redmi.",
      "On display, the Redmi is bigger and higher-resolution: a 6.83-inch 1.5K AMOLED at 120Hz, great for shows and gaming. The HONOR sports a 6.57-inch 120Hz AMOLED, more compact and comfortable for one-handed use.",
      "On camera, both use 200MP sensors, but the Redmi's is physically larger (1/1.4 inch) and captures more light, which shows in night photos. The HONOR counters with a 12MP ultra-wide, more versatile for landscapes and group photos.",
      "On performance, the Redmi's Snapdragon 7s Gen 4 slightly edges out the HONOR's 7 Gen 4, and it also doubles the storage: 512GB versus 256GB, with the same 12GB of RAM. For gamers and hoarders, point to the Redmi.",
      "On design, the HONOR is lighter and thinner (185g and 7.8mm). The Redmi, meanwhile, offers IP68 water and dust resistance, uncommon at this price and genuinely valuable day to day.",
      "Verdict: pick the HONOR 600 if you prioritize extreme battery life and a light phone; pick the Redmi Note 15 Pro+ if you want a bigger screen, faster charging, water resistance, and double the storage. On value for money, both are among the best of 2026 — it comes down to how you use it.",
    ],
    links: [
      { label: "See the full comparison: HONOR 600 vs Redmi Note 15 Pro+" },
      { label: "Browse the phone catalog" },
    ],
  },
  "mejor-taladro-calidad-precio-2026": {
    title: "The best value-for-money drill of 2026: quick guide",
    excerpt: "We compare the best-selling drills of 2026 (from $45 to $179) and tell you which one fits your needs: home, workshop, or job site.",
    content: [
      "If you're about to buy your first drill or want to retire one that's given up, this guide saves you time: we compare 2026's best-selling models on value for money and tell you which one fits your needs.",
      "For home use and furniture assembly, the Black+Decker BDCD120 ($59) and the Bosch GSB 13 RE ($55) are the smartest buys: light, cheap, and enough for wood, metal, and light wall work. The Bosch adds hammer function, useful if you'll occasionally drill into concrete.",
      "If you already do workshop or installation work, the DeWalt DCD791 ($179) is the sweet spot: a 70 Nm brushless motor, two 20V batteries, and the durability of the brand most used by professionals in Latin America. It's not the cheapest, but it's the one least likely to let you down.",
      "For concrete and job sites you need real hammer action: the Makita DHP484 ($149) and the Pretul TAL-850 ($45) both deliver, but in very different tiers. The Pretul is corded and tough for its price; the Makita is cordless and shares batteries with Makita's whole 18V ecosystem.",
      "Quick recommendation: home use → Bosch GSB 13 RE; workshop and frequent use → DeWalt DCD791; job site on a tight budget → Pretul TAL-850. And if you already have batteries from one brand, stick with that ecosystem — batteries are the big expense.",
      "Want to see the numbers side by side? Use the tool comparator and put two models head to head on power, battery, speed, and durability before deciding.",
    ],
    links: [
      { label: "Compare: DeWalt DCD791 vs Makita DHP484" },
      { label: "Browse the drill catalog" },
    ],
  },
  "como-elegir-laptop": {
    title: "How to choose a laptop: quick guide",
    excerpt: "Performance, portability, and operating system — the three decisions that really matter before buying a laptop, without getting lost in specs.",
    content: [
      "Before comparing models, define what you'll mostly use it for: if it's browsing, office work, and streaming, almost any mid-range laptop will do the job. If it's video editing, design, or heavy programming, performance becomes priority number one. And if it's gaming, you need a dedicated graphics card, not just a good processor.",
      "The choice of operating system matters more than it seems. MacBooks (macOS) tend to win on battery life and build quality, but cost more and offer less price variety. Windows gives you options across every price range and better game compatibility, but battery life varies a lot from model to model — that's why it's worth checking the battery category in the comparator before deciding, not just the list price.",
      "If you prioritize portability (you'll carry it every day), look for lightweight 13-14 inch models built as ultraportables; if you'll mostly use it at a desk, a 15-16 inch model gives you more screen and better cooling for heavy workloads, at the cost of more weight.",
      "On memory and storage, 8GB of RAM already feels tight in 2026 — 16GB is a reasonable starting point for most uses, and go up to 32GB only if you edit video or run virtual machines. Use the comparator to put two models side by side on performance, portability, and value for money before buying.",
    ],
    links: [
      { label: "Compare: MacBook Air M3 vs Dell XPS 13" },
      { label: "Browse the computer catalog" },
    ],
  },
  "que-dron-comprar-2026": {
    title: "Which drone to buy in 2026: quick guide",
    excerpt: "From $99 to $2,199 — we compare 2026's best-selling drones by use case: learning, travel, FPV, or professional photography.",
    content: [
      "Before looking at models, the first thing to check is weight: drones under 250g (the entire DJI Mini line, for example) are usually exempt from mandatory registration in most countries, while bigger, heavier drones almost always require it. If it's your first drone, that difference saves you paperwork.",
      "To learn or try it out without spending much, the DJI Neo ($199) is the most sensible entry point: it weighs very little, has automatic active tracking, and you don't need a separate controller to start flying. For something even cheaper just to practice indoors, the Ryze Tello ($99) uses DJI technology at a minimal price, though with far fewer features.",
      "If you want a drone for traveling and filming landscapes, the sweet spot is the DJI Mini 4K ($299) or the DJI Mini 3 ($419): compact, good wind resistance, and a camera good enough for social media. One step up, the DJI Mini 3 Pro ($759) adds collision-avoidance sensors, useful if you'll fly near trees or structures.",
      "For more professional-level photo and video, the DJI Air 3S ($1,099) is among the best in its price range: dual camera and sensors for flying at night. If the budget allows for more, the DJI Mavic 3 Pro ($2,199) is the reference point for collision-avoidance sensor speed (APAS 5.0) and tends to be the choice of those who already fly professionally.",
      "If instead you're interested in FPV style (first-person flying, more sporty and agile), the DJI Avata 2 ($999) is the model built exactly for that, with Acro mode for maneuvers.",
      "Outside the DJI ecosystem there are good options too: the Autel EVO Nano+ ($949) and the Autel EVO Lite+ ($1,249) are solid alternatives with 360° sensors, and the FIMI X8 Mini ($399) is among the most affordable options with good wind resistance.",
      "Quick recommendation: learning/trying it out → DJI Neo; travel and social media → DJI Mini 4K; professional photography → DJI Air 3S; FPV → DJI Avata 2. Use the comparator to put two models side by side on performance, battery, and value for money before deciding.",
    ],
    links: [
      { label: "Compare: DJI Mini 4K vs DJI Mini 3" },
      { label: "Browse the drone catalog" },
    ],
  },
};

/**
 * Traduce un artículo completo. NO modifica el original: devuelve un objeto
 * nuevo. Si lang !== "en", o no hay traducción todavía para ese id, devuelve
 * el artículo sin tocar (en español) -- nunca rompe, nunca muestra undefined.
 * Los `links[].path` NUNCA se traducen (son rutas reales del sitio); solo se
 * traduce `links[].label`, emparejando por posición con el array original.
 */
export function translateArticle(article, lang) {
  if (lang !== "en" || !article) return article;

  const t = ARTICLE_TRANSLATIONS[article.id];
  if (!t) return article;

  const translatedLinks = article.links
    ? article.links.map((l, i) => ({
        ...l,
        label: (t.links && t.links[i] && t.links[i].label) || l.label,
      }))
    : article.links;

  return {
    ...article,
    title: t.title || article.title,
    excerpt: t.excerpt || article.excerpt,
    content: t.content || article.content,
    links: translatedLinks,
  };
  }

