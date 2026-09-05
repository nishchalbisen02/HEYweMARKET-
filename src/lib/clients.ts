import fs from "node:fs";
import path from "node:path";

export type Client = { name: string; src: string };

const IMG_EXT = [".svg", ".png", ".jpg", ".jpeg", ".webp", ".avif"];

function humanize(base: string) {
  return base.replace(/[-_]+/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

/**
 * Reads /public/clients at build time. Drop a client logo (SVG/PNG, ideally
 * transparent) there — filename becomes the label ("db-pride.svg" -> "Db Pride").
 * Override labels in /public/clients/names.json if you want.
 */
export function getClients(): Client[] {
  const dir = path.join(process.cwd(), "public", "clients");
  let files: string[] = [];
  try {
    files = fs.readdirSync(dir);
  } catch {
    return [];
  }

  let names: Record<string, string> = {};
  try {
    names = JSON.parse(fs.readFileSync(path.join(dir, "names.json"), "utf-8"));
  } catch {}

  return files
    .filter((f) => IMG_EXT.includes(path.extname(f).toLowerCase()))
    .map((f) => {
      const base = path.basename(f, path.extname(f));
      return { name: names[base] ?? humanize(base), src: `/clients/${f}` };
    })
    .sort((a, b) => a.name.localeCompare(b.name));
}
