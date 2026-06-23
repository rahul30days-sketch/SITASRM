#!/bin/bash
set -euo pipefail

APP_DIR="/var/www/seri"
REPO_URL="git@github.com:your-org/seri-website.git"
BRANCH="main"

echo "=== SERI Deployment Script ==="
echo "Started at: $(date)"

cd "$APP_DIR"

echo ">> Pulling latest changes..."
git fetch origin "$BRANCH"
git reset --hard "origin/$BRANCH"

echo ">> Installing dependencies..."
npm ci --production=false

echo ">> Building application..."
npm run build

echo ">> Creating logs directory..."
mkdir -p logs

echo ">> Restarting PM2..."
pm2 reload ecosystem.config.js --update-env

echo ">> Saving PM2 process list..."
pm2 save

echo "=== Deployment completed at: $(date) ==="
