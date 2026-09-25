export const docHref = (tech: string, path: string) =>
  `/docs/${tech}/${path.split("/").map(encodeURIComponent).join("/")}`;

export const baseSlug = (slug: string) => slug.split("~")[0];

export type TechLite = { name: string; slug: string; base: string; label: string };

/** One entry per framework; links to its default version. */
export function groupTechs(techs: { name: string; slug: string; version?: string; release?: string }[]): TechLite[] {
  const m = new Map<string, typeof techs>();
  for (const t of techs) { const b = baseSlug(t.slug); m.set(b, [...(m.get(b) ?? []), t]); }
  return [...m].map(([base, v]) => {
    const d = v.find((t) => t.slug === base) ?? v[0];
    return { name: d.name, slug: d.slug, base, label: v.length > 1 ? `${v.length} versions` : d.release || d.version || "" };
  });
}
