"use client";

import { useState } from "react";
import { ChevronRight, X } from "lucide-react";

interface PreviewGuideProps {
  steps: string[];
  labels: { step: string; next: string; skip: string };
}

export function PreviewGuide({ steps, labels }: PreviewGuideProps) {
  const [index, setIndex] = useState(0);
  const [dismissed, setDismissed] = useState(false);

  if (dismissed || steps.length === 0 || index >= steps.length) return null;

  return (
    <div className="mb-4 rounded-xl border border-brand-300/40 bg-brand-300/10 p-4">
      <div className="flex items-start justify-between gap-2">
        <p className="text-[10px] font-bold uppercase tracking-wider text-brand-300">
          {labels.step} {index + 1}/{steps.length}
        </p>
        <button
          type="button"
          onClick={() => setDismissed(true)}
          className="text-tamrix-muted hover:text-brand-300"
          aria-label={labels.skip}
        >
          <X className="h-4 w-4" />
        </button>
      </div>
      <p className="mt-2 text-sm text-tamrix-text">{steps[index]}</p>
      <div className="mt-3 flex gap-2">
        <button
          type="button"
          onClick={() =>
            index + 1 >= steps.length ? setDismissed(true) : setIndex((i) => i + 1)
          }
          className="btn-primary px-3 py-1.5 text-xs"
        >
          {labels.next}
          <ChevronRight className="h-3.5 w-3.5" />
        </button>
        <button
          type="button"
          onClick={() => setDismissed(true)}
          className="btn-ghost px-3 py-1.5 text-xs"
        >
          {labels.skip}
        </button>
      </div>
    </div>
  );
}
