"use client";

import { useState } from "react";
import { Package, AlertTriangle, ArrowDown, ArrowUp } from "lucide-react";

const initialProducts = [
  { id: 1, name: "Écran 27\"", sku: "ECR-027", qty: 45, min: 10 },
  { id: 2, name: "Clavier méca", sku: "CLV-M01", qty: 8, min: 15 },
  { id: 3, name: "Souris sans fil", sku: "SRV-W02", qty: 120, min: 30 },
  { id: 4, name: "Hub USB-C", sku: "HUB-C03", qty: 3, min: 20 },
];

export function StockPreview() {
  const [products, setProducts] = useState(initialProducts);

  const adjust = (id: number, delta: number) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, qty: Math.max(0, p.qty + delta) } : p
      )
    );
  };

  const alerts = products.filter((p) => p.qty < p.min).length;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between rounded-lg border border-tamrix-border bg-tamrix-bg p-3">
        <div className="flex items-center gap-2">
          <Package className="h-5 w-5 text-brand-300" />
          <span className="text-sm font-semibold text-tamrix-text">
            Inventaire temps réel
          </span>
        </div>
        {alerts > 0 && (
          <span className="flex items-center gap-1 rounded-full border border-red-400/30 bg-red-400/10 px-2.5 py-1 text-xs font-semibold text-red-400">
            <AlertTriangle className="h-3 w-3" />
            {alerts} alerte{alerts > 1 ? "s" : ""}
          </span>
        )}
      </div>

      <div className="overflow-hidden rounded-lg border border-tamrix-border">
        <table className="w-full text-left text-xs">
          <thead className="bg-tamrix-bg text-tamrix-muted">
            <tr>
              <th className="px-3 py-2 font-medium">Produit</th>
              <th className="px-3 py-2 font-medium">SKU</th>
              <th className="px-3 py-2 font-medium">Stock</th>
              <th className="px-3 py-2 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr
                key={p.id}
                className={`border-t border-tamrix-border ${
                  p.qty < p.min ? "bg-red-500/5" : ""
                }`}
              >
                <td className="px-3 py-2.5 font-medium text-tamrix-text">{p.name}</td>
                <td className="px-3 py-2.5 text-tamrix-muted">{p.sku}</td>
                <td className="px-3 py-2.5">
                  <span className={`font-bold ${p.qty < p.min ? "text-red-400" : "text-tamrix-text"}`}>
                    {p.qty}
                  </span>
                  <span className="text-tamrix-muted"> / min {p.min}</span>
                </td>
                <td className="px-3 py-2.5">
                  <div className="flex gap-1">
                    <button type="button" onClick={() => adjust(p.id, -1)} className="rounded border border-tamrix-border p-1 text-tamrix-muted hover:text-brand-300">
                      <ArrowDown className="h-3 w-3" />
                    </button>
                    <button type="button" onClick={() => adjust(p.id, 1)} className="rounded border border-tamrix-border p-1 text-tamrix-muted hover:text-brand-300">
                      <ArrowUp className="h-3 w-3" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
