import type { SpotifyArtist, SpotifyTrack } from "../lib/spotify.ts";

interface TrackProps {
  track: SpotifyTrack;
  rank: number;
}

export function Track({ track, rank }: TrackProps) {
  return (
    <div class="flex items-center space-x-3 py-2">
      <div class="flex-shrink-0 w-6 text-right">
        <span class="text-xs font-serif text-muted-foreground">
          {rank}
        </span>
      </div>
      <div class="flex-shrink-0 w-12 h-12">
        {track.album.images[0] && (
          <img
            class="rounded object-cover w-full h-full"
            src={track.album.images[0].url}
            alt={`${track.album.name} album cover`}
            width={48}
            height={48}
            loading="lazy"
            decoding="async"
          />
        )}
      </div>
      <div class="flex-grow min-w-0">
        <a
          href={track.external_urls.spotify}
          target="_blank"
          rel="noopener noreferrer"
          class="no-persistent-underline"
        >
          <p class="text-foreground font-medium truncate text-sm">
            {track.name}
          </p>
        </a>
        <p class="text-muted-foreground text-xs truncate">
          {track.artists.map((artist) => artist.name).join(", ")}
        </p>
      </div>
    </div>
  );
}

interface ArtistProps {
  artist: SpotifyArtist;
  rank: number;
}

export function Artist({ artist, rank }: ArtistProps) {
  return (
    <div class="flex items-center space-x-3 py-2">
      <div class="flex-shrink-0 w-6 text-right">
        <span class="text-xs font-serif text-muted-foreground">
          {rank}
        </span>
      </div>
      <div class="flex-shrink-0 w-12 h-12">
        {artist.images[0] && (
          <img
            class="rounded-full object-cover w-full h-full"
            src={artist.images[0].url}
            alt={`${artist.name} profile picture`}
            width={48}
            height={48}
            loading="lazy"
            decoding="async"
          />
        )}
      </div>
      <div class="flex-grow min-w-0">
        <a
          href={artist.external_urls.spotify}
          target="_blank"
          rel="noopener noreferrer"
          class="block no-persistent-underline"
        >
          <p class="text-foreground font-medium truncate text-sm">
            {artist.name}
          </p>
        </a>
      </div>
    </div>
  );
}
