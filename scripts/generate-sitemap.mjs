// ============================================================================
// scripts/generate-sitemap.mjs
// Genera public/sitemap.xml a partir del catálogo real de dispositivos y blog.
// Uso: node scripts/generate-sitemap.mjs
// ============================================================================
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import { DEVICES } from "../src/data/devices.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

const SITE_URL = "https://comparador-dispositivos.vercel.app";
const today = new Date().toISOString().slice(0, 10);

// Intenta cargar los posts del blog. Si no existe el archivo, continúa sin fallar.
let POSTS = [];
try {
  const blogMod = await import("../src/data/blog.js");
  POSTS = blogMod.POSTS || blogMod.default || [];
} catch (e) {
  // No hay archivo de blog todavía o dio error, seguimos sin él.
}

const staticUrls = [
  { loc: "/", priority: "1.0", changefreq: "weekly" },
  { loc: "/celulares", priority: "0.8", changefreq: "weekly" },
  { loc: "/computadoras", priority: "0.8", changefreq: "weekly" },
  { loc: "/tablets", priority: "0.8", changefreq: "weekly" },
  { loc: "/relojes", priority: "0.8", changefreq: "weekly" },
  { loc: "/blog", priority: "0.8", changefreq: "daily" },
  { loc: "/sugerir", priority: "0.5", changefreq: "monthly" },
  { loc: "/privacidad", priority: "0.3", changefreq: "yearly" },
  { loc: "/contacto", priority: "0.3", changefreq: "yearly" },
];

const deviceUrls = DEVICES.map((d) => ({
  loc: `/${d.slugType}/${d.slug}`,
  priority: "0.7",
  changefreq: "monthly",
}));

const blogUrls = POSTS.map((p) => ({
  loc: `/blog/${p.slug}`,
  priority: "0.8",
  changefreq: "weekly",
}));

const allUrls = [...staticUrls, ...deviceUrls, ...blogUrls];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls
  .map(
    (u) => `  <url>
    <loc>${SITE_URL}${u.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>
`;

const outPath = resolve(__dirname, "../public/sitemap.xml");
writeFileSync(outPath, xml, "utf-8");
console.log(`sitemap.xml generado con ${allUrls.length} URLs -> ${outPath}`);
