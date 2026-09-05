# aymenhafeez.github.io

Personal website and writing archive for Aymen Hafeez, built with [Astro](https://astro.build/) and deployed to GitHub Pages.

## Local development

Requires Node.js 22.

```sh
npm install
npm run dev
```

The local site is available at `http://localhost:4321`.

## Commands

- `npm run dev` starts the development server.
- `npm run build` creates the production site in `dist/` and builds the search index.
- `npm run preview` previews the production build.
- `npm run check` runs Astro and Biome checks.
- `npm run format` formats the source.

## Content

Blog posts live in `src/content/post/`. Routes and page templates are in `src/pages/`, shared layouts are in `src/layouts/`, and static media is in `public/images/`.

Post frontmatter supports:

```yaml
---
title: "Post title"
description: "A concise description"
publishDate: "2026-01-01"
updatedDate: "2026-01-02" # optional
tags: [mathematics, python]
draft: false
---
```

Site metadata, navigation, and the Google Analytics measurement ID are configured in `src/site.config.ts`.

## Deployment

The GitHub Actions workflow in `.github/workflows/deploy.yml` builds and deploys pushes to the `master` branch. The generated `dist/` directory should not be edited by hand.
