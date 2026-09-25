import "server-only";
import { cache } from "react";

export type Tech = { name: string; slug: string; version?: string; release?: string };
export type Entry = { name: string; path: string; type: string };
export type TechIndex = { entries: Entry[]; types: { name: string; count: number }[] };

export class DocsError extends Error {
  constructor(message: string, public status: number) { super(message); }
}

const DAY = 60 * 60 * 24;

async function get(url: string) {
  let res: Response;
  try { res = await fetch(url, { next: { revalidate: DAY } }); }
  catch { throw new DocsError("Could not reach DevDocs.", 503); }
  if (!res.ok) throw new DocsError(`DevDocs responded with ${res.status}.`, res.status);
  return res;
}

export const getTechs = cache(async (): Promise<Tech[]> =>
  (await get("https://devdocs.io/docs.json")).json());

export const getIndex = cache(async (tech: string): Promise<TechIndex> =>
  (await get(`https://documents.devdocs.io/${tech}/index.json`)).json());

export const getPageHtml = cache(async (tech: string, path: string): Promise<string> =>
  (await get(`https://documents.devdocs.io/${tech}/${path}.html`)).text());

/** One entry per page (drops #fragment members), in original DevDocs order. */
export function pageList(index: TechIndex): Entry[] {
  const seen = new Set<string>();
  const out: Entry[] = [];
  for (const e of index.entries) {
    const path = e.path.split("#")[0];
    if (seen.has(path)) continue;
    seen.add(path);
    out.push({ ...e, path });
  }
  return out;
}
