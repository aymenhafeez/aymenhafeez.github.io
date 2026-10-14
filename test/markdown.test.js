import assert from "node:assert/strict";
import test from "node:test";
import { createMarkdown } from "../lib/markdown.js";
import { parseDate, formatDate } from "../lib/dates.js";

test("maths renders at build time while code and raw HTML survive", () => {
  const html = createMarkdown().render('$x^2$\n\n$$\\frac{1}{2}$$\n\n```lua\nvim.api.nvim_echo({{msg}}, false, {})\n```\n\n<iframe src="/aizawa.html"></iframe>');
  assert.match(html, /class="katex"/);
  assert.match(html, /class="katex-display"/);
  assert.match(html.replace(/<[^>]+>/g, ""), /nvim_echo\(\{\{msg\}\}/);
  assert.match(html, /<iframe src="\/aizawa.html">/);
});

test("code is highlighted at build time and unsupported languages stay readable", () => {
  const markdown = createMarkdown();
  const html = markdown.render('```python\ndef example():\n    return "hello"\n```\n\n```viml\nlet value = 1\n```');
  assert.match(html, /class="token keyword"/);
  assert.match(html, /class="token string"/);
  assert.match(html, /class="language-viml"/);
  assert.match(markdown.render('```unknown\n<a>&text\n```'), /&lt;a&gt;&amp;text/);
  assert.doesNotMatch(html, /<script/);
});

test("heading IDs are compatible with existing links and reset per document", () => {
  const markdown = createMarkdown();
  const source = '## What is LSP?\n\n## `vim.pack`\n\n## What is LSP?';
  const html = markdown.render(source);
  assert.match(html, /id="what-is-lsp"/);
  assert.match(html, /id="vimpack"/);
  assert.match(html, /id="what-is-lsp-1"/);
  assert.equal(markdown.render(source), html);
});

test("invalid maths fails the build, and macros do not leak between posts", (t) => {
  t.mock.method(console, "error", () => {});
  const markdown = createMarkdown();
  assert.doesNotThrow(() => markdown.render('$\\gdef\\myblogmacro{7}\\myblogmacro$'));
  assert.throws(() => markdown.render('$\\myblogmacro$'), /Undefined control sequence/);
  assert.throws(() => markdown.render('$\\frac{1}$'), /KaTeX parse error/);
});

test("inline equations can span source lines without swallowing surrounding text", () => {
  const html = createMarkdown().render('Before $P = 0, \\frac{dP}{dI} =\n\\frac{P_m}{I_k}$, after $a_0=1$.');
  assert.equal((html.match(/class="katex"/g) ?? []).length, 2);
  assert.match(html, /Before/);
  assert.match(html, /, after /);
});

test("post dates retain their calendar day in summer and winter", () => {
  assert.equal(parseDate("24 August 2026").toISOString(), "2026-08-24T00:00:00.000Z");
  assert.equal(formatDate("20 May 2024"), "20 May 2024");
  assert.equal(formatDate("1 January 2020"), "1 Jan 2020");
  assert.equal(formatDate("2026-08-24"), "24 Aug 2026");
  assert.throws(() => parseDate("not a date"), /Invalid date/);
});
