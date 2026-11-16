# geetikashukla.com

Portfolio site for Geetika Shukla, built with Next.js and [fictoan-react](https://fictoan.io/). Deployed on Netlify from `main`.

## Development

```bash
npm install
npm run dev     # http://localhost:3000
npm run build
npm run lint
```

Both `dev` and `build` run with `--webpack` (not Turbopack): SVGs are imported as React components through `@svgr/webpack`, and Turbopack has trouble parsing fictoan-react's CSS.

## Structure

- `src/app/page.tsx` — home page timeline
- `src/data/projects.ts` — timeline periods and projects; edit this to add, reorder or date work
- `src/app/<category>/<project>/page.tsx` — project case studies
- `src/styles/globals.css` — design tokens (colours, fonts, spacing)

## Images

SVGs imported as components are inlined into the page HTML and JS, so keep raster images embedded in them small (around 2× their display size).
