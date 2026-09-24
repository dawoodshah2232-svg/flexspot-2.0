import { Link } from "react-router-dom";
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
          Real smartphone specs, honest comparisons, no fake data.
        </p>
        <nav className="site-footer__nav" aria-label="Footer">
          <Link to="/category/smartphones">All phones</Link>
          <Link to="/blog">Buying guides</Link>
          <Link to="/search">Search</Link>
          <Link to="/privacy">Privacy</Link>
          <Link to="/terms">Terms</Link>
          <Link to="/disclaimers">Disclaimers</Link>
          <Link to="/cookies">Cookies</Link>
        </nav>
        <hr className="gold-rule" />
        <p className="site-footer__meta">
          © {year} FlexSpot. Specs verified September 2026 — confirm with the
          manufacturer before buying.
        </p>
      </div>
    </footer>
  );
}
