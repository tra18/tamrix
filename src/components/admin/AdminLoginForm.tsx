"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, Shield } from "lucide-react";
import { TurnstileWidget } from "@/components/TurnstileWidget";

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY?.trim() ?? "";

export function AdminLoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [totpCode, setTotpCode] = useState("");
  const [requiresMfa, setRequiresMfa] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState("");
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

    if (TURNSTILE_SITE_KEY && !turnstileToken) {
      setError("Veuillez valider le captcha.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
          totpCode: requiresMfa ? totpCode : undefined,
          turnstileToken,
        }),
      });

      const data = (await res.json().catch(() => null)) as {
        error?: string;
        requiresMfa?: boolean;
      } | null;

      if (res.status === 401 && data?.requiresMfa) {
        setRequiresMfa(true);
        setError(null);
        return;
      }

      if (!res.ok) {
        if (res.status === 429) {
          setError("Trop de tentatives. Réessayez dans une minute.");
        } else if (res.status === 400 && data?.error === "Captcha verification failed") {
          setError("Validation captcha échouée. Réessayez.");
          setTurnstileToken("");
        } else if (res.status === 401 && data?.error === "Invalid MFA code") {
          setError("Code MFA incorrect.");
        } else if (res.status === 503) {
          setError("Connexion temporairement indisponible.");
        } else if (res.status === 401) {
          setError("Identifiants incorrects.");
        } else {
          setError("Connexion impossible. Réessayez.");
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
            <label htmlFor="email" className="block text-sm text-tamrix-muted">
              E-mail
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              className="input-field mt-1"
            />
          </div>
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

          {requiresMfa && (
            <div>
              <label htmlFor="totp" className="flex items-center gap-2 text-sm text-tamrix-muted">
                <Shield className="h-4 w-4 text-brand-300" />
                Code MFA (6 chiffres)
              </label>
              <input
                id="totp"
                type="text"
                inputMode="numeric"
                pattern="\d{6}"
                maxLength={6}
                value={totpCode}
                onChange={(e) => setTotpCode(e.target.value.replace(/\D/g, ""))}
                required
                autoComplete="one-time-code"
                className="input-field mt-1 font-mono tracking-widest"
              />
            </div>
          )}

          {TURNSTILE_SITE_KEY && (
            <TurnstileWidget
              siteKey={TURNSTILE_SITE_KEY}
              onToken={setTurnstileToken}
              onExpire={() => setTurnstileToken("")}
            />
          )}

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
            {loading ? "Connexion..." : requiresMfa ? "Vérifier le code MFA" : "Se connecter"}
          </button>
        </form>
      </div>
    </div>
  );
}
