# Sathya Sai Balavikas

Frontend for the Telugu monthly magazine. Static site, GitHub Pages, no server.

## Local

```bash
npm install
npm run index-issues
npm run dev
```

`npm run dev` serves at `/`. Production builds use the `/ssbmagazine/` base path for GitHub Pages.

Drop later PDFs into `public/issues/YYYY/MM.pdf` (or a named slug for specials), then run `npm run index-issues` again. That rewrites `src/data/issues.json` and cover JPEGs under `public/covers/`.

## Pages

- `/` — landing (hero photograph still to come)
- `/archive` — cover shelves by year
- `/archive/:year/:slug` — in-app PDF reader
- `/about`, `/subscribe`, `/search` — placeholders until copy and search exist

## Deploy

1. Open **Settings → Pages → Build and deployment**.
2. Set **Source** to **GitHub Actions** (not “Deploy from a branch”).
3. Merge or push to `master` / `main`, or re-run the **Deploy to GitHub Pages** workflow.

If Source stays on a branch, GitHub serves the repo’s raw `index.html` (it asks for `/src/main.tsx`, which 404s and you get a blank page). The Actions build artifact is correct; Pages just isn’t using it until that setting is changed.

The site URL is: `https://ssbmagazine.github.io/ssbmagazine/`

Do not store PDFs in Git LFS. GitHub Pages serves LFS pointer files instead of the documents.
