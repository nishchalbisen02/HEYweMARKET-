import fs from "node:fs";
import path from "node:path";

export type WorkMedia = {
  key: string;
  kind: "video" | "image";
  title: string;
  tag: string;
  poster?: string; // for video: a still; for image: the image itself
  sources: { src: string; type: string }[];
};

const VIDEO_EXT = [".webm", ".mp4"];
const IMAGE_EXT = [".jpg", ".jpeg", ".png", ".webp", ".avif", ".gif"];
const MIME: Record<string, string> = {
  ".webm": "video/webm",
  ".mp4": "video/mp4",
};

function humanize(key: string) {
  return key.replace(/[-_]+/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

/**
 * Reads /public/work at build time. Drop any .mp4/.webm (with an optional
 * matching .jpg poster of the same basename) or image files there and they
 * show up in the gallery. Titles/tags come from /public/work/titles.json,
 * keyed by basename, with a humanized fallback.
 */
export function getWorkMedia(): WorkMedia[] {
  const dir = path.join(process.cwd(), "public", "work");
  let files: string[] = [];
  try {
    files = fs.readdirSync(dir);
  } catch {
    return [];
  }

  let meta: Record<string, { title?: string; tag?: string }> = {};
  try {
    meta = JSON.parse(fs.readFileSync(path.join(dir, "titles.json"), "utf-8"));
  } catch {}

  // group files by basename (without extension)
  const groups = new Map<string, string[]>();
  for (const f of files) {
    if (f === "titles.json") continue;
    const ext = path.extname(f).toLowerCase();
    if (![...VIDEO_EXT, ...IMAGE_EXT].includes(ext)) continue;
    const key = path.basename(f, ext);
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key)!.push(f);
  }

  const out: WorkMedia[] = [];
  for (const [key, group] of groups) {
    const vids = group.filter((f) => VIDEO_EXT.includes(path.extname(f).toLowerCase()));
    const imgs = group.filter((f) => IMAGE_EXT.includes(path.extname(f).toLowerCase()));
    const m = meta[key] ?? {};
    const title = m.title ?? humanize(key);
    const tag = m.tag ?? "Work";

    if (vids.length) {
      const poster = imgs[0] ? `/work/${imgs[0]}` : undefined;
      const sources = vids
        .sort((a, b) => VIDEO_EXT.indexOf(path.extname(a).toLowerCase()) - VIDEO_EXT.indexOf(path.extname(b).toLowerCase()))
        .map((f) => ({ src: `/work/${f}`, type: MIME[path.extname(f).toLowerCase()] }));
      out.push({ key, kind: "video", title, tag, poster, sources });
    } else if (imgs.length) {
      out.push({ key, kind: "image", title, tag, poster: `/work/${imgs[0]}`, sources: [] });
    }
  }

  // stable order: keys in titles.json first (in file order), then the rest alphabetically
  const order = Object.keys(meta);
  out.sort((a, b) => {
    const ia = order.indexOf(a.key);
    const ib = order.indexOf(b.key);
    if (ia !== -1 && ib !== -1) return ia - ib;
    if (ia !== -1) return -1;
    if (ib !== -1) return 1;
    return a.key.localeCompare(b.key);
  });

  return out;
}
