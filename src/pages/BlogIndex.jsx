// ============================================================
// /blog — index with search + category filter.
// ============================================================
import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import PageHead, { JsonLd } from "../components/PageHead.jsx";
import Breadcrumbs from "../components/Breadcrumbs.jsx";
import Reveal from "../components/Reveal.jsx";
import { getPosts, postCategories } from "../lib/posts.js";
import { canonical } from "../lib/data.js";

const fmtDate = (d) => {
  const [y, m, day] = d.split("-").map(Number);
  return new Date(y, m - 1, day).toLocaleDateString("en-US", {
    year: "numeric", month: "long", day: "numeric",
  });
};

export default function BlogIndex() {
  const [params] = useSearchParams();
  const initialCat = params.get("category") ?? "All";
  const [cat, setCat] = useState(initialCat);
  const [q, setQ] = useState("");

  const posts = useMemo(() => {
    let list = getPosts();
    if (cat !== "All") list = list.filter((p) => p.category === cat);
    const t = q.trim().toLowerCase();
    if (t) {
      list = list.filter((p) =>
        `${p.title} ${p.description} ${p.tags.join(" ")}`.toLowerCase().includes(t)
      );
    }
    return list;
  }, [cat, q]);

  const categories = ["All", ...postCategories()];

  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "FlexSpot 2.0 buying guides",
    itemListElement: posts.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: canonical(`/blog/${p.slug}`),
      name: p.title,
    })),
  };

  return (
    <div className="container">
      <PageHead
        title="Buying Guides & Phone News"
        description="In-depth smartphone buying guides written from real spec data: best camera phones, best battery life, foldables, budget flagships and how to choose in 2026."
        path="/blog"
      />
      <JsonLd data={itemList} />
      <Breadcrumbs trail={[{ label: "Home", path: "/" }, { label: "Blog" }]} />

      <h1 className="page-title">Guides &amp; analysis</h1>
      <p className="page-subtitle">
        Long-form guides built on our verified spec database — every claim traces
        back to a real phone on this site.
      </p>

      <div className="blog-tools">
        <input
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search guides…"
          aria-label="Search guides"
          className="blog-tools__search"
        />
        <div className="chips">
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              className={`chip${cat === c ? " chip--active" : ""}`}
              onClick={() => setCat(c)}
              aria-pressed={cat === c}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {posts.length === 0 ? (
        <div className="empty">
          <h2>No guides match</h2>
          <p>Try a different search or category.</p>
        </div>
      ) : (
        <div className="grid grid--cards" style={{ marginBottom: "var(--space-16)" }}>
          {posts.map((p, i) => (
            <Reveal key={p.slug} delay={Math.min(i, 7) * 45}>
              <Link className="guide-card" to={`/blog/${p.slug}`}>
                <p className="guide-card__cat">{p.category} · {p.date ? fmtDate(p.date) : ""}</p>
                <h3>{p.title}</h3>
                <p className="guide-card__desc">{p.description}</p>
                <span className="guide-card__more">Read guide →</span>
              </Link>
            </Reveal>
          ))}
        </div>
      )}
    </div>
  );
}
