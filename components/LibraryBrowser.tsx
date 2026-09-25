"use client";
import { useEffect, useState } from "react";
import Icon from "./Icon";
import TechList from "./TechList";
import type { TechLite } from "@/lib/url";

export default function LibraryBrowser({ techs }: { techs: TechLite[] }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const f = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    addEventListener("keydown", f);
    document.body.style.overflow = open ? "hidden" : "";
    return () => { removeEventListener("keydown", f); document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      {/* Small screens: trigger button only */}
      <div className="lg:hidden">
        <button
          onClick={() => setOpen(true)}
          aria-haspopup="dialog"
          className="inline-flex h-10 items-center gap-2 rounded-md border border-line px-4 text-sm font-medium transition-colors hover:border-accent hover:text-accent"
        >
          <Icon name="search" size={16} />
          Filter technologies
        </button>
      </div>

      {/* Large screens: inline grid, unchanged */}
      <div className="hidden lg:block">
        <TechList variant="grid" techs={techs} />
      </div>

      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button aria-label="Close filter" className="absolute inset-0 bg-black/30" onClick={() => setOpen(false)} />
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Filter technologies"
            className="drawer-in absolute inset-y-0 left-0 w-[86%] max-w-sm overflow-y-auto border-r border-line bg-bg p-4"
          >
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-sm font-semibold">Technologies</h2>
              <button onClick={() => setOpen(false)} className="text-sm text-muted hover:text-ink">Close</button>
            </div>
            <TechList variant="rail" techs={techs} />
          </div>
        </div>
      )}
    </>
  );
}