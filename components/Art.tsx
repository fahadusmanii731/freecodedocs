export function HeroArt() {
  const lines: [number, number, number, string][] = [[30, 58, 110, "var(--accent)"], [46, 82, 170, "var(--muted)"], [46, 106, 130, "var(--muted)"], [30, 130, 90, "var(--accent)"]];
  return (
    <svg viewBox="0 0 320 200" className="w-full max-w-xs md:max-w-none" role="img" aria-label="Code editor illustration" fill="none" strokeLinecap="round" strokeWidth="3">
      <rect x="1" y="1" width="318" height="198" rx="10" fill="var(--subtle)" stroke="var(--line)" strokeWidth="2" />
      <path d="M1 30h318" stroke="var(--line)" strokeWidth="2" />
      {[18, 32, 46].map((x) => <circle key={x} cx={x} cy="16" r="3.5" fill="var(--line)" />)}
      {lines.map(([x, y, w, c], i) => <path key={i} className="draw" pathLength={1} d={`M${x} ${y}h${w}`} stroke={c} style={{ animationDelay: `${i * 0.25}s` }} />)}
      <rect className="caret" x="128" y="122" width="7" height="16" fill="var(--accent)" />
      <g className="float"><rect x="226" y="132" width="72" height="44" rx="8" fill="var(--bg)" stroke="var(--line)" strokeWidth="2" />
        <text x="262" y="160" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="16" fontWeight="600" fill="var(--accent)" stroke="none">{"</>"}</text></g>
    </svg>
  );
}
export function EmptyArt() {
  return (
    <svg width="44" height="44" viewBox="0 0 44 44" aria-hidden fill="none" stroke="var(--muted)" strokeWidth="2.5" strokeLinecap="round" className="wobble">
      <circle cx="19" cy="19" r="10" /><path d="M27 27l9 9" /><path d="M15 19h8" />
    </svg>
  );
}
