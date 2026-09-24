import { Link } from "react-router-dom";
import PageHead from "../components/PageHead.jsx";
import SearchBar from "../components/SearchBar.jsx";
import "./NotFound.css";

export default function NotFound() {
  return (
    <div className="container notfound">
      <PageHead
        title="Page not found"
        description="The page you're looking for doesn't exist on FlexSpot 2.0."
        path="/404"
        noindex
      />
      <span className="badge">404</span>
      <h1 className="page-title">
        Page <span className="accent">not found</span>
      </h1>
      <p className="page-subtitle">
        The page you&rsquo;re looking for doesn&rsquo;t exist or was moved.
        Try searching the catalog instead.
      </p>
      <div className="hero__search" style={{ marginBottom: "var(--space-8)" }}>
        <SearchBar />
      </div>
      <div className="notfound__links">
        <Link to="/" className="btn btn--primary">Back to home</Link>
        <Link to="/category/smartphones" className="btn btn--ghost">Browse all phones</Link>
        <Link to="/blog" className="btn btn--ghost">Buying guides</Link>
      </div>
    </div>
  );
}
