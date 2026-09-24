// ============================================================
// ShareButtons — share a page via X / Facebook / WhatsApp,
// or copy the link. No SDKs.
// ============================================================
import { useState } from "react";
import { canonical } from "../lib/data.js";
import "./ShareButtons.css";

export default function ShareButtons({ title, path }) {
  const [copied, setCopied] = useState(false);
  const url = canonical(path);
  const text = encodeURIComponent(title);
  const u = encodeURIComponent(url);
  const links = [
    { label: "Share on X", href: `https://twitter.com/intent/tweet?text=${text}&url=${u}` },
    { label: "Share on Facebook", href: `https://www.facebook.com/sharer/sharer.php?u=${u}` },
    { label: "Share on WhatsApp", href: `https://wa.me/?text=${text}%20${u}` },
  ];
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch { /* clipboard unavailable */ }
  };
  return (
    <div className="share">
      <span className="share__label">Share this page</span>
      <div className="share__row">
        {links.map((l) => (
          <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer" className="btn btn--ghost btn--sm">
            {l.label}
          </a>
        ))}
        <button type="button" className="btn btn--ghost btn--sm" onClick={copy}>
          {copied ? "Copied ✓" : "Copy link"}
        </button>
      </div>
    </div>
  );
}
