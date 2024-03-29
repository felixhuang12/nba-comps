#!/bin/bash

echo "=== Building Docker image for server..."
docker build --tag nba-comps-server . || exit 1
echo "=== Docker server image built."
echo "=== Running Docker server image..."
docker run --rm --name nba-comps-server -dp 5001:5001 -it nba-comps-server || exit 1
echo "=== Docker server image running on port 5001..."