import "server-only";

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  date: string;
  updated?: string;
  readingTime: string;
  tags: string[];
  cover: "guide" | "speed" | "library";
  body: string;
  faq?: { q: string; a: string }[];
};

export const posts: BlogPost[] = [
  {
    slug: "how-to-read-documentation-faster",
    title: "How to Read Documentation Faster: A Practical Guide for Developers",
    description:
      "A practical method for reading API and library documentation faster — how to skim, where to look first, and how to build a personal system for the docs you use every day.",
    date: "2026-09-20",
    readingTime: "7 min read",
    tags: ["Productivity", "Reading docs", "Developer workflow"],
    cover: "guide",
    faq: [
      { q: "How do I read documentation faster without missing important details?", a: "Read structurally instead of linearly: scan the table of contents first, jump straight to function signatures and parameter tables, and only read the prose paragraphs when the signature alone doesn't answer your question." },
      { q: "What's the difference between a tutorial, a guide, and reference documentation?", a: "A tutorial teaches by having you build something step by step. A guide explains a topic or workflow in depth. Reference documentation (the type most API docs use) is a lookup tool organized around functions, classes, and parameters rather than a narrative." },
      { q: "Is it better to read documentation start to finish or search as needed?", a: "For reference documentation, search as needed. Reference docs are designed to be looked up, not read cover to cover. Reserve start-to-finish reading for guides and tutorials, which are written as a narrative." },
    ],
    body: `
<p>Every developer has opened a documentation page, read three paragraphs, and realized they still don't have the one line they actually needed. That's not a reading-speed problem. It's a navigation problem — most documentation isn't written to be read, it's written to be searched, and treating it like an article instead of a reference is what makes it feel slow.</p>
<p>Here's a method that works whether you're reading a language reference, a framework guide, or an unfamiliar library's API for the first time.</p>

<h2 id="why-it-feels-slow">Why documentation feels harder than it should</h2>
<p>Most technical documentation mixes three different kinds of writing on the same site, sometimes the same page:</p>
<table>
<thead><tr><th>Type</th><th>What it's for</th><th>How to read it</th></tr></thead>
<tbody>
<tr><td>Reference</td><td>Look up a specific function, class, or parameter</td><td>Search or jump directly — never read top to bottom</td></tr>
<tr><td>Guide</td><td>Understand a concept or workflow in depth</td><td>Read once, fully, when you're new to the topic</td></tr>
<tr><td>Tutorial</td><td>Build something step by step</td><td>Follow in order, ideally with the code open beside it</td></tr>
</tbody>
</table>
<p>Most of the time you land on a docs page, you're actually looking for reference material — a method signature, a config option, a return type. Reading it like a guide is where the time goes.</p>

<h2 id="skim-first">1. Skim the table of contents before you read anything</h2>
<p>Before searching or reading a single paragraph, spend ten seconds scanning the section list. You're not looking for the answer yet — you're building a mental map of where things live, so your next search is more precise.</p>

<h2 id="recognize-patterns">2. Learn to recognize documentation patterns</h2>
<p>Once you've read a handful of API references, you'll notice they all answer the same handful of questions, usually in the same order:</p>
<ul>
<li>What does this accept, and in what order?</li>
<li>What does it return?</li>
<li>What can go wrong, and what does it throw or return in that case?</li>
<li>Is there a minimal example?</li>
</ul>

<h2 id="signature-first">3. Read the function signature before the prose</h2>
<p>Prose explains intent; signatures explain contract.</p>
<div class="codeblock">
<div class="codebar"><span>typescript</span></div>
<pre><code>function debounce&lt;T extends (...args: any[]) =&gt; void&gt;(
  fn: T,
  waitMs: number,
  options?: { leading?: boolean }
): (...args: Parameters&lt;T&gt;) =&gt; void</code></pre>
</div>
<p>That one signature tells you: it wraps any function, it takes a wait time in milliseconds, there's an optional leading-edge flag, and the returned function has the same parameters as the original.</p>

<h2 id="search-dont-scroll">4. Search first, scroll second</h2>
<p>Use your browser's find-in-page (<kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>F</kbd>) or the site's own search before you scroll. Search for the exact term you expect — a method name, a config key, an error string — rather than a description of your problem.</p>

<h2 id="keep-a-list">5. Keep a running list of gotchas, not full notes</h2>
<p>Keep a short personal list of the things the docs <em>don't</em> make obvious. That list becomes more valuable than the documentation itself over time.</p>

<h2 id="centralize">6. Read from one place instead of ten tabs</h2>
<p>Every library has its own site, its own search box, its own shortcuts. Relearning "where things are" costs more time than most people notice. This is the exact problem a unified reference tool solves. On <a href="/docs">FreeCodeDocs</a>, documentation for hundreds of languages and frameworks — <a href="/docs/react">React</a>, <a href="/docs/python">Python</a>, <a href="/docs/typescript">TypeScript</a>, and more — is laid out the same way every time.</p>

<h2 id="checklist">A quick checklist</h2>
<ul>
<li><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" style="display:inline;vertical-align:-3px;margin-right:6px"><path d="M20 6 9 17l-5-5"/></svg>Scan the table of contents before searching</li>
<li><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" style="display:inline;vertical-align:-3px;margin-right:6px"><path d="M20 6 9 17l-5-5"/></svg>Search for exact terms, not descriptions of your problem</li>
<li><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" style="display:inline;vertical-align:-3px;margin-right:6px"><path d="M20 6 9 17l-5-5"/></svg>Read the signature before the paragraph</li>
<li><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" style="display:inline;vertical-align:-3px;margin-right:6px"><path d="M20 6 9 17l-5-5"/></svg>Keep a short list of surprises, not a full transcript</li>
</ul>

<blockquote>Documentation isn't something to finish. It's something to get faster at searching.</blockquote>

<h2 id="faq">Frequently asked questions</h2>
<h3>How do I read documentation faster without missing important details?</h3>
<p>Read structurally instead of linearly: scan the table of contents first, jump straight to function signatures and parameter tables, and only read prose when the signature alone doesn't answer your question.</p>
<h3>What's the difference between a tutorial, a guide, and reference documentation?</h3>
<p>A tutorial teaches by having you build something step by step. A guide explains a topic in depth. Reference documentation is a lookup tool organized around functions and parameters, not a narrative.</p>
<h3>Is it better to read documentation start to finish or search as needed?</h3>
<p>For reference documentation, search as needed — it's designed to be looked up. Save start-to-finish reading for guides and tutorials.</p>
`,
  },
  {
    slug: "ai-coding-assistants-documentation-2026",
    title: "How AI Coding Assistants Are Changing the Way Developers Read Documentation in 2026",
    description:
      "AI coding assistants can summarize an API in seconds — but they can also hallucinate a parameter that doesn't exist. Here's how developers use AI and documentation together in 2026.",
    date: "2026-09-14",
    readingTime: "8 min read",
    tags: ["AI tools", "Developer workflow", "Documentation"],
    cover: "speed",
    faq: [
      {
        q: "Can AI coding assistants replace reading documentation?",
        a: "No. They're genuinely good at summarizing and drafting example usage, but they can present outdated or invented details with total confidence, so verifying against the actual documentation is still necessary — especially for anything shipping to production.",
      },
      {
        q: "Why do AI coding assistants sometimes suggest deprecated or incorrect API usage?",
        a: "Most assistants are trained on a snapshot of public code and text, so they can reflect an older version of a library or blend patterns from several versions at once, producing code that looks plausible but doesn't match the current API.",
      },
      {
        q: "What's the safest way to use AI and documentation together?",
        a: "Use the assistant to get oriented quickly on the general approach, then confirm exact signatures, parameter names, and defaults directly against the official documentation before relying on the code.",
      },
    ],
    body: `
<p>Ask an AI coding assistant how to do something and you'll usually have working-looking code in under ten seconds. That speed is genuinely useful — and it's also exactly why so many developers have shipped a bug caused by a method that doesn't exist anymore, a parameter the assistant invented, or a default value that changed two versions ago. The assistant sounded certain. It just wasn't right.</p>
<p>This isn't an argument against using AI tools — most developers now use them daily, and that's not changing. It's about where documentation still fits once an assistant is doing a chunk of the reading for you.</p>

<h2 id="why-now">Why this is worth thinking about in 2026</h2>
<p>In-editor assistants and chat-based coding tools have moved from novelty to default. A large share of developers now get their first answer from an assistant before they open a documentation page at all — sometimes never opening it. That shift is efficient in the common case and quietly risky in the uncommon one, because the failure mode isn't "the assistant doesn't know." It's "the assistant is confidently, fluently wrong," and fluent wrong answers are much harder to catch than a blank page.</p>
<p>The developers getting the most value out of these tools in 2026 aren't the ones who trust them completely or the ones who ignore them entirely. They're the ones who've built a habit around exactly when to check the underlying docs.</p>

<h2 id="good-at">What AI assistants are genuinely good at</h2>
<ul>
<li>Summarizing what a function, module, or library is for, in plain language</li>
<li>Drafting a first-pass example so you're not starting from a blank file</li>
<li>Explaining an unfamiliar error message in context</li>
<li>Translating a pattern you know in one language into another</li>
<li>Suggesting which library or approach fits a problem you haven't solved before</li>
</ul>
<p>All five of these are "getting oriented" tasks. They save you the ten minutes of figuring out where to even start — and that's a real, meaningful time save that documentation alone doesn't give you.</p>

<h2 id="wrong">Where they quietly get it wrong</h2>
<p>The failure cases cluster around specifics, not concepts. An assistant is far more likely to be right about <em>what a library is generally for</em> than about the exact current shape of its API.</p>
<table>
<thead><tr><th>Situation</th><th>Common failure</th><th>Why it happens</th></tr></thead>
<tbody>
<tr><td>A library with frequent breaking changes</td><td>Suggests a method from an older major version</td><td>Training data spans multiple versions, blended together</td></tr>
<tr><td>An uncommon parameter or config option</td><td>Invents a plausible-sounding name</td><td>Pattern-matches against similar libraries rather than this one</td></tr>
<tr><td>A recently renamed or removed function</td><td>Suggests the old name confidently</td><td>The old name still dominates the training data and public examples</td></tr>
<tr><td>Security- or auth-related code</td><td>Uses an outdated or discouraged pattern</td><td>Older patterns are simply more common in public code than newer best practices</td></tr>
</tbody>
</table>
<p>Here's the shape of the problem, illustrated with a made-up example — a fictional <code>httpkit</code> library, not a real one, just to show the pattern:</p>
<div class="codeblock">
<div class="codebar"><span>text</span></div>
<pre><code>Assistant suggests:   httpkit.fetchData(url, { retry: true })
Current API actually is: httpkit.fetch(url, { retries: 3 })</code></pre>
</div>
<p>Both lines look equally plausible. Only one of them will actually run. The only way to tell them apart, in the moment, is to check.</p>

<h2 id="hybrid-workflow">A hybrid workflow that actually works</h2>
<p>The developers who get the best of both tools follow roughly the same four steps, whether they realize it or not:</p>
<ol>
<li><strong>Ask the assistant for direction, not a final answer.</strong> Use it to figure out which approach or library fits, not to produce code you'll paste in unread.</li>
<li><strong>Note every specific claim it makes.</strong> Method names, parameter names, default values, and version-specific behavior are exactly the details that go stale first.</li>
<li><strong>Check each specific claim against the official documentation</strong> before you run the code, not after something breaks.</li>
<li><strong>When something surprises you, that's the signal to read the whole page</strong> — not just the one line the assistant quoted — because surprises are usually where the outdated assumption is hiding.</li>
</ol>

<h2 id="red-flags">Signs you should stop and check the docs yourself</h2>
<ul>
<li><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" style="display:inline;vertical-align:-3px;margin-right:6px"><path d="M20 6 9 17l-5-5"/></svg>The assistant mentions a specific version number</li>
<li><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" style="display:inline;vertical-align:-3px;margin-right:6px"><path d="M20 6 9 17l-5-5"/></svg>The code touches authentication, payments, or user data</li>
<li><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" style="display:inline;vertical-align:-3px;margin-right:6px"><path d="M20 6 9 17l-5-5"/></svg>The function takes more than two or three parameters</li>
<li><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" style="display:inline;vertical-align:-3px;margin-right:6px"><path d="M20 6 9 17l-5-5"/></svg>You're about to ship this to production</li>
<li><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" style="display:inline;vertical-align:-3px;margin-right:6px"><path d="M20 6 9 17l-5-5"/></svg>The assistant hedges or offers two conflicting approaches</li>
</ul>

<h2 id="centralize">Why centralizing your reference material still matters</h2>
<p>Checking is only fast if you're not also hunting for the right site. The workflow above only holds together if opening the actual docs takes seconds, not minutes — which is exactly the gap a unified reference tool closes. On <a href="/docs">FreeCodeDocs</a>, the documentation for <a href="/docs/react">React</a>, <a href="/docs/python">Python</a>, and hundreds of other languages and frameworks is laid out the same way every time, so verifying a claim doesn't cost you the flow you were just in.</p>

<blockquote>An AI assistant is a fast first draft of the answer. Documentation is still the source of truth.</blockquote>

<h2 id="faq">Frequently asked questions</h2>
<h3>Can AI coding assistants replace reading documentation?</h3>
<p>No. They're genuinely good at summarizing and drafting example usage, but they can present outdated or invented details with total confidence, so verifying against the actual documentation is still necessary — especially for anything shipping to production.</p>
<h3>Why do AI coding assistants sometimes suggest deprecated or incorrect API usage?</h3>
<p>Most assistants are trained on a snapshot of public code and text, so they can reflect an older version of a library or blend patterns from several versions at once, producing code that looks plausible but doesn't match the current API.</p>
<h3>What's the safest way to use AI and documentation together?</h3>
<p>Use the assistant to get oriented quickly on the general approach, then confirm exact signatures, parameter names, and defaults directly against the official documentation before relying on the code.</p>
`,
  },
  {
    slug: "free-developer-resources-2026",
    title: "15 Free Developer Resources and Tools Worth Bookmarking in 2026",
    description:
      "A categorized, no-fluff list of genuinely free tools for reading docs, learning, testing, and shipping code in 2026 — no expiring trials, no surprise paywalls.",
    date: "2026-09-05",
    readingTime: "9 min read",
    tags: ["Free tools", "Resources", "Developer tools"],
    cover: "library",
    faq: [
      {
        q: "Are these tools free forever or just free trials?",
        a: "Every tool on this list has a genuinely free tier or is fully free and open source. Where a paid tier exists, the free tier is complete enough for regular, ongoing use — not a time-limited trial.",
      },
      {
        q: "What's the best free tool for a developer just starting out?",
        a: "A free code editor, a documentation aggregator, and a free learning platform cover most of what a beginner needs before spending anything at all.",
      },
      {
        q: "How do I know if a 'free' tool is actually a freemium trap?",
        a: "Check whether core functionality is gated behind a trial period, watermarks, or a hard usage cap that resets your whole workflow. A genuinely free tier states its limits clearly upfront rather than surprising you later.",
      },
    ],
    body: `
<p>Most "free developer tools" lists are the same fifty links copy-pasted between blogs, half of them now behind a paywall or discontinued. This one is shorter on purpose: it's organized by what you're actually trying to do, and every entry here is either fully free and open source, or has a free tier generous enough to use for real, ongoing work — not just a trial.</p>

<h2 id="docs">Documentation &amp; reference</h2>
<p><strong>FreeCodeDocs</strong> — search hundreds of languages and frameworks from one place instead of ten separate sites, each with its own layout and search box. Browse the full <a href="/docs">documentation library</a> or jump straight to what you use most, like <a href="/docs/react">React</a> or <a href="/docs/python">Python</a>.</p>
<p><strong>MDN Web Docs</strong> — the standard reference for HTML, CSS, and JavaScript, maintained with real depth on browser support and edge cases.</p>
<p><strong>A habit, not a tool: go to the primary source first.</strong> Official documentation is usually the most current and most precise material available on a library — everything else, including this list, is downstream of it.</p>

<h2 id="learning">Learning platforms</h2>
<p><strong>freeCodeCamp</strong> — a full, free curriculum covering web development fundamentals through to more advanced topics, with certifications you can add to a resume.</p>
<p><strong>The Odin Project</strong> — a free, project-based full-stack path that leans heavily on reading real documentation as part of the curriculum, rather than hiding it from you.</p>

<h2 id="editors">Code editors &amp; cloud environments</h2>
<p><strong>VS Code</strong> — free, actively maintained, and extensible enough to cover nearly any language or workflow through its extension ecosystem.</p>
<p><strong>StackBlitz and CodeSandbox</strong> — instant, in-browser development environments with generous free tiers, useful for testing an idea or sharing a reproducible bug without setting up a local project.</p>

<h2 id="api-testing">API development &amp; testing</h2>
<p><strong>Postman</strong> — the free tier covers request building, collections, and basic environment variables, which is enough for most day-to-day API work.</p>
<p><strong>Insomnia</strong> — a free, open-source alternative with a lighter interface, good if you want something simpler than Postman's full feature set.</p>

<h2 id="design">Design &amp; prototyping</h2>
<p><strong>Figma</strong> — the free tier supports real collaborative design work, which matters if you're a developer who occasionally needs to mock up a screen without a dedicated designer.</p>

<h2 id="vcs">Version control &amp; collaboration</h2>
<p><strong>GitHub</strong> — unlimited free public and private repositories, plus a usable free allotment of Actions minutes for basic CI, which covers most personal and small-team projects.</p>

<h2 id="utilities">Small but mighty utilities</h2>
<p><strong>Regex101</strong> — write a regular expression and get a live, plain-English breakdown of what each part matches, which turns debugging a regex from guesswork into reading.</p>
<p><strong>Can I Use</strong> — a fast way to check real browser support for a CSS or JavaScript feature before you rely on it in production.</p>
<p><strong>JSON formatters and validators</strong> — dozens of free, no-signup tools exist purely to pretty-print and validate a blob of JSON; worth having one bookmarked instead of writing a script for it each time.</p>

<h2 id="deployment">Deployment &amp; hosting</h2>
<p><strong>Vercel and Netlify</strong> — both offer free tiers generous enough to host a personal project, a portfolio, or a small production app, with automatic deploys from a Git repository.</p>

<table>
<thead><tr><th>Category</th><th>Tool</th><th>Best for</th></tr></thead>
<tbody>
<tr><td>Documentation</td><td>FreeCodeDocs, MDN</td><td>Looking up exact syntax and API details fast</td></tr>
<tr><td>Learning</td><td>freeCodeCamp, The Odin Project</td><td>Structured, free, project-based learning</td></tr>
<tr><td>Editors</td><td>VS Code, StackBlitz</td><td>Writing and testing code locally or instantly in-browser</td></tr>
<tr><td>API testing</td><td>Postman, Insomnia</td><td>Building and debugging API requests</td></tr>
<tr><td>Deployment</td><td>Vercel, Netlify</td><td>Shipping a small project live in minutes</td></tr>
</tbody>
</table>

<h2 id="freemium-trap">How to tell a real free tier from a freemium trap</h2>
<p>"Free" gets used loosely in developer tooling, so it's worth checking a few things before you build a habit around a new tool:</p>
<ul>
<li><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" style="display:inline;vertical-align:-3px;margin-right:6px"><path d="M20 6 9 17l-5-5"/></svg>Does the free tier have a hard expiration date, or is it ongoing?</li>
<li><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" style="display:inline;vertical-align:-3px;margin-right:6px"><path d="M20 6 9 17l-5-5"/></svg>Is core functionality usable, or just a watermarked preview?</li>
<li><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" style="display:inline;vertical-align:-3px;margin-right:6px"><path d="M20 6 9 17l-5-5"/></svg>Are the usage limits stated clearly, or do you find out by hitting them?</li>
<li><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" style="display:inline;vertical-align:-3px;margin-right:6px"><path d="M20 6 9 17l-5-5"/></svg>If it's open source, is it actively maintained, or effectively abandoned?</li>
</ul>

<blockquote>A tool is only "free" if you can still rely on it in six months. Everything else is a trial with extra steps.</blockquote>

<h2 id="faq">Frequently asked questions</h2>
<h3>Are these tools free forever or just free trials?</h3>
<p>Every tool on this list has a genuinely free tier or is fully free and open source. Where a paid tier exists, the free tier is complete enough for regular, ongoing use — not a time-limited trial.</p>
<h3>What's the best free tool for a developer just starting out?</h3>
<p>A free code editor, a documentation aggregator, and a free learning platform cover most of what a beginner needs before spending anything at all.</p>
<h3>How do I know if a "free" tool is actually a freemium trap?</h3>
<p>Check whether core functionality is gated behind a trial period, watermarks, or a hard usage cap that resets your whole workflow. A genuinely free tier states its limits clearly upfront rather than surprising you later.</p>
`,
  },
  {
    slug: "learn-new-programming-language-fast",
    title: "How to Learn a New Programming Language Fast: A Documentation-First Approach",
    description:
      "Skip the 40-video course. Here's the documentation-first method experienced developers use to get productive in a new programming language in days, not months.",
    date: "2026-08-29",
    readingTime: "8 min read",
    tags: ["Learning", "Developer workflow", "Documentation"],
    cover: "guide",
    faq: [
      {
        q: "What's the fastest way to learn a new programming language?",
        a: "Start from the language's own official documentation rather than a long course. Read the core syntax and standard library reference first, then build something small that forces you to actually use it.",
      },
      {
        q: "Should I finish a course before writing real code in a new language?",
        a: "No. For a developer who already knows how to program, working through the reference documentation while building a small real project is faster than finishing a full course first.",
      },
      {
        q: "How long does it typically take an experienced developer to become productive in a new language?",
        a: "Days, not months. The challenge is usually learning the new language's idioms and standard library, not the underlying concept of programming, which you already know.",
      },
    ],
    body: `
<p>If you already know how to program, a 40-video course teaching you what a variable is wastes most of your time explaining things you don't need explained. The faster path — the one experienced developers actually use when they need to pick up a new language for a job or a project — starts with the documentation, not a course platform.</p>

<h2 id="why-docs-first">Why documentation-first works better once you already code</h2>
<p>A course has to assume you know nothing, which means most of its runtime is spent on concepts you've already internalized in another language: loops, conditionals, functions. What you actually need is much narrower — you need to know what's <em>different</em> about this language. Documentation, especially a language's own reference material, is organized exactly around that: syntax, types, standard library, idioms. It skips the parts you don't need and gets you to the parts you do.</p>

<h2 id="step-1">Step 1 — Read the language's own quick reference first</h2>
<p>Not a third-party tutorial site, not a "learn X in 20 minutes" blog post — the official reference, or the closest thing to it. Third-party tutorials are optimized for beginners meeting the concepts for the first time. Official references are optimized for correctness and completeness, which is what you actually need when you already understand programming and just need the specifics.</p>
<table>
<thead><tr><th></th><th>Tutorial site</th><th>Official reference</th></tr></thead>
<tbody>
<tr><td>Assumes</td><td>You've never programmed</td><td>You know how to program</td></tr>
<tr><td>Optimized for</td><td>Gentle first exposure</td><td>Precision and completeness</td></tr>
<tr><td>Best for</td><td>True beginners</td><td>Experienced developers learning language #4, #5, #6…</td></tr>
</tbody>
</table>

<h2 id="step-2">Step 2 — Learn the handful of things that differ between languages</h2>
<p>Almost every "new language" is a variation on the same underlying ideas, with a small set of differences that actually trip people up:</p>
<ul>
<li>Indentation-based blocks versus braces</li>
<li>Static typing versus dynamic typing, and how strict either is</li>
<li>How null, none, or undefined values are handled</li>
<li>String formatting and interpolation syntax</li>
<li>The module or import system</li>
</ul>
<p>Read these five things deliberately, on day one, instead of discovering each one the hard way through an error message.</p>

<h2 id="step-3">Step 3 — Skim the standard library's table of contents before writing code</h2>
<p>Most languages ship with a standard library that already solves problems you'd otherwise reach for a package to fix — string handling, file I/O, basic data structures, date and time. Ten minutes skimming the standard library's index means you'll recognize the function name when you need it later, instead of writing your own version or reaching for a third-party package unnecessarily.</p>
<div class="codeblock">
<div class="codebar"><span>python</span></div>
<pre><code>from collections import Counter

counts = Counter(["a", "b", "a", "c", "b", "a"])
print(counts.most_common(1))  # [('a', 3)]</code></pre>
</div>
<p>A developer who skimmed the standard library index knows <code>Counter</code> exists before they need it. A developer who didn't will spend twenty minutes writing a manual tally loop instead.</p>

<h2 id="step-4">Step 4 — Build one small real project, docs open beside you</h2>
<p>Pick something small and concrete — a command-line tool, a script that processes a file, a tiny API endpoint — rather than following a tutorial's toy example. The goal isn't to finish a tutorial; it's to hit real friction points that force you to actually search the documentation, which is the skill you're trying to build in the first place. Tutorial-hopping between five different "getting started" guides produces the feeling of learning without the friction that makes it stick.</p>

<h2 id="step-5">Step 5 — Keep a differences list, not full notes</h2>
<p>As with reading any documentation, don't transcribe what the docs already say clearly. Keep a short, personal list of the things that surprised you about this specific language — the one gotcha with string comparison, the unexpected default argument behavior, the import quirk. That list is what you'll actually reread; a full set of notes duplicating the documentation rarely gets opened again.</p>

<h2 id="timeline">A realistic timeline</h2>
<p>For a developer who already knows how to program well in at least one language:</p>
<ul>
<li><strong>Day 1:</strong> Core syntax, the five differences above, "hello world" in a few different forms</li>
<li><strong>Days 2–3:</strong> Standard library basics, first small script or tool</li>
<li><strong>Days 4–7:</strong> One small real project completed, differences list growing</li>
</ul>
<p>That's productive, not expert — but productive is usually all a new job or project actually requires on day one.</p>

<h2 id="ready">Signs you're ready to write real code, not just read</h2>
<ul>
<li><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" style="display:inline;vertical-align:-3px;margin-right:6px"><path d="M20 6 9 17l-5-5"/></svg>You can write a function without checking syntax for the basics</li>
<li><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" style="display:inline;vertical-align:-3px;margin-right:6px"><path d="M20 6 9 17l-5-5"/></svg>You know where the standard library documentation lives and can navigate it</li>
<li><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" style="display:inline;vertical-align:-3px;margin-right:6px"><path d="M20 6 9 17l-5-5"/></svg>You've hit at least one real error and resolved it by reading the docs, not guessing</li>
</ul>

<blockquote>You don't learn a new language by finishing a course in it. You learn it by building something small enough to finish and real enough to break.</blockquote>

<p>Whichever language you're picking up next, keep the reference material one tab away instead of ten — <a href="/docs">FreeCodeDocs</a> covers hundreds of languages and frameworks, including <a href="/docs/typescript">TypeScript</a> and <a href="/docs/python">Python</a>, in the same layout every time.</p>

<h2 id="faq">Frequently asked questions</h2>
<h3>What's the fastest way to learn a new programming language?</h3>
<p>Start from the language's own official documentation rather than a long course. Read the core syntax and standard library reference first, then build something small that forces you to actually use it.</p>
<h3>Should I finish a course before writing real code in a new language?</h3>
<p>No. For a developer who already knows how to program, working through the reference documentation while building a small real project is faster than finishing a full course first.</p>
<h3>How long does it typically take an experienced developer to become productive in a new language?</h3>
<p>Days, not months. The challenge is usually learning the new language's idioms and standard library, not the underlying concept of programming, which you already know.</p>
`,
  },
];

export function allPosts(): BlogPost[] {
  return [...posts].sort((a, b) => +new Date(b.date) - +new Date(a.date));
}
export function getPost(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug);
}