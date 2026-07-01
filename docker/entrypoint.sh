#!/bin/sh
set -e

cd /app

echo "Running database migrations..."
./node_modules/.bin/prisma migrate deploy

echo "Starting Tamrix..."
exec su-exec nextjs node server.js
