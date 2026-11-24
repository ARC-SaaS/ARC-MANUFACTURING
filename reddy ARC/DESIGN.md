# ARC typography

Marketing layout: header, homepage and footer fill the viewport with 24px side gutters (16px on small phones). At desktop widths of 1024px and above, use --arc-desktop-left-inset: clamp(64px,9vw,160px) across the header, homepage, footer and shared InfoPage (Contact, Privacy and Terms). InfoPage is left aligned rather than centered, retaining its readable content width through a maximum outer width of calc(876px + var(--arc-desktop-left-inset)). Retain the 24px right gutter, original hero paragraph width and line break, and mobile layouts.

Content protection: shared/copy-protection.mjs and app/content-protection.css own desktop copy/context-menu blocking and mobile selection/callout suppression across all routes and standalone exports. Preserve form editing, paste, touch scrolling and zoom. This is a copying deterrent, not access control.

Preserve ARC content, artwork, palette and interactions. Use Inter for body text, controls, navigation, footer and loading captions. Use Gilroy for headings when installed on the visitor device, falling back to bundled Inter, Arial and system sans-serif. No Gilroy asset is supplied. Inter weights 300, 400, 500, 600 and 700 are bundled locally and embedded in standalone exports.

## Runtime ownership

app/typography.css owns fonts and the responsive scale for both app/layout.tsx and scripts/standalone-entry.tsx. The Tailwind font adapters in globals.css reference its family tokens. Breakpoints are 640px and 1024px, using rem units.

## Scale

Labels/legal eyebrows: 12px. Navigation/card text/footer: 14px. Body/buttons/form controls: 16px. Intro text: 18px. Small headings: 20px. Card titles: 24px. Section headings: 30px mobile, 36px desktop. Page titles: 36px mobile, 48px desktop. Hero: 36px mobile, 48px tablet, 72px desktop. An optional hero-brand-label uses 30/36/48px; ARC has no BLOCKS text, so do not add it. Preserve raster logo artwork.

## Weights and verification

Light 300, medium 500, semibold 600 and bold 700 are available; normal prose uses 400. Verify homepage, privacy, terms and dialogs at narrow and desktop widths, including wrapping and overflow. Regenerate standalone HTML after changes.

Reload screen: target 1 second from navigation (800ms display plus 200ms fade), with a matching CSS fallback. The logo artwork is cropped above its raster tagline and the exact tagline is rendered in bright white, bold Inter text in header, footer and loader, including the standalone first frame.

Favicon: preserve the full original ARC logo and tagline. Only brighten the artwork; never replace it with a monogram. Generate PNG, Apple and multi-size ICO assets from public/favicon-source.png; version metadata URLs to refresh browser caches.

Footer locations: below LinkedIn, show Chennai, India and Doha, Qatar with small inline SVG country flags, as supplied in the user's reference. Match existing contact row spacing and typography.

Logo tagline sizing: header 9px, footer 10px, reload screen 12px desktop and 10px mobile. Keep the bright white treatment.

Contact page: /contact uses the shared InfoPage layout, Inter/Gilroy scale, dark teal cards and existing contact details. Email and call actions use mailto/tel; do not imply a submitted enquiry or invent office addresses or working hours. Two contact cards stack on mobile. Include contact.html in portable exports and /contact in the sitemap.

Mobile navigation: at widths up to 850px, the header shows a 44px three-bar disclosure button and contains About ARC, How it works, Traceability and Contact. Menu closes on selection, outside pointer, Escape (restoring trigger focus), and resizing to desktop. Expanded menu stays in layout flow; desktop navigation is unchanged.

Privacy and Terms pages share a compact reading scale: title 30px desktop / 24px mobile, section headings 20px / 18px, body and navigation 14px with 1.85 line height, and draft label 12px. Keep legal content within a 56rem reading measure with 24px desktop and 20px mobile side padding. Separate legal sections by 36px on larger screens and 32px on mobile, with 14px between each heading and its body copy. Scope this through legal-page so contact and marketing typography stays independent.

Logo reference update: use public/arc-logo-reference.jpg exactly as supplied, crop only its outer canvas through the shared brand-art CSS frame, preserve the image's original tagline, and apply brightness(1.14). This supersedes the earlier live-text tagline treatment for header, footer, Contact and loading screen.

Transparent logo update: public/arc-logo-transparent.png supersedes the black-backed JPG in all BrandLogo variants and standalone loading frames. Keep alpha transparency, original tagline, and the subtle brightness treatment.
