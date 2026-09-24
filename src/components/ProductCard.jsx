// ============================================================
// ProductCard — catalog card used across home, category,
// search, blog related-products and compare suggestions.
// ============================================================
import { Link } from "react-router-dom";
import ProductImage from "./ProductImage.jsx";
import { formatPrice, productPath } from "../lib/data.js";
import "./ProductCard.css";

export default function ProductCard({ product }) {
  return (
    <Link to={productPath(product.slug)} className="pcard" aria-label={`${product.name} — full specs`}>
      <ProductImage product={product} />
      <div className="pcard__body">
        <p className="pcard__brand">{product.brand}</p>
        <h3 className="pcard__name">{product.name}</h3>
        {product.tagline && <p className="pcard__tagline">{product.tagline}</p>}
        <div className="pcard__meta">
          <span className="pcard__price">{formatPrice(product.price_usd)}</span>
          {product.specs?.chipset && (
            <span className="pcard__chip">{product.specs.chipset.split("(")[0].trim()}</span>
          )}
        </div>
      </div>
    </Link>
  );
}
