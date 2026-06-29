"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock } from "lucide-react";

export function AdminLoginForm() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (password.length < 8) {
      setError("Le mot de passe doit contenir au moins 8 caractères.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as {
          error?: string;
        } | null;

        if (res.status === 429) {
          setError("Trop de tentatives. Réessayez dans une minute.");
        } else if (res.status === 503 || data?.error === "Admin not configured") {
          setError(
            "Accès admin non configuré. Vérifiez ADMIN_PASSWORD et ADMIN_SECRET dans .env, puis redémarrez npm run dev."
          );
        } else if (res.status === 401) {
          setError(
            "Mot de passe incorrect. Utilisez la valeur ADMIN_PASSWORD de votre fichier .env."
          );
        } else if (data?.error === "Invalid request data") {
          setError("Le mot de passe doit contenir au moins 8 caractères.");
        } else {
          setError("Connexion impossible. Réessayez ou redémarrez le serveur.");
        }
        return;
      }

      router.push("/admin");
      router.refresh();
    } catch {
      setError("Erreur de connexion.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-4 py-12">
      <div className="card p-8">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl border border-brand-300/30 bg-brand-300/10 text-brand-300">
          <Lock className="h-6 w-6" />
        </div>
        <h1 className="mt-6 text-center text-xl font-bold text-tamrix-text">
          Connexion administrateur
        </h1>
        <p className="mt-2 text-center text-sm text-tamrix-muted">
          Accès réservé à l&apos;équipe Tamrix
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <div>
            <label htmlFor="password" className="block text-sm text-tamrix-muted">
              Mot de passe
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              className="input-field mt-1"
            />
          </div>

          {error && (
            <p className="rounded-lg border border-red-400/30 bg-red-400/10 px-3 py-2 text-sm text-red-400">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full py-3 disabled:opacity-60"
          >
            {loading ? "Connexion..." : "Se connecter"}
          </button>
        </form>
      </div>
    </div>
  );
}
