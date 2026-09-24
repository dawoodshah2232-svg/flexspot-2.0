import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import CookieBanner from "./CookieBanner.jsx";
import Preloader from "./Preloader.jsx";
import AdSlot from "./AdSlot.jsx";
import BackToTop from "./BackToTop.jsx";
import { trackPageView } from "../lib/analytics.js";

export default function Layout() {
  const { pathname, search } = useLocation();

  useEffect(() => {
    // Scroll to top on route change (respects reduced motion natively)
    window.scrollTo(0, 0);
    // SPA page view for GA4 (no-op without a measurement ID)
    trackPageView(pathname + search);
  }, [pathname, search]);

  return (
    <>
      <Preloader />
      <Header />
      {/* AdSense-ready leaderboard slot (placeholder only — no ad code) */}
      <AdSlot format="leaderboard" />
      <main id="main-content">
        <Outlet />
      </main>
      <Footer />
      <CookieBanner />
      <BackToTop />
    </>
  );
}
