"use client";

import { useState } from "react";
import { FolderOpen, ChevronRight } from "lucide-react";

const steps = ["Dépôt", "Vérification", "Traitement", "Validation", "Clôture"];

const initialDossiers = [
  { id: 1, ref: "DOS-2024-112", client: "Jean Dupont", step: 2 },
  { id: 2, ref: "DOS-2024-113", client: "Marie Claire", step: 4 },
  { id: 3, ref: "DOS-2024-114", client: "Pierre Ndiaye", step: 1 },
];

export function DossiersPreview() {
  const [dossiers, setDossiers] = useState(initialDossiers);
  const [selected, setSelected] = useState<number | null>(null);

  const advance = (id: number) => {
    setDossiers((prev) =>
      prev.map((d) =>
        d.id === id ? { ...d, step: Math.min(d.step + 1, steps.length) } : d
      )
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 rounded-lg border border-tamrix-border bg-tamrix-bg p-3">
        <FolderOpen className="h-5 w-5 text-brand-300" />
        <span className="text-sm font-semibold text-tamrix-text">
          {dossiers.length} dossiers en cours
        </span>
      </div>

      <div className="space-y-3">
        {dossiers.map((d) => (
          <button
            key={d.id}
            type="button"
            onClick={() => { setSelected(d.id); if (d.step < steps.length) advance(d.id); }}
            className={`w-full rounded-lg border p-3 text-left transition ${
              selected === d.id
                ? "border-brand-300 bg-brand-300/5"
                : "border-tamrix-border bg-tamrix-bg hover:border-brand-300/40"
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-tamrix-text">{d.ref}</p>
                <p className="text-xs text-tamrix-muted">{d.client}</p>
              </div>
              <ChevronRight className="h-4 w-4 text-tamrix-muted" />
            </div>
            <div className="mt-3 flex gap-1">
              {steps.map((step, i) => (
                <div key={step} className="flex-1">
                  <div className={`h-1.5 rounded-full ${i < d.step ? "bg-brand-300" : "bg-tamrix-elevated"}`} />
                  <p className="mt-1 truncate text-[9px] text-tamrix-muted">{step}</p>
                </div>
              ))}
            </div>
          </button>
        ))}
      </div>
      <p className="text-xs text-tamrix-muted">Cliquez sur un dossier pour faire avancer le workflow</p>
    </div>
  );
}
