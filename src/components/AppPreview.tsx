"use client";

import { PreviewType } from "@/data/applications";
import type { Dictionary } from "@/i18n/types";
import { interpolate } from "@/i18n/interpolate";
import { CrmPreview } from "./previews/CrmPreview";
import { StockPreview } from "./previews/StockPreview";
import { FacturationPreview } from "./previews/FacturationPreview";
import { RhPreview } from "./previews/RhPreview";
import { DossiersPreview } from "./previews/DossiersPreview";
import { ReservationPreview } from "./previews/ReservationPreview";
import { PreviewGuide } from "./previews/PreviewGuide";

interface AppPreviewProps {
  type: PreviewType;
  appName: string;
  dict: Dictionary;
}

export function AppPreview({ type, appName, dict }: AppPreviewProps) {
  const guide = dict.preview.guides[type];

  return (
    <div className="overflow-hidden rounded-2xl border border-brand-300/20 bg-tamrix-elevated shadow-glow-lg animate-fade-in-up">
      <div className="flex items-center gap-2 border-b border-tamrix-border bg-tamrix-bg px-4 py-3">
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
        </div>
        <span className="ml-2 text-xs font-medium text-tamrix-muted">
          {interpolate(dict.preview.previewOf, { name: appName })}
        </span>
        <span className="ml-auto rounded border border-brand-300/30 bg-brand-300/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-brand-300">
          {dict.preview.interactiveDemo}
        </span>
      </div>
      <div className="min-h-[420px] bg-tamrix-surface p-4">
        {guide && (
          <PreviewGuide
            steps={guide.steps}
            labels={{
              step: dict.preview.guideStep,
              next: dict.preview.guideNext,
              skip: dict.preview.guideSkip,
            }}
          />
        )}
        <PreviewContent type={type} />
      </div>
    </div>
  );
}

function PreviewContent({ type }: { type: PreviewType }) {
  switch (type) {
    case "crm":
      return <CrmPreview />;
    case "stock":
      return <StockPreview />;
    case "facturation":
      return <FacturationPreview />;
    case "rh":
      return <RhPreview />;
    case "dossiers":
      return <DossiersPreview />;
    case "reservation":
      return <ReservationPreview />;
    default:
      return null;
  }
}
