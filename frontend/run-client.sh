#!/bin/bash

echo "=== Building Docker image for client..."
docker build --tag nba-comps-client . || exit 1
echo "=== Docker client image built."
echo "=== Running Docker client image..."
docker run --rm --name nba-comps-client -dp 3000:3000 -it nba-comps-client || exit 1
echo "=== Docker client image running on port 3000..."