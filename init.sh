#!/bin/bash
docker-compose build --no-cache
docker compose up -d
aws dynamodb create-table \
    --endpoint-url http://localhost:8000 \
    --table-name Forests \
    --attribute-definitions \
        AttributeName=id,AttributeType=S \
    --key-schema \
        AttributeName=id,KeyType=HASH \
--provisioned-throughput \
        ReadCapacityUnits=10,WriteCapacityUnits=10

aws dynamodb batch-write-item --request-items file://Forest.json --endpoint-url http://localhost:8000

# yarn install
# node utils/seed.js