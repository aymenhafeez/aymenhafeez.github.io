import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join, resolve } from "node:path";
import MarkdownIt from "markdown-it";
import { formatDate } from "../lib/dates.js";

const inventory = JSON.parse(readFileSync("scripts/previous-site.json", "utf8"));
const redirects = JSON.parse(readFileSync("site/_data/redirects.json", "utf8"));
const site = JSON.parse(readFileSync("site/_data/site.json", "utf8"));
const root = resolve("dist");
const decode = new MarkdownIt().utils.unescapeAll;
const errors = new Set();

function destination(pathname) {
  const path = join(root, decodeURIComponent(pathname));
  return existsSync(path) && statSync(path).isDirectory() ? join(path, "index.html") : path;
}

function check(pathname, context) {
  const path = destination(pathname);
  if (!existsSync(path) || !statSync(path).isFile()) errors.add(`${context}: missing ${pathname}`);
  return path;
}

function* files(directory) {
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) yield* files(path);
    else yield path;
  }
}

for (const [route, anchors] of Object.entries(inventory.pages)) {
  const path = check(route, "Previous site");
  if (!existsSync(path)) continue;
  const html = readFileSync(path, "utf8");
  for (const anchor of anchors) {
    if (!html.includes(`id="${anchor}"`)) errors.add(`${route}: missing heading #${anchor}`);
  }
}
for (const path of inventory.files) check(path, "Previous site");

for (const { from, to } of redirects) {
  const path = check(from, "Redirect");
  check(to, `Redirect ${from}`);
  if (existsSync(path)) {
    const html = readFileSync(path, "utf8");
    assert(html.includes(`content="0;url=${to}"`), `Incorrect redirect: ${from}`);
  }
  assert(!redirects.some((redirect) => redirect.from === to), `Redirect chain: ${from}`);
}

let pages = 0;
for (const path of files(root)) {
  if (!path.endsWith(".html")) continue;
  pages++;
  const route = path.slice(root.length).replaceAll("\\", "/").replace(/index\.html$/, "");
  const html = readFileSync(path, "utf8").replace(/<!--[\s\S]*?-->/g, "");
  if (route === "/aizawa.html") continue; // A self-contained Plotly export, not a blog template.
  if (/katex-error|KaTeX parse error/.test(html)) errors.add(`${route}: invalid maths`);
  for (const match of html.matchAll(/\b(?:href|src)\s*=\s*["']([^"']+)["']/g)) {
    const url = new URL(decode(match[1]), new URL(route, site.url));
    if (url.origin !== new URL(site.url).origin) continue;
    const target = check(url.pathname, route);
    if (url.hash && existsSync(target) && target.endsWith(".html")) {
      const id = decodeURIComponent(url.hash.slice(1));
      const targetHtml = readFileSync(target, "utf8");
      if (!targetHtml.includes(`id="${id}"`) && !targetHtml.includes(`name="${id}"`)) {
        errors.add(`${route}: missing fragment ${url.pathname}#${id}`);
      }
    }
  }
}

// KaTeX's fonts must be deployed locally alongside its stylesheet.
const katexCss = readFileSync(check("/assets/katex/katex.min.css", "Maths"), "utf8");
for (const match of katexCss.matchAll(/url\(([^)]+)\)/g)) {
  check(`/assets/katex/${match[1].replaceAll(/["']/g, "")}`, "KaTeX font");
}
const posts = readdirSync("site/posts").filter((name) => name.endsWith(".md") && !/^draft:\s*true\s*$/m.test(readFileSync(join("site/posts", name), "utf8")));
const feed = readFileSync("dist/rss.xml", "utf8");
assert.equal((feed.match(/<item>/g) ?? []).length, posts.length, "RSS must contain every published post");
for (const name of posts) {
  assert(feed.includes(`/posts/${name.slice(0, -3)}/`), `RSS missing ${name}`);
  const source = readFileSync(join("site/posts", name), "utf8");
  const date = source.match(/^publishDate:\s*["']?([^"'\n]+)["']?$/m)?.[1];
  const html = readFileSync(destination(`/posts/${name.slice(0, -3)}/`), "utf8");
  assert(html.includes(`>${formatDate(date)}</time>`), `Publication date changed: ${name}`);
}

if (errors.size) {
  console.error([...errors].join("\n"));
  process.exitCode = 1;
} else {
  console.log(`Checked ${pages} HTML files, ${Object.keys(inventory.pages).length} original routes, heading anchors, ${redirects.length} redirects, local links/assets, maths fonts and ${posts.length} RSS entries.`);
}
