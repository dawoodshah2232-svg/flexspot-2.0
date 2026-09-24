// ============================================================
// Preloader — branded gold splash with progress bar.
// Concept adapted from the tradingexpo-india preloader language
// (logo + progress, smooth dismiss, safety fallback); all code
// written fresh for FlexSpot 2.0's dark/gold brand.
//
// Behavior:
//  - Progress tweens toward ~90% while the app settles, then
//    completes to 100% and fades out.
//  - window 'load' (or document already complete) finishes it
//    early; a 3.5s hard timeout guarantees it can never trap
//    the user, even if load never fires.
//  - Does not block first paint: it is a fixed overlay rendered
//    by React; content beneath is already painted.
//  - prefers-reduced-motion: renders nothing (instant, static).
// ============================================================
import { useEffect, useRef, useState } from "react";
import { prefersReducedMotion, usePrefersReducedMotion } from "../lib/usePrefersReducedMotion.js";
import "./Preloader.css";

const HARD_TIMEOUT_MS = 3500;
const TWEEN_MS = 1100;

export default function Preloader() {
  const reduced = usePrefersReducedMotion();
  const [progress, setProgress] = useState(0);
  // Reduced-motion users skip the splash entirely (static experience).
  const [phase, setPhase] = useState(() => (prefersReducedMotion() ? "gone" : "loading"));
  const doneRef = useRef(false);
  const rafRef = useRef(0);

  useEffect(() => {
    if (reduced) return undefined;

    const finish = () => {
      if (doneRef.current) return;
      doneRef.current = true;
      cancelAnimationFrame(rafRef.current);
      setProgress(100);
      // Hold the full bar for a beat, then fade out.
      window.setTimeout(() => setPhase("leaving"), 220);
      window.setTimeout(() => setPhase("gone"), 700);
    };

    const start = performance.now();
    const tick = (now) => {
      const t = Math.min(1, (now - start) / TWEEN_MS);
      // Ease-out toward 92%: fast at first, then waits for load.
      const eased = 1 - Math.pow(1 - t, 3);
      setProgress(Math.round(eased * 92));
      if (t < 1 && !doneRef.current) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };
    rafRef.current = requestAnimationFrame(tick);

    if (document.readyState === "complete") {
      // App settled before we mounted — finish quickly.
      window.setTimeout(finish, 350);
    } else {
      window.addEventListener("load", finish, { once: true });
    }
    // Safety net: the preloader can never trap the user.
    const hard = window.setTimeout(finish, HARD_TIMEOUT_MS);

    // Lock scroll while the splash is visible.
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("load", finish);
      window.clearTimeout(hard);
      document.body.style.overflow = prevOverflow;
    };
  }, [reduced]);

  if (phase === "gone") return null;

  return (
    <div
      className={`preloader ${phase === "leaving" ? "preloader--leaving" : ""}`}
      aria-hidden="true"
      data-testid="preloader"
    >
      <div className="preloader__inner">
        <span className="preloader__mark">FS</span>
        <p className="preloader__wordmark">
          FlexSpot <span className="accent">2.0</span>
        </p>
        <div className="preloader__track" role="presentation">
          <div
            className="preloader__fill"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="preloader__pct">{progress}%</p>
      </div>
    </div>
  );
}
