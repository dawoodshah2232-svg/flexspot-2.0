// ============================================================
// AdSlot — PLACEHOLDER ONLY. Clearly labeled "Advertisement"
// for future AdSense monetization. No ad network code, no
// third-party scripts, no tracking. Static markup + CSS.
//
// Formats:
//   leaderboard — below-header, responsive (728x90 / 320x100)
//   infeed      — inside card grids on listing/category pages
//   inarticle   — inside article/product content flow
// ============================================================
import "./AdSlot.css";

const COPY = {
  leaderboard: "Leaderboard — 728×90",
  infeed: "In-feed",
  inarticle: "In-article — 336×280",
};

export default function AdSlot({ format = "leaderboard" }) {
  return (
    <div
      className={`adslot adslot--${format}`}
      role="complementary"
      aria-label={`Advertisement placeholder (${COPY[format] ?? format})`}
    >
      <span className="adslot__label">Advertisement</span>
      <span className="adslot__note">
        Ad placeholder{COPY[format] ? ` · ${COPY[format]}` : ""} — connect AdSense to monetize
      </span>
    </div>
  );
}
