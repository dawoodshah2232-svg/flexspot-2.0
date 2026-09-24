// ============================================================
// /terms — worldwide terms of use.
// ============================================================
import LegalPage from "./LegalPage.jsx";

export default function Terms() {
  return (
    <LegalPage
      title="Terms of Use"
      description="The terms governing your use of FlexSpot 2.0: what the site offers, what you may do with it, and the limits of our liability."
      path="/terms"
      updated="September 24, 2026"
    >
      <p>
        By accessing FlexSpot 2.0 you agree to these terms. If you do not agree,
        please do not use the site.
      </p>

      <h2>What this site is</h2>
      <p>
        FlexSpot 2.0 publishes smartphone specifications, launch prices,
        head-to-head comparisons, and editorial buying guides. It is an
        informational reference, not a store: we sell nothing and process no
        payments.
      </p>

      <h2>Acceptable use</h2>
      <ul>
        <li>You may browse, link to, and share our pages freely.</li>
        <li>
          You may quote brief excerpts with attribution and a link back. Bulk
          scraping or republishing the full catalog as your own is not permitted.
        </li>
        <li>
          You must not attempt to disrupt the site, misrepresent its content, or
          use it for unlawful purposes.
        </li>
      </ul>

      <h2>Intellectual property</h2>
      <p>
        The site's design, editorial copy, and comparison logic are the property
        of the site operator. Product names, images, and trademarks belong to
        their respective manufacturers and are shown for identification only.
        Product photographs are used only where we could verify an official or
        freely-licensed source; where no such image exists we show a neutral
        placeholder rather than an unverified image.
      </p>

      <h2>Accuracy and liability</h2>
      <p>
        Specifications are compiled from launch coverage and manufacturer
        materials available in September 2026. Manufacturers revise specs and
        prices without notice, and regional variants differ. We work hard to be
        accurate and we omit anything we cannot verify — but we make no warranty
        that every figure is current or complete. Always confirm critical
        details with the manufacturer or retailer before buying.
      </p>
      <p>
        To the maximum extent permitted by law, the site operator is not liable
        for any loss arising from reliance on the site's content, from
        third-party retailer sites we link to, or from site unavailability.
      </p>

      <h2>Third-party links</h2>
      <p>
        "Where to buy" buttons and spec sources link to external sites. We do
        not control them, earn no commission from them, and are not responsible
        for their content, pricing, or privacy practices.
      </p>

      <h2>Changes to the site and these terms</h2>
      <p>
        We may update content, features, or these terms at any time. Continued
        use after changes take effect constitutes acceptance of the new terms.
      </p>

      <h2>Governing law</h2>
      <p>
        These terms are governed by the laws of the jurisdiction where the site
        operator is established, without regard to conflict-of-law principles.
        Nothing in these terms limits rights you may have under the consumer
        protection laws of your own country.
      </p>
    </LegalPage>
  );
}
