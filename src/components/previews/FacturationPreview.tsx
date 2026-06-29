"use client";

import { useState } from "react";
import { FileText, Check, Clock } from "lucide-react";

const invoices = [
  { id: "FAC-2024-089", client: "Martin & Co", amount: 3200, status: "paid" },
  { id: "FAC-2024-090", client: "Dupont SARL", amount: 1850, status: "pending" },
  { id: "FAC-2024-091", client: "Leroy Tech", amount: 5400, status: "overdue" },
];

export function FacturationPreview() {
  const [statuses, setStatuses] = useState(
    Object.fromEntries(invoices.map((i) => [i.id, i.status]))
  );

  const markPaid = (id: string) => {
    setStatuses((prev) => ({ ...prev, [id]: "paid" }));
  };

  const total = invoices.reduce((s, i) => s + i.amount, 0);
  const paid = invoices
    .filter((i) => statuses[i.id] === "paid")
    .reduce((s, i) => s + i.amount, 0);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-lg border border-tamrix-border bg-tamrix-bg p-3">
          <p className="text-xs text-tamrix-muted">Chiffre facturé</p>
          <p className="text-xl font-bold text-tamrix-text">{total.toLocaleString("fr-FR")} €</p>
        </div>
        <div className="rounded-lg border border-tamrix-border bg-tamrix-bg p-3">
          <p className="text-xs text-tamrix-muted">Encaissé</p>
          <p className="text-xl font-bold text-emerald-400">{paid.toLocaleString("fr-FR")} €</p>
        </div>
      </div>

      <div className="space-y-2">
        {invoices.map((inv) => {
          const status = statuses[inv.id];
          return (
            <div key={inv.id} className="flex items-center justify-between rounded-lg border border-tamrix-border bg-tamrix-bg p-3">
              <div className="flex items-center gap-3">
                <FileText className="h-4 w-4 text-tamrix-muted" />
                <div>
                  <p className="text-xs font-semibold text-tamrix-text">{inv.id}</p>
                  <p className="text-xs text-tamrix-muted">{inv.client}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm font-bold text-tamrix-text">
                  {inv.amount.toLocaleString("fr-FR")} €
                </span>
                {status === "paid" ? (
                  <span className="flex items-center gap-1 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-400">
                    <Check className="h-3 w-3" /> Payée
                  </span>
                ) : status === "overdue" ? (
                  <button type="button" onClick={() => markPaid(inv.id)} className="rounded-full border border-red-400/30 bg-red-400/10 px-2 py-0.5 text-[10px] font-semibold text-red-400 hover:bg-red-400/20">
                    En retard
                  </button>
                ) : (
                  <button type="button" onClick={() => markPaid(inv.id)} className="flex items-center gap-1 rounded-full border border-amber-400/30 bg-amber-400/10 px-2 py-0.5 text-[10px] font-semibold text-amber-400 hover:bg-amber-400/20">
                    <Clock className="h-3 w-3" /> En attente
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
