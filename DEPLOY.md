# Guide de déploiement — Tamrix (tests)

Stack recommandée : **Vercel** (app Next.js) + **Neon** (PostgreSQL gratuit).

**Hébergement Infomaniak (VPS, sans Vercel)** : voir [DEPLOY-INFOMANIAK.md](./DEPLOY-INFOMANIAK.md).

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
| `ADMIN_EMAIL` | `admin@tmrix.com` | E-mail du premier compte super-admin (créé auto si table vide) |
| `ADMIN_PASSWORD` | `openssl rand -base64 32` | Mot de passe admin (≥ 16 car.) |
| `ADMIN_SECRET` | `openssl rand -base64 32` | Secret JWT sessions (≥ 32 car., différent du mot de passe) |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Clé site Cloudflare Turnstile | Captcha formulaires publics + login admin |
| `TURNSTILE_SECRET_KEY` | Clé secrète Turnstile | Vérification serveur du captcha |
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

## 6. Domaine personnalisé — `tmrix.com`

Le code est déjà compatible : il suffit de configurer **Vercel** + **DNS** + la variable `APP_URL`.

### 6.1 Ajouter le domaine sur Vercel

1. [vercel.com](https://vercel.com) → projet **tamrix** → **Settings** → **Domains**
2. Ajoutez :
   - `tmrix.com` (domaine principal)
   - `www.tmrix.com` (optionnel, redirection vers le principal)
3. Vercel affiche les enregistrements DNS à créer chez votre registrar (OVH, Cloudflare, Gandi, etc.)

### 6.2 DNS chez le registrar

Enregistrements typiques (valeurs exactes affichées par Vercel — à copier depuis le dashboard) :

| Type | Nom | Valeur |
|------|-----|--------|
| **A** | `@` | `76.76.21.21` |
| **CNAME** | `www` | `cname.vercel-dns.com` |

Sur **Cloudflare** : proxy orange désactivé (DNS only) le temps de la validation SSL, puis vous pouvez le réactiver.

La propagation DNS peut prendre **quelques minutes à 48 h** (souvent &lt; 1 h).

### 6.3 Mettre à jour les variables d’environnement

Dans Vercel → **Settings** → **Environment Variables** :

| Variable | Nouvelle valeur |
|----------|-----------------|
| `APP_URL` | `https://tmrix.com` |

Puis **Deployments** → dernier déploiement → **⋯** → **Redeploy** (sans rebuild cache optionnel).

`APP_URL` sert aux liens dans les e-mails admin, sitemap, Open Graph et JSON-LD.

### 6.4 E-mails avec votre domaine (Resend)

Pour envoyer depuis `notifications@tmrix.com` (au lieu de `onboarding@resend.dev`) :

1. [resend.com](https://resend.com) → **Domains** → **Add** `tmrix.com`
2. Ajoutez les enregistrements **SPF / DKIM** indiqués par Resend chez votre registrar
3. Sur Vercel, mettez à jour :
   - `EMAIL_FROM` = `Tamrix <notifications@tmrix.com>`
4. Redeploy

Les e-mails de test fonctionnent sans ça ; la prod avec votre marque nécessite cette étape.

### 6.5 Vérifications après mise en ligne

- [ ] `https://tmrix.com` → redirige vers `/fr` ou `/en`
- [ ] `https://www.tmrix.com` → même comportement (ou redirection vers le domaine principal)
- [ ] `https://tmrix.com/fr/configurateur` — formulaire OK
- [ ] `https://tmrix.com/admin/login` — admin OK
- [ ] E-mail devis → lien admin pointe vers `https://tmrix.com/admin?...`
- [ ] `https://tmrix.com/sitemap.xml` — URLs en `tmrix.com`

### 6.6 HTTPS (SSL) — Vercel + Infomaniak

Sur **Vercel**, le certificat SSL (Let’s Encrypt) est **automatique** une fois le domaine validé. Aucun Certbot ni Nginx à gérer côté Infomaniak pour l’hébergement Vercel.

#### DNS Infomaniak (zone `tmrix.com`)

Copiez les valeurs **exactes** affichées dans Vercel → **Settings** → **Domains** (elles peuvent différer légèrement par projet) :

| Type | Nom | Valeur typique |
|------|-----|----------------|
| **A** | `@` | `76.76.21.21` |
| **CNAME** | `www` | `xxxx.vercel-dns-017.com` (projet-spécifique) |

Ne pas utiliser l’ancien CNAME générique `cname.vercel-dns.com` si Vercel affiche une cible projet-spécifique.

#### Vercel — domaines à ajouter

1. [vercel.com](https://vercel.com) → projet **tamrix** → **Settings** → **Domains**
2. Ajoutez **les deux** :
   - `tmrix.com`
   - `www.tmrix.com`
3. Attendez le statut **Valid** (coche verte) pour **chaque** domaine.
4. Choisissez le **domaine principal** (ex. `tmrix.com`) : l’autre redirigera automatiquement en HTTPS.

#### Variable `APP_URL`

Une fois HTTPS actif sur le domaine principal :

| Variable | Valeur |
|----------|--------|
| `APP_URL` | `https://tmrix.com` *(ou `https://www.tmrix.com` si vous gardez www comme principal)* |

Puis **Redeploy** le projet.

#### Vérifier HTTPS depuis un terminal

```bash
curl -sI http://tmrix.com | grep -i location
curl -sI https://tmrix.com | head -5
curl -sI https://www.tmrix.com | head -5
```

Attendu :
- `http://` → redirection **308** vers `https://`
- `https://` → **200** ou **307** vers `/fr`, **sans** erreur certificat

#### Problème courant : certificat valide seulement sur `www`

Symptôme : `https://www.tmrix.com` OK, mais `https://tmrix.com` affiche « connexion non privée » / certificat émis pour `www.tmrix.com` uniquement.

**Correctif :**

1. Vercel → **Domains** → vérifier que `tmrix.com` (sans www) est bien listé et **Valid**
2. Si statut **Invalid** ou **Pending** : vérifier l’enregistrement **A** `@` → `76.76.21.21` chez Infomaniak
3. Supprimer `tmrix.com` du projet Vercel, attendre 1 min, le **ré-ajouter** → Vercel regénère le certificat
4. Propagation DNS : jusqu’à 1 h (parfois instantané)

#### Redirection HTTP → HTTPS

Gérée **automatiquement** par Vercel (réponse **308**). Rien à coder dans le projet.

---

## 7. Checklist de test

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
| Domaine invalide / SSL | DNS propagé ? Enregistrements Vercel exacts ? Voir § 6.6 |
| Certificat OK sur www seulement | Ajouter / valider `tmrix.com` dans Vercel Domains (§ 6.6) |
| Formulaires 429 en prod | Configurer **Upstash Redis** (`UPSTASH_REDIS_REST_*`) sur Vercel |
| Build prod échoue au démarrage | `ADMIN_PASSWORD` ≥ 16 car. et `ADMIN_SECRET` ≥ 32 car. (pas les placeholders) |

---

## 8. Sécurité (résumé)

- **Rate limiting** : Upstash Redis **obligatoire en production**.
- **Captcha** : Cloudflare Turnstile sur configurateur, commandes et login admin.
- **Admin** : comptes multi-utilisateurs en base, sessions révocables, MFA TOTP (Google Authenticator).
- **Premier compte** : `ADMIN_EMAIL` + `ADMIN_PASSWORD` créent le super-admin au premier démarrage.
- **Panneau sécurité** : `/admin/security` — activer MFA, révoquer sessions, créer des admins (super-admin).
- **En-têtes HTTP** : CSP, HSTS, X-Frame-Options, etc.

### Turnstile (Cloudflare)

1. [dash.cloudflare.com](https://dash.cloudflare.com) → **Turnstile** → **Add site**
2. Domaine : `tmrix.com` / `www.tmrix.com`
3. Copier **Site Key** → `NEXT_PUBLIC_TURNSTILE_SITE_KEY`
4. Copier **Secret Key** → `TURNSTILE_SECRET_KEY`

---

## Test local production

```bash
docker compose up -d
npm run db:migrate
npm run build
npm start
```

Voir [.env.example](./.env.example) pour toutes les variables.
