"use client";

import { useState } from "react";
import { UserCheck, Calendar, CheckCircle } from "lucide-react";

const employees = [
  { id: 1, name: "Sophie Martin", role: "Comptable", leave: 12, used: 8 },
  { id: 2, name: "Thomas Leroy", role: "Commercial", leave: 25, used: 20 },
  { id: 3, name: "Amina Diallo", role: "RH Manager", leave: 25, used: 5 },
];

export function RhPreview() {
  const [requests, setRequests] = useState<Record<number, "none" | "pending" | "approved">>({
    1: "none", 2: "pending", 3: "none",
  });

  const requestLeave = (id: number) => setRequests((p) => ({ ...p, [id]: "pending" }));
  const approve = (id: number) => setRequests((p) => ({ ...p, [id]: "approved" }));

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 rounded-lg border border-tamrix-border bg-tamrix-bg p-3">
        <UserCheck className="h-5 w-5 text-brand-300" />
        <span className="text-sm font-semibold text-tamrix-text">
          Effectif — {employees.length} collaborateurs
        </span>
      </div>

      <div className="space-y-2">
        {employees.map((emp) => (
          <div key={emp.id} className="rounded-lg border border-tamrix-border bg-tamrix-bg p-3">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-semibold text-tamrix-text">{emp.name}</p>
                <p className="text-xs text-tamrix-muted">{emp.role}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-tamrix-muted">Congés restants</p>
                <p className="text-sm font-bold text-brand-300">{emp.leave - emp.used} j</p>
              </div>
            </div>
            <div className="mt-2 flex items-center justify-between">
              <div className="h-1.5 flex-1 rounded-full bg-tamrix-elevated">
                <div className="h-1.5 rounded-full bg-brand-300" style={{ width: `${(emp.used / emp.leave) * 100}%` }} />
              </div>
              {requests[emp.id] === "none" && (
                <button type="button" onClick={() => requestLeave(emp.id)} className="ml-3 flex items-center gap-1 rounded-md border border-brand-300/30 bg-brand-300/10 px-2 py-1 text-[10px] font-semibold text-brand-300">
                  <Calendar className="h-3 w-3" /> Demander
                </button>
              )}
              {requests[emp.id] === "pending" && (
                <button type="button" onClick={() => approve(emp.id)} className="ml-3 rounded-md border border-amber-400/30 bg-amber-400/10 px-2 py-1 text-[10px] font-semibold text-amber-400">
                  Approuver
                </button>
              )}
              {requests[emp.id] === "approved" && (
                <span className="ml-3 flex items-center gap-1 text-[10px] font-semibold text-emerald-400">
                  <CheckCircle className="h-3 w-3" /> Approuvé
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
