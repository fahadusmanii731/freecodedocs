"use client";
import { useEffect, useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import SiteHeader from "./SiteHeader";
import Icon from "./Icon";
import type { TechLite } from "@/lib/url";

export default function Shell({ rail, nav, techs, title, children }: { rail: ReactNode; nav: ReactNode; techs: TechLite[]; title: string; children: ReactNode }) {
  const [panel, setPanel] = useState<null | "nav" | "tech">(null);
  const path = usePathname();
  useEffect(() => setPanel(null), [path]);
  useEffect(() => {
    const f = (e: KeyboardEvent) => e.key === "Escape" && setPanel(null);
    addEventListener("keydown", f);
    document.body.style.overflow = panel ? "hidden" : "";
    return () => { removeEventListener("keydown", f); document.body.style.overflow = ""; };
  }, [panel]);

  const btn = "rounded-md border border-line px-3 py-1 text-sm hover:border-accent";
  const filterButton = (
    <button onClick={() => setPanel("tech")} aria-haspopup="dialog"
      className="hidden h-9 items-center gap-2 rounded-md border border-line px-3 text-sm text-muted transition-colors hover:border-accent hover:text-ink lg:flex">
      <Icon name="layers" size={16} /> Filter technologies
    </button>
  );

  return (
    <div className="pt-[6.25rem] lg:pt-14">
      <SiteHeader techs={techs} extraAction={filterButton} />
      <div className="fixed inset-x-0 top-14 z-30 flex h-11 items-center gap-2 border-b border-line bg-bg px-4 lg:hidden">
        <button className={btn} aria-haspopup="dialog" onClick={() => setPanel("nav")}>

          <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 24 24" fill="none">
             <path d="M4 6H20M4 12H14M4 18H9" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
           </svg>

        </button>
        <button className={btn} aria-haspopup="dialog" onClick={() => setPanel("tech")}>Technologies</button>
        <span className="ml-auto truncate text-sm text-muted">{title}</span>
      </div>
      <div className="mx-auto flex max-w-[1600px]">
        <aside className="sticky top-14 hidden h-[calc(100dvh-3.5rem)] w-72 shrink-0 overflow-y-auto border-r border-line p-3 lg:block">{nav}</aside>
        <main className="min-w-0 flex-1 px-5 py-8 sm:px-10 lg:px-14 lg:py-12">{children}</main>
      </div>
      {panel && (
        <div className="fixed inset-0 z-50">
          <button aria-label="Close menu" className="absolute inset-0 bg-black/30" onClick={() => setPanel(null)} />
          <div role="dialog" aria-modal="true" aria-label={panel === "nav" ? "Sections" : "Technologies"} className="drawer-in absolute inset-y-0 left-0 w-[86%] max-w-sm overflow-y-auto border-r border-line bg-bg p-3">
            <button onClick={() => setPanel(null)} className="mb-3 text-sm text-muted hover:text-ink">Close</button>
            {panel === "nav" ? nav : rail}
          </div>
        </div>
      )}
    </div>
  );
}