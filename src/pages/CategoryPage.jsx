// ============================================================
// /category/:id — "smartphones" hub (all 100 + brand chips)
// or a brand filter page (e.g. /category/apple).
// In-feed ad placeholders every 8 cards; section reveals.
// ============================================================
import { Fragment } from "react";
import { Link, useParams } from "react-router-dom";
import PageHead, { JsonLd } from "../components/PageHead.jsx";
import Breadcrumbs from "../components/Breadcrumbs.jsx";
import ProductCard from "../components/ProductCard.jsx";
import SearchBar from "../components/SearchBar.jsx";
import AdSlot from "../components/AdSlot.jsx";
import Reveal from "../components/Reveal.jsx";
import {
  PRODUCTS,
  BRANDS,
  productsByBrand,
  productPath,
  canonical,
} from "../lib/data.js";
import NotFound from "./NotFound.jsx";

// In-feed ad placeholders slot in after every 8th card
// (placeholder only — no ad network code).
const INFEED_EVERY = 8;

function CardGrid({ list }) {
  return (
    <div className="grid grid--cards">
      {list.map((p, i) => (
        <Fragment key={p.slug}>
          {i > 0 && i % INFEED_EVERY === 0 && <AdSlot format="infeed" />}
          <Reveal delay={Math.min(i % INFEED_EVERY, 5) * 40}>
            <ProductCard product={p} />
          </Reveal>
        </Fragment>
      ))}
    </div>
  );
}

export default function CategoryPage() {
  const { id } = useParams();
  const isHub = id === "smartphones";
  const brand = isHub ? null : BRANDS.find((b) => b.slug === id);
  if (!isHub && !brand) return <NotFound />;

  const list = isHub ? PRODUCTS : productsByBrand(brand.slug);
  const title = isHub ? "All Smartphones" : `${brand.brand} Phones`;
  const description = isHub
    ? `Browse all 100 smartphones in the FlexSpot 2.0 catalog — full specs, launch prices and head-to-head comparisons from ${BRANDS.length} brands.`
    : `Every ${brand.brand} phone in the FlexSpot 2.0 catalog: full specs, launch prices and comparisons. ${list.length} models.`;

  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: title,
    numberOfItems: list.length,
    itemListElement: list.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: canonical(productPath(p.slug)),
      name: p.name,
    })),
  };

  return (
    <div className="container">
      <PageHead title={`${title} — Specs, Prices & Comparisons`} description={description} path={`/category/${id}`} />
      <JsonLd data={itemList} />

      <Breadcrumbs
        trail={[{ label: "Home", path: "/" }, { label: title }]}
      />

      <Reveal>
        <h1 className="page-title">{title}</h1>
        <p className="page-subtitle">
          {isHub
            ? `${PRODUCTS.length} phones from ${BRANDS.length} brands — verified specs, honest prices.`
            : `${list.length} ${brand.brand} models in the catalog.`}
        </p>
      </Reveal>

      {isHub && (
        <>
          <div className="hero__search" style={{ marginBottom: "var(--space-8)" }}>
            <SearchBar />
          </div>
          <div className="chips" style={{ marginBottom: "var(--space-8)" }}>
            {BRANDS.map((b) => (
              <Link key={b.slug} className="chip" to={`/category/${b.slug}`}>
                {b.brand} <span className="count">{b.count}</span>
              </Link>
            ))}
          </div>
        </>
      )}

      {!isHub && (
        <p style={{ marginBottom: "var(--space-8)" }}>
          <Link className="back-link" to="/category/smartphones">← All smartphones</Link>
        </p>
      )}

      <CardGrid list={list} />

      <div style={{ height: "var(--space-16)" }} />
    </div>
  );
}
