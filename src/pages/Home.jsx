// ============================================================
// Home — cinematic full-bleed hero (iPhone 18 front and center),
// brand marquee, animated stat counters, sticky flagship stack,
// trending/latest rails, top comparisons, guides, brand chips.
// Motion: IntersectionObserver reveals (transform/opacity only),
// all disabled under prefers-reduced-motion.
// ============================================================
import { Link } from "react-router-dom";
import PageHead, { JsonLd } from "../components/PageHead.jsx";
import SearchBar from "../components/SearchBar.jsx";
import ProductCard from "../components/ProductCard.jsx";
import ProductImage from "../components/ProductImage.jsx";
import Reveal from "../components/Reveal.jsx";
import AnimatedCounter from "../components/AnimatedCounter.jsx";
import Marquee from "../components/Marquee.jsx";
import FeaturedStack from "../components/FeaturedStack.jsx";
import {
  BRANDS,
  PRODUCTS,
  COMPARISONS,
  productBySlug,
  trendingProducts,
  latestProducts,
  comparePath,
  productPath,
  formatPrice,
  formatSpecValue,
  canonical,
} from "../lib/data.js";
import { getPosts } from "../lib/posts.js";
import "./Home.css";

const featured = productBySlug("iphone-18-pro");
const trending = trendingProducts().filter((p) => p.slug !== featured?.slug).slice(0, 11);
const latest = latestProducts();
const topComparisons = COMPARISONS.slice(0, 6);
const guides = getPosts().slice(0, 4);

const GUIDE_BLURBS = {
  "best-camera-phone-2026": "Triple 48MP and 200MP zoom flagships, ranked by real specs.",
  "longest-battery-life-phones-2026": "From 5,000mAh flagships to a 7,550mAh monster.",
  "foldable-phones-guide-2026": "Book vs flip vs Apple's first foldable — every option compared.",
  "how-to-choose-a-smartphone-2026": "Chipset, camera, battery: what actually matters this year.",
};

const short = (v, n = 26) => {
  if (!v) return "—";
  const s = formatSpecValue(v).split(",")[0].trim();
  return s.length > n ? `${s.slice(0, n)}…` : s;
};

export default function Home() {
  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Trending smartphones 2026",
    itemListElement: trendingProducts().slice(0, 10).map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: canonical(productPath(p.slug)),
      name: p.name,
    })),
  };

  const marqueeItems = BRANDS.map((b) => ({
    key: b.slug,
    name: b.brand,
    sub: `${b.count} phone${b.count === 1 ? "" : "s"}`,
  }));

  return (
    <>
      <PageHead
        title="Compare 100 Smartphones — Specs, Prices & Head-to-Head Battles"
        description="FlexSpot 2.0 compares 100 real smartphones side by side: iPhone 18, Galaxy S26 Ultra, Pixel 10 Pro and more. Full specs, launch prices, camera and battery guides."
        path="/"
      />
      <JsonLd data={itemList} />

      {/* ---- Cinematic full-bleed hero ---- */}
      <section className="cine-hero" aria-label="FlexSpot 2.0 introduction">
        <div className="cine-hero__bg" aria-hidden="true">
          <span className="cine-hero__orb cine-hero__orb--a" />
          <span className="cine-hero__orb cine-hero__orb--b" />
          <span className="cine-hero__grid" />
        </div>
        <div className="container cine-hero__inner">
          <div className="cine-hero__content">
            <span className="hero-enter hero__eyebrow" style={{ "--d": "0ms" }}>
              iPhone 18 Pro · now in the catalog
            </span>
            <h1 className="hero-enter" style={{ "--d": "90ms" }}>
              Every 2026 flagship, <span className="accent">compared properly.</span>
            </h1>
            <p className="hero-enter hero__sub" style={{ "--d": "180ms" }}>
              Real specs, real launch prices, honest side-by-side tables — from the
              iPhone 18 Pro to the Galaxy S26 Ultra. No fake data, ever.
            </p>
            <div className="hero-enter hero__search" style={{ "--d": "270ms" }}>
              <SearchBar large />
            </div>
            <div className="hero-enter hero__chips" style={{ "--d": "360ms" }}>
              <div className="chips chips--center">
                <Link className="chip" to="/category/smartphones">All smartphones</Link>
                {BRANDS.slice(0, 8).map((b) => (
                  <Link key={b.slug} className="chip" to={`/category/${b.slug}`}>
                    {b.brand} <span className="count">{b.count}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
          {featured && (
            <div className="cine-hero__visual hero-enter" style={{ "--d": "420ms" }}>
              <div className="cine-hero__frame">
                <ProductImage product={featured} size="hero" eager />
              </div>
              <div className="cine-hero__chip cine-hero__chip--a">
                <strong>{short(featured.specs?.chipset)}</strong>
                <span>Chipset</span>
              </div>
              <div className="cine-hero__chip cine-hero__chip--b">
                <strong>{formatPrice(featured.price_usd)}</strong>
                <span>Launch price</span>
              </div>
              <div className="cine-hero__chip cine-hero__chip--c">
                <strong>{short(featured.specs?.rear_cameras)}</strong>
                <span>Rear camera</span>
              </div>
            </div>
          )}
        </div>
      </section>

      <Marquee items={marqueeItems} label="Trending brands in the catalog" />

      {/* ---- Animated catalog counters ---- */}
      <Reveal variant="fade">
        <section className="stats-band" aria-label="Catalog statistics">
          <div className="container stats-band__inner">
            <div className="stats-band__item">
              <p className="stats-band__num"><AnimatedCounter value={PRODUCTS.length} /></p>
              <p className="stats-band__label">Phones compared</p>
            </div>
            <div className="stats-band__item">
              <p className="stats-band__num"><AnimatedCounter value={COMPARISONS.length} /></p>
              <p className="stats-band__label">Head-to-head battles</p>
            </div>
            <div className="stats-band__item">
              <p className="stats-band__num"><AnimatedCounter value={BRANDS.length} /></p>
              <p className="stats-band__label">Brands tracked</p>
            </div>
          </div>
        </section>
      </Reveal>

      <FeaturedStack />

      <section className="section" aria-labelledby="trending-heading">
        <div className="container">
          <Reveal>
            <div className="section-head">
              <div>
                <h2 id="trending-heading">Trending now</h2>
                <p>The flagships everyone is searching for this week.</p>
              </div>
              <Link className="section-link" to="/category/smartphones">Browse all 100 →</Link>
            </div>
          </Reveal>
          <div className="grid grid--cards">
            {trending.map((p, i) => (
              <Reveal key={p.slug} delay={Math.min(i, 7) * 45}>
                <ProductCard product={p} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="latest-heading">
        <div className="container">
          <Reveal>
            <div className="section-head">
              <div>
                <h2 id="latest-heading">Latest arrivals</h2>
                <p>Fresh 2026 launches, newest first.</p>
              </div>
            </div>
          </Reveal>
          <div className="latest-rail">
            {latest.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="compare-heading">
        <div className="container">
          <Reveal>
            <div className="section-head">
              <div>
                <h2 id="compare-heading">Top comparisons</h2>
                <p>Head-to-head spec battles with per-row winners.</p>
              </div>
            </div>
          </Reveal>
          <div className="vs-list">
            {topComparisons.map((c, i) => (
              <Reveal key={`${c.a}-vs-${c.b}`} delay={Math.min(i, 5) * 60}>
                <Link className="vs-item" to={comparePath(c.a, c.b)}>
                  <span className="vs-badge">VS</span>
                  <span className="vs-item__names">
                    <strong>{c.title}</strong>
                    <span>{productBySlug(c.a)?.name} vs {productBySlug(c.b)?.name}</span>
                  </span>
                  <span aria-hidden="true">→</span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {guides.length > 0 && (
        <section className="section" aria-labelledby="guides-heading">
          <div className="container">
            <Reveal>
              <div className="section-head">
                <div>
                  <h2 id="guides-heading">Buying guides</h2>
                  <p>Research-backed guides, written from the spec data above.</p>
                </div>
                <Link className="section-link" to="/blog">All guides →</Link>
              </div>
            </Reveal>
            <div className="grid grid--cards">
              {guides.map((g, i) => (
                <Reveal key={g.slug} delay={Math.min(i, 3) * 70}>
                  <Link className="guide-card" to={`/blog/${g.slug}`}>
                    <p className="guide-card__cat">{g.category}</p>
                    <h3>{g.title}</h3>
                    <p className="guide-card__desc">{GUIDE_BLURBS[g.slug] ?? g.description}</p>
                    <span className="guide-card__more">Read guide →</span>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="section" aria-labelledby="catalog-heading">
        <div className="container">
          <Reveal>
            <div className="section-head">
              <div>
                <h2 id="catalog-heading">Browse by brand</h2>
                <p>{PRODUCTS.length} phones from {BRANDS.length} brands.</p>
              </div>
            </div>
          </Reveal>
          <Reveal variant="fade">
            <div className="chips">
              {BRANDS.map((b) => (
                <Link key={b.slug} className="chip" to={`/category/${b.slug}`}>
                  {b.brand} <span className="count">{b.count}</span>
                </Link>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
