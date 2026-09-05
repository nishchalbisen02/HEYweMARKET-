import fs from "node:fs";
import path from "node:path";

export type CreativeItem = {
  key: string;
  title: string;
  category: string;
  ratio: string;
  webp: string;
  jpg: string;
};

type Meta = { title?: string; category?: string; ratio?: string };

function humanize(base: string) {
  return base.replace(/[-_]+/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

/**
 * Reads /public/creative at build time. Drop a poster/mockup there as
 * `<name>.webp` (plus an optional `<name>.jpg` fallback) and add a line to
 * /public/creative/creative.json: { "<name>": { title, category, ratio } }.
 * `ratio` is "W/H" (e.g. "1400/934") and sets each card's width in the loop.
 * Order follows creative.json key order, then anything else alphabetically.
 */
export function getCreative(): CreativeItem[] {
  const dir = path.join(process.cwd(), "public", "creative");
  let files: string[] = [];
  try {
    files = fs.readdirSync(dir);
  } catch {
    return [];
  }

  let meta: Record<string, Meta> = {};
  try {
    meta = JSON.parse(fs.readFileSync(path.join(dir, "creative.json"), "utf-8"));
  } catch {}

  const keys = Array.from(
    new Set(
      files
        .filter((f) => /\.(webp|jpe?g|png)$/i.test(f))
        .map((f) => path.basename(f, path.extname(f)))
    )
  );

  const order = Object.keys(meta);
  keys.sort((a, b) => {
    const ia = order.indexOf(a);
    const ib = order.indexOf(b);
    if (ia !== -1 && ib !== -1) return ia - ib;
    if (ia !== -1) return -1;
    if (ib !== -1) return 1;
    return a.localeCompare(b);
  });

  return keys.map((key) => {
    const m = meta[key] ?? {};
    const jpg = files.includes(`${key}.jpeg`)
      ? `${key}.jpeg`
      : files.includes(`${key}.jpg`)
        ? `${key}.jpg`
        : `${key}.webp`;
    return {
      key,
      title: m.title ?? humanize(key),
      category: m.category ?? "Design",
      ratio: m.ratio ?? "4/3",
      webp: `/creative/${key}.webp`,
      jpg: `/creative/${jpg}`,
    };
  });
}
