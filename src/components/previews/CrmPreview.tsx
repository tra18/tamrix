"use client";

import { useState } from "react";
import { Users, TrendingUp, Phone } from "lucide-react";

const columns = [
  { id: "lead", label: "Prospects", color: "bg-tamrix-elevated" },
  { id: "contact", label: "Contactés", color: "bg-blue-500/10" },
  { id: "proposal", label: "Proposition", color: "bg-amber-500/10" },
  { id: "won", label: "Gagnés", color: "bg-emerald-500/10" },
];

const initialDeals = [
  { id: 1, name: "Acme Corp", value: "12 500 €", column: "lead" },
  { id: 2, name: "TechStart SA", value: "8 200 €", column: "contact" },
  { id: 3, name: "Global Services", value: "24 000 €", column: "proposal" },
  { id: 4, name: "Nova Industries", value: "15 800 €", column: "won" },
];

export function CrmPreview() {
  const [deals, setDeals] = useState(initialDeals);
  const [selected, setSelected] = useState<number | null>(null);

  const moveDeal = (id: number) => {
    const colOrder = columns.map((c) => c.id);
    setDeals((prev) =>
      prev.map((d) => {
        if (d.id !== id) return d;
        const idx = colOrder.indexOf(d.column);
        const next = colOrder[Math.min(idx + 1, colOrder.length - 1)];
        return { ...d, column: next };
      })
    );
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-3">
        {[
          { icon: Users, label: "Clients actifs", value: "148", color: "text-tamrix-text" },
          { icon: TrendingUp, label: "Pipeline", value: "60 500 €", color: "text-brand-300" },
          { icon: Phone, label: "À rappeler", value: "7", color: "text-amber-400" },
        ].map(({ icon: Icon, label, value, color }) => (
          <div key={label} className="rounded-lg border border-tamrix-border bg-tamrix-bg p-3">
            <div className="flex items-center gap-2 text-tamrix-muted">
              <Icon className="h-4 w-4" />
              <span className="text-xs">{label}</span>
            </div>
            <p className={`mt-1 text-xl font-bold ${color}`}>{value}</p>
          </div>
        ))}
      </div>

      <p className="text-xs text-tamrix-muted">
        Cliquez sur une carte pour avancer dans le pipeline
      </p>

      <div className="grid grid-cols-2 gap-2 lg:grid-cols-4">
        {columns.map((col) => (
          <div key={col.id} className={`rounded-lg border border-tamrix-border p-2 ${col.color}`}>
            <h4 className="mb-2 text-xs font-semibold text-tamrix-muted">{col.label}</h4>
            <div className="space-y-2">
              {deals
                .filter((d) => d.column === col.id)
                .map((deal) => (
                  <button
                    key={deal.id}
                    type="button"
                    onClick={() => {
                      setSelected(deal.id);
                      moveDeal(deal.id);
                    }}
                    className={`w-full rounded-md border bg-tamrix-bg p-2 text-left text-xs transition hover:border-brand-300/50 ${
                      selected === deal.id
                        ? "border-brand-300 ring-1 ring-brand-300/50"
                        : "border-tamrix-border"
                    }`}
                  >
                    <p className="font-semibold text-tamrix-text">{deal.name}</p>
                    <p className="text-brand-300">{deal.value}</p>
                  </button>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
