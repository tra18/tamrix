# Guide de déploiement — Tamrix (tests)

Stack recommandée : **Vercel** (app Next.js) + **Neon** (PostgreSQL gratuit).

Durée estimée : 20–30 minutes.

---

## 1. Base de données PostgreSQL (Neon)

1. Créez un compte sur [neon.tech](https://neon.tech)
2. **New project** → région proche (ex. Europe)
3. Copiez la **connection string** (mode *Pooled* recommandé pour Vercel)
4. Ajoutez `?sslmode=require` si absent

```
postgresql://USER:PASSWORD@ep-xxx.eu-central-1.aws.neon.tech/neondb?sslmode=require
```

5. En local, appliquez les migrations une fois :

```bash
DATABASE_URL="postgresql://..." npm run db:migrate
```

---

## 2. E-mails (optionnel mais conseillé pour les tests)

1. Compte [resend.com](https://resend.com)
2. Créez une **API Key**
3. Tests rapides : `EMAIL_FROM="Tamrix <onboarding@resend.dev>"`
4. Production : vérifiez votre domaine dans Resend

---

## 3. Pousser le code sur GitHub

```bash
cd /chemin/vers/Tamrix
git init
git add .
git commit -m "Préparation déploiement Tamrix"
```

Créez un dépôt vide sur GitHub, puis :

```bash
git remote add origin https://github.com/VOTRE_USER/tamrix.git
git branch -M main
git push -u origin main
```

---

## 4. Déployer sur Vercel

1. [vercel.com](https://vercel.com) → **Add New Project**
2. Importez le dépôt GitHub `tamrix`
3. Framework : **Next.js** (détecté automatiquement)
4. **Environment Variables** :

| Variable | Exemple / note |
|----------|----------------|
| `DATABASE_URL` | URL Neon avec `sslmode=require` |
| `ADMIN_PASSWORD` | Mot de passe fort (min. 8 car.) |
| `ADMIN_SECRET` | `openssl rand -base64 32` |
| `ADMIN_NOTIFICATION_EMAIL` | Votre e-mail pour les alertes |
| `RESEND_API_KEY` | `re_...` |
| `EMAIL_FROM` | `Tamrix <onboarding@resend.dev>` |
| `APP_URL` | `https://votre-projet.vercel.app` |

5. **Deploy**

Le script `vercel-build` exécute `prisma migrate deploy` puis `next build`.

---

## 5. Après le premier déploiement

1. Copiez l’URL Vercel (ex. `https://tamrix-xxx.vercel.app`)
2. Mettez à jour `APP_URL` → **Redeploy**
3. Testez :
   - `/fr` — accueil
   - `/fr/configurateur` — devis
   - `/admin/login` — admin

---

## 6. Checklist de test

- [ ] Accueil FR / EN
- [ ] Configurateur → BDD + e-mails
- [ ] Commande catalogue
- [ ] Admin + liens e-mail (`?quote=` / `?order=`)

---

## Dépannage

| Problème | Solution |
|----------|----------|
| Build Prisma | `DATABASE_URL` + SSL Neon |
| Pas d’e-mails | Logs Vercel ou config Resend |
| Admin refusé | `ADMIN_PASSWORD` + Redeploy |

---

## Test local production

```bash
docker compose up -d
npm run db:migrate
npm run build
npm start
```

Voir [.env.example](./.env.example) pour toutes les variables.
