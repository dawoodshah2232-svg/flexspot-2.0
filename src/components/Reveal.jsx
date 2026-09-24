// ============================================================
// Reveal — Apple-style scroll-triggered entrance.
// IntersectionObserver toggles .is-visible; CSS transitions
// transform + opacity only (GPU-friendly). Once visible, the
// observer disconnects (one-shot).
// prefers-reduced-motion: content renders visible, no motion.
// ============================================================
import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "../lib/usePrefersReducedMotion.js";
import "./Reveal.css";

export default function Reveal({
  as: Tag = "div",
  variant = "up", // "up" | "fade"
  delay = 0,
  className = "",
  children,
  ...rest
}) {
  const ref = useRef(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    if (reduced) {
      el.classList.add("is-visible");
      return undefined;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduced]);

  return (
    <Tag
      ref={ref}
      className={`reveal reveal--${variant} ${className}`.trim()}
      style={delay ? { "--reveal-delay": `${delay}ms` } : undefined}
      {...rest}
    >
      {children}
    </Tag>
  );
}
