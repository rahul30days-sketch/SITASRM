#!/bin/bash
set -euo pipefail

BACKUP_DIR="/var/backups/seri"
DATE=$(date +%Y-%m-%d_%H-%M-%S)
BACKUP_PATH="$BACKUP_DIR/$DATE"
RETENTION_DAYS=30

echo "=== SERI Backup Script ==="
echo "Started at: $(date)"

mkdir -p "$BACKUP_PATH"

echo ">> Backing up MongoDB..."
if [ -n "${DATABASE_URI:-}" ]; then
  mongodump --uri="$DATABASE_URI" --out="$BACKUP_PATH/mongodb" --gzip
  echo "MongoDB backup completed."
else
  echo "WARNING: DATABASE_URI not set. Skipping database backup."
fi

echo ">> Backing up media uploads..."
if [ -d "/var/www/seri/media" ]; then
  tar -czf "$BACKUP_PATH/media.tar.gz" -C /var/www/seri media/
  echo "Media backup completed."
fi

echo ">> Backing up .env file..."
if [ -f "/var/www/seri/.env" ]; then
  cp /var/www/seri/.env "$BACKUP_PATH/env.backup"
  echo ".env backup completed."
fi

echo ">> Cleaning old backups (older than $RETENTION_DAYS days)..."
find "$BACKUP_DIR" -maxdepth 1 -type d -mtime +$RETENTION_DAYS -exec rm -rf {} +

echo ">> Backup size:"
du -sh "$BACKUP_PATH"

echo "=== Backup completed at: $(date) ==="
