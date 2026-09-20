import type { ReactNode } from 'react';
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
    <div className="simple-site">
      <main id="main-content" className={`info-page ${className}`.trim()} tabIndex={-1}>
        <a className="text-link" href="/#home">
          ← Back to ARC
        </a>
        <h1>{title}</h1>
        {children}
        <nav className="legal-nav" aria-label="Legal navigation">
          <a href="/privacy">Privacy policy</a>
          <a href="/terms">Terms</a>
          <a href="https://arc-ai.in/#faq">FAQ</a>
          <a href="/contact">Contact ARC</a>
        </nav>
      </main>
    </div>
  );
}
