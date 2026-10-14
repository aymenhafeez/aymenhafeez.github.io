const slug = (data) => data.page.inputPath.split("/").at(-1).replace(/\.md$/, "");

export default {
  layout: "post.njk",
  eleventyComputed: {
    permalink: (data) => data.draft ? false : `/posts/${slug(data)}/`,
  },
};
