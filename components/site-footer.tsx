import BrandLogo from '@/components/brand-logo';
import CookieSettings from '@/components/cookie-settings';
import ShareButton from '@/components/share-button';
import FooterLocations from '@/components/footer-locations';
import site from '@/lib/site.json';
import Link from 'next/link';

export default function SiteFooter() {
  return (
    <footer className="arc-footer">
      <div className="footer-grid">
        <div className="footer-brand">
          <Link href="/#home" aria-label="ARC home">
            <BrandLogo variant="footer" />
          </Link>
          <p>
            ARC brings part records and inspection checks together to help
            production teams understand what can move forward and what needs
            attention.
          </p>
        </div>

        <nav className="footer-column" aria-label="Footer navigation">
          <h2>Navigate</h2>
          <Link href="/#about">About ARC</Link>
          <Link href="/#process">How it works</Link>
          <Link href="/#traceability">Traceability</Link>
        </nav>

        <section
          className="footer-column"
          aria-labelledby="footer-industries-heading"
        >
          <h2 id="footer-industries-heading">Industries</h2>
          <span>Industry examples coming soon</span>
        </section>

        <section className="footer-column footer-contact" aria-label="Contact">
          <h2>Contact</h2>
          <a href="mailto:saas@arc-ai.in">saas@arc-ai.in</a>
          <FooterLocations />
        </section>
      </div>

      <div className="footer-bottom">
        <small>© 2026 ARC. All rights reserved. · v{site.version}</small>
        <nav className="legal-links" aria-label="Legal and sharing">
          <Link href="/privacy">Privacy policy</Link>
          <Link href="/terms">Terms</Link>
          <Link href="/#faq">FAQ</Link>
          <Link href="/contact">Contact</Link>
          <ShareButton />
          <CookieSettings />
        </nav>
        <Link href="/#home">
          Back to the top
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M12 19V5m-5 5 5-5 5 5" />
          </svg>
        </Link>
      </div>
    </footer>
  );
}
