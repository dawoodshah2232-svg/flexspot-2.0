import { Link } from "react-router-dom";
import "./NotFound.css";

export default function NotFound() {
  return (
    <div className="container notfound">
      <span className="badge">404</span>
      <h1 className="page-title">
        Page <span className="accent">not found</span>
      </h1>
      <p className="page-subtitle">
        The page you&rsquo;re looking for doesn&rsquo;t exist or was moved.
      </p>
      <Link to="/" className="btn btn-gold">
        Back to home
      </Link>
    </div>
  );
}
