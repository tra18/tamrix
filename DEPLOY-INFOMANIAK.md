# Déploiement Tamrix sur Infomaniak (VPS)

Hébergement **sans Vercel** : serveur cloud Infomaniak + Docker + domaine `tmrix.com`.

Durée estimée : **45–60 minutes** (première fois).

---

## Architecture

```
Navigateur → tmrix.com (DNS Infomaniak)
          → VPS Infomaniak (Nginx + HTTPS)
          → Docker : app Next.js (port 3000)
          → Docker : PostgreSQL
          → Resend (e-mails)
```

---

## 1. Commander un serveur Infomaniak

1. [Manager Infomaniak](https://manager.infomaniak.com) → **Serveur Cloud** (ou **VPS / Cloud Server**)
2. Choix recommandé pour Tamrix :
   - **Ubuntu 24.04 LTS**
   - **2 vCPU / 4 Go RAM** minimum (1 vCPU / 2 Go possible pour tests légers)
3. Notez l’**adresse IP publique** du serveur (ex. `185.x.x.x`)

---

## 2. DNS Infomaniak → votre VPS

**Domaine** → `tmrix.com` → **Zone DNS** :

| Type | Nom | Valeur |
|------|-----|--------|
| **A** | `@` (racine) | IP du VPS |
| **A** | `www` | IP du VPS |

*(Ou CNAME `www` → `tmrix.com` si vous préférez.)*

Supprimez les anciens enregistrements **A** qui pointaient vers l’hébergement web Infomaniak.

Propagation : quelques minutes à 2 h.

---

## 3. Préparer le serveur (SSH)

Connectez-vous :

```bash
ssh root@IP_DU_VPS
```

Installez Docker :

```bash
apt update && apt upgrade -y
apt install -y git nginx certbot python3-certbot-nginx ufw

curl -fsSL https://get.docker.com | sh
systemctl enable docker
```

Pare-feu :

```bash
ufw allow OpenSSH
ufw allow 'Nginx Full'
ufw enable
```

---

## 4. Déployer l’application

```bash
cd /opt
git clone https://github.com/tra18/tamrix.git
cd tamrix
```

Créez le fichier `.env` :

```bash
cp .env.example .env
nano .env
```

Variables **obligatoires** en production :

```env
POSTGRES_PASSWORD="mot-de-passe-postgres-tres-long"

ADMIN_PASSWORD="votre-mot-de-passe-admin"
ADMIN_SECRET="openssl rand -base64 32"
ADMIN_NOTIFICATION_EMAIL="vous@example.com"

RESEND_API_KEY="re_..."
EMAIL_FROM="Tamrix <notifications@tmrix.com>"

APP_URL="https://tmrix.com"
```

> `DATABASE_URL` est défini automatiquement par `docker-compose.prod.yml` (connexion au conteneur `db`).

Lancez l’app :

```bash
docker compose -f docker-compose.prod.yml up -d --build
```

Vérifiez les logs :

```bash
docker compose -f docker-compose.prod.yml logs -f app
```

Test local sur le serveur :

```bash
curl -I http://127.0.0.1:3000/fr
```

---

## 5. Nginx + HTTPS (Let’s Encrypt)

```bash
cp /opt/tamrix/deploy/nginx/tmrix.com.conf /etc/nginx/sites-available/tmrix.com
ln -s /etc/nginx/sites-available/tmrix.com /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default
nginx -t && systemctl reload nginx
```

Certificat SSL gratuit :

```bash
certbot --nginx -d tmrix.com -d www.tmrix.com
```

Choisissez la redirection **www → tmrix.com** (ou l’inverse) quand Certbot le propose.

Mettez à jour `APP_URL` si besoin, puis redémarrez l’app :

```bash
cd /opt/tamrix
docker compose -f docker-compose.prod.yml up -d
```

---

## 6. E-mails (Resend + Infomaniak DNS)

1. [resend.com](https://resend.com) → **Domains** → ajoutez `tmrix.com`
2. Copiez les enregistrements **SPF / DKIM** dans la **Zone DNS Infomaniak**
3. `EMAIL_FROM="Tamrix <notifications@tmrix.com>"` dans `.env`
4. Redémarrez : `docker compose -f docker-compose.prod.yml up -d`

---

## 7. Checklist

- [ ] `https://tmrix.com/fr` — accueil
- [ ] `https://tmrix.com/fr/configurateur` — envoi devis
- [ ] `https://tmrix.com/admin/login` — admin
- [ ] E-mail admin + client reçus
- [ ] Footer : `contact@tmrix.com`

---

## Mises à jour (après un `git push`)

Sur le VPS :

```bash
cd /opt/tamrix
git pull
docker compose -f docker-compose.prod.yml up -d --build
```

---

## Dépannage

| Problème | Solution |
|----------|----------|
| Site inaccessible | `docker ps`, logs app, `ufw status`, DNS propagé ? |
| Erreur base de données | `docker compose -f docker-compose.prod.yml logs db` |
| 502 Bad Gateway | L’app tourne ? `curl http://127.0.0.1:3000/fr` |
| Migrations | `docker compose -f docker-compose.prod.yml exec app ./node_modules/.bin/prisma migrate deploy` |
| Manque de RAM au build | `docker system prune` ou augmenter la taille du VPS |

---

## Sauvegardes PostgreSQL

Sauvegarde manuelle :

```bash
docker compose -f docker-compose.prod.yml exec db \
  pg_dump -U tamrix tamrix > backup-$(date +%F).sql
```

Planifiez une sauvegarde quotidienne (cron Infomaniak ou `crontab -e` sur le VPS).

---

## Alternative : garder Neon pour la BDD

Si vous préférez **Neon** au lieu du Postgres Docker :

1. Retirez le service `db` de `docker-compose.prod.yml`
2. Mettez `DATABASE_URL` Neon dans `.env`
3. Lancez uniquement le service `app`

Utile si vous voulez des sauvegardes gérées sans admin DB sur le VPS.
