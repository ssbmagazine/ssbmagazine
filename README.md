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

GitHub Actions builds on `rebuild` / `main` / `master`. It only **deploys** from `main` or `master` (the `github-pages` environment is usually limited to those branches). In the repo settings, set Pages source to **GitHub Actions**.

Do not store PDFs in Git LFS. GitHub Pages serves LFS pointer files instead of the documents.
