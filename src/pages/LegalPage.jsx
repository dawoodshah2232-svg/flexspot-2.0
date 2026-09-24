// ============================================================
// LegalPage — shared shell for /privacy /terms /disclaimers /cookies
// ============================================================
import PageHead from "../components/PageHead.jsx";
import Breadcrumbs from "../components/Breadcrumbs.jsx";

export default function LegalPage({ title, description, path, updated, children }) {
  return (
    <div className="container">
      <PageHead title={title} description={description} path={path} />
      <Breadcrumbs trail={[{ label: "Home", path: "/" }, { label: title }]} />
      <article className="prose" style={{ marginBottom: "var(--space-16)" }}>
        <h1 className="page-title" style={{ marginTop: 0 }}>{title}</h1>
        {updated && (
          <p style={{ color: "var(--color-text-faint)", fontSize: "var(--text-sm)" }}>
            Last updated: {updated}
          </p>
        )}
        {children}
      </article>
    </div>
  );
}
