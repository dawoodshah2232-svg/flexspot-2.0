# FlexSpot 2.0

Worldwide product specs & comparison site. Fresh rebuild — Vite + React +
react-router-dom, premium dark/gold mobile-first design system.

**Live:** https://dawoodshah2232-svg.github.io/flexspot-2.0/

## Quick start

```bash
npm install
npm run dev        # local dev server
npm run build      # production build → dist/
npm run preview    # preview the production build
npm run lint       # oxlint
```

## Deploy

The site deploys to GitHub Pages from the `gh-pages` branch under the
subpath `/flexspot-2.0/` (so `vite.config.js` uses `base: "/flexspot-2.0/"`
and the router uses `basename="/flexspot-2.0"`).

```bash
npm run deploy
```

This builds, copies the SPA fallback (`public/404.html` → `dist/404.html`)
plus `.nojekyll`, and publishes `dist/` to the `gh-pages` branch via a
git worktree. After deploying, verify the live URL returns 200.

Deep links (e.g. `/flexspot-2.0/products/x`) work because `404.html`
bounces the path to the app root in a `?p=` query param and the boot
script in `index.html` restores it with `history.replaceState`.

## Structure

```
src/
  main.jsx                 # Router (basename /flexspot-2.0), route table
  index.css                # Design tokens: colors, type, spacing, buttons,
                           # cards, prefers-reduced-motion — all in one place
  components/
    Layout.jsx             # Header + <main> + Footer, scroll-to-top on nav
    Header.jsx / Header.css
    Footer.jsx / Footer.css
  pages/
    Home.jsx / Home.css     # Scaffold landing (content by later workers)
    NotFound.jsx / NotFound.css
public/
  404.html                 # GitHub Pages SPA fallback
  manifest.webmanifest     # PWA manifest
  icons/                   # SVG + PNG icons (192/512/180/32)
scripts/
  deploy.sh                # gh-pages deploy (run via npm run deploy)
```

## Conventions for later workers

- Add new routes in `src/main.jsx` under the `<Layout>` route.
- Use tokens from `src/index.css` (`var(--color-gold)`, `var(--space-4)`, …)
  — never hardcode brand colors.
- Reusable UI primitives go in `src/components/`; content pages in `src/pages/`.
- All code here is written fresh for 2.0. The old `flexspot` repo is a
  separate legacy project — do not copy from it or push to it.
