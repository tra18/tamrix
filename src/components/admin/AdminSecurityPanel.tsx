"use client";

import { useCallback, useEffect, useState } from "react";
import { Shield, Users, LogOut } from "lucide-react";

type AdminUser = {
  id: string;
  email: string;
  name: string;
  role: string;
  active: boolean;
  mfaEnabled: boolean;
  createdAt: string;
};

type AdminSession = {
  id: string;
  createdAt: string;
  expiresAt: string;
  ip: string | null;
  userAgent: string | null;
  current: boolean;
};

export function AdminSecurityPanel() {
  const [me, setMe] = useState<{ email: string; name: string; role: string; mfaEnabled: boolean } | null>(null);
  const [sessions, setSessions] = useState<AdminSession[]>([]);
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [mfaSetup, setMfaSetup] = useState<{ secret: string; qrDataUrl: string } | null>(null);
  const [totpCode, setTotpCode] = useState("");
  const [disablePassword, setDisablePassword] = useState("");
  const [disableTotp, setDisableTotp] = useState("");
  const [newUser, setNewUser] = useState({ email: "", name: "", password: "", role: "ADMIN" });
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    const [meRes, sessionsRes, usersRes] = await Promise.all([
      fetch("/api/admin/me"),
      fetch("/api/admin/sessions"),
      fetch("/api/admin/users"),
    ]);
    if (meRes.ok) {
      const data = await meRes.json();
      setMe(data.user);
    }
    if (sessionsRes.ok) {
      const data = await sessionsRes.json();
      setSessions(data.sessions);
    }
    if (usersRes.ok) {
      const data = await usersRes.json();
      setUsers(data.users);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const startMfaSetup = async () => {
    setError(null);
    setMessage(null);
    const res = await fetch("/api/admin/mfa");
    if (!res.ok) {
      setError("Impossible de démarrer la configuration MFA.");
      return;
    }
    const data = await res.json();
    setMfaSetup({ secret: data.secret, qrDataUrl: data.qrDataUrl });
  };

  const enableMfa = async () => {
    if (!mfaSetup) return;
    const res = await fetch("/api/admin/mfa", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ secret: mfaSetup.secret, totpCode }),
    });
    if (!res.ok) {
      setError("Code MFA invalide.");
      return;
    }
    setMessage("MFA activé avec succès.");
    setMfaSetup(null);
    setTotpCode("");
    load();
  };

  const disableMfa = async () => {
    const res = await fetch("/api/admin/mfa", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password: disablePassword, totpCode: disableTotp }),
    });
    if (!res.ok) {
      setError("Impossible de désactiver le MFA.");
      return;
    }
    setMessage("MFA désactivé.");
    setDisablePassword("");
    setDisableTotp("");
    load();
  };

  const revokeSession = async (id: string) => {
    await fetch(`/api/admin/sessions?id=${encodeURIComponent(id)}`, { method: "DELETE" });
    load();
  };

  const createUser = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/admin/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser),
    });
    if (!res.ok) {
      setError("Création utilisateur impossible.");
      return;
    }
    setMessage("Utilisateur créé.");
    setNewUser({ email: "", name: "", password: "", role: "ADMIN" });
    load();
  };

  return (
    <div className="mx-auto max-w-4xl space-y-8 px-4 py-10">
      <div>
        <h1 className="text-2xl font-bold text-tamrix-text">Sécurité</h1>
        <p className="mt-1 text-sm text-tamrix-muted">
          MFA, sessions actives et gestion des comptes admin
        </p>
      </div>

      {message && (
        <p className="rounded-lg border border-emerald-400/30 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-400">
          {message}
        </p>
      )}
      {error && (
        <p className="rounded-lg border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm text-red-400">
          {error}
        </p>
      )}

      <section className="card space-y-4 p-6">
        <h2 className="flex items-center gap-2 font-bold text-tamrix-text">
          <Shield className="h-5 w-5 text-brand-300" />
          Authentification à deux facteurs (MFA)
        </h2>
        {me && (
          <p className="text-sm text-tamrix-muted">
            Statut : {me.mfaEnabled ? "Activé" : "Désactivé"}
          </p>
        )}
        {!me?.mfaEnabled && !mfaSetup && (
          <button type="button" onClick={startMfaSetup} className="btn-secondary">
            Activer le MFA
          </button>
        )}
        {mfaSetup && (
          <div className="space-y-4">
            <img src={mfaSetup.qrDataUrl} alt="QR code MFA" className="mx-auto h-48 w-48 rounded-lg bg-white p-2" />
            <p className="text-center font-mono text-xs text-tamrix-muted">{mfaSetup.secret}</p>
            <input
              value={totpCode}
              onChange={(e) => setTotpCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
              placeholder="Code à 6 chiffres"
              className="input-field max-w-xs"
            />
            <button type="button" onClick={enableMfa} className="btn-primary">
              Confirmer l&apos;activation
            </button>
          </div>
        )}
        {me?.mfaEnabled && (
          <div className="grid gap-3 sm:grid-cols-2">
            <input
              type="password"
              value={disablePassword}
              onChange={(e) => setDisablePassword(e.target.value)}
              placeholder="Mot de passe"
              className="input-field"
            />
            <input
              value={disableTotp}
              onChange={(e) => setDisableTotp(e.target.value.replace(/\D/g, "").slice(0, 6))}
              placeholder="Code MFA"
              className="input-field"
            />
            <button type="button" onClick={disableMfa} className="btn-secondary sm:col-span-2">
              Désactiver le MFA
            </button>
          </div>
        )}
      </section>

      <section className="card space-y-4 p-6">
        <h2 className="flex items-center gap-2 font-bold text-tamrix-text">
          <LogOut className="h-5 w-5 text-brand-300" />
          Sessions actives
        </h2>
        <ul className="space-y-2 text-sm">
          {sessions.map((s) => (
            <li
              key={s.id}
              className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-tamrix-border px-3 py-2"
            >
              <span className="text-tamrix-muted">
                {new Date(s.createdAt).toLocaleString("fr-FR")}
                {s.current && (
                  <span className="ml-2 text-brand-300">(session actuelle)</span>
                )}
                {s.ip && <span className="ml-2">· {s.ip}</span>}
              </span>
              {!s.current && (
                <button
                  type="button"
                  onClick={() => revokeSession(s.id)}
                  className="text-xs font-semibold text-red-400 hover:underline"
                >
                  Révoquer
                </button>
              )}
            </li>
          ))}
        </ul>
      </section>

      {me?.role === "SUPER_ADMIN" && (
        <section className="card space-y-4 p-6">
          <h2 className="flex items-center gap-2 font-bold text-tamrix-text">
            <Users className="h-5 w-5 text-brand-300" />
            Utilisateurs admin
          </h2>
          <ul className="space-y-2 text-sm">
            {users.map((u) => (
              <li
                key={u.id}
                className="rounded-lg border border-tamrix-border px-3 py-2 text-tamrix-muted"
              >
                <span className="font-medium text-tamrix-text">{u.name}</span> — {u.email}
                <span className="ml-2 text-xs">({u.role}{u.mfaEnabled ? ", MFA" : ""})</span>
              </li>
            ))}
          </ul>
          <form onSubmit={createUser} className="grid gap-3 sm:grid-cols-2">
            <input
              required
              type="email"
              value={newUser.email}
              onChange={(e) => setNewUser((p) => ({ ...p, email: e.target.value }))}
              placeholder="E-mail"
              className="input-field"
            />
            <input
              required
              value={newUser.name}
              onChange={(e) => setNewUser((p) => ({ ...p, name: e.target.value }))}
              placeholder="Nom"
              className="input-field"
            />
            <input
              required
              type="password"
              minLength={12}
              value={newUser.password}
              onChange={(e) => setNewUser((p) => ({ ...p, password: e.target.value }))}
              placeholder="Mot de passe (12+ car.)"
              className="input-field sm:col-span-2"
            />
            <select
              value={newUser.role}
              onChange={(e) => setNewUser((p) => ({ ...p, role: e.target.value }))}
              className="input-field"
            >
              <option value="ADMIN">Admin</option>
              <option value="SUPER_ADMIN">Super admin</option>
            </select>
            <button type="submit" className="btn-primary">
              Créer l&apos;utilisateur
            </button>
          </form>
        </section>
      )}
    </div>
  );
}
