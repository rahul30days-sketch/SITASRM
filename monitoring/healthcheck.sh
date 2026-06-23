#!/bin/bash
set -euo pipefail

HEALTH_URL="${HEALTH_URL:-http://localhost:3000/api/health}"
ALERT_EMAIL="${ALERT_EMAIL:-admin@seri.net.in}"
MAX_RETRIES=3
RETRY_DELAY=10

check_health() {
  local attempt=1
  while [ $attempt -le $MAX_RETRIES ]; do
    HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" --max-time 10 "$HEALTH_URL" 2>/dev/null || echo "000")
    if [ "$HTTP_CODE" = "200" ]; then
      return 0
    fi
    echo "Attempt $attempt/$MAX_RETRIES failed (HTTP $HTTP_CODE). Retrying in ${RETRY_DELAY}s..."
    sleep $RETRY_DELAY
    attempt=$((attempt + 1))
  done
  return 1
}

echo "=== SERI Health Check ==="
echo "Checking: $HEALTH_URL"
echo "Time: $(date)"

if check_health; then
  echo "Status: HEALTHY"
  exit 0
else
  echo "Status: UNHEALTHY"
  echo "Attempting PM2 restart..."
  pm2 reload ecosystem.config.js --update-env 2>/dev/null || true

  sleep 15

  if check_health; then
    echo "Status: RECOVERED after restart"
    exit 0
  else
    echo "Status: CRITICAL - Service unresponsive after restart"
    if command -v mail &> /dev/null; then
      echo "SERI website is DOWN at $(date). Manual intervention required." | mail -s "ALERT: SERI Website Down" "$ALERT_EMAIL"
    fi
    exit 1
  fi
fi
