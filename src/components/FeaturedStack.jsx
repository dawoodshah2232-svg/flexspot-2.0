// ============================================================
// FeaturedStack — sticky stacking cards for flagship products.
// Each card pins near the top of the viewport while the next
// one slides over it (pure CSS position: sticky, no JS, no
// scroll listeners). Mobile-first: the same stacking works on
// small screens. Reduced motion unaffected (no animation).
// ============================================================
import { Link } from "react-router-dom";
import ProductImage from "./ProductImage.jsx";
import Reveal from "./Reveal.jsx";
import {
  productBySlug,
  comparisonsFor,
  comparePath,
  productPath,
  formatPrice,
} from "../lib/data.js";
import "./FeaturedStack.css";

const FEATURED_SLUGS = ["iphone-18-pro", "galaxy-s26-ultra", "pixel-10-pro"];
const FEATURED_TAGS = ["Flagship 01 — Phone of the moment", "Flagship 02 — The Android answer", "Flagship 03 — The camera purist"];

function FlagshipCard({ product, tag, order }) {
  const matchup = comparisonsFor(product.slug)[0];
  return (
    <div className="fstack__card" style={{ "--stack-order": order }}>
      <div className="fstack__media">
        <ProductImage product={product} size="hero" />
      </div>
      <div className="fstack__body">
        <span className="fstack__tag">{tag}</span>
        <h3 className="fstack__name">{product.name}</h3>
        {product.tagline && <p className="fstack__tagline">{product.tagline}</p>}
        <dl className="fstack__stats">
          <div><dt>Chip</dt><dd>{product.specs?.chipset?.split("(")[0].trim() ?? "—"}</dd></div>
          <div><dt>Display</dt><dd>{product.specs?.display_size ?? "—"}</dd></div>
          <div><dt>Price</dt><dd>{formatPrice(product.price_usd)}</dd></div>
        </dl>
        <div className="fstack__cta">
          <Link className="btn btn--primary btn--sm" to={productPath(product.slug)}>
            Full specs
          </Link>
          {matchup && (
            <Link className="btn btn--ghost btn--sm" to={comparePath(matchup.a, matchup.b)}>
              Head-to-head
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default function FeaturedStack() {
  const flagships = FEATURED_SLUGS.map(productBySlug).filter(Boolean);
  if (flagships.length === 0) return null;
  return (
    <section className="section" aria-labelledby="featured-heading">
      <div className="container">
        <Reveal>
          <div className="section-head">
            <div>
              <h2 id="featured-heading">Featured flagships</h2>
              <p>The three phones defining 2026 — scroll to stack them.</p>
            </div>
          </div>
        </Reveal>
        <div className="fstack">
          {flagships.map((p, i) => (
            <div key={p.slug} className="fstack__slot">
              <FlagshipCard product={p} tag={FEATURED_TAGS[i] ?? `Flagship 0${i + 1}`} order={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
