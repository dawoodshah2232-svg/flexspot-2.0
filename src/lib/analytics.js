// ============================================================
// FlexSpot 2.0 — GA4 analytics, Consent Mode v2.
// Deny-by-default. Complete no-op when VITE_GA_MEASUREMENT_ID
// is unset. Cookie banner (see components/CookieBanner.jsx)
// flips consent to granted on explicit accept.
// ============================================================

const MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;
let scriptLoaded = false;

export const analyticsEnabled = () => Boolean(MEASUREMENT_ID);
export const CONSENT_KEY = "flexspot2-cookie-consent";

function gtag(...args) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(args);
}

function loadGtagScript() {
  if (scriptLoaded || !MEASUREMENT_ID) return;
  scriptLoaded = true;
  const s = document.createElement("script");
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(MEASUREMENT_ID)}`;
  document.head.appendChild(s);
}

export function initAnalytics() {
  if (!MEASUREMENT_ID) return; // no-op without an ID
  gtag("consent", "default", {
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    analytics_storage: "denied",
    functionality_storage: "denied",
    personalization_storage: "denied",
    security_storage: "granted",
  });
  loadGtagScript();
  gtag("js", new Date());
  gtag("config", MEASUREMENT_ID, {
    anonymize_ip: true,
    send_page_view: false,
  });
  // Apply any stored choice from a previous visit.
  try {
    const stored = localStorage.getItem(CONSENT_KEY);
    if (stored === "accepted") setConsent(true);
  } catch {
    /* storage unavailable — stay denied */
  }
}

export function setConsent(granted) {
  if (!MEASUREMENT_ID) return;
  gtag("consent", "update", {
    analytics_storage: granted ? "granted" : "denied",
    functionality_storage: granted ? "granted" : "denied",
  });
}

export function trackPageView(path) {
  if (!MEASUREMENT_ID) return;
  gtag("event", "page_view", { page_path: path });
}
