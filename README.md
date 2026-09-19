# ARC
A simple black, white, and purple webpage introducing automotive production automation.

## Run locally
Use Node.js 22.13+ and pnpm:

    pnpm install
    pnpm dev

## Build

    pnpm build

The page uses React, Vite through Vinext, and Tailwind CSS. It has no dashboard, account system, or production database. The traceability example uses read-only sample records and does not perform real assembly.

Sample blocked pair: ARC-26-A005 / ARC-26-B005.
Sample valid pair: ARC-26-A001 / ARC-26-B001.

The original backend draft was set aside when the scope changed to a simple webpage only.

## Implementation contracts

- `app/page.tsx` is the maintained page. `ARC (3).html` is generated from it by `scripts/export-standalone.mjs` during `pnpm build`; do not edit the generated HTML separately. Both use the same validation and UI code.
- Website text describes the ARC product vision. This repository implements the explanatory website and a fixed read-only sample, not the advertised factory/AI integrations. The existing wording and industries are retained intentionally.
- In this sample, a parent accepts one child, with the same product type, order, and P7 assembly stage. Numeric serial suffixes need not match. A001/B002 is valid. These are sample rules, not a configurable bill of materials.
- Inspection status and relationship status are independent. B005 is PASSED and has a RESERVED relationship; both must be checked. Legacy assignment-like overall statuses are also blocked defensively.
- Each required stage needs a latest PASS. Missing histories, invalid dates, or duplicate timestamps within a stage fail closed. Sample success wording is retained, but the result never authorizes physical work or changes assignments.
- Unused backend/dashboard drafts have been removed. The website retains its read-only sample validation; repair and assembly transitions require a future backend design.
- The LinkedIn label is informational until an approved company profile URL is supplied. No destination is guessed.
- Theme, page wording, assets, architecture, and animation timings remain unchanged by the reliability fixes.

## Site readiness

- Set `url` in `lib/site.json` to the confirmed public HTTPS origin. Canonical and social URLs, robots.txt, and sitemap.xml use it; a blank value intentionally keeps indexing disabled.
- Set `analyticsId` only to the owner's actual Google Analytics measurement ID. Analytics stays disabled until configured and accepted in Cookie settings.
- Keep `legalReviewed` false until the legal operator, address, jurisdiction, retention, and provider details are confirmed and the privacy/terms text is finalized.
- Site and package versions are aligned at 0.2.0. The footer displays the site version.
- The standalone exporter embeds each logo once and marks each document's page explicitly so `/privacy`, `/privacy.html`, `/terms`, and `/terms.html` render the correct content.
- See `COPY-PROTECTION.md` for the installed CSS, vanilla JavaScript, limitations, and browser test steps.
