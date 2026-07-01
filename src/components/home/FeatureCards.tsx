import { Headphones, MonitorPlay, Timer } from "lucide-react";
import type { Dictionary } from "@/i18n/types";
import { IconBadge } from "./IconBadge";

const FEATURE_ICONS = [MonitorPlay, Timer, Headphones] as const;

interface FeatureCardsProps {
  features: Dictionary["home"]["features"];
}

export function FeatureCards({ features }: FeatureCardsProps) {
  return (
    <div className="stagger-children grid gap-6 md:grid-cols-3">
      {features.map((feature, i) => {
        const Icon = FEATURE_ICONS[i] ?? MonitorPlay;
        return (
          <div key={feature.title} className="card-hover group p-7">
            <IconBadge icon={Icon} className="transition group-hover:border-brand-300/50" />
            <h3 className="mt-5 text-lg font-bold text-tamrix-text">{feature.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-tamrix-muted">{feature.desc}</p>
          </div>
        );
      })}
    </div>
  );
}
