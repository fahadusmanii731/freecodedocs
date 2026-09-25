import { NextResponse } from "next/server";

const BASE_URL = "https://freecodedocs.vercel.app";

type Technology = {
  name: string;
  slug: string;
};

export async function GET() {
  try {
    const response = await fetch("https://devdocs.io/docs.json", {
      next: { revalidate: 86400 },
    });

    if (!response.ok) {
      return new NextResponse("Failed to fetch DevDocs technologies", {
        status: 500,
      });
    }

    const technologies: Technology[] = await response.json();

    // Your manually managed sitemaps
    const staticSitemaps = [
      "pages.xml",
      "blog.xml",
    ];

    // DevDocs technology sitemaps
    const technologySitemaps = technologies.map(
      (technology) => `${encodeURIComponent(technology.slug)}.xml`
    );

    // Combine both
    const sitemapFiles = [
      ...staticSitemaps,
      ...technologySitemaps,
    ];

    const sitemaps = sitemapFiles
      .map(
        (file) => `
  <sitemap>
    <loc>${BASE_URL}/sitemaps/${file}</loc>
  </sitemap>`
      )
      .join("");

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
    <?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemaps}
</sitemapindex>`;

    return new NextResponse(xml, {
      headers: {
        "Content-Type": "application/xml; charset=utf-8",
        "Cache-Control":
          "public, s-maxage=86400, stale-while-revalidate=604800",
      },
    });
  } catch (error) {
    console.error("Failed to generate sitemap index:", error);

    return new NextResponse("Failed to generate sitemap", {
      status: 500,
    });
  }
}