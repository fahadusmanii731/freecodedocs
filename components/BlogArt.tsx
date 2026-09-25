type Variant = "guide" | "speed" | "library";

/** Small, original SVG illustrations for blog covers — no external images, matches the site's line-art style. */
export default function BlogArt({ variant, className = "" }: { variant: Variant; className?: string }) {
  const common = { viewBox: "0 0 400 220", role: "img" as const, "aria-hidden": true, fill: "none" };
  if (variant === "guide") {
    return (
      <svg {...common} className={className}>
        <rect x="0" y="0" width="400" height="220" fill="var(--subtle)" />
        <g stroke="var(--line)" strokeWidth="2"><path d="M40 190V50a10 10 0 0 1 10-10h90v150z" fill="var(--bg)" /><path d="M360 190V50a10 10 0 0 0-10-10h-90v150z" fill="var(--bg)" /></g>
        <path d="M140 40v150M260 40v150" stroke="var(--line)" strokeWidth="2" />
        {[64, 82, 100].map((y) => <rect key={"l" + y} x="60" y={y} width="60" height="6" rx="3" fill="var(--line)" />)}
        {[64, 82, 100].map((y) => <rect key={"r" + y} x="280" y={y} width="60" height="6" rx="3" fill="var(--line)" />)}
        <path d="M60 130h60M280 130h60" stroke="var(--accent)" strokeWidth="6" strokeLinecap="round" />
        <circle cx="200" cy="38" r="14" fill="var(--accent)" />
      </svg>
    );
  }
  if (variant === "speed") {
    return (
      <svg {...common} className={className}>
        <rect x="0" y="0" width="400" height="220" fill="var(--subtle)" />
        <circle cx="200" cy="112" r="62" fill="none" stroke="var(--line)" strokeWidth="10" />
        <path d="M200 112 L236 76" stroke="var(--accent)" strokeWidth="8" strokeLinecap="round" />
        <circle cx="200" cy="112" r="7" fill="var(--ink)" />
        {[0, 30, 60, 90, 120, 150, 180].map((a) => (
          <line key={a} x1={200 + 74 * Math.cos((a - 90) * (Math.PI / 180))} y1={112 + 74 * Math.sin((a - 90) * (Math.PI / 180))}
            x2={200 + 84 * Math.cos((a - 90) * (Math.PI / 180))} y2={112 + 84 * Math.sin((a - 90) * (Math.PI / 180))}
            stroke="var(--line)" strokeWidth="4" strokeLinecap="round" />
        ))}
      </svg>
    );
  }
  return (
    <svg {...common} className={className}>
      <rect x="0" y="0" width="400" height="220" fill="var(--subtle)" />
      {[[70, 150, 60], [150, 130, 90], [250, 145, 70], [330, 160, 45]].map(([x, h, w], i) => (
        <rect key={i} x={x - w / 2} y={190 - h} width={w} height={h} rx="6" fill={i === 1 ? "var(--accent)" : "var(--bg)"} stroke="var(--line)" strokeWidth="2" />
      ))}
      <circle cx="150" cy="46" r="10" fill="var(--ink)" />
    </svg>
  );
}