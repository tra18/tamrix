"use client";

import { useState } from "react";
import { Calendar, Clock } from "lucide-react";

const slots = [
  { time: "09:00", available: true },
  { time: "10:30", available: true },
  { time: "14:00", available: false },
  { time: "15:30", available: true },
  { time: "17:00", available: true },
];

export function ReservationPreview() {
  const [booked, setBooked] = useState<string[]>([]);
  const [confirmed, setConfirmed] = useState<string | null>(null);

  const book = (time: string) => {
    if (booked.includes(time) || slots.find((s) => s.time === time && !s.available)) return;
    setBooked((prev) => [...prev, time]);
    setConfirmed(time);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between rounded-lg border border-tamrix-border bg-tamrix-bg p-3">
        <div className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-brand-300" />
          <span className="text-sm font-semibold text-tamrix-text">Lundi 30 juin 2025</span>
        </div>
        <span className="text-xs text-tamrix-muted">Dr. Martin — Cabinet A</span>
      </div>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {slots.map((slot) => {
          const isBooked = booked.includes(slot.time) || !slot.available;
          return (
            <button
              key={slot.time}
              type="button"
              disabled={isBooked && !booked.includes(slot.time)}
              onClick={() => book(slot.time)}
              className={`flex items-center justify-center gap-1.5 rounded-lg border py-3 text-sm font-medium transition ${
                confirmed === slot.time
                  ? "border-brand-300 bg-brand-300/10 text-brand-300"
                  : isBooked
                    ? "cursor-not-allowed border-tamrix-border bg-tamrix-elevated text-tamrix-muted/50"
                    : "border-tamrix-border text-tamrix-muted hover:border-brand-300/50 hover:text-brand-300"
              }`}
            >
              <Clock className="h-3.5 w-3.5" />
              {slot.time}
            </button>
          );
        })}
      </div>

      {confirmed && (
        <div className="rounded-lg border border-emerald-400/30 bg-emerald-400/10 p-3 text-center">
          <p className="text-sm font-semibold text-emerald-400">
            Rendez-vous confirmé à {confirmed}
          </p>
          <p className="mt-1 text-xs text-emerald-400/70">
            Un rappel SMS sera envoyé 24h avant
          </p>
        </div>
      )}
    </div>
  );
}
