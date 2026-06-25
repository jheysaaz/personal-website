#!/bin/bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

echo "=== Spotify Refresh Token Generator ==="
echo ""

# Read credentials
read -r -p "SPOTIFY_CLIENT_ID (leave blank to use env): " CLIENT_ID
CLIENT_ID="${CLIENT_ID:-${SPOTIFY_CLIENT_ID:-}}"
if [ -z "$CLIENT_ID" ]; then
  echo "Error: SPOTIFY_CLIENT_ID is required" >&2
  exit 1
fi

read -rs -p "SPOTIFY_CLIENT_SECRET (leave blank to use env): " CLIENT_SECRET
echo ""
CLIENT_SECRET="${CLIENT_SECRET:-${SPOTIFY_CLIENT_SECRET:-}}"
if [ -z "$CLIENT_SECRET" ]; then
  echo "Error: SPOTIFY_CLIENT_SECRET is required" >&2
  exit 1
fi

read -r -p "Redirect URI registered in Spotify App Dashboard (default: http://localhost:8888/callback): " REDIRECT_URI
REDIRECT_URI="${REDIRECT_URI:-http://localhost:8888/callback}"

echo ""
echo "1. Open this URL in your browser and authorize:"
echo ""
AUTH_URL="https://accounts.spotify.com/authorize?$(printf '%s' \
  'response_type=code' \
  "&client_id=$CLIENT_ID" \
  '&scope=user-top-read' \
  "&redirect_uri=$REDIRECT_URI" \
)"
echo "  $AUTH_URL"
echo ""
echo "2. After authorizing, your browser will redirect to a URL like:"
echo "   $REDIRECT_URI?code=..."
echo "   Copy that ENTIRE redirect URL from the address bar and paste it below."
echo ""

read -r -p "Paste the full redirect URL here: " CALLBACK_URL
echo ""

AUTH_CODE=$(echo "$CALLBACK_URL" | node -e "
const url = process.argv[1];
const code = new URL(url).searchParams.get('code');
if (!code) {
  console.error('Error: no code parameter found in URL');
  process.exit(1);
}
console.log(code);
" -- "$CALLBACK_URL")

echo "3. Exchanging authorization code for tokens..."
echo ""

RESPONSE=$(curl -s -X POST https://accounts.spotify.com/api/token \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "$(printf 'grant_type=authorization_code&code=%s&redirect_uri=%s&client_id=%s&client_secret=%s' \
    "$AUTH_CODE" "$REDIRECT_URI" "$CLIENT_ID" "$CLIENT_SECRET")")

REFRESH_TOKEN=$(echo "$RESPONSE" | node -e "
try {
  const data = JSON.parse(require('fs').readFileSync('/dev/stdin','utf8'));
  if (data.refresh_token) {
    console.log(data.refresh_token);
  } else {
    console.error('No refresh_token in response:', JSON.stringify(data, null, 2));
    process.exit(1);
  }
} catch(e) {
  console.error('Failed to parse response:', require('fs').readFileSync('/dev/stdin','utf8'));
  process.exit(1);
}
")

echo ""
echo "=== SUCCESS ==="
echo ""
echo "Add this to your .env.local or environment:"
echo ""
echo "SPOTIFY_REFRESH_TOKEN=$REFRESH_TOKEN"
echo ""

read -r -p "Write to .env.local? [y/N]: " WRITE
if [ "$WRITE" = "y" ] || [ "$WRITE" = "Y" ]; then
  if grep -q "^SPOTIFY_REFRESH_TOKEN=" "$SCRIPT_DIR/../.env.local" 2>/dev/null; then
    sed -i '' "s|^SPOTIFY_REFRESH_TOKEN=.*|SPOTIFY_REFRESH_TOKEN=$REFRESH_TOKEN|" "$SCRIPT_DIR/../.env.local"
  else
    echo "SPOTIFY_REFRESH_TOKEN=$REFRESH_TOKEN" >> "$SCRIPT_DIR/../.env.local"
  fi
  echo "Written to .env.local"
fi
