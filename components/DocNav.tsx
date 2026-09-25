"use client";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { EmptyArt } from "./Art";
import { docHref } from "@/lib/url";

type Item = [name: string, path: string, type: string];

function Group({ name, list, tech, active }: { name: string; list: Item[]; tech: string; active: string }) {
  const [open, setOpen] = useState(() => list.some((i) => i[1] === active));
  return (
    <div className="border-b border-line py-1">
      <button onClick={() => setOpen(!open)} aria-expanded={open}
        className="flex w-full items-center justify-between rounded px-2 py-1.5 text-left text-sm font-medium hover:bg-subtle">
        <span className="flex items-center gap-1.5 truncate"><svg width="10" height="10" viewBox="0 0 10 10" aria-hidden className={`shrink-0 transition-transform ${open ? "rotate-90" : ""}`} fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M3 1l4 4-4 4" /></svg>{name}</span>
        <span className="font-mono text-xs text-muted">{list.length}</span>
      </button>
      {open && (
        <ul className="mb-1 ml-2 border-l border-line">
          {list.map((i) => <NavLink key={i[1]} item={i} tech={tech} active={active} />)}
        </ul>
      )}
    </div>
  );
}

function NavLink({ item, tech, active }: { item: Item; tech: string; active: string }) {
  return (
    <li>
      <Link href={docHref(tech, item[1])} prefetch={false} aria-current={item[1] === active ? "page" : undefined}
        className="block truncate py-1 pl-3 pr-2 text-sm text-muted hover:text-ink aria-[current=page]:border-l-2 aria-[current=page]:border-accent aria-[current=page]:-ml-px aria-[current=page]:font-medium aria-[current=page]:text-accent">
        {item[0]}
      </Link>
    </li>
  );
}

export default function DocNav({ tech, techName, items, types, versions }: { tech: string; techName: string; items: Item[]; types: string[]; versions: { slug: string; label: string }[] }) {
  const [q, setQ] = useState("");
  const router = useRouter();
  const ref = useRef<HTMLInputElement>(null);
  const active = decodeURIComponent(usePathname()).replace(`/docs/${tech}/`, "");

  useEffect(() => {
    const f = (e: KeyboardEvent) => {
      const typing = /INPUT|TEXTAREA/.test((e.target as HTMLElement).tagName);
      if (e.key === "/" && !typing) { e.preventDefault(); ref.current?.focus(); }
    };
    addEventListener("keydown", f);
    return () => removeEventListener("keydown", f);
  }, []);

  const groups = useMemo(() => {
    const m = new Map<string, Item[]>(types.map((t) => [t, []]));
    for (const i of items) { if (!m.has(i[2])) m.set(i[2], []); m.get(i[2])!.push(i); }
    return [...m].filter(([, v]) => v.length);
  }, [items, types]);

  const n = q.trim().toLowerCase();
  const hits = n ? items.filter((i) => i[0].toLowerCase().includes(n)).slice(0, 80) : [];

  return (
    <nav aria-label={`${techName} documentation`}>
      <div className="flex items-center justify-between gap-2 px-2 pb-2">
        <h2 className="truncate text-sm font-semibold">{techName}</h2>
        {versions.length > 1 ? (
          <select aria-label="Documentation version" value={tech} onChange={(e) => router.push(`/docs/${e.target.value}`)}
            className="h-7 max-w-[7rem] rounded border border-line bg-bg px-1.5 font-mono text-xs">
            {versions.map((v) => <option key={v.slug} value={v.slug}>{v.label}</option>)}
          </select>
        ) : <span className="font-mono text-xs text-muted">{versions[0]?.label}</span>}
      </div>
      <div className="relative">
        <input ref={ref} type="search" value={q} onChange={(e) => setQ(e.target.value)}
          placeholder={`Search ${techName}`} aria-label={`Search ${techName} documentation`}
          className="h-9 w-full rounded-md border border-line bg-bg px-3 pr-8 text-sm placeholder:text-muted" />
        <kbd className="pointer-events-none absolute right-2 top-2 rounded border border-line px-1.5 font-mono text-[10px] text-muted">/</kbd>
      </div>
      <div className="mt-3">
        {n ? (
          hits.length ? <ul>{hits.map((i) => <NavLink key={i[1]} item={i} tech={tech} active={active} />)}</ul>
            : <div className="flex flex-col items-start gap-2 px-2 text-sm text-muted"><EmptyArt />No pages match “{q}”.</div>
        ) : groups.map(([name, list]) => <Group key={name} name={name} list={list} tech={tech} active={active} />)}
      </div>
    </nav>
  );
}
