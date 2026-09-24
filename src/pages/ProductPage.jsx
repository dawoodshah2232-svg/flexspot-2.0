// ============================================================
// /product/:slug — gallery, grouped spec table, price,
// where-to-buy, related products, compare CTAs,
// Product + BreadcrumbList JSON-LD. Null specs render "—".
// No video section (videos are empty for every product).
// ============================================================
import { Link, useParams } from "react-router-dom";
import PageHead, { JsonLd } from "../components/PageHead.jsx";
import Breadcrumbs from "../components/Breadcrumbs.jsx";
import ProductGallery from "../components/ProductGallery.jsx";
import ProductCard from "../components/ProductCard.jsx";
import ShareButtons from "../components/ShareButtons.jsx";
import AdSlot from "../components/AdSlot.jsx";
import Reveal from "../components/Reveal.jsx";
import {
  productBySlug,
  comparisonsFor,
  relatedProducts,
  comparePath,
  productPath,
  formatPrice,
  formatSpecValue,
  SPEC_GROUPS,
  specLabel,
  canonical,
} from "../lib/data.js";
import NotFound from "./NotFound.jsx";
import "./ProductPage.css";

function KeySpecs({ product }) {
  const items = [
    ["Display", product.specs?.display_size],
    ["Chip", product.specs?.chipset],
    ["Camera", product.specs?.rear_cameras],
    ["Battery", product.specs?.battery],
  ];
  return (
    <dl className="keyspecs">
      {items.map(([label, value]) => (
        <div key={label} className="keyspecs__row">
          <dt>{label}</dt>
          <dd>{value ? formatSpecValue(value).split("+")[0].trim().slice(0, 60) : "—"}</dd>
        </div>
      ))}
    </dl>
  );
}

export default function ProductPage() {
  const { slug } = useParams();
  const product = productBySlug(slug);
  if (!product) return <NotFound />;

  const path = productPath(product.slug);
  const related = relatedProducts(product, 4);
  const matchups = comparisonsFor(product.slug).slice(0, 4);
  const firstImage = product.images?.[0];

  const productLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.tagline ?? `${product.brand} ${product.name} — full specifications.`,
    brand: { "@type": "Brand", name: product.brand },
    category: "Smartphones",
    url: canonical(path),
    ...(firstImage ? { image: [firstImage] } : {}),
    ...(product.price_usd != null
      ? {
          offers: {
            "@type": "Offer",
            priceCurrency: "USD",
            price: product.price_usd,
            availability: "https://schema.org/InStock",
          },
        }
      : {}),
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `How much does the ${product.name} cost?`,
        acceptedAnswer: {
          "@type": "Answer",
          text:
            product.price_usd != null
              ? `The ${product.name} launched at $${product.price_usd.toLocaleString("en-US")} USD. Street prices vary by retailer and region.`
              : `No official USD launch price is published for the ${product.name}, so we list it as Price TBA rather than guessing.`,
        },
      },
      {
        "@type": "Question",
        name: `What chipset does the ${product.name} use?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: product.specs?.chipset
            ? `The ${product.name} is powered by the ${product.specs.chipset}.`
            : `We have not verified the chipset for the ${product.name}, so it is listed as not available.`,
        },
      },
    ],
  };

  return (
    <div className="container">
      <PageHead
        title={`${product.name} — Full Specs & Price`}
        description={
          product.tagline ??
          `${product.brand} ${product.name}: full specifications, launch price and where to buy.`
        }
        path={path}
        image={firstImage}
      />
      <JsonLd data={productLd} />
      <JsonLd data={faqLd} />

      <Breadcrumbs
        trail={[
          { label: "Home", path: "/" },
          { label: "Smartphones", path: "/category/smartphones" },
          { label: product.brand, path: `/category/${product.brand.toLowerCase().replace(/[^a-z0-9]+/g, "-")}` },
          { label: product.name },
        ]}
      />

      <article className="product">
        <header className="product__head">
          <div className="product__media">
            <ProductGallery product={product} />
          </div>
          <div className="product__intro">
            <p className="product__brand">{product.brand}</p>
            <h1 className="product__name">{product.name}</h1>
            {product.tagline && <p className="product__tagline">{product.tagline}</p>}
            <p className="product__price">
              <span className="product__price-value">{formatPrice(product.price_usd)}</span>
              <span className="product__price-note">
                {product.price_usd != null ? "Launch MSRP (USD)" : "No official USD price published"}
              </span>
            </p>
            <KeySpecs product={product} />
            {matchups.length > 0 && (
              <div className="product__compare">
                <span className="product__compare-label">Compare head-to-head:</span>
                <div className="chips">
                  {matchups.map((c) => {
                    const other = productBySlug(c.a === product.slug ? c.b : c.a);
                    return (
                      <Link key={`${c.a}-vs-${c.b}`} className="chip" to={comparePath(c.a, c.b)}>
                        vs {other?.name ?? "rival"}
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </header>

        <Reveal>
        <section className="section" aria-labelledby="specs-heading">
          <div className="section-head">
            <h2 id="specs-heading">Full specifications</h2>
          </div>
          <div className="card spec-groups">
            {SPEC_GROUPS.map((group) => {
              const rows = group.keys.filter(
                (k) => product.specs?.[k] != null
              );
              if (rows.length === 0) return null;
              return (
                <table key={group.id} className="spec-table">
                  <caption>{group.title}</caption>
                  <tbody>
                    {rows.map((k) => (
                      <tr key={k}>
                        <th scope="row">{specLabel(k)}</th>
                        <td>{formatSpecValue(product.specs[k])}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              );
            })}
            <p className="spec-footnote">
              Specs verified against launch coverage and manufacturer materials as of
              September 2026. Fields we could not verify are omitted rather than guessed.
              {product.sources?.length > 0 && (
                <>
                  {" "}Sources:{" "}
                  {product.sources.map((s, i) => (
                    <span key={s}>
                      {i > 0 && ", "}
                      <a href={s} target="_blank" rel="noopener noreferrer">[{i + 1}]</a>
                    </span>
                  ))}
                </>
              )}
            </p>
          </div>
        </section>
        </Reveal>

        {/* In-article ad placeholder (no ad network code) */}
        <AdSlot format="inarticle" />

        {product.buy_links?.length > 0 && (
          <Reveal>
          <section className="section" aria-labelledby="buy-heading">
            <div className="section-head">
              <div>
                <h2 id="buy-heading">Where to buy</h2>
                <p>Official retailers — plain links, no affiliate tracking.</p>
              </div>
            </div>
            <div className="buy-list">
              {product.buy_links.map((b) => (
                <a key={b.retailer} href={b.url} target="_blank" rel="noopener noreferrer">
                  <span>{b.retailer}</span>
                  <span className="ext">Visit store ↗</span>
                </a>
              ))}
            </div>
            <p className="buy-note">
              Prices and availability change constantly — always confirm on the
              retailer's site. FlexSpot 2.0 earns no commission from these links.
            </p>
          </section>
          </Reveal>
        )}

        {related.length > 0 && (
          <Reveal>
          <section className="section" aria-labelledby="related-heading">
            <div className="section-head">
              <h2 id="related-heading">You may also like</h2>
            </div>
            <div className="grid grid--cards">
              {related.map((p) => (
                <ProductCard key={p.slug} product={p} />
              ))}
            </div>
          </section>
          </Reveal>
        )}

        <ShareButtons title={`${product.name} — specs & price`} path={path} />
      </article>
    </div>
  );
}
