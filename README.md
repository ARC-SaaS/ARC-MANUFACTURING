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
