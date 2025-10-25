#!/bin/bash

# MGNREGA Karnataka Tracker - Deployment Script
# Build For Bharat Fellowship 2026

set -e

echo "🚀 Starting deployment..."

# Colors
GREEN='\033[0;32m'
NC='\033[0m' # No Color

# Backend deployment
echo "📦 Installing backend dependencies..."
cd backend
npm install --production

echo "🔄 Restarting backend service..."
pm2 restart mgnrega-karnataka-api || pm2 start ../deployment/ecosystem.config.js

# Nginx
echo "♻️  Restarting Nginx..."
sudo systemctl restart nginx

echo "${GREEN}✅ Deployment complete!${NC}"
echo "🌐 Application is now running"
echo "📊 Monitor logs: pm2 logs mgnrega-karnataka-api"
