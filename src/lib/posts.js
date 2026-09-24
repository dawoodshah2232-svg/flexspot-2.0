// ============================================================
// FlexSpot 2.0 — blog engine
// Reads src/content/posts/*.md via import.meta.glob (raw),
// parses the frontmatter contract, renders markdown to HTML.
//
// Frontmatter contract (worker D follows this exactly):
//   slug, title, description, date (YYYY-MM-DD), category,
//   tags: [], related_products: [] (product slugs), author
// Body: markdown with ## headings.
// ============================================================

const modules = import.meta.glob("../content/posts/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
});

const BASENAME = "/flexspot-2.0";

function parseFrontmatter(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) return { meta: {}, body: raw };
  const [, fm, body] = match;
  const meta = {};
  let currentListKey = null;
  for (const line of fm.split(/\r?\n/)) {
    const kv = line.match(/^([A-Za-z_][A-Za-z0-9_]*)\s*:\s*(.*)$/);
    if (kv) {
      const [, key, value] = kv;
      currentListKey = null;
      const v = value.trim();
      if (v.startsWith("[") && v.endsWith("]")) {
        meta[key] = v
          .slice(1, -1)
          .split(",")
          .map((s) => s.trim().replace(/^["']|["']$/g, ""))
          .filter(Boolean);
      } else if (v === "" || v === "[]") {
        meta[key] = [];
        if (v === "") currentListKey = key;
      } else {
        meta[key] = v.replace(/^["']|["']$/g, "");
      }
      continue;
    }
    const item = line.match(/^\s*-\s+(.*)$/);
    if (item && currentListKey) {
      meta[currentListKey].push(item[1].trim().replace(/^["']|["']$/g, ""));
      continue;
    }
  }
  return { meta, body };
}

const esc = (s) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

function inlineMd(text) {
  let out = esc(text);
  // internal links: /product/x -> /flexspot-2.0/product/x
  out = out.replace(
    /\[([^\]]+)\]\((\/[^)\s]*)\)/g,
    (_m, label, href) => `<a href="${BASENAME}${href}">${label}</a>`
  );
  out = out.replace(
    /\[([^\]]+)\]\((https?:[^)\s]*)\)/g,
    (_m, label, href) => `<a href="${href}" target="_blank" rel="noopener noreferrer">${label}</a>`
  );
  out = out.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  out = out.replace(/(^|\W)\*([^*\n]+)\*/g, "$1<em>$2</em>");
  out = out.replace(/`([^`\n]+)`/g, "<code>$1</code>");
  return out;
}

const slugify = (s) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");

/** Renders markdown body -> { html, toc: [{id, text, level}] } */
export function renderMarkdown(body) {
  const toc = [];
  const lines = body.split(/\r?\n/);
  const html = [];
  let listOpen = false;
  let orderedOpen = false;
  let para = [];

  const closeLists = () => {
    if (listOpen) { html.push("</ul>"); listOpen = false; }
    if (orderedOpen) { html.push("</ol>"); orderedOpen = false; }
  };
  const flushPara = () => {
    if (para.length) {
      html.push(`<p>${inlineMd(para.join(" "))}</p>`);
      para = [];
    }
  };

  for (const line of lines) {
    const h2 = line.match(/^##\s+(.*)$/);
    const h3 = line.match(/^###\s+(.*)$/);
    const ul = line.match(/^\s*[-*]\s+(.*)$/);
    const ol = line.match(/^\s*\d+\.\s+(.*)$/);
    const quote = line.match(/^>\s?(.*)$/);

    if (h2 || h3) {
      flushPara(); closeLists();
      const level = h2 ? 2 : 3;
      const text = (h2 ?? h3)[1].trim();
      const id = slugify(text);
      if (level === 2) toc.push({ id, text, level });
      html.push(`<h${level} id="${id}">${inlineMd(text)}</h${level}>`);
    } else if (ul) {
      flushPara();
      if (orderedOpen) { html.push("</ol>"); orderedOpen = false; }
      if (!listOpen) { html.push("<ul>"); listOpen = true; }
      html.push(`<li>${inlineMd(ul[1])}</li>`);
    } else if (ol) {
      flushPara();
      if (listOpen) { html.push("</ul>"); listOpen = false; }
      if (!orderedOpen) { html.push("<ol>"); orderedOpen = true; }
      html.push(`<li>${inlineMd(ol[1])}</li>`);
    } else if (quote) {
      flushPara(); closeLists();
      html.push(`<blockquote>${inlineMd(quote[1])}</blockquote>`);
    } else if (line.trim() === "") {
      flushPara(); closeLists();
    } else {
      para.push(line.trim());
    }
  }
  flushPara(); closeLists();
  return { html: html.join("\n"), toc };
}

function buildPosts() {
  const posts = [];
  for (const [path, raw] of Object.entries(modules)) {
    const { meta, body } = parseFrontmatter(raw);
    if (!meta.slug || !meta.title) continue; // malformed file: skip, never render broken
    const file = path.split("/").pop();
    posts.push({
      slug: String(meta.slug),
      title: String(meta.title),
      description: String(meta.description ?? ""),
      date: String(meta.date ?? ""),
      category: String(meta.category ?? "Guides"),
      tags: Array.isArray(meta.tags) ? meta.tags : [],
      related_products: Array.isArray(meta.related_products) ? meta.related_products : [],
      author: String(meta.author ?? "FlexSpot Editorial"),
      body,
      file,
    });
  }
  posts.sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
  return posts;
}

let cache = null;
export function getPosts() {
  if (!cache) cache = buildPosts();
  return cache;
}

export const postBySlug = (slug) => getPosts().find((p) => p.slug === slug) ?? null;

export const postCategories = () => [
  ...new Set(getPosts().map((p) => p.category)),
];

export function prevNextPost(slug) {
  const posts = getPosts();
  const i = posts.findIndex((p) => p.slug === slug);
  if (i < 0) return { prev: null, next: null };
  return { prev: posts[i + 1] ?? null, next: posts[i - 1] ?? null };
}

export function relatedPosts(post, n = 3) {
  const posts = getPosts().filter((p) => p.slug !== post.slug);
  const scored = posts.map((p) => {
    let score = 0;
    if (p.category === post.category) score += 2;
    score += p.tags.filter((t) => post.tags.includes(t)).length;
    return { p, score };
  });
  return scored
    .sort((a, b) => b.score - a.score || (a.p.date < b.p.date ? 1 : -1))
    .slice(0, n)
    .map((s) => s.p);
}

export function searchPosts(query, limit = 12) {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const terms = q.split(/\s+/);
  return getPosts()
    .filter((p) => {
      const h = `${p.title} ${p.description} ${p.category} ${p.tags.join(" ")} ${p.body}`.toLowerCase();
      return terms.every((t) => h.includes(t));
    })
    .slice(0, limit);
}
