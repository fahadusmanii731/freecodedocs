"use client";
import ErrorState from "@/components/ErrorState";
export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <div>
      <ErrorState title="This page failed to load" message="DevDocs may be temporarily unavailable." />
      <button onClick={reset} className="mt-3 text-sm text-accent underline underline-offset-4">Try again</button>
    </div>
  );
}
