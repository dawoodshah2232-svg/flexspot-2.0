// ============================================================
// Marquee — trending-brand ticker strip. The track is duplicated
// (second copy aria-hidden) and translated -50% on an infinite
// CSS keyframe; transform-only, GPU-friendly, pauses on hover.
// prefers-reduced-motion: static wrap, no animation.
// ============================================================
import "./Marquee.css";

export default function Marquee({ items, label = "Trending brands" }) {
  if (!items?.length) return null;
  const renderRow = (hidden) => (
    <div className="marquee__row" aria-hidden={hidden || undefined}>
      {items.map((item) => (
        <span key={item.key} className="marquee__item">
          <span className="marquee__name">{item.name}</span>
          {item.sub != null && <span className="marquee__sub">{item.sub}</span>}
          <span className="marquee__dot" aria-hidden="true">◆</span>
        </span>
      ))}
    </div>
  );
  return (
    <div className="marquee" role="region" aria-label={label}>
      <div className="marquee__track">
        {renderRow(false)}
        {renderRow(true)}
      </div>
    </div>
  );
}
