// ============================================================
// ProductImage — honest imagery. Real image when the catalog
// has a verified one; otherwise an elegant brand-monogram
// placeholder card. NEVER a wrong or fake product image.
// ============================================================
import "./ProductCard.css";

const BRAND_COLORS = {
  Apple: "#a9b0bd",
  Samsung: "#7aa2f7",
  Google: "#8ab4f8",
  Xiaomi: "#ff8a5c",
  Motorola: "#7dd3c0",
  OnePlus: "#f0716f",
  vivo: "#8ea6ff",
  HONOR: "#c9a0ff",
  Nothing: "#e8e6df",
  OPPO: "#7fd08a",
  realme: "#ffd166",
  ASUS: "#ff5c8a",
  POCO: "#ffe066",
  Sony: "#9fd8ff",
  iQOO: "#ffb36b",
};

const initials = (brand) =>
  brand
    .split(/[\s-]+/)
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

export default function ProductImage({ product, size = "card", className = "", eager = false }) {
  const img = product.images?.[0];
  if (img) {
    return (
      <div className={`pimg pimg--photo pimg--${size} ${className}`}>
        <img
          src={img}
          alt={`${product.name} — official product image`}
          loading={eager ? "eager" : "lazy"}
          fetchPriority={eager ? "high" : "auto"}
          referrerPolicy="no-referrer"
        />
      </div>
    );
  }
  const color = BRAND_COLORS[product.brand] ?? "#d4af37";
  return (
    <div
      className={`pimg pimg--mono pimg--${size} ${className}`}
      role="img"
      aria-label={`${product.name} — image not available`}
      style={{ "--mono": color }}
    >
      <span className="pimg__initials" aria-hidden="true">
        {initials(product.brand)}
      </span>
      <span className="pimg__name" aria-hidden="true">
        {product.name}
      </span>
    </div>
  );
}
