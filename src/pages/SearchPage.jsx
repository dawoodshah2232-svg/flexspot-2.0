// ============================================================
// /search — dedicated results view: phones, comparisons,
// guides. Client-side, instant.
// ============================================================
import { Fragment } from "react";
import { Link, useSearchParams } from "react-router-dom";
import PageHead from "../components/PageHead.jsx";
import SearchBar from "../components/SearchBar.jsx";
import ProductCard from "../components/ProductCard.jsx";
import AdSlot from "../components/AdSlot.jsx";
import {
  searchProducts,
  searchComparisons,
  productBySlug,
  comparePath,
} from "../lib/data.js";
import { searchPosts } from "../lib/posts.js";

export default function SearchPage() {
  const [params] = useSearchParams();
  const q = (params.get("q") ?? "").trim();

  const phones = searchProducts(q);
  const matchups = searchComparisons(q);
  const posts = searchPosts(q);
  const hasResults = phones.length + matchups.length + posts.length > 0;

  return (
    <div className="container">
      <PageHead
        title={q ? `Search: ${q}` : "Search smartphones"}
        description={
          q
            ? `Search results for “${q}” across 100 smartphones, 39 comparisons and buying guides.`
            : "Search 100 smartphones by name, brand or spec — plus comparisons and guides."
        }
        path={q ? `/search?q=${encodeURIComponent(q)}` : "/search"}
        noindex={!q}
      />

      <h1 className="page-title">{q ? `Results for “${q}”` : "Search"}</h1>
      <p className="page-subtitle">
        Search across 100 phones, 39 head-to-head comparisons and every buying guide.
      </p>
      <div className="hero__search" style={{ marginBottom: "var(--space-12)" }}>
        <SearchBar autoFocus />
      </div>

      {!q && (
        <div className="empty">
          <p>Type at least 2 characters — try “iPhone 18”, “foldable”, “200MP” or “7300mAh”.</p>
        </div>
      )}

      {q && !hasResults && (
        <div className="empty">
          <h2>No matches for “{q}”</h2>
          <p>Try a brand (Samsung, Xiaomi), a model (Pixel 10), or a spec keyword (foldable, 5G, 200MP).</p>
        </div>
      )}

      {phones.length > 0 && (
        <section className="section" aria-labelledby="res-phones">
          <div className="section-head">
            <h2 id="res-phones">Phones ({phones.length})</h2>
          </div>
          <div className="grid grid--cards">
            {phones.map((p, i) => (
              <Fragment key={p.slug}>
                {/* In-feed ad placeholder after the 8th result */}
                {i === 8 && <AdSlot format="infeed" />}
                <ProductCard product={p} />
              </Fragment>
            ))}
          </div>
        </section>
      )}

      {matchups.length > 0 && (
        <section className="section" aria-labelledby="res-vs">
          <div className="section-head">
            <h2 id="res-vs">Comparisons ({matchups.length})</h2>
          </div>
          <div className="vs-list">
            {matchups.map((c) => (
              <Link key={`${c.a}-vs-${c.b}`} className="vs-item" to={comparePath(c.a, c.b)}>
                <span className="vs-badge">VS</span>
                <span className="vs-item__names">
                  <strong>{c.title}</strong>
                  <span>{productBySlug(c.a)?.name} vs {productBySlug(c.b)?.name}</span>
                </span>
                <span aria-hidden="true">→</span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {posts.length > 0 && (
        <section className="section" aria-labelledby="res-guides">
          <div className="section-head">
            <h2 id="res-guides">Guides ({posts.length})</h2>
          </div>
          <div className="grid grid--cards">
            {posts.map((p) => (
              <Link key={p.slug} className="guide-card" to={`/blog/${p.slug}`}>
                <p className="guide-card__cat">{p.category}</p>
                <h3>{p.title}</h3>
                <p className="guide-card__desc">{p.description}</p>
                <span className="guide-card__more">Read guide →</span>
              </Link>
            ))}
          </div>
        </section>
      )}

      <div style={{ height: "var(--space-16)" }} />
    </div>
  );
}
