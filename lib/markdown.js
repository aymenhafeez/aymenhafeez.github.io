import MarkdownIt from "markdown-it";
import { katex } from "@mdit/plugin-katex";
import GithubSlugger from "github-slugger";
import Prism from "prismjs";
import loadLanguages from "prismjs/components/index.js";

loadLanguages(["lua", "python", "bash", "vim", "json"]);

const aliases = { viml: "vim", shell: "bash", sh: "bash", py: "python" };

export function createMarkdown() {
  const markdown = new MarkdownIt({
    html: true,
    highlight(code, language) {
      const name = aliases[language] ?? language;
      const grammar = Prism.languages[name];
      return grammar ? Prism.highlight(code, grammar, name) : "";
    },
  }).use(katex, {
    throwOnError: true,
    logger: () => "ignore",
    transformer(html) {
      if (html.includes("katex-error")) throw new Error(`Invalid maths: ${html}`);
      return html;
    },
  });

  markdown.core.ruler.push("heading-ids", (state) => {
    const slugger = new GithubSlugger();
    for (let index = 0; index < state.tokens.length; index++) {
      if (state.tokens[index].type !== "heading_open") continue;
      const text = state.tokens[index + 1].children
        .filter((token) => ["text", "code_inline", "math_inline"].includes(token.type))
        .map((token) => token.content)
        .join("");
      state.tokens[index].attrSet("id", slugger.slug(text));
    }
  });

  return markdown;
}
