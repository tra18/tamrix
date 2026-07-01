import { ClipboardCheck, Compass, PenTool, Rocket } from "lucide-react";
import type { Dictionary } from "@/i18n/types";
import { IconBadge } from "./IconBadge";

const STEP_ICONS = [Compass, ClipboardCheck, PenTool, Rocket] as const;

interface ProcessTimelineProps {
  badge: string;
  title: string;
  subtitle: string;
  stepLabel: string;
  steps: Dictionary["home"]["steps"];
}

export function ProcessTimeline({
  badge,
  title,
  subtitle,
  stepLabel,
  steps,
}: ProcessTimelineProps) {
  return (
    <section id="processus" className="circuit-bg mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl text-center animate-fade-in-up">
        <span className="badge">{badge}</span>
        <h2 className="section-title mt-4">{title}</h2>
        <p className="section-subtitle">{subtitle}</p>
      </div>

      <div className="relative mt-16">
        <div
          className="absolute left-[12.5%] right-[12.5%] top-8 hidden h-px bg-gradient-to-r from-brand-300/10 via-brand-300/40 to-brand-300/10 lg:block"
          aria-hidden
        />

        <ol className="stagger-children grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {steps.map((step, i) => {
            const Icon = STEP_ICONS[i] ?? Compass;
            return (
              <li key={step.title} className="relative flex flex-col items-center text-center lg:items-start lg:text-left">
                <div className="relative z-10">
                  <IconBadge icon={Icon} size="lg" />
                  <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full border border-brand-300/40 bg-tamrix-bg text-[10px] font-bold text-brand-300">
                    {i + 1}
                  </span>
                </div>

                <p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-300/70">
                  {stepLabel} {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-1 text-lg font-bold text-tamrix-text">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-tamrix-muted">{step.desc}</p>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
