# ARC Website Backup

This folder preserves the ARC website project source, public assets, project configuration, documentation, generated standalone HTML pages, and the current `dist` build output.

## Restore and run

Install Node.js 22.13 or later and pnpm, then run:

```powershell
pnpm install
pnpm dev
```

To build the website:

```powershell
pnpm build
```

`app/page.tsx` is the maintained home page. `ARC (3).html` is generated during the build and should not be edited separately. See `README.md` for implementation and site-readiness details.

Dependencies, Git history, and temporary build caches were not copied; package manifests and the lockfile are included to restore dependencies.
