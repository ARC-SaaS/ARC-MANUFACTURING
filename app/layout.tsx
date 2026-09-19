import type { Metadata } from 'next';
import './globals.css';
import './original-theme.css';
import './typography.css';
import './content-protection.css';
import ContentProtection from '../components/content-protection';
import site from '../lib/site.json';
import { pageMetadata } from '../lib/seo';
import { serializeStructuredData } from '../shared/seo-data.mjs';

export const metadata: Metadata = {
  ...pageMetadata(site.title, site.description),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className="antialiased"
      >
        <ContentProtection />
        {serializeStructuredData(site) && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeStructuredData(site) }} />}
        {children}
      </body>
    </html>
  );
}
