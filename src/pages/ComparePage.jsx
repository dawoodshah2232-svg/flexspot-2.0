// ============================================================
// /compare/:a-vs-:b — side-by-side spec table with per-row
// winner highlights. Nulls render as "—", never invented.
// ============================================================
import { Link, useParams } from "react-router-dom";
import PageHead, { JsonLd } from "../components/PageHead.jsx";
import Breadcrumbs from "../components/Breadcrumbs.jsx";
import ProductImage from "../components/ProductImage.jsx";
import ShareButtons from "../components/ShareButtons.jsx";
import {
  productBySlug,
  comparisonByPair,
  compareRows,
  comparePath,
  productPath,
  formatSpecValue,
  canonical,
} from "../lib/data.js";
import NotFound from "./NotFound.jsx";
import "./ComparePage.css";

const fmt = (key, v) => (key === "price" ? (v == null ? "Price TBA" : `$${Number(v).toLocaleString("en-US")}`) : formatSpecValue(v));

export default function ComparePage() {
  const { pair } = useParams();
  const matchup = comparisonByPair(pair ?? "");
  if (!matchup) return <NotFound />;
  const a = productBySlug(matchup.a);
  const b = productBySlug(matchup.b);
  if (!a || !b) return <NotFound />;

  const path = comparePath(a.slug, b.slug);
  const rows = compareRows(a, b);
  const wins = {
    a: rows.filter((r) => r.winner === "a").length,
    b: rows.filter((r) => r.winner === "b").length,
  };

  const tableLd = {
    "@context": "https://schema.org",
    "@type": "Table",
    about: [
      { "@type": "Product", name: a.name, url: canonical(productPath(a.slug)) },
      { "@type": "Product", name: b.name, url: canonical(productPath(b.slug)) },
    ],
  };

  return (
    <div className="container">
      <PageHead
        title={`${a.name} vs ${b.name} — Spec Comparison`}
        description={`${a.name} vs ${b.name}: side-by-side specs with per-row winners. ${matchup.title}. Real verified specs, no guesswork.`}
        path={path}
      />
      <JsonLd data={tableLd} />

      <Breadcrumbs
        trail={[
          { label: "Home", path: "/" },
          { label: "Smartphones", path: "/category/smartphones" },
          { label: `${a.name} vs ${b.name}` },
        ]}
      />

      <h1 className="page-title">
        {a.name} <span className="accent">vs</span> {b.name}
      </h1>
      <p className="page-subtitle">{matchup.title}. Green rows mark the per-spec winner — bigger isn't always better, so read the context.</p>

      <div className="versus-hero">
        {[a, b].map((p, i) => (
          <div key={p.slug} className="versus-card">
            <ProductImage product={p} />
            <p className="versus-brand">{p.brand}</p>
            <Link to={productPath(p.slug)} className="versus-name">{p.name}</Link>
            <p className="versus-wins">
              {i === 0 ? wins.a : wins.b} spec{wins.a === 1 && i === 0 ? "" : "s"} ahead
            </p>
          </div>
        ))}
        <span className="versus-badge" aria-hidden="true">VS</span>
      </div>

      <div className="compare-wrap" role="region" aria-label={`${a.name} versus ${b.name} spec table`} tabIndex={0}>
        <table className="compare-table">
          <thead>
            <tr>
              <th scope="col"><span className="sr-only">Specification</span></th>
              <th scope="col">{a.name}</th>
              <th scope="col">{b.name}</th>
            </tr>
          </thead>
          <tbody>
            {(() => {
              let lastGroup = null;
              const out = [];
              for (const r of rows) {
                if (r.group !== lastGroup) {
                  lastGroup = r.group;
                  out.push(
                    <tr key={`group-${r.group}`}>
                      <td colSpan={3} className="group-row">{r.group}</td>
                    </tr>
                  );
                }
                out.push(
                  <tr key={r.key}>
                    <th scope="row" className="row-label">{r.label}</th>
                    <td className={r.winner === "a" ? "winner" : r.a == null ? "null" : ""}>
                      {fmt(r.key, r.a)}
                    </td>
                    <td className={r.winner === "b" ? "winner" : r.b == null ? "null" : ""}>
                      {fmt(r.key, r.b)}
                    </td>
                  </tr>
                );
              }
              return out;
            })()}
          </tbody>
        </table>
      </div>

      <p className="compare-note">
        Winners are computed from the numbers alone (bigger battery, faster charging,
        lower price). Specs we could not verify are shown as “—” and never decide a row.
        Data verified September 2026 — always confirm with the manufacturer before buying.
      </p>

      <div className="compare-ctas">
        <Link className="btn btn--primary" to={productPath(a.slug)}>Full {a.name} specs</Link>
        <Link className="btn btn--primary" to={productPath(b.slug)}>Full {b.name} specs</Link>
      </div>

      <ShareButtons title={`${a.name} vs ${b.name}`} path={path} />
    </div>
  );
}
