"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Download,
  FileText,
  LogOut,
  Mail,
  Package,
  RefreshCw,
  Search,
  Shield,
  X,
} from "lucide-react";
import Link from "next/link";
import { downloadCsv } from "@/lib/csv-export";

type RequestStatus = "NEW" | "IN_PROGRESS" | "COMPLETED" | "ARCHIVED";

const STATUS_LABELS: Record<RequestStatus, string> = {
  NEW: "Nouveau",
  IN_PROGRESS: "En cours",
  COMPLETED: "Traité",
  ARCHIVED: "Archivé",
};

const STATUS_COLORS: Record<RequestStatus, string> = {
  NEW: "bg-blue-400/15 text-blue-300 border-blue-400/30",
  IN_PROGRESS: "bg-amber-400/15 text-amber-300 border-amber-400/30",
  COMPLETED: "bg-emerald-400/15 text-emerald-300 border-emerald-400/30",
  ARCHIVED: "bg-slate-400/15 text-slate-400 border-slate-400/30",
};

interface QuoteListItem {
  id: string;
  createdAt: string;
  status: RequestStatus;
  company: string;
  contactName: string;
  email: string;
  complexity: string;
  locale: string;
}

interface OrderListItem {
  id: string;
  createdAt: string;
  status: RequestStatus;
  company: string;
  contactName: string;
  email: string;
  appName: string;
  plan: string;
  locale: string;
}

interface QuoteDetail extends QuoteListItem {
  phone: string | null;
  projectSlugs: string[];
  customProject: boolean;
  sector: string;
  companySize: string;
  description: string;
  modules: string[];
  userCount: string;
  integrations: string[];
  needsMobile: boolean;
  needsMultiSite: boolean;
  existingSystems: string | null;
  timeline: string;
  specification: {
    project: string;
    needs: string;
    technical: string;
    planning: string;
  };
  adminNotes: string | null;
}

interface OrderDetail extends OrderListItem {
  phone: string | null;
  appSlug: string;
  notes: string | null;
  adminNotes: string | null;
}

function formatDate(iso: string) {
  return new Intl.DateTimeFormat("fr-FR", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(new Date(iso));
}

function matchesSearch(
  query: string,
  fields: (string | null | undefined)[]
): boolean {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  return fields.some((f) => f?.toLowerCase().includes(q));
}

function buildMailto(email: string, subject: string, body: string) {
  return `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

function StatusBadge({ status }: { status: RequestStatus }) {
  return (
    <span
      className={`inline-flex rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${STATUS_COLORS[status]}`}
    >
      {STATUS_LABELS[status]}
    </span>
  );
}

export function AdminDashboard() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const deepLinked = useRef(false);
  const [tab, setTab] = useState<"quotes" | "orders">("quotes");
  const [filter, setFilter] = useState<RequestStatus | "ALL">("ALL");
  const [search, setSearch] = useState("");
  const [quotes, setQuotes] = useState<QuoteListItem[]>([]);
  const [orders, setOrders] = useState<OrderListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedQuote, setSelectedQuote] = useState<QuoteDetail | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<OrderDetail | null>(null);
  const [notes, setNotes] = useState("");
  const [status, setStatus] = useState<RequestStatus>("NEW");
  const [saving, setSaving] = useState(false);

  const loadLists = useCallback(async () => {
    setLoading(true);
    const q = filter !== "ALL" ? `?status=${filter}` : "";
    const [quotesRes, ordersRes] = await Promise.all([
      fetch(`/api/admin/quotes${q}`),
      fetch(`/api/admin/orders${q}`),
    ]);

    if (quotesRes.status === 401 || ordersRes.status === 401) {
      router.push("/admin/login");
      return;
    }

    const quotesData = await quotesRes.json();
    const ordersData = await ordersRes.json();
    setQuotes(quotesData.quotes ?? []);
    setOrders(ordersData.orders ?? []);
    setLoading(false);
  }, [filter, router]);

  useEffect(() => {
    loadLists();
  }, [loadLists]);

  const visibleQuotes = useMemo(
    () =>
      quotes.filter((q) =>
        matchesSearch(search, [q.company, q.contactName, q.email, q.complexity])
      ),
    [quotes, search]
  );

  const visibleOrders = useMemo(
    () =>
      orders.filter((o) =>
        matchesSearch(search, [
          o.company,
          o.contactName,
          o.email,
          o.appName,
          o.plan,
        ])
      ),
    [orders, search]
  );

  const exportQuotesCsv = () => {
    downloadCsv(
      `tamrix-devis-${new Date().toISOString().slice(0, 10)}.csv`,
      ["Date", "Entreprise", "Contact", "Email", "Complexité", "Statut"],
      visibleQuotes.map((q) => [
        formatDate(q.createdAt),
        q.company,
        q.contactName,
        q.email,
        q.complexity,
        STATUS_LABELS[q.status],
      ])
    );
  };

  const exportOrdersCsv = () => {
    downloadCsv(
      `tamrix-commandes-${new Date().toISOString().slice(0, 10)}.csv`,
      ["Date", "Application", "Entreprise", "Contact", "Email", "Formule", "Statut"],
      visibleOrders.map((o) => [
        formatDate(o.createdAt),
        o.appName,
        o.company,
        o.contactName,
        o.email,
        o.plan,
        STATUS_LABELS[o.status],
      ])
    );
  };

  const openQuote = async (id: string) => {
    const res = await fetch(`/api/admin/quotes/${id}`);
    if (!res.ok) return;
    const data = await res.json();
    setSelectedOrder(null);
    setSelectedQuote(data.quote);
    setNotes(data.quote.adminNotes ?? "");
    setStatus(data.quote.status);
  };

  const openOrder = async (id: string) => {
    const res = await fetch(`/api/admin/orders/${id}`);
    if (!res.ok) return;
    const data = await res.json();
    setSelectedQuote(null);
    setSelectedOrder(data.order);
    setNotes(data.order.adminNotes ?? "");
    setStatus(data.order.status);
  };

  useEffect(() => {
    if (deepLinked.current || loading) return;
    const quoteId = searchParams.get("quote");
    const orderId = searchParams.get("order");
    if (quoteId) {
      deepLinked.current = true;
      setTab("quotes");
      void openQuote(quoteId);
    } else if (orderId) {
      deepLinked.current = true;
      setTab("orders");
      void openOrder(orderId);
    }
  }, [searchParams, loading]);

  const saveDetail = async () => {
    if (!selectedQuote && !selectedOrder) return;
    setSaving(true);

    const url = selectedQuote
      ? `/api/admin/quotes/${selectedQuote.id}`
      : `/api/admin/orders/${selectedOrder!.id}`;

    await fetch(url, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status, adminNotes: notes }),
    });

    setSaving(false);
    setSelectedQuote(null);
    setSelectedOrder(null);
    loadLists();
  };

  const logout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  const counts = {
    quotesNew: quotes.filter((q) => q.status === "NEW").length,
    ordersNew: orders.filter((o) => o.status === "NEW").length,
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-tamrix-text">Tableau de bord</h1>
          <p className="mt-1 text-sm text-tamrix-muted">
            {counts.quotesNew} devis et {counts.ordersNew} commandes en attente
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={tab === "quotes" ? exportQuotesCsv : exportOrdersCsv}
            className="btn-secondary px-3 py-2"
            title="Exporter CSV"
          >
            <Download className="h-4 w-4" />
            <span className="hidden sm:inline">CSV</span>
          </button>
          <button
            type="button"
            onClick={loadLists}
            className="btn-ghost px-3 py-2"
            aria-label="Actualiser"
          >
            <RefreshCw className="h-4 w-4" />
          </button>
          <Link href="/admin/security" className="btn-secondary inline-flex px-3 py-2 sm:px-4">
            <Shield className="h-4 w-4" />
            <span className="hidden sm:inline">Sécurité</span>
          </Link>
          <button type="button" onClick={logout} className="btn-secondary px-3 py-2 sm:px-4">
            <LogOut className="h-4 w-4" />
            <span className="hidden sm:inline">Déconnexion</span>
          </button>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {(
          [
            ["quotes", `Cahiers des charges (${quotes.length})`, FileText],
            ["orders", `Commandes (${orders.length})`, Package],
          ] as const
        ).map(([key, label, Icon]) => (
          <button
            key={key}
            type="button"
            onClick={() => setTab(key)}
            className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition ${
              tab === key
                ? "bg-brand-300 text-tamrix-bg"
                : "border border-tamrix-border text-tamrix-muted hover:text-brand-300"
            }`}
          >
            <Icon className="h-4 w-4" />
            {label}
          </button>
        ))}
      </div>

      <div className="relative mt-4 w-full max-w-md">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-tamrix-muted" />
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Rechercher entreprise, contact, e-mail…"
          className="input-field w-full pl-10"
        />
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {(["ALL", "NEW", "IN_PROGRESS", "COMPLETED", "ARCHIVED"] as const).map(
          (s) => (
            <button
              key={s}
              type="button"
              onClick={() => setFilter(s)}
              className={`rounded-full px-3 py-1 text-xs font-medium transition ${
                filter === s
                  ? "bg-brand-300/20 text-brand-300"
                  : "text-tamrix-muted hover:text-brand-300"
              }`}
            >
              {s === "ALL" ? "Tous" : STATUS_LABELS[s]}
            </button>
          )
        )}
      </div>

      <div className="card mt-6 overflow-hidden">
        {loading ? (
          <p className="p-8 text-center text-tamrix-muted">Chargement...</p>
        ) : tab === "quotes" ? (
          <>
            <div className="divide-y divide-tamrix-border md:hidden">
              {visibleQuotes.length === 0 ? (
                <p className="px-4 py-8 text-center text-tamrix-muted">
                  Aucune demande
                </p>
              ) : (
                visibleQuotes.map((q) => (
                  <button
                    key={q.id}
                    type="button"
                    onClick={() => openQuote(q.id)}
                    className="w-full px-4 py-4 text-left transition hover:bg-brand-300/5"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <p className="font-medium text-tamrix-text">{q.company}</p>
                      <StatusBadge status={q.status} />
                    </div>
                    <p className="mt-1 text-sm text-tamrix-muted">{q.contactName}</p>
                    <p className="mt-1 text-xs text-tamrix-muted">{q.email}</p>
                    <div className="mt-2 flex flex-wrap items-center gap-2 text-xs">
                      <span className="text-tamrix-muted">{formatDate(q.createdAt)}</span>
                      <span className="capitalize text-brand-300">{q.complexity}</span>
                    </div>
                  </button>
                ))
              )}
            </div>
            <div className="table-scroll hidden md:block">
              <table className="w-full text-left text-sm">
                <thead className="border-b border-tamrix-border bg-tamrix-elevated text-xs text-tamrix-muted">
                  <tr>
                    <th className="px-4 py-3">Date</th>
                    <th className="px-4 py-3">Entreprise</th>
                    <th className="px-4 py-3">Contact</th>
                    <th className="px-4 py-3">Complexité</th>
                    <th className="px-4 py-3">Statut</th>
                  </tr>
                </thead>
                <tbody>
                  {visibleQuotes.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-4 py-8 text-center text-tamrix-muted">
                        Aucune demande
                      </td>
                    </tr>
                  ) : (
                    visibleQuotes.map((q) => (
                      <tr
                        key={q.id}
                        onClick={() => openQuote(q.id)}
                        className="cursor-pointer border-b border-tamrix-border/50 transition hover:bg-brand-300/5"
                      >
                        <td className="px-4 py-3 text-tamrix-muted">
                          {formatDate(q.createdAt)}
                        </td>
                        <td className="px-4 py-3 font-medium">{q.company}</td>
                        <td className="px-4 py-3">
                          <p>{q.contactName}</p>
                          <p className="text-xs text-tamrix-muted">{q.email}</p>
                        </td>
                        <td className="px-4 py-3 capitalize text-brand-300">
                          {q.complexity}
                        </td>
                        <td className="px-4 py-3">
                          <StatusBadge status={q.status} />
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <>
            <div className="divide-y divide-tamrix-border md:hidden">
              {visibleOrders.length === 0 ? (
                <p className="px-4 py-8 text-center text-tamrix-muted">
                  Aucune commande
                </p>
              ) : (
                visibleOrders.map((o) => (
                  <button
                    key={o.id}
                    type="button"
                    onClick={() => openOrder(o.id)}
                    className="w-full px-4 py-4 text-left transition hover:bg-brand-300/5"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <p className="font-medium text-brand-300">{o.appName}</p>
                      <StatusBadge status={o.status} />
                    </div>
                    <p className="mt-1 text-sm text-tamrix-text">{o.company}</p>
                    <p className="mt-1 text-xs text-tamrix-muted">{o.contactName}</p>
                    <div className="mt-2 flex flex-wrap items-center gap-2 text-xs">
                      <span className="text-tamrix-muted">{formatDate(o.createdAt)}</span>
                      <span className="capitalize text-tamrix-muted">{o.plan}</span>
                    </div>
                  </button>
                ))
              )}
            </div>
            <div className="table-scroll hidden md:block">
              <table className="w-full text-left text-sm">
                <thead className="border-b border-tamrix-border bg-tamrix-elevated text-xs text-tamrix-muted">
                  <tr>
                    <th className="px-4 py-3">Date</th>
                    <th className="px-4 py-3">Application</th>
                    <th className="px-4 py-3">Entreprise</th>
                    <th className="px-4 py-3">Formule</th>
                    <th className="px-4 py-3">Statut</th>
                  </tr>
                </thead>
                <tbody>
                  {visibleOrders.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-4 py-8 text-center text-tamrix-muted">
                        Aucune commande
                      </td>
                    </tr>
                  ) : (
                    visibleOrders.map((o) => (
                      <tr
                        key={o.id}
                        onClick={() => openOrder(o.id)}
                        className="cursor-pointer border-b border-tamrix-border/50 transition hover:bg-brand-300/5"
                      >
                        <td className="px-4 py-3 text-tamrix-muted">
                          {formatDate(o.createdAt)}
                        </td>
                        <td className="px-4 py-3 font-medium text-brand-300">
                          {o.appName}
                        </td>
                        <td className="px-4 py-3">
                          <p>{o.company}</p>
                          <p className="text-xs text-tamrix-muted">{o.contactName}</p>
                        </td>
                        <td className="px-4 py-3 capitalize">{o.plan}</td>
                        <td className="px-4 py-3">
                          <StatusBadge status={o.status} />
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>

      {(selectedQuote || selectedOrder) && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 p-3 sm:items-center sm:p-4">
          <div className="card max-h-[92vh] w-full max-w-2xl overflow-y-auto p-4 shadow-glow-lg sm:max-h-[90vh] sm:p-6">
            <div className="flex items-start justify-between gap-3">
              <h2 className="min-w-0 flex-1 text-base font-bold text-tamrix-text sm:text-lg">
                {selectedQuote
                  ? `Devis — ${selectedQuote.company}`
                  : `Commande — ${selectedOrder!.appName}`}
              </h2>
              <button
                type="button"
                onClick={() => {
                  setSelectedQuote(null);
                  setSelectedOrder(null);
                }}
                className="text-tamrix-muted hover:text-brand-300"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-6 space-y-4 text-sm">
              {(selectedQuote || selectedOrder) && (
                <a
                  href={buildMailto(
                    selectedQuote?.email ?? selectedOrder!.email,
                    selectedQuote
                      ? `Tamrix — Votre devis (${selectedQuote.company})`
                      : `Tamrix — Votre commande (${selectedOrder!.appName})`,
                    selectedQuote
                      ? `Bonjour ${selectedQuote.contactName},\n\nMerci pour votre cahier des charges. `
                      : `Bonjour ${selectedOrder!.contactName},\n\nMerci pour votre commande. `
                  )}
                  className="btn-secondary inline-flex w-full justify-center sm:w-auto"
                >
                  <Mail className="h-4 w-4" />
                  Répondre au client
                </a>
              )}

              {selectedQuote && (
                <>
                  <DetailBlock title="Contact">
                    {selectedQuote.contactName} — {selectedQuote.email}
                    {selectedQuote.phone && ` — ${selectedQuote.phone}`}
                  </DetailBlock>
                  <DetailBlock title="Description">{selectedQuote.description}</DetailBlock>
                  <DetailBlock title="Modules">
                    {selectedQuote.modules.join(", ")}
                  </DetailBlock>
                  <DetailBlock title="Cahier des charges — Contexte">
                    <pre className="whitespace-pre-wrap font-sans text-tamrix-muted">
                      {selectedQuote.specification.project}
                    </pre>
                  </DetailBlock>
                  <DetailBlock title="Besoins">
                    <pre className="whitespace-pre-wrap font-sans text-tamrix-muted">
                      {selectedQuote.specification.needs}
                    </pre>
                  </DetailBlock>
                  <DetailBlock title="Technique">
                    <pre className="whitespace-pre-wrap font-sans text-tamrix-muted">
                      {selectedQuote.specification.technical}
                    </pre>
                  </DetailBlock>
                  <DetailBlock title="Planning">
                    <pre className="whitespace-pre-wrap font-sans text-tamrix-muted">
                      {selectedQuote.specification.planning}
                    </pre>
                  </DetailBlock>
                </>
              )}

              {selectedOrder && (
                <>
                  <DetailBlock title="Contact">
                    {selectedOrder.contactName} — {selectedOrder.email}
                    {selectedOrder.phone && ` — ${selectedOrder.phone}`}
                  </DetailBlock>
                  <DetailBlock title="Entreprise">{selectedOrder.company}</DetailBlock>
                  <DetailBlock title="Formule">{selectedOrder.plan}</DetailBlock>
                  {selectedOrder.notes && (
                    <DetailBlock title="Notes client">{selectedOrder.notes}</DetailBlock>
                  )}
                </>
              )}

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wide text-tamrix-muted">
                  Statut
                </label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as RequestStatus)}
                  className="input-field mt-1"
                >
                  {(Object.keys(STATUS_LABELS) as RequestStatus[]).map((s) => (
                    <option key={s} value={s}>
                      {STATUS_LABELS[s]}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wide text-tamrix-muted">
                  Notes internes
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={3}
                  className="input-field mt-1 resize-none"
                  placeholder="Suivi commercial, devis envoyé, rappel prévu..."
                />
              </div>
            </div>

            <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => {
                  setSelectedQuote(null);
                  setSelectedOrder(null);
                }}
                className="btn-ghost w-full sm:w-auto"
              >
                Annuler
              </button>
              <button
                type="button"
                onClick={saveDetail}
                disabled={saving}
                className="btn-primary w-full disabled:opacity-60 sm:w-auto"
              >
                {saving ? "Enregistrement..." : "Enregistrer"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function DetailBlock({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-lg border border-tamrix-border bg-tamrix-bg p-3">
      <p className="text-xs font-semibold uppercase tracking-wide text-brand-300">
        {title}
      </p>
      <div className="mt-1 text-tamrix-text">{children}</div>
    </div>
  );
}
