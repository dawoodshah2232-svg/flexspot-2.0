import "./Footer.css";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="container site-footer__inner">
        <p className="site-footer__brand">
          FlexSpot <span className="accent">2.0</span>
        </p>
        <p className="site-footer__tagline">
          Worldwide product specs &amp; comparisons.
        </p>
        <hr className="gold-rule" />
        <p className="site-footer__meta">© {year} FlexSpot. All rights reserved.</p>
      </div>
    </footer>
  );
}
