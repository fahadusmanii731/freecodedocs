import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import BlogArt from "@/components/BlogArt";
import BlogCard from "@/components/BlogCard";
import CopyCode from "@/components/CopyCode";
import SiteHeader from "@/components/SiteHeader";
import { allPosts, getPost } from "@/lib/blog";
import { getTechs } from "@/lib/devdocs";
import { groupTechs } from "@/lib/url";

type Props = { params: Promise<{ slug: string }> };
const SITE = "https://freecodedocs.vercel.app";

export function generateStaticParams() {
  return allPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Post not found" };
  const url = `${SITE}/blog/${post.slug}`;
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: { type: "article", url, title: post.title, description: post.description, publishedTime: post.date },
    twitter: { card: "summary_large_image", title: post.title, description: post.description },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  let techs: ReturnType<typeof groupTechs> = [];
  try { techs = groupTechs(await getTechs()); } catch {}
  const more = allPosts().filter((p) => p.slug !== post.slug).slice(0, 2);
  const url = `${SITE}/blog/${post.slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "BlogPosting", headline: post.title, description: post.description, datePublished: post.date, dateModified: post.updated || post.date, url, mainEntityOfPage: url, author: { "@type": "Organization", name: "FreeCodeDocs" }, publisher: { "@type": "Organization", name: "FreeCodeDocs" } },
      { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Blog", item: `${SITE}/blog` }, { "@type": "ListItem", position: 2, name: post.title, item: url }] },
      ...(post.faq ? [{ "@type": "FAQPage", mainEntity: post.faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) }] : []),
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <SiteHeader techs={techs} />
      <main className="mx-auto max-w-3xl px-5 pb-24 pt-32 sm:px-10">
        <nav aria-label="Breadcrumb" className="mb-6 text-sm text-muted">
          <ol className="flex flex-wrap items-center gap-x-2">
            <li><Link href="/blog" className="hover:text-ink">Blog</Link></li>
            <li aria-hidden>/</li>
            <li aria-current="page" className="truncate text-ink">{post.title}</li>
          </ol>
        </nav>
        <BlogArt variant={post.cover} className="w-full rounded-lg border border-line" />
        <h1 className="mt-8 text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">{post.title}</h1>
        <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-muted">
          <span className="grid size-7 place-items-center rounded-full bg-ink font-mono text-[10px] text-bg">FC</span>
          <span>FreeCodeDocs</span><span aria-hidden>·</span>
          <time dateTime={post.date}>{new Date(post.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</time>
          <span aria-hidden>·</span><span>{post.readingTime}</span>
        </div>
        <div className="mt-3 flex flex-wrap gap-1.5">{post.tags.map((t) => <span key={t} className="rounded-full border border-line px-2 py-0.5 text-xs text-muted">{t}</span>)}</div>
        <div className="doc mt-10 max-w-none" dangerouslySetInnerHTML={{ __html: post.body }} />
        <CopyCode />
        <div className="mt-14 rounded-lg border border-line bg-subtle p-6 text-center">
          <p className="font-medium">Keep the docs you use every day in one place.</p>
          <p className="mt-1 text-sm text-muted">Search hundreds of languages and frameworks on FreeCodeDocs — free, no account needed.</p>
          <Link href="/docs" className="mt-4 inline-flex h-10 items-center rounded-md bg-ink px-5 text-sm font-medium text-bg transition-colors hover:bg-accent">Browse documentation</Link>
        </div>
        {more.length > 0 && (
          <div className="mt-16 border-t border-line pt-10">
            <h2 className="mb-5 text-lg font-semibold">More from the blog</h2>
            <div className="grid gap-8 sm:grid-cols-2">{more.map((p) => <BlogCard key={p.slug} post={p} />)}</div>
          </div>
        )}
      </main>
    </>
  );
}