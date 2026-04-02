#!/bin/bash

echo "🎵 Spotify API Setup Helper"
echo "=========================="
echo ""

# Check if jq is available for JSON parsing
if ! command -v jq &> /dev/null; then
    echo "⚠️  Note: Install 'jq' for automatic token parsing: brew install jq"
    echo ""
fi

echo "📝 First, set up your Spotify App:"
echo "1. Go to https://developer.spotify.com/dashboard"
echo "2. Create a new app with these settings:"
echo "   - API: Web API"
echo ""

# Ask for redirect URI with default
DEFAULT_REDIRECT="http://localhost:3000/callback"
read -p "Enter your Redirect URI [$DEFAULT_REDIRECT]: " REDIRECT_URI
REDIRECT_URI=${REDIRECT_URI:-$DEFAULT_REDIRECT}

echo ""
echo "   - Make sure to add this Redirect URI in your Spotify app settings:"
echo "   - $REDIRECT_URI"
echo ""

read -p "Enter your Spotify Client ID: " CLIENT_ID
read -p "Enter your Spotify Client Secret: " CLIENT_SECRET

# URL encode the redirect URI
ENCODED_REDIRECT_URI=$(python3 -c "import urllib.parse; print(urllib.parse.quote('$REDIRECT_URI', safe=''))")

echo ""
echo "🔗 Visit this URL to authorize your app:"
echo "https://accounts.spotify.com/authorize?response_type=code&client_id=${CLIENT_ID}&scope=user-top-read&redirect_uri=${ENCODED_REDIRECT_URI}"
echo ""
echo "After authorizing, you'll be redirected to a URL that starts with:"
echo "${REDIRECT_URI}?code=..."
echo ""

read -p "Paste the entire redirected URL here: " REDIRECT_URL

# Extract the code parameter from the URL
CODE=$(echo "$REDIRECT_URL" | sed -n 's/.*code=\([^&]*\).*/\1/p')

if [ -z "$CODE" ]; then
    echo "❌ Could not extract code from URL. Please check the URL and try again."
    exit 1
fi

echo ""
echo "🔄 Exchanging code for refresh token..."

# Exchange code for tokens
RESPONSE=$(curl -s -d "client_id=${CLIENT_ID}" \
    -d "client_secret=${CLIENT_SECRET}" \
    -d "grant_type=authorization_code" \
    -d "code=${CODE}" \
    -d "redirect_uri=${REDIRECT_URI}" \
    https://accounts.spotify.com/api/token)

if command -v jq &> /dev/null; then
    REFRESH_TOKEN=$(echo "$RESPONSE" | jq -r '.refresh_token')
    if [ "$REFRESH_TOKEN" != "null" ]; then
        echo "✅ Success! Here are your environment variables:"
        echo ""
        echo "Add these to your .env.local file:"
        echo "SPOTIFY_CLIENT_ID=$CLIENT_ID"
        echo "SPOTIFY_CLIENT_SECRET=$CLIENT_SECRET"
        echo "SPOTIFY_REFRESH_TOKEN=$REFRESH_TOKEN"
        echo ""
        echo "🎉 Your music page will now show your real Spotify data!"
    else
        echo "❌ Error getting refresh token. Response:"
        echo "$RESPONSE"
    fi
else
    echo "📋 Raw response (look for 'refresh_token'):"
    echo "$RESPONSE"
    echo ""
    echo "Copy the refresh_token value and add all three values to .env.local"
fi