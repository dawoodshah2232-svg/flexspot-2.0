import "./Home.css";

export default function Home() {
  return (
    <div className="container">
      <section className="hero" aria-labelledby="hero-title">
        <span className="badge">Worldwide product specs</span>
        <h1 className="page-title" id="hero-title" style={{ marginTop: "var(--space-4)" }}>
          FlexSpot <span className="accent">2.0</span>
        </h1>
        <p className="page-subtitle">
          Compare product specifications from around the world —
          phones, laptops, cameras and more, side by side.
        </p>
        <div className="hero__actions">
          <span className="btn btn-gold" role="link" aria-disabled="true">
            Browse products — coming soon
          </span>
        </div>
      </section>

      <hr className="gold-rule" />

      <section aria-labelledby="pillars-title">
        <h2 id="pillars-title">What&rsquo;s coming</h2>
        <div className="pillar-grid">
          <article className="card">
            <h3>Real specs</h3>
            <p>Verified specifications collected for real products, never made up.</p>
          </article>
          <article className="card">
            <h3>Side-by-side compare</h3>
            <p>Stack products against each other and see the differences that matter.</p>
          </article>
          <article className="card">
            <h3>Worldwide coverage</h3>
            <p>Regional variants, availability and pricing across markets.</p>
          </article>
        </div>
      </section>
    </div>
  );
}
