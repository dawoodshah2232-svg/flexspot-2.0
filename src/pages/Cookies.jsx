// ============================================================
// /cookies — GA4-aware cookie policy.
// ============================================================
import { Link } from "react-router-dom";
import LegalPage from "./LegalPage.jsx";

export default function Cookies() {
  return (
    <LegalPage
      title="Cookie Policy"
      description="Which cookies FlexSpot 2.0 uses: none by default, Google Analytics 4 only after you accept. How to manage or withdraw consent."
      path="/cookies"
      updated="September 24, 2026"
    >
      <p>
        FlexSpot 2.0 keeps cookie use to the absolute minimum. This page lists
        everything that can be stored in your browser by this site.
      </p>

      <h2>Strictly necessary (no consent needed)</h2>
      <ul>
        <li>
          <strong>Your cookie choice</strong> — stored in your browser's local
          storage (not a cookie) when you accept or decline analytics, so the
          banner doesn't reappear on every visit. It never leaves your device.
        </li>
      </ul>
      <p>By default, the site sets no cookies at all.</p>

      <h2>Analytics cookies (only after you accept)</h2>
      <p>
        If the site owner has configured Google Analytics 4 <em>and</em> you
        click "Accept analytics" on the cookie banner, Google Analytics may set:
      </p>
      <ul>
        <li>
          <code>_ga</code> — distinguishes visits; expires after 2 years.
        </li>
        <li>
          <code>_ga_&lt;container-id&gt;</code> — persists session state; expires
          after 2 years.
        </li>
      </ul>
      <p>
        These are governed by Google's privacy policy, run with IP anonymization,
        and use Consent Mode v2: until you accept, analytics storage is denied
        and these cookies are never set. No advertising cookies are ever used on
        this site.
      </p>

      <h2>Managing your choice</h2>
      <ul>
        <li>
          <strong>Withdraw consent:</strong> clear your browser's site data /
          storage for this site. Your next visit starts denied-by-default again.
        </li>
        <li>
          <strong>Browser controls:</strong> every modern browser can block or
          delete cookies for individual sites in its settings.
        </li>
        <li>
          <strong>Google's opt-out:</strong> Google offers a{" "}
          <a
            href="https://tools.google.com/dlpage/gaoptout"
            target="_blank"
            rel="noopener noreferrer"
          >
            Analytics opt-out browser add-on
          </a>{" "}
          that works across all sites.
        </li>
      </ul>

      <h2>Questions</h2>
      <p>
        See our <Link to="/privacy">Privacy Policy</Link> for the broader
        picture of how (little) data this site processes.
      </p>
    </LegalPage>
  );
}
