#!/bin/bash
set -euo pipefail

echo "=== SERI Server Setup Script ==="
echo "This script sets up a fresh Ubuntu/Debian server for SERI deployment."

echo ">> Updating system packages..."
sudo apt update && sudo apt upgrade -y

echo ">> Installing Node.js 20.x..."
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

echo ">> Installing PM2 globally..."
sudo npm install -g pm2

echo ">> Installing Nginx..."
sudo apt install -y nginx

echo ">> Installing Certbot for SSL..."
sudo apt install -y certbot python3-certbot-nginx

echo ">> Creating application directory..."
sudo mkdir -p /var/www/seri
sudo chown "$USER":"$USER" /var/www/seri

echo ">> Setting up Nginx config..."
sudo cp nginx/seri.conf /etc/nginx/sites-available/seri.conf
sudo ln -sf /etc/nginx/sites-available/seri.conf /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t && sudo systemctl reload nginx

echo ">> Obtaining SSL certificate..."
echo "Run: sudo certbot --nginx -d seri.net.in -d www.seri.net.in"

echo ">> Setting up PM2 startup..."
pm2 startup
echo "After starting the app, run: pm2 save"

echo ">> Setting up log rotation..."
pm2 install pm2-logrotate
pm2 set pm2-logrotate:max_size 10M
pm2 set pm2-logrotate:retain 7

echo ">> Setting up firewall..."
sudo ufw allow OpenSSH
sudo ufw allow 'Nginx Full'
sudo ufw --force enable

echo "=== Server setup complete ==="
echo "Next steps:"
echo "1. Clone the repository to /var/www/seri"
echo "2. Copy .env file with production values"
echo "3. Run: npm ci && npm run build"
echo "4. Run: pm2 start ecosystem.config.js"
echo "5. Run: pm2 save"
