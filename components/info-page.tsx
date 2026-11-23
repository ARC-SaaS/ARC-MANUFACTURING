import type { ReactNode } from 'react';
import Link from 'next/link';
import BrandLogo from '@/components/brand-logo';
import SiteFooter from '@/components/site-footer';
export default function InfoPage({
  title,
  children,
  className = '',
}: {
  title: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className="simple-site info-page-site">
      <header className="site-header info-page-header">
        <Link className="site-logo" href="/#home" aria-label="ARC home">
          <BrandLogo />
        </Link>
        <Link className="nav-cta info-page-back" href="/#home">
          ← Back to ARC
        </Link>
      </header>
      <main id="main-content" className={`info-page ${className}`.trim()} tabIndex={-1}>
        <h1>{title}</h1>
        {children}
      </main>
      <SiteFooter />
    </div>
  );
}
