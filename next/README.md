# Delta Point Games (Next.js)

This folder contains the Next.js + TypeScript rewrite of the legacy static site.

## Local development

```bash
npm install
npm run dev
```

## Deploy targets

- Vercel: deploy the `next` folder as the project root.
- Cloudflare Pages / Netlify: set the build command to `npm run build` and the output to `.next` (or use `next export` if you decide to go fully static later).

## Content sources

- JSON content lives in `data/` and is imported at build time.
- Images are expected at `public/Assets/Images/`.

## Required asset step

Copy the existing images from the legacy `Assets/Images/` folder into:

```
next/public/Assets/Images/
```

The HTML and styling assume those paths (e.g. `/Assets/Images/DPGIcon.png`).
