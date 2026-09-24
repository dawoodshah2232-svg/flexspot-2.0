// ============================================================
// FlexSpot 2.0 — data layer
// Lookups, search, comparison logic, spec grouping.
// All values come from src/data/*.json (research snapshot
// 2026-09-24). Nulls are never filled in — callers must
// render "—" or omit the row.
// ============================================================
import products from "../data/products.json";
import comparisons from "../data/comparisons.json";

export const PRODUCTS = products;
export const COMPARISONS = comparisons;

const bySlug = new Map(products.map((p) => [p.slug, p]));
export const productBySlug = (slug) => bySlug.get(slug) ?? null;

const byPair = new Map(comparisons.map((c) => [`${c.a}-vs-${c.b}`, c]));
export const comparisonByPair = (pair) => byPair.get(pair) ?? null;
export const comparePath = (a, b) => `/compare/${a}-vs-${b}`;

export const productPath = (slug) => `/product/${slug}`;
export const brandSlug = (brand) => brand.toLowerCase().replace(/[^a-z0-9]+/g, "-");
export const categoryPath = (id) => `/category/${id}`;

export const BRANDS = (() => {
  const counts = new Map();
  for (const p of products) counts.set(p.brand, (counts.get(p.brand) ?? 0) + 1);
  return [...counts.entries()]
    .map(([brand, count]) => ({ brand, count, slug: brandSlug(brand) }))
    .sort((a, b) => b.count - a.count || a.brand.localeCompare(b.brand));
})();

export const productsByBrand = (slug) =>
  products.filter((p) => brandSlug(p.brand) === slug);

// ---- Editorial curation (homepage rails) ----
export const FEATURED_SLUG = "iphone-18-pro";

export const TRENDING_SLUGS = [
  "iphone-18-pro",
  "iphone-18-pro-max",
  "galaxy-s26-ultra",
  "galaxy-s26",
  "pixel-10-pro",
  "pixel-10-pro-xl",
  "oneplus-15",
  "iphone-duo",
  "galaxy-z-fold-7",
  "vivo-x200-pro",
  "xiaomi-15-ultra",
  "honor-magic-7-pro",
];

export const LATEST_SLUGS = [
  "iphone-18-pro",
  "iphone-18-pro-max",
  "iphone-duo",
  "galaxy-s26",
  "galaxy-s26-plus",
  "galaxy-s26-ultra",
  "oneplus-15",
  "xiaomi-16",
  "xiaomi-16-pro",
  "pixel-10a",
  "galaxy-z-fold-7",
  "galaxy-z-flip-7",
  "oppo-find-n5",
  "honor-magic-v5",
  "vivo-x200-fe",
];

export const trendingProducts = () =>
  TRENDING_SLUGS.map(productBySlug).filter(Boolean);
export const latestProducts = () =>
  LATEST_SLUGS.map(productBySlug).filter(Boolean);

export function relatedProducts(product, n = 4) {
  const others = PRODUCTS.filter((p) => p.slug !== product.slug);
  const sameBrand = others.filter((p) => p.brand === product.brand);
  const rest = others.filter((p) => p.brand !== product.brand);
  return [...sameBrand, ...rest].slice(0, n);
}

export function comparisonsFor(slug) {
  return COMPARISONS.filter((c) => c.a === slug || c.b === slug);
}

// ---- Formatting ----
export const formatPrice = (usd) =>
  usd == null ? "Price TBA" : `$${usd.toLocaleString("en-US")}`;

export const formatSpecValue = (v) => {
  if (v == null) return "—";
  if (Array.isArray(v)) return v.join(", ");
  if (typeof v === "boolean") return v ? "Yes" : "No";
  return String(v);
};

// ---- Spec groups (product page) ----
export const SPEC_LABELS = {
  display_size: "Display size",
  display_type: "Display type",
  refresh_rate: "Refresh rate",
  chipset: "Chipset",
  ram: "RAM",
  storage: "Storage",
  rear_cameras: "Rear cameras",
  front_camera: "Front camera",
  battery: "Battery",
  charging: "Charging",
  weight: "Weight",
  dimensions: "Dimensions",
  water_resistance: "Water resistance",
  fingerprint: "Fingerprint sensor",
  "5g": "5G",
  os: "Operating system",
};

export const SPEC_GROUPS = [
  { id: "display", title: "Display", keys: ["display_size", "display_type", "refresh_rate"] },
  { id: "performance", title: "Performance", keys: ["chipset", "ram", "storage", "os"] },
  { id: "camera", title: "Camera", keys: ["rear_cameras", "front_camera"] },
  { id: "battery", title: "Battery", keys: ["battery", "charging"] },
  { id: "design", title: "Design", keys: ["weight", "dimensions", "water_resistance", "fingerprint"] },
  { id: "connectivity", title: "Connectivity", keys: ["5g"] },
];

export const specLabel = (key) => SPEC_LABELS[key] ?? key;

// ---- Comparison winners ----
const num = (s, re) => {
  if (s == null) return null;
  const m = String(s).match(re);
  return m ? parseFloat(m[1]) : null;
};
const maxMp = (s) => {
  if (s == null) return null;
  const vals = [...String(s).matchAll(/(\d+(?:\.\d+)?)\s*mp/gi)].map((m) => parseFloat(m[1]));
  return vals.length ? Math.max(...vals) : null;
};
const maxStorage = (v) => {
  const arr = Array.isArray(v) ? v : [v];
  const vals = arr
    .map((s) => num(s, /(\d+(?:\.\d+)?)\s*(tb|gb)/i))
    .filter((x) => x != null)
    .map((x, i) => (String(arr[i]).toLowerCase().includes("tb") ? x * 1024 : x));
  return vals.length ? Math.max(...vals) : null;
};
const ipScore = (s) => {
  if (s == null) return null;
  const m = String(s).match(/ip\s*(\d)\s*(\d|x)/i);
  if (!m) return null;
  return parseInt(m[1], 10) * 10 + (m[2].toLowerCase() === "x" ? 0 : parseInt(m[2], 10));
};

const WINNERS = {
  display_size: (a, b) => cmpNum(num(a, /([\d.]+)\s*-?inch/i), num(b, /([\d.]+)\s*-?inch/i)),
  refresh_rate: (a, b) => cmpNum(num(a, /(\d+)\s*hz/i), num(b, /(\d+)\s*hz/i)),
  ram: (a, b) => cmpNum(num(a, /(\d+)\s*gb/i), num(b, /(\d+)\s*gb/i)),
  storage: (a, b) => cmpNum(maxStorage(a), maxStorage(b)),
  battery: (a, b) => cmpNum(num(a, /(\d+)\s*mah/i), num(b, /(\d+)\s*mah/i)),
  charging: (a, b) => cmpNum(num(a, /(\d+)\s*w/i), num(b, /(\d+)\s*w/i)),
  rear_cameras: (a, b) => cmpNum(maxMp(a), maxMp(b)),
  front_camera: (a, b) => cmpNum(maxMp(a), maxMp(b)),
  water_resistance: (a, b) => cmpNum(ipScore(a), ipScore(b)),
  price: (a, b) => cmpNum(a, b, true), // lower wins
};

function cmpNum(x, y, lowerWins = false) {
  if (x == null || y == null || x === y) return null;
  if (lowerWins) return x < y ? "a" : "b";
  return x > y ? "a" : "b";
}

/** Returns 'a' | 'b' | null — null means tie or not comparable. */
export function compareWinner(key, aVal, bVal) {
  const fn = WINNERS[key];
  if (!fn) return null;
  return fn(aVal, bVal);
}

/** Every comparable row for the compare page, in grouped order. */
export function compareRows(a, b) {
  const rows = [];
  for (const group of SPEC_GROUPS) {
    for (const key of group.keys) {
      const av = a.specs?.[key] ?? null;
      const bv = b.specs?.[key] ?? null;
      if (av == null && bv == null) continue;
      rows.push({
        group: group.title,
        key,
        label: specLabel(key),
        a: av,
        b: bv,
        winner: compareWinner(key, av, bv),
      });
    }
  }
  rows.push({
    group: "Price",
    key: "price",
    label: "Launch price (USD)",
    a: a.price_usd,
    b: b.price_usd,
    winner: compareWinner("price", a.price_usd, b.price_usd),
  });
  return rows;
}

// ---- Search ----
const haystack = (p) =>
  [
    p.name,
    p.brand,
    p.tagline ?? "",
    ...Object.values(p.specs ?? {}).flatMap((v) =>
      v == null ? [] : Array.isArray(v) ? v : [String(v)]
    ),
  ]
    .join(" ")
    .toLowerCase();

export function searchProducts(query, limit = 24) {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const terms = q.split(/\s+/);
  const scored = [];
  for (const p of PRODUCTS) {
    const h = haystack(p);
    let score = 0;
    for (const t of terms) {
      if (p.name.toLowerCase().includes(t)) score += 5;
      else if (p.brand.toLowerCase().includes(t)) score += 3;
      else if (h.includes(t)) score += 1;
      else { score = -1; break; }
    }
    if (score > 0) scored.push({ product: p, score });
  }
  return scored
    .sort((x, y) => y.score - x.score || x.product.name.localeCompare(y.product.name))
    .slice(0, limit)
    .map((s) => s.product);
}

export function searchComparisons(query, limit = 8) {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return COMPARISONS.filter((c) => c.title.toLowerCase().includes(q)).slice(0, limit);
}

export const SITE_URL = "https://dawoodshah2232-svg.github.io/flexspot-2.0";
export const canonical = (path) => `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
