const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const REFRESH_TOKEN = process.env.SPOTIFY_REFRESH_TOKEN;

const TOP_TRACKS_ENDPOINT = "https://api.spotify.com/v1/me/top/tracks";
const TOP_ARTISTS_ENDPOINT = "https://api.spotify.com/v1/me/top/artists";
const TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";

function hasValidCredentials(): boolean {
  return Boolean(CLIENT_ID && CLIENT_SECRET && REFRESH_TOKEN);
}

function getBasicAuth(): string {
  return btoa(`${CLIENT_ID}:${CLIENT_SECRET}`);
}

async function getAccessToken(): Promise<string> {
  if (!hasValidCredentials()) {
    throw new Error("Missing Spotify credentials");
  }

  const response = await fetch(TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Basic ${getBasicAuth()}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: REFRESH_TOKEN!,
    }),
  });

  if (!response.ok) {
    throw new Error(`Spotify token request failed: ${response.status}`);
  }

  const data = await response.json();
  return data.access_token;
}

export async function getSpotifyData(): Promise<{
  tracks: Response;
  artists: Response;
}> {
  if (!hasValidCredentials()) {
    throw new Error("Missing Spotify credentials");
  }

  const accessToken = await getAccessToken();

  const [tracks, artists] = await Promise.all([
    fetch(`${TOP_TRACKS_ENDPOINT}?time_range=short_term&limit=10`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    }),
    fetch(`${TOP_ARTISTS_ENDPOINT}?time_range=short_term&limit=10`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    }),
  ]);

  return { tracks, artists };
}

export interface SpotifyTrack {
  id: string;
  name: string;
  artists: Array<{ name: string }>;
  album: {
    name: string;
    images: Array<{ url: string }>;
  };
  external_urls: {
    spotify: string;
  };
}

export interface SpotifyArtist {
  id: string;
  name: string;
  images: Array<{ url: string }>;
  external_urls: {
    spotify: string;
  };
}
