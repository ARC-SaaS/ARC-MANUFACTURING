import { siteOrigin } from '@/lib/seo';
import site from '@/lib/site.json';
export function GET() {
  const paths = site.legalReviewed ? ['/', '/contact', '/privacy', '/terms'] : ['/', '/contact'];
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${siteOrigin ? paths.map((path) => `<url><loc>${siteOrigin}${path}</loc></url>`).join('') : ''}</urlset>`,
    { headers: { 'Content-Type': 'application/xml; charset=utf-8' } },
  );
}
