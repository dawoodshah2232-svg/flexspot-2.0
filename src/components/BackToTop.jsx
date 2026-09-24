// ============================================================
// BackToTop — floating button, appears after scrolling past
// 640px. Smooth-scrolls home (instant under reduced motion).
// ============================================================
import { useEffect, useState } from "react";
import { prefersReducedMotion } from "../lib/usePrefersReducedMotion.js";
import "./BackToTop.css";

const SHOW_AFTER = 640;

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setVisible(window.scrollY > SHOW_AFTER);
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const goTop = () => {
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion() ? "auto" : "smooth",
    });
  };

  return (
    <button
      type="button"
      className={`to-top ${visible ? "to-top--visible" : ""}`}
      onClick={goTop}
      aria-label="Back to top"
      tabIndex={visible ? 0 : -1}
    >
      <span aria-hidden="true">↑</span>
    </button>
  );
}
