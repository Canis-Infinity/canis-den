#!/usr/bin/env sh
set -eu

APP_NAME="${APP_NAME:-link_canis_world}"
APP_PORT="${APP_PORT:-7342}"
IMAGE_NAME="${IMAGE_NAME:-canis-den:latest}"
ENV_FILE="${ENV_FILE:-.env.production}"
APP_NETWORK_MODE="${APP_NETWORK_MODE:-host}"
NO_CACHE="${NO_CACHE:-1}"

if [ ! -f "$ENV_FILE" ]; then
  echo "Missing $ENV_FILE" >&2
  exit 1
fi

set -a
. "./$ENV_FILE"
set +a

BUILD_FLAGS="--network host"
if [ "$NO_CACHE" = "1" ]; then
  BUILD_FLAGS="$BUILD_FLAGS --no-cache"
fi

docker build \
  $BUILD_FLAGS \
  --build-arg "NEXT_PUBLIC_SITE_URL=${NEXT_PUBLIC_SITE_URL:-}" \
  --build-arg "NEXT_PUBLIC_API_BASE_URL=${NEXT_PUBLIC_API_BASE_URL:-http://localhost:7344}" \
  -t "$IMAGE_NAME" .

if command -v pm2 >/dev/null 2>&1 && pm2 describe "$APP_NAME" >/dev/null 2>&1; then
  pm2 stop "$APP_NAME" || true
  pm2 delete "$APP_NAME" || true
  pm2 save || true
fi

if docker ps -a --format '{{.Names}}' | grep -Fx "$APP_NAME" >/dev/null 2>&1; then
  docker rm -f "$APP_NAME"
fi

if [ "$APP_NETWORK_MODE" = "host" ]; then
  docker run -d \
    --name "$APP_NAME" \
    --restart unless-stopped \
    --network host \
    --env-file "$ENV_FILE" \
    -e NODE_ENV=production \
    -e HOSTNAME=0.0.0.0 \
    -e "PORT=$APP_PORT" \
    "$IMAGE_NAME"
else
  docker run -d \
    --name "$APP_NAME" \
    --restart unless-stopped \
    --env-file "$ENV_FILE" \
    -e NODE_ENV=production \
    -e HOSTNAME=0.0.0.0 \
    -e "PORT=$APP_PORT" \
    -p "$APP_PORT:$APP_PORT" \
    "$IMAGE_NAME"
fi

docker ps --filter "name=$APP_NAME"
