"use client";
import Link from "next/link";
import { useState } from "react";
import { EmptyArt } from "./Art";
import type { TechLite } from "@/lib/url";

export default function TechList({ techs, active, variant = "rail" }: { techs: TechLite[]; active?: string; variant?: "rail" | "grid" }) {
  const [q, setQ] = useState("");
  const n = q.trim().toLowerCase();
  const list = n ? techs.filter((t) => t.name.toLowerCase().includes(n) || t.base.includes(n)) : techs;
  const grid = variant === "grid";
  return (
    <div>
      <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Filter technologies" aria-label="Filter technologies"
        className={`w-full rounded-md border border-line bg-bg px-3 text-sm placeholder:text-muted ${grid ? "h-11 max-w-md" : "h-9"}`} />
      {list.length === 0 ? (
        <div className="mt-8 flex flex-col items-start gap-2 text-sm text-muted"><EmptyArt />No technology matches “{q}”. Try a shorter name.</div>
      ) : (
        <ul className={grid ? "mt-6 grid gap-x-8 sm:grid-cols-2 lg:grid-cols-3" : "mt-3 space-y-px"}>
          {list.map((t) => (
            <li key={t.base}>
              <Link href={`/docs/${t.slug}`} prefetch={false} aria-current={t.base === active ? "page" : undefined}
                className={`group flex items-center gap-3 text-sm transition-colors ${grid ? "border-b border-line py-2.5 hover:text-accent" : "rounded px-2 py-1.5 hover:bg-subtle aria-[current=page]:bg-subtle aria-[current=page]:font-medium"}`}>
                {grid && <span aria-hidden className="grid size-8 shrink-0 place-items-center rounded-md bg-subtle font-mono text-xs font-semibold text-accent transition-transform group-hover:-rotate-6 group-hover:scale-110">{t.name.slice(0, 2)}</span>}
                <span className="truncate">{t.name}</span>
                {t.label && <span className="ml-auto shrink-0 font-mono text-xs text-muted">{t.label}</span>}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
