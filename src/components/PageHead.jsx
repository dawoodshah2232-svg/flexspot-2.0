// ============================================================
// PageHead — per-page SEO/GEO meta (title, description,
// canonical, Open Graph, Twitter cards). No dependencies.
// ============================================================
import { useEffect } from "react";
import { canonical } from "../lib/data";

function upsertMeta(attr, key, content) {
  if (content == null) return;
  const sel = `meta[${attr}="${key}"]`;
  let el = document.head.querySelector(sel);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

const DEFAULT_IMAGE = "/flexspot-2.0/icons/icon.svg";

export default function PageHead({
  title,
  description,
  path = "/",
  image,
  type = "website",
  noindex = false,
}) {
  useEffect(() => {
    const fullTitle = title ? `${title} | FlexSpot 2.0` : "FlexSpot 2.0 — Worldwide Smartphone Specs & Comparisons";
    document.title = fullTitle;
    const url = canonical(path);
    const img = image ?? DEFAULT_IMAGE;
    const absImg = img.startsWith("http") ? img : canonical(img);

    upsertMeta("name", "description", description);
    upsertMeta("property", "og:title", fullTitle);
    upsertMeta("property", "og:description", description);
    upsertMeta("property", "og:type", type);
    upsertMeta("property", "og:url", url);
    upsertMeta("property", "og:image", absImg);
    upsertMeta("property", "og:site_name", "FlexSpot 2.0");
    upsertMeta("name", "twitter:card", "summary_large_image");
    upsertMeta("name", "twitter:title", fullTitle);
    upsertMeta("name", "twitter:description", description);
    upsertMeta("name", "twitter:image", absImg);
    upsertMeta("name", "robots", noindex ? "noindex, nofollow" : "index, follow");

    let link = document.head.querySelector('link[rel="canonical"]');
    if (!link) {
      link = document.createElement("link");
      link.setAttribute("rel", "canonical");
      document.head.appendChild(link);
    }
    link.setAttribute("href", url);
  }, [title, description, path, image, type, noindex]);

  return null;
}

/** JSON-LD structured data block. */
export function JsonLd({ data }) {
  if (!data) return null;
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
