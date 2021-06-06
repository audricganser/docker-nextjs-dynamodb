#!/bin/bash
docker-compose build --no-cache
docker compose up -d
yarn install
node utils/seed.js