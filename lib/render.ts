import "server-only";
import sanitizeHtml from "sanitize-html";
import hljs from "highlight.js/lib/common";
import he from "he";

const ORIGIN = "https://documents.devdocs.io";
const ABSOLUTE = /^([a-z][a-z0-9+.-]*:|\/\/)/i;
const LANG: Record<string, string> = { jsx: "javascript", tsx: "typescript", shell: "bash", sh: "bash", html: "xml" };

/** Sanitizes DevDocs HTML, rewrites internal links to /docs routes, highlights code. */
export function renderDoc(html: string, tech: string, path: string): string {
  const pageUrl = new URL(`https://x.local/${tech}/${path}`);
  const fileUrl = new URL(`${ORIGIN}/${tech}/${path}`);

  const clean = sanitizeHtml(html, {
    allowedTags: ["h1","h2","h3","h4","h5","h6","p","a","ul","ol","li","dl","dt","dd","pre","code","em","strong","b","i","sub","sup","blockquote","table","thead","tbody","tr","th","td","img","hr","br","div","span","section","details","summary","kbd"],
    allowedAttributes: { "*": ["id"], a: ["href","title"], pre: ["data-language"], img: ["src","alt","width","height"], td: ["colspan","rowspan"], th: ["colspan","rowspan"] },
    allowedSchemes: ["http", "https", "mailto"],
    transformTags: {
      a: (tag, attribs) => {
        const href = attribs.href ?? "";
        if (!href) return { tagName: "a", attribs };
        if (ABSOLUTE.test(href)) return { tagName: "a", attribs: { ...attribs, target: "_blank", rel: "noopener noreferrer" } };
        const u = new URL(href, pageUrl);
        const prefix = `/${tech}/`;
        const rest = u.pathname.startsWith(prefix) ? u.pathname.slice(prefix.length) : "";
        return { tagName: "a", attribs: { ...attribs, href: rest ? `/docs/${tech}/${rest}${u.hash}` : u.hash || "#" } };
      },
      img: (tag, attribs) => ({ tagName: "img", attribs: { ...attribs, src: attribs.src ? new URL(attribs.src, fileUrl).href : "", loading: "lazy" } }),
    },
  });

  return clean.replace(/<pre(?: data-language="([^"]*)")?>([\s\S]*?)<\/pre>/g, (_, lang: string | undefined, inner: string) => {
    const code = he.decode(inner.replace(/<[^>]+>/g, ""));
    const l = LANG[lang ?? ""] ?? lang ?? "";
    const body = hljs.getLanguage(l) ? hljs.highlight(code, { language: l, ignoreIllegals: true }).value : he.encode(code, { useNamedReferences: true });
    return `<div class="codeblock"><div class="codebar"><span>${he.escape(lang || "text")}</span><button type="button" data-copy>Copy</button></div><pre><code class="hljs">${body}</code></pre></div>`;
  });
}
