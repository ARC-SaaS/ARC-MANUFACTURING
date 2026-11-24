import { siteOrigin } from '@/lib/seo';
export function GET() {
  return new Response(
    siteOrigin
      ? `User-agent: *\nAllow: /\nDisallow: /__debug\nSitemap: ${siteOrigin}/sitemap.xml\n`
      : 'User-agent: *\nDisallow: /\n',
    { headers: { 'Content-Type': 'text/plain; charset=utf-8' } },
  );
}
