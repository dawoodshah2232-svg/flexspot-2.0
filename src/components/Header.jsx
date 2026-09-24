import { Link, NavLink } from "react-router-dom";
import "./Header.css";

const NAV_LINKS = [
  { to: "/", label: "Home", end: true },
  { to: "/category/smartphones", label: "Phones" },
  { to: "/search", label: "Search" },
  { to: "/blog", label: "Guides" },
];

export default function Header() {
  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <Link to="/" className="brand" aria-label="FlexSpot 2.0 home">
          <span className="brand__mark" aria-hidden="true">FS</span>
          <span className="brand__name">
            FlexSpot <span className="accent">2.0</span>
          </span>
        </Link>
        <nav className="site-nav" aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) =>
                isActive ? "site-nav__link site-nav__link--active" : "site-nav__link"
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
