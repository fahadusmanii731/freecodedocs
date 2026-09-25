"use client";
import { useEffect } from "react";
export default function CopyCode() {
  useEffect(() => {
    const h = (e: MouseEvent) => {
      const b = (e.target as HTMLElement).closest<HTMLButtonElement>("[data-copy]");
      if (!b) return;
      navigator.clipboard.writeText(b.closest(".codeblock")?.querySelector("code")?.textContent ?? "");
      b.textContent = "Copied";
      setTimeout(() => (b.textContent = "Copy"), 1500);
    };
    document.addEventListener("click", h);
    return () => document.removeEventListener("click", h);
  }, []);
  return null;
}
