import { createRequire } from "node:module";
import { dirname, join } from "node:path";
import { rm } from "node:fs/promises";
import { createMarkdown } from "./lib/markdown.js";
import { parseDate, formatDate } from "./lib/dates.js";

const require = createRequire(import.meta.url);
const katexDirectory = join(dirname(require.resolve("katex/package.json")), "dist");

function published(post) {
  return parseDate(post.data.publishDate);
}

export default function (eleventyConfig) {
  eleventyConfig.setLibrary("md", createMarkdown());
  // Deployment builds must not retain removed posts or assets from an earlier build.
  eleventyConfig.on("eleventy.before", async ({ runMode }) => {
    if (runMode === "build") await rm("dist", { recursive: true, force: true });
  });

  eleventyConfig.addPassthroughCopy({ public: "/" });
  eleventyConfig.addPassthroughCopy({ [join(katexDirectory, "katex.min.css")]: "assets/katex/katex.min.css" });
  eleventyConfig.addPassthroughCopy({ [join(katexDirectory, "fonts")]: "assets/katex/fonts" });

  eleventyConfig.addCollection("posts", (collection) => {
    const posts = collection.getFilteredByGlob("./site/posts/*.md").filter((post) => !post.data.draft);
    for (const post of posts) {
      if (!post.data.title || typeof post.data.description !== "string") {
        throw new Error(`Post needs a title and description: ${post.inputPath}`);
      }
      published(post);
      post.data.tags = [...new Set((post.data.tags ?? []).map((tag) => tag.toLowerCase()))];
    }
    return posts.sort((a, b) => published(b) - published(a));
  });

  eleventyConfig.addCollection("topics", (collection) => {
    const posts = collection.getFilteredByGlob("./site/posts/*.md").filter((post) => !post.data.draft);
    const topics = new Map();
    for (const post of posts) {
      for (const tag of new Set(post.data.tags ?? [])) {
        if (!topics.has(tag)) topics.set(tag, []);
        topics.get(tag).push(post);
      }
    }
    return [...topics].map(([name, posts]) => ({
      name,
      url: `/tags/${encodeURIComponent(name)}/`,
      posts: posts.sort((a, b) => published(b) - published(a)),
    })).sort((a, b) => b.posts.length - a.posts.length || a.name.localeCompare(b.name));
  });

  eleventyConfig.addCollection("topicPages", (collection) => {
    const tags = new Set();
    const posts = collection.getFilteredByGlob("./site/posts/*.md").filter((post) => !post.data.draft);
    for (const post of posts) for (const tag of post.data.tags ?? []) tags.add(tag);
    return [...tags].flatMap((tag) => {
      const tagged = posts.filter((post) => post.data.tags?.includes(tag)).sort((a, b) => published(b) - published(a));
      return Array.from({ length: Math.ceil(tagged.length / 10) }, (_, index) => ({
        tag,
        posts: tagged.slice(index * 10, (index + 1) * 10),
        url: `/tags/${tag}/${index ? `${index + 1}/` : ""}`,
        previous: index ? `/tags/${encodeURIComponent(tag)}/${index === 1 ? "" : `${index}/`}` : null,
        next: (index + 1) * 10 < tagged.length ? `/tags/${encodeURIComponent(tag)}/${index + 2}/` : null,
      }));
    });
  });

  eleventyConfig.addFilter("date", formatDate);
  eleventyConfig.addFilter("isoDate", (value) => parseDate(value).toISOString());
  eleventyConfig.addFilter("rssDate", (value) => parseDate(value).toUTCString());
  eleventyConfig.addFilter("encode", encodeURIComponent);
  eleventyConfig.addFilter("absoluteUrl", (value) => new URL(value, "https://aymenhafeez.github.io/").href);
  eleventyConfig.addFilter("groupByYear", (posts) => {
    const years = new Map();
    for (const post of posts) {
      const year = published(post).getUTCFullYear();
      if (!years.has(year)) years.set(year, []);
      years.get(year).push(post);
    }
    return [...years].sort(([a], [b]) => b - a).map(([year, posts]) => ({ year, posts }));
  });

  return {
    dir: { input: "site", output: "dist", includes: "_includes", data: "_data" },
    markdownTemplateEngine: false,
    htmlTemplateEngine: "njk",
    templateFormats: ["md", "njk", "11ty.js"],
  };
}
