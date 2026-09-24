// ============================================================
// /privacy — worldwide privacy copy (GA4-aware).
// ============================================================
import { Link } from "react-router-dom";
import LegalPage from "./LegalPage.jsx";

export default function Privacy() {
  return (
    <LegalPage
      title="Privacy Policy"
      description="How FlexSpot 2.0 handles your data: no accounts, no tracking without consent, analytics only with your permission."
      path="/privacy"
      updated="September 24, 2026"
    >
      <p>
        FlexSpot 2.0 ("we", "this site") is a public product-comparison website.
        There are no accounts, no checkouts, and no forms that collect personal
        information. This policy explains the limited data that is processed when
        you visit.
      </p>

      <h2>What we collect</h2>
      <ul>
        <li>
          <strong>Nothing by default.</strong> Simply browsing product pages,
          comparisons and guides sends us no personal data beyond what your
          browser necessarily transmits to any web server (anonymized,
          short-lived server logs used for security and reliability).
        </li>
        <li>
          <strong>Your cookie choice.</strong> If you accept or decline analytics
          cookies, that choice is stored locally in your own browser
          (<code>localStorage</code>) so we don't ask again. It is never sent
          anywhere.
        </li>
      </ul>

      <h2>Analytics (only with your consent)</h2>
      <p>
        This site can use Google Analytics 4 to understand aggregate usage
        (which pages are popular, roughly where visitors come from). It is
        completely disabled unless two things are true: the site owner has
        configured a measurement ID, <em>and</em> you have clicked "Accept
        analytics" on the cookie banner.
      </p>
      <p>
        Consent uses Google's Consent Mode v2 with deny-by-default: no
        analytics, advertising, or personalization storage happens before you
        opt in. When enabled, IP addresses are anonymized and no advertising
        features are used. You can withdraw consent at any time by clearing your
        browser storage for this site — on your next visit everything is denied
        again by default.
      </p>

      <h2>Cookies</h2>
      <p>
        Without consent, this site sets no cookies of its own. With your
        consent, Google Analytics may set cookies such as <code>_ga</code> to
        distinguish visits. See our <Link to="/cookies">Cookie Policy</Link> for
        the full list and how to manage them.
      </p>

      <h2>What we never do</h2>
      <ul>
        <li>We do not sell, rent, or share personal data — there is nothing to share.</li>
        <li>We run no advertising networks and no cross-site trackers.</li>
        <li>We operate no affiliate, payout, wallet, or membership systems.</li>
      </ul>

      <h2>External links</h2>
      <p>
        "Where to buy" links and spec sources point to third-party retailers and
        publishers. Their privacy practices are their own; this policy covers
        only FlexSpot 2.0 pages.
      </p>

      <h2>Children</h2>
      <p>
        This site is a general-audience reference and is not directed at
        children under 13. We knowingly collect no data from anyone.
      </p>

      <h2>Changes</h2>
      <p>
        If this policy changes materially, the "Last updated" date above will
        change and the new version will apply from that date.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about this policy can be sent to the site operator through the
        contact details published on the site. Because we hold no personal data
        about visitors, data-access or deletion requests have nothing to act on —
        but we will still answer you.
      </p>
    </LegalPage>
  );
}
