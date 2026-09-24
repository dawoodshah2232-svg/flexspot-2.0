// ============================================================
// Breadcrumbs — nav + BreadcrumbList JSON-LD for SEO/GEO.
// ============================================================
import { Link } from "react-router-dom";
import { JsonLd } from "./PageHead.jsx";
import { canonical } from "../lib/data.js";
import "./Breadcrumbs.css";

export default function Breadcrumbs({ trail }) {
  // trail: [{ label, path? }] — last item is the current page
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((t, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: t.label,
      ...(t.path ? { item: canonical(t.path) } : {}),
    })),
  };
  return (
    <>
      <JsonLd data={jsonLd} />
      <nav className="crumbs" aria-label="Breadcrumb">
        <ol>
          {trail.map((t, i) => (
            <li key={i}>
              {t.path && i < trail.length - 1 ? (
                <Link to={t.path}>{t.label}</Link>
              ) : (
                <span aria-current="page">{t.label}</span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
