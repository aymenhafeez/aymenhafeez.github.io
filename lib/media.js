import media from "./media.json" with { type: "json" };

function attribute(tag, name) {
  return tag.match(new RegExp(`\\s${name}=(['"])(.*?)\\1`))?.[2];
}

function setAttribute(tag, name, value) {
  const pattern = new RegExp(`\\s${name}=(['"])(.*?)\\1`);
  const replacement = ` ${name}="${String(value).replaceAll('"', "&quot;")}"`;
  return pattern.test(tag) ? tag.replace(pattern, () => replacement) : tag.replace(/\s*\/?>$/, () => `${replacement}>`);
}

export function optimizeMedia(html) {
  let first = true;
  // Match comments as well, so commented-out examples stay untouched.
  return html.replace(/<!--[\s\S]*?-->|<img\b(?:[^>"']|"[^"]*"|'[^']*')*>/g, (tag) => {
    if (tag.startsWith("<!--")) return tag;
    const original = attribute(tag, "src");
    const asset = media[original];
    if (!asset) return tag;

    const width = Number(attribute(tag, "width")) || asset.width;
    tag = setAttribute(tag, "width", width);
    if (!attribute(tag, "height")) tag = setAttribute(tag, "height", Math.round(width * asset.height / asset.width));
    tag = setAttribute(tag, "src", asset.src);
    const lazy = !first;
    first = false;

    if (asset.poster) {
      const label = attribute(tag, "alt") || "Animation";
      tag = tag.replace(/^<img\b/, "<video").replace(/\s(?:alt|loading|decoding)=(['"])(.*?)\1/g, "");
      tag = setAttribute(tag, "aria-label", label);
      tag = setAttribute(tag, "poster", asset.poster);
      const style = attribute(tag, "style");
      tag = setAttribute(tag, "style", `${style ? `${style};` : ""}aspect-ratio:${asset.width}/${asset.height}`);
      return tag.replace(/\s*\/?>$/, () => ` autoplay loop muted playsinline controls preload="metadata"><a href="${original}">View animation</a></video>`);
    }

    tag = setAttribute(tag, "decoding", "async");
    if (lazy && !attribute(tag, "loading")) tag = setAttribute(tag, "loading", "lazy");
    return tag;
  });
}
