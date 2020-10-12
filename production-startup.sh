#!/bin/sh

# Remove mongo data directory
rm -rf ./.docker/mongodb/data

# Copy .env.prod into .env
cp ./.env.prod ./.env

# Down services
docker-compose down

# Remove containers and anonymous volumes
docker-compose rm -v --force

# Start containers as daemons
docker-compose -f docker-compose.prod.yml up -d --build