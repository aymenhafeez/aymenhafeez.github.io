# Aymen Hafeez

A plain static blog built with Eleventy, Markdown and a small stylesheet.
Hosted at https://aymenhafeez.github.io/ through GitHub Pages.

The default page lists all posts, grouped by year. The main navigation is Posts,
About and Photos. Former archive URLs (`/posts/`, `/posts/2/`, `/posts/3/`)
redirect to `/`; individual post URLs remain unchanged.

## Local development

Use Node.js 22 or later (`nvm use` if you use nvm):

```sh
npm ci
npm run dev
```

Open http://localhost:8080. Eleventy rebuilds when content or templates change.

```sh
npm test       # Markdown, equations and heading anchors
npm run check  # Clean build, old URLs, links, redirects, assets and feeds
npm run build  # Produce the static website in dist/
```

## Writing

Add a Markdown file in `site/posts/`. The filename is the public URL, including
its date: `2026-10-14-example.md` becomes `/posts/2026-10-14-example/`.
Do not rename published files unless you add a redirect.

```markdown
---
title: "Example post"
publishDate: "14 October 2026"
description: "A short description for feeds and link previews."
tags: ["mathematics"]
---

Write Markdown here. Use `$x^2$` for inline maths and `$$...$$` for display maths.
```

Optional fields: `updatedDate` and `draft: true`. Drafts are excluded
from the generated site, archives and feeds.
Markdown is not interpreted as a template, so code containing `{{...}}` is safe.

Keep all images and GIFs in `public/images/`, then reference them with paths such
as `/images/example.png`. Photo galleries have their own subdirectories
(`iceland/`, `bath/`, `london/`, `wales/`, `newyork/`, and `daytoday/`). Theme
screenshots are in `doric-themes/`.
Other static files go in `public/`. HTML and embedded plots are supported
inside Markdown. Equations render during the build; their fonts and CSS are
hosted locally.

Code fences such as `\`\`\`python` and `\`\`\`lua` receive syntax highlighting
during the build using Prism. Highlighting adds no browser JavaScript. Its
colours are defined in `public/assets/style.css`.

Light and dark modes follow the device's colour-scheme preference. Dark mode
uses a black background, and the page's text, links and code colours adapt in CSS.

## Editing the site

- Pages: `site/about.md`, `site/index.njk`, and the other files in `site/`.
- Example articles: `site/examples/`.
- Photo order, captions and galleries: `site/_data/galleries.json`.
- Navigation and document metadata: `site/_includes/base.njk`.
- Post layout: `site/_includes/post.njk`.
- Styles: `public/assets/style.css`.
- Name, email and analytics: `site/_data/site.json` (empty `analyticsId` disables tracking).
- Historical URL redirects: `site/_data/redirects.json`.

The empty Notes page and its feed are retained for URL compatibility. The main
RSS feed is `/rss.xml`; `/feed.xml` preserves the old Jekyll Atom feed address.
`scripts/previous-site.json` records the previous site's routes and heading
anchors so changes cannot silently break old links.

## Publishing

Commit and push to `master`. `.github/workflows/deploy.yml` installs from the npm
lockfile, runs checks, uploads `dist/`, and deploys it to GitHub Pages. The Pages
publishing source remains **GitHub Actions**, with the `github-pages` environment.
There is no Jekyll processing or separate deployment branch.

The `rewrite` branch runs CI without publishing. Pull requests into `master`
also run CI. The deployment workflow can be run manually on `master`.
