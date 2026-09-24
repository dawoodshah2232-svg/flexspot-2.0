// ============================================================
// FlexSpot 2.0 — sitemap generator. Runs on `prebuild`
// (npm run build) and writes public/sitemap.xml, covering:
//   static routes, category pages (hub + every brand),
//   all 100 products, all 39 comparisons, every blog post
//   in src/content/posts/*.md.
// ============================================================
import { readFileSync, readdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const SITE = "https://dawoodshah2232-svg.github.io/flexspot-2.0";
const TODAY = "2026-09-24";

const products = JSON.parse(readFileSync(join(root, "src/data/products.json"), "utf8"));
const comparisons = JSON.parse(readFileSync(join(root, "src/data/comparisons.json"), "utf8"));

const brandSlug = (b) => b.toLowerCase().replace(/[^a-z0-9]+/g, "-");
const brands = [...new Set(products.map((p) => p.brand))];

function postSlugs() {
  const dir = join(root, "src/content/posts");
  let files = [];
  try {
    files = readdirSync(dir).filter((f) => f.endsWith(".md"));
  } catch {
    return [];
  }
  const out = [];
  for (const f of files) {
    const raw = readFileSync(join(dir, f), "utf8");
    const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
    if (!m) continue;
    const slug = m[1].match(/^slug:\s*(.+)$/m)?.[1].trim();
    const date = m[1].match(/^date:\s*(\d{4}-\d{2}-\d{2})/m)?.[1] ?? TODAY;
    if (slug) out.push({ slug, date });
  }
  return out.sort((a, b) => (a.slug < b.slug ? -1 : 1));
}

const urls = [];
const add = (path, lastmod = TODAY, changefreq = "weekly", priority = "0.7") =>
  urls.push({ loc: `${SITE}${path}`, lastmod, changefreq, priority });

// Static routes
add("/", TODAY, "daily", "1.0");
add("/category/smartphones", TODAY, "weekly", "0.9");
add("/blog", TODAY, "weekly", "0.9");
add("/search", TODAY, "monthly", "0.4");
for (const p of ["/privacy", "/terms", "/disclaimers", "/cookies"])
  add(p, TODAY, "yearly", "0.3");

// Category pages: hub + every brand
for (const b of brands)
  add(`/category/${brandSlug(b)}`, TODAY, "weekly", "0.8");

// Products
for (const p of products)
  add(`/product/${p.slug}`, TODAY, "weekly", "0.9");

// Comparisons
for (const c of comparisons)
  add(`/compare/${c.a}-vs-${c.b}`, TODAY, "weekly", "0.8");

// Blog posts
for (const { slug, date } of postSlugs())
  add(`/blog/${slug}`, date, "monthly", "0.8");

const xml =
  `<?xml version="1.0" encoding="UTF-8"?>\n` +
  `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  urls
    .map(
      (u) =>
        `  <url>\n    <loc>${u.loc}</loc>\n    <lastmod>${u.lastmod}</lastmod>\n    <changefreq>${u.changefreq}</changefreq>\n    <priority>${u.priority}</priority>\n  </url>`
    )
    .join("\n") +
  `\n</urlset>\n`;

writeFileSync(join(root, "public/sitemap.xml"), xml);
console.log(`sitemap.xml written: ${urls.length} URLs`);
console.log(
  `  static=8 categories=${brands.length + 1} products=${products.length} comparisons=${comparisons.length} posts=${postSlugs().length}`
);
