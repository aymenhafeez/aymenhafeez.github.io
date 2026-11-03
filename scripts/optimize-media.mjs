import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, readdirSync, statSync, unlinkSync, writeFileSync } from "node:fs";
import { dirname, extname, join, relative } from "node:path";

const root = "public/images";
const manifestPath = "lib/media.json";
const previous = existsSync(manifestPath) ? JSON.parse(readFileSync(manifestPath, "utf8")) : {};
const manifest = {};
const photoDirectories = new Set(["bath", "daytoday", "iceland", "london", "newyork", "wales"]);

function* images(directory) {
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    if (entry.name === "optimized") continue;
    const path = join(directory, entry.name);
    if (entry.isDirectory()) yield* images(path);
    else if (/\.(png|gif)$/.test(path)) yield path;
  }
}

function run(command, args) {
  return execFileSync(command, args, { encoding: "utf8", stdio: ["ignore", "pipe", "inherit"] }).trim();
}

for (const input of images(root)) {
  const name = relative(root, input);
  const original = `/images/${name}`;
  const video = extname(input) === ".gif";
  let src = `/images/optimized/${name.replace(/\.(png|gif)$/, video ? ".mp4" : ".webp")}`;
  const output = `public${src}`;
  // Include conversion settings in the digest so a settings change regenerates assets.
  const hash = createHash("sha256").update("webp-q85-lossless-screens-mp4-crf18-v1").update(readFileSync(input)).digest("hex");
  const cached = previous[original];
  if (cached?.hash === hash && existsSync(`public${cached.src}`) && (!cached.poster || existsSync(`public${cached.poster}`)) && !(cached.poster && cached.bytes >= cached.originalBytes)) {
    manifest[original] = cached;
    continue;
  }

  mkdirSync(dirname(output), { recursive: true });
  let width, height, poster;
  if (video) {
    const info = JSON.parse(run("ffprobe", ["-v", "error", "-select_streams", "v:0", "-show_entries", "stream=width,height", "-of", "json", input]));
    ({ width, height } = info.streams[0]);
    run("ffmpeg", ["-hide_banner", "-loglevel", "error", "-y", "-i", input,
      "-an", "-c:v", "libx264", "-preset", "slow", "-crf", "18", "-threads", "2",
      "-pix_fmt", "yuv420p", "-vf", "pad=ceil(iw/2)*2:ceil(ih/2)*2",
      "-fps_mode", "vfr", "-movflags", "+faststart", output]);
    if (statSync(output).size >= statSync(input).size) {
      src = src.replace(/\.mp4$/, ".webp");
      run("ffmpeg", ["-hide_banner", "-loglevel", "error", "-y", "-i", input,
        "-c:v", "libwebp_anim", "-lossless", "1", "-compression_level", "6", "-loop", "0", `public${src}`]);
      unlinkSync(output);
      if (statSync(`public${src}`).size >= statSync(input).size) {
        unlinkSync(`public${src}`);
        src = original;
      }
    } else {
      poster = src.replace(/\.mp4$/, ".webp");
      run("magick", [`${input}[0]`, "+repage", "-strip", "-define", "webp:lossless=true", `public${poster}`]);
    }
  } else {
    [width, height] = run("magick", ["identify", "-format", "%w %h", input]).split(" ").map(Number);
    const photo = photoDirectories.has(name.split("/")[0]);
    run("magick", [input, "-strip", ...(photo ? ["-quality", "85"] : ["-define", "webp:lossless=true", "-quality", "100"]), output]);
    if (statSync(output).size >= statSync(input).size) {
      unlinkSync(output);
      src = original;
    }
  }
  manifest[original] = { src, width, height, ...(poster ? { poster } : {}),
    originalBytes: statSync(input).size, bytes: statSync(`public${src}`).size, hash };
  console.log(`${name}: ${(statSync(input).size / 1024).toFixed(0)} → ${(statSync(`public${src}`).size / 1024).toFixed(0)} KiB`);
}

writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
const entries = Object.values(manifest);
const before = entries.reduce((sum, entry) => sum + entry.originalBytes, 0);
const after = entries.reduce((sum, entry) => sum + entry.bytes + (entry.poster ? statSync(`public${entry.poster}`).size : 0), 0);
console.log(`${entries.length} assets: ${(before / 1024 ** 2).toFixed(1)} → ${(after / 1024 ** 2).toFixed(1)} MiB (${(100 * (1 - after / before)).toFixed(1)}% smaller). Originals retained for existing URLs.`);
