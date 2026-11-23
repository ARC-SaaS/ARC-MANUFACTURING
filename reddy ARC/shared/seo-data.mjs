import { getSiteOrigin } from './site-config.mjs';

export function structuredData(site) {
  const origin = getSiteOrigin(site.url);
  if (!origin) return null;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization', '@id': `${origin}/#organization`,
        name: 'ARC', url: `${origin}/`, logo: `${origin}/arc-logo.png`,
        email: 'saas@arc-ai.in', telephone: '+91-6380436024',
      },
      {
        '@type': 'WebSite', '@id': `${origin}/#website`,
        name: 'ARC', url: `${origin}/`, description: site.description,
        inLanguage: 'en', publisher: { '@id': `${origin}/#organization` },
      },
    ],
  };
}

export function serializeStructuredData(site) {
  const data = structuredData(site);
  return data ? JSON.stringify(data).replaceAll('<', '\\u003c') : '';
}
