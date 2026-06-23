# SERI Website Deployment Guide

## Prerequisites

- Ubuntu 22.04+ VPS (Hostinger or similar)
- Node.js 20.x
- MongoDB Atlas cluster
- Domain: seri.net.in pointed to VPS IP

## Quick Start

1. **Server Setup**
   ```bash
   bash scripts/setup-server.sh
   ```

2. **Clone & Configure**
   ```bash
   cd /var/www/seri
   git clone git@github.com:your-org/seri-website.git .
   cp .env.example .env
   # Edit .env with production values
   ```

3. **Build & Start**
   ```bash
   npm ci
   npm run build
   pm2 start ecosystem.config.js
   pm2 save
   ```

4. **SSL Certificate**
   ```bash
   sudo certbot --nginx -d seri.net.in -d www.seri.net.in
   ```

## Environment Variables

Required in `.env`:
- `DATABASE_URI` — MongoDB Atlas connection string
- `PAYLOAD_SECRET` — Random 32+ char secret for Payload CMS
- `NEXT_PUBLIC_SERVER_URL` — `https://seri.net.in`
- `REVALIDATION_SECRET` — Random token for ISR revalidation API

## Maintenance

- **Deploy updates**: `bash scripts/deploy.sh`
- **Backup**: `bash scripts/backup.sh` (add to cron: `0 2 * * * /var/www/seri/scripts/backup.sh`)
- **Health check**: `bash monitoring/healthcheck.sh` (add to cron: `*/5 * * * * /var/www/seri/monitoring/healthcheck.sh`)
- **View logs**: `pm2 logs seri-website`
- **Monitor**: `pm2 monit`

## CI/CD

GitHub Actions workflow at `.github/workflows/ci.yml`:
- Runs TypeScript check + ESLint on all pushes
- Builds on push to main/develop
- Auto-deploys to production on push to main
