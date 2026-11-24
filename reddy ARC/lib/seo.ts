import type { Metadata } from 'next';
import site from './site.json';
import { getSiteOrigin } from '../shared/site-config.mjs';

export const siteOrigin = getSiteOrigin(site.url);
export function pageMetadata(
  title: string,
  description: string,
  path = '/',
): Metadata {
  const url = siteOrigin ? `${siteOrigin}${path}` : undefined;
  return {
    title,
    description,
    ...(siteOrigin ? { metadataBase: new URL(siteOrigin) } : {}),
    alternates: url ? { canonical: url } : undefined,
    robots: siteOrigin
      ? { index: true, follow: true }
      : { index: false, follow: false },
    icons: {
      icon: [
        { url: '/favicon.ico?v=arc-logo-bright-4', sizes: '16x16 32x32 48x48 256x256', type: 'image/x-icon' },
        { url: '/favicon.png?v=arc-logo-bright-4', type: 'image/png', sizes: '512x512' },
      ],
      shortcut: '/favicon.ico?v=arc-logo-bright-4',
      apple: '/apple-touch-icon.png?v=arc-logo-bright-4',
    },
    openGraph: {
      title,
      description,
      type: 'website',
      siteName: 'ARC',
      url,
      ...(siteOrigin
        ? {
            images: [
              {
                url: `${siteOrigin}/arc-logo.png`,
                alt: 'ARC — production automation',
              },
            ],
          }
        : {}),
    },
    twitter: {
      card: 'summary',
      title,
      description,
      ...(siteOrigin ? { images: [`${siteOrigin}/arc-logo.png`] } : {}),
    },
  };
}
