// ============================================================
// SearchBar — live suggestions + submit to /search?q=
// ============================================================
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { searchProducts } from "../lib/data.js";
import "./SearchBar.css";

export default function SearchBar({ placeholder = "Search 100 smartphones — try “iPhone 18” or “foldable”…", autoFocus = false, large = false }) {
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const navigate = useNavigate();
  const boxRef = useRef(null);
  const results = q.trim().length >= 2 ? searchProducts(q, 6) : [];

  useEffect(() => {
    const onDoc = (e) => {
      if (boxRef.current && !boxRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("pointerdown", onDoc);
    return () => document.removeEventListener("pointerdown", onDoc);
  }, []);

  const go = (path) => {
    setOpen(false);
    navigate(path);
  };

  const submit = (e) => {
    e.preventDefault();
    if (active >= 0 && results[active]) {
      go(`/product/${results[active].slug}`);
    } else if (q.trim()) {
      go(`/search?q=${encodeURIComponent(q.trim())}`);
    }
  };

  return (
    <div className={`searchbar${large ? " searchbar--large" : ""}`} ref={boxRef}>
      <form role="search" onSubmit={submit} className="searchbar__form">
        <span className="searchbar__icon" aria-hidden="true">⌕</span>
        <input
          type="search"
          value={q}
          autoFocus={autoFocus}
          onChange={(e) => { setQ(e.target.value); setOpen(true); setActive(-1); }}
          onFocus={() => setOpen(true)}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") { e.preventDefault(); setActive((a) => Math.min(a + 1, results.length - 1)); }
            if (e.key === "ArrowUp") { e.preventDefault(); setActive((a) => Math.max(a - 1, -1)); }
            if (e.key === "Escape") setOpen(false);
          }}
          placeholder={placeholder}
          aria-label="Search smartphones"
          autoComplete="off"
        />
        <button type="submit" className="searchbar__btn">Search</button>
      </form>
      {open && results.length > 0 && (
        <ul className="searchbar__suggest" role="listbox" aria-label="Suggestions">
          {results.map((p, i) => (
            <li key={p.slug} role="option" aria-selected={i === active}>
              <button
                type="button"
                className={i === active ? "is-active" : ""}
                onClick={() => go(`/product/${p.slug}`)}
              >
                <span className="searchbar__suggest-name">{p.name}</span>
                <span className="searchbar__suggest-brand">{p.brand}</span>
              </button>
            </li>
          ))}
          <li>
            <button type="button" className="searchbar__suggest-all" onClick={submit}>
              See all results for “{q.trim()}” →
            </button>
          </li>
        </ul>
      )}
    </div>
  );
}
