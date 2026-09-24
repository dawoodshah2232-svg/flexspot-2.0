// ============================================================
// ProductGallery — snap-scroll image gallery for product pages.
// Activates when a product has 2+ images; otherwise falls back
// to the honest ProductImage (photo or brand-monogram).
// First image is eager + high fetch priority; the rest lazy.
// Buttons are decorative on touch devices (native swipe works).
// ============================================================
import { useRef, useState } from "react";
import ProductImage from "./ProductImage.jsx";
import "./ProductGallery.css";

export default function ProductGallery({ product }) {
  const images = product.images ?? [];
  const railRef = useRef(null);
  const [index, setIndex] = useState(0);

  if (images.length <= 1) {
    return <ProductImage product={product} size="hero" eager />;
  }

  const scrollTo = (i) => {
    const next = (i + images.length) % images.length;
    setIndex(next);
    const rail = railRef.current;
    const slide = rail?.children[next];
    slide?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  };

  const onScroll = () => {
    const rail = railRef.current;
    if (!rail) return;
    const i = Math.round(rail.scrollLeft / rail.clientWidth);
    setIndex(Math.min(images.length - 1, Math.max(0, i)));
  };

  return (
    <div className="gallery" role="region" aria-label={`${product.name} image gallery`}>
      <div className="gallery__rail" ref={railRef} onScroll={onScroll}>
        {images.map((src, i) => (
          <figure key={src} className="gallery__slide">
            <img
              src={src}
              alt={`${product.name} — official product image ${i + 1} of ${images.length}`}
              loading={i === 0 ? "eager" : "lazy"}
              fetchPriority={i === 0 ? "high" : "auto"}
              referrerPolicy="no-referrer"
              draggable={false}
            />
          </figure>
        ))}
      </div>
      <div className="gallery__ui">
        <button
          type="button"
          className="gallery__nav"
          onClick={() => scrollTo(index - 1)}
          aria-label="Previous image"
        >
          ←
        </button>
        <div className="gallery__dots" role="tablist" aria-label="Gallery images">
          {images.map((src, i) => (
            <button
              key={src}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`Image ${i + 1} of ${images.length}`}
              className={`gallery__dot ${i === index ? "gallery__dot--active" : ""}`}
              onClick={() => scrollTo(i)}
            />
          ))}
        </div>
        <button
          type="button"
          className="gallery__nav"
          onClick={() => scrollTo(index + 1)}
          aria-label="Next image"
        >
          →
        </button>
      </div>
      <p className="gallery__count" aria-hidden="true">
        {index + 1} / {images.length}
      </p>
    </div>
  );
}
