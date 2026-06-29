# Tamrix

Plateforme de commande d'applications métier avec aperçu interactif — FR / EN.

## Fonctionnalités

- **Catalogue** — 6 applications métier
- **Aperçu interactif** — Démo avant commande
- **Configurateur** — Cahier des charges + devis personnalisé
- **Base de données** — PostgreSQL sécurisé (Prisma)

## Démarrage rapide

### 1. Base de données (PostgreSQL)

```bash
# Copier et configurer les variables d'environnement
cp .env.example .env
# Éditer .env avec un mot de passe fort

# Lancer PostgreSQL en local (Docker)
docker compose up -d

# URL locale exemple dans .env :
# DATABASE_URL="postgresql://tamrix:VOTRE_MOT_DE_PASSE@localhost:5432/tamrix?schema=public"

# Créer les tables
npm run db:push
```

### 2. Application

```bash
npm install
npm run dev
```

- Français : [http://localhost:3000/fr](http://localhost:3000/fr)
- Configurateur : [http://localhost:3000/fr/configurateur](http://localhost:3000/fr/configurateur)

## Sécurité

- Accès BDD **uniquement côté serveur** (routes API `/api/quotes`, `/api/orders`)
- Validation des données avec **Zod**
- Requêtes paramétrées via **Prisma** (anti-injection SQL)
- **Rate limiting** sur les API (8 req/min/IP)
- `DATABASE_URL` dans `.env` — **jamais commité**
- Production : utiliser `sslmode=require` dans l'URL PostgreSQL

## Données stockées

| Table | Contenu |
|-------|---------|
| `quote_requests` | Cahiers des charges du configurateur |
| `order_requests` | Commandes depuis le formulaire |

Visualiser les données : `npm run db:studio`

## Panneau admin

URL : [http://localhost:3000/admin](http://localhost:3000/admin)

Configurez dans `.env` :

```
ADMIN_PASSWORD="votre-mot-de-passe-fort"
ADMIN_SECRET="cle-secrete-aleatoire-32-chars-min"
```

- Session sécurisée (cookie httpOnly, 8 h)
- Liste des cahiers des charges et commandes
- Détail complet + statut (Nouveau / En cours / Traité / Archivé)
- Notes internes par demande
- **E-mail automatique** à chaque nouveau devis ou commande (Resend)

### Notifications e-mail

À chaque soumission, **deux e-mails** partent (si Resend est configuré) :

1. **Admin** → `ADMIN_NOTIFICATION_EMAIL`
2. **Client** → l’adresse saisie dans le formulaire (accusé de réception FR/EN)

```env
ADMIN_NOTIFICATION_EMAIL="admin@votredomaine.com"
RESEND_API_KEY="re_..."
EMAIL_FROM="Tamrix <notifications@votredomaine.com>"
APP_URL="https://votredomaine.com"
```

Sans `RESEND_API_KEY`, les e-mails sont **affichés dans les logs** du serveur (utile en local).

Créez une clé API sur [resend.com](https://resend.com) et vérifiez le domaine utilisé dans `EMAIL_FROM`.

Après mise à jour du schéma :

```bash
npm run db:push
```

## Scripts

| Commande | Description |
|----------|-------------|
| `npm run dev` | Serveur de développement |
| `npm run db:push` | Synchroniser le schéma BDD (dev rapide) |
| `npm run db:migrate` | Migrations Prisma (recommandé en production) |
| `npm run db:studio` | Interface admin Prisma |
