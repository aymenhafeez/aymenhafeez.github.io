import assert from "node:assert/strict";
import test from "node:test";
import { createMarkdown } from "../lib/markdown.js";
import { optimizeMedia } from "../lib/media.js";

test("Markdown and raw gallery images keep their size and alternative text", () => {
  const markdown = createMarkdown().render("![Control volume](/images/cv.png)");
  const html = optimizeMedia(`${markdown}<img src='/images/iceland/iceland_1.png' alt='Iceland' width='500' loading='lazy'>`);
  assert.match(html, /src="\/images\/optimized\/cv.webp"/);
  assert.match(html, /alt="Control volume"/);
  assert.match(html, /width="500"/);
  assert.match(html, /loading='lazy'/);
  assert.match(html, /decoding="async"/);
  assert.doesNotMatch(html.split("</p>")[0], /loading=/);
});

test("animations become playable, labelled videos with GIF fallback links", () => {
  const html = optimizeMedia('<img data-zoomable src="/images/cmdline.gif" width="650" alt="Command line" loading="lazy" />');
  assert.match(html, /^<video data-zoomable/);
  assert.match(html, /src="\/images\/optimized\/cmdline.mp4"/);
  assert.match(html, /width="650" height="406"/);
  assert.match(html, /aria-label="Command line"/);
  assert.match(html, /poster="\/images\/optimized\/cmdline.webp"/);
  assert.match(html, /aspect-ratio:1600\/1000/);
  assert.match(html, /autoplay loop muted playsinline controls/);
  assert.match(html, /<a href="\/images\/cmdline.gif">View animation<\/a><\/video>$/);
  assert.doesNotMatch(html, /\s(?:alt|loading)=/);
});

test("animated WebP keeps image behaviour when video would be larger", () => {
  const html = optimizeMedia('<img src="/images/figs/workflow.gif" alt="Workflow">');
  assert.match(html, /^<img src="\/images\/optimized\/figs\/workflow.webp"/);
  assert.doesNotMatch(html, /<video/);
});

test("external images, unknown sources, comments and code examples stay intact", () => {
  const html = '<!-- <img src="/images/cv.png"> --><img src="https://example.com/image.png"><img src="/images/new.png"><pre>&lt;img src="/images/cv.png"&gt;</pre>';
  assert.equal(optimizeMedia(html), html);
});

test("quoted angle brackets and literal dollar signs in alt text survive", () => {
  const html = optimizeMedia('<img src="/images/cv.png" alt="x > y, $&" title="Diagram">');
  assert.match(html, /alt="x > y, \$&" title="Diagram"/);
  assert.match(html, /src="\/images\/optimized\/cv.webp"/);
  const video = optimizeMedia(`<img src='/images/cmdline.gif' alt='x > y, "quote", $&'>`);
  assert.match(video, /aria-label="x > y, &quot;quote&quot;, \$&"/);
});
