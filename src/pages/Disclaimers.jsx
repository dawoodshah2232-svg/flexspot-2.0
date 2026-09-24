// ============================================================
// /disclaimers — spec accuracy, prices, links, editorial.
// ============================================================
import LegalPage from "./LegalPage.jsx";

export default function Disclaimers() {
  return (
    <LegalPage
      title="Disclaimers"
      description="How to read FlexSpot 2.0: spec accuracy limits, price volatility, plain retailer links with no affiliate tracking, and editorial independence."
      path="/disclaimers"
      updated="September 24, 2026"
    >
      <h2>Specification accuracy</h2>
      <p>
        Our catalog is a research snapshot compiled in September 2026 from
        launch coverage and manufacturer materials. We deliberately leave a
        field blank (shown as "—" or omitted) when we could not verify it,
        rather than guessing. This means some phones show incomplete rows —
        that is honesty, not a bug.
      </p>
      <p>
        Manufacturers silently revise specifications, ship regional variants
        with different chips or bands, and update software after launch. Treat
        our pages as a strong starting point and confirm anything
        purchase-critical with the manufacturer.
      </p>

      <h2>Prices</h2>
      <p>
        Prices shown are launch manufacturer suggested retail prices in USD
        where an official USD price exists. Where none is published (common for
        China- or EU-first brands) we show "Price TBA" instead of converting or
        estimating. Street prices move daily with promotions, carriers, and
        currency — always check the retailer before buying.
      </p>

      <h2>Where-to-buy links</h2>
      <p>
        Retailer links are plain homepages with no affiliate tags, no tracking
        parameters, and no commission to us. We list them as a convenience; we
        do not endorse any retailer and cannot help with orders, shipping, or
        returns.
      </p>

      <h2>Comparison winners</h2>
      <p>
        Per-row "winner" highlights on comparison pages are computed from raw
        numbers alone (larger battery, faster charging, lower price). They are a
        mechanical aid, not a buying recommendation — a bigger number is not
        always better for you (camera tuning, software, and ergonomics don't fit
        in a table).
      </p>

      <h2>Editorial independence</h2>
      <p>
        Buying guides are written by our editors from the same verified spec
        database you see on product pages. No manufacturer pays for placement,
        ranking, or favorable coverage, and no sponsored content appears on this
        site.
      </p>

      <h2>Images</h2>
      <p>
        A product photo is shown only when we verified it comes from the
        manufacturer's official channels or a freely-licensed source and
        matches the exact model. Otherwise you see a neutral monogram card —
        we will not show a wrong or stock image and pretend it is the phone.
      </p>

      <h2>Not professional advice</h2>
      <p>
        Nothing on this site is financial, legal, or professional advice. It is
        product information for general audiences.
      </p>
    </LegalPage>
  );
}
