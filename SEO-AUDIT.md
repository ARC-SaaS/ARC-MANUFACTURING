# ARC SEO audit

## Fixed

- Replaced the generic search title with “ARC | Production Automation & Component Traceability”.
- Exported homepage, privacy and terms now include their actual rendered content in HTML before JavaScript executes, including one H1 per page, paragraphs and crawlable links.
- Added shared Organization and WebSite JSON-LD using the configured public origin and existing contact details. No invented ratings, reviews, addresses or certifications.
- Added an explicit noindex directive and distinct title for the not-found page.
- Added checks for unique titles, descriptions, language, viewport, rendered content and safe structured data.

## Existing strengths

Responsive layout, semantic headings, descriptive image alternatives, internal links, separate legal pages, favicon metadata, and Open Graph/Twitter metadata are present. Canonical URLs, robots.txt and sitemap.xml already derive from a validated HTTPS origin.

## Required before search indexing

The public URL in lib/site.json is still blank, pending owner confirmation. This deliberately produces noindex pages, blocks crawling, omits canonical URLs and structured data, and leaves the sitemap empty. Set the confirmed public HTTPS origin and rebuild to activate these features. Do not infer ownership from the contact email domain. The previously registered Sites URL was owner-restricted; changing code does not make a private deployment publicly crawlable.

Keep legalReviewed false until the owner approves the legal drafts. Those pages should remain noindex and excluded from the sitemap in the meantime.

Publish the completed build on the confirmed public origin, verify that the homepage returns HTTP 200 without login, and inspect /robots.txt and /sitemap.xml. Use Google Search Console URL Inspection and submit the sitemap from the owner's verified property. These account actions have not been performed.

For standalone hosting, serve ARC (3).html as the homepage and provide robots.txt/sitemap.xml for that host; the application route handlers require the application server. Do not assume uploading three HTML files also installs the server routes.

## Validation

Six SEO/readiness tests passed, including rendered HTML content and structured-data escaping. TypeScript passed. No ranking, indexing, PageSpeed score or live Core Web Vitals claim is made from these local checks.

Reference: https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics
