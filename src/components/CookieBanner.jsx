// ============================================================
// CookieBanner — tasteful consent banner for GA4 (Consent Mode
// v2, deny-by-default). Hidden entirely when no GA4 ID is set.
// ============================================================
import { useState } from "react";
import { Link } from "react-router-dom";
import { analyticsEnabled, setConsent, CONSENT_KEY } from "../lib/analytics.js";
import "./CookieBanner.css";

export default function CookieBanner() {
  // Lazy init: banner shows only when GA4 is configured and no choice stored.
  const [visible, setVisible] = useState(() => {
    if (!analyticsEnabled()) return false;
    try {
      return !localStorage.getItem(CONSENT_KEY);
    } catch {
      return true;
    }
  });

  if (!visible) return null;

  const choose = (granted) => {
    try {
      localStorage.setItem(CONSENT_KEY, granted ? "accepted" : "declined");
    } catch { /* private mode */ }
    setConsent(granted);
    setVisible(false);
  };

  return (
    <div className="cookie-banner" role="dialog" aria-label="Cookie consent" aria-live="polite">
      <p className="cookie-banner__text">
        We use cookies to understand how FlexSpot 2.0 is used and improve it.
        No advertising cookies, no data sold. See our{" "}
        <Link to="/cookies">cookie policy</Link>.
      </p>
      <div className="cookie-banner__actions">
        <button type="button" className="btn btn--ghost" onClick={() => choose(false)}>
          Decline
        </button>
        <button type="button" className="btn btn--primary" onClick={() => choose(true)}>
          Accept analytics
        </button>
      </div>
    </div>
  );
}
