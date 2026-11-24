import type { ReactNode } from 'react';
import BrandLogo from '@/components/brand-logo';
import SiteFooter from '@/components/site-footer';
export default function InfoPage({
  title,
  children,
  className = '',
  showFooter = false,
  showLegalNav = true,
}: {
  title: string;
  children: ReactNode;
  className?: string;
  showFooter?: boolean;
  showLegalNav?: boolean;
}) {
  return (
    <div className="simple-site info-page-site">
      <header className="site-header info-page-header">
        <a className="site-logo" href="/#home" aria-label="ARC home">
          <BrandLogo />
        </a>
        <a className="nav-cta info-page-back" href="/#home">
          ← Back to ARC
        </a>
      </header>
      <main id="main-content" className={`info-page ${className}`.trim()} tabIndex={-1}>
        <h1>{title}</h1>
        {children}
        {showLegalNav && (
          <nav className="legal-nav" aria-label="Legal navigation">
            <a href="/privacy">Privacy policy</a>
            <a href="/terms">Terms</a>
            <a href="https://arc-ai.in/#faq">FAQ</a>
            <a href="/contact">Contact ARC</a>
          </nav>
        )}
      </main>
      {showFooter && <SiteFooter />}
    </div>
  );
}
