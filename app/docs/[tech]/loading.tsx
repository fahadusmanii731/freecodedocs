export default function Loading() {
  return (
    <div className="max-w-2xl animate-pulse space-y-4" aria-busy="true" aria-label="Loading documentation">
      <div className="h-8 w-2/3 rounded bg-subtle" />
      {[95, 88, 92, 60].map((w, i) => <div key={i} className="h-4 rounded bg-subtle" style={{ width: `${w}%` }} />)}
      <div className="h-32 rounded bg-subtle" />
    </div>
  );
}
