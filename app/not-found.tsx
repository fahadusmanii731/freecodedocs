import Link from "next/link";
import Icon from "@/components/Icon";
import SiteHeader from "@/components/SiteHeader";
import ErrorState from "@/components/ErrorState";
import { getTechs } from "@/lib/devdocs";
import { groupTechs } from "@/lib/url";

export const metadata = { title: "Page not found" };

export default async function NotFound() {
  let techs: ReturnType<typeof groupTechs> = [];
  try { techs = groupTechs(await getTechs()); } catch {}

  return (
    <>
      <SiteHeader techs={techs} />
      <main className="mx-auto flex max-w-2xl flex-col items-center px-5 pb-24 pt-32 text-center sm:px-10 min-h-[90vh]">
        <span aria-hidden className="grid size-16 place-items-center rounded-full bg-subtle text-accent">
          <Icon name="search" size={28} />
        </span>
        <p className="mt-6 font-mono text-sm text-muted">404</p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">This page doesn’t exist.</h1>
        <p className="mt-3 max-w-sm text-muted">The technology or page you’re looking for may have moved, or the link might be out of date.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/docs" className="inline-flex h-11 items-center gap-2 rounded-md bg-ink px-5 text-sm font-medium text-bg transition-colors hover:bg-accent">
            Browse documentation <Icon name="arrow" size={16} />
          </Link>
          <Link href="/" className="inline-flex h-11 items-center rounded-md border border-line px-5 text-sm font-medium transition-colors hover:border-accent hover:text-accent">
            Go home
          </Link>
        </div>
        {!techs.length && (
          <div className="mt-8 w-full max-w-sm text-left">
            <ErrorState title="Library unavailable" message="DevDocs couldn’t be reached to suggest a technology." />
          </div>
        )}
      </main>
    </>
  );
}