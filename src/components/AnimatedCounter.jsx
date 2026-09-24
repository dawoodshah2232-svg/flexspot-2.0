// ============================================================
// AnimatedCounter — counts from 0 to `value` when scrolled
// into view (rAF, ease-out, transform-free). Respects
// prefers-reduced-motion: renders the final value statically.
// ============================================================
import { useEffect, useRef, useState } from "react";
import { prefersReducedMotion, usePrefersReducedMotion } from "../lib/usePrefersReducedMotion.js";

const DEFAULT_FORMAT = (n) => Math.round(n).toLocaleString("en-US");

export default function AnimatedCounter({
  value,
  duration = 1400,
  format = DEFAULT_FORMAT,
}) {
  const ref = useRef(null);
  const reduced = usePrefersReducedMotion();
  const [display, setDisplay] = useState(() => (prefersReducedMotion() ? value : 0));

  useEffect(() => {
    if (reduced) return undefined;
    const el = ref.current;
    if (!el) return undefined;
    let raf = 0;
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const tick = (now) => {
          const t = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - t, 3);
          setDisplay(value * eased);
          if (t < 1) raf = requestAnimationFrame(tick);
          else setDisplay(value);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [reduced, value, duration]);

  return <span ref={ref}>{format(display)}</span>;
}
