import Image from "next/image";
import type { SpotifyArtist, SpotifyTrack } from "@/lib/spotify";

interface TrackProps {
  track: SpotifyTrack;
  rank: number;
}

export function Track({ track, rank }: TrackProps) {
  const img = track.album.images[track.album.images.length - 1];
  return (
    <div className="flex items-center space-x-3 py-2">
      <div className="flex-shrink-0 w-6 text-right">
        <span className="text-xs font-serif text-muted-foreground">
          {rank}
        </span>
      </div>
      <div className="flex-shrink-0 w-12 h-12 relative">
        {img && (
          <Image
            className="object-cover rounded-xl [corner-shape:squircle]"
            src={img.url}
            alt={`${track.album.name} album cover`}
            fill
            sizes="48px"
          />
        )}
      </div>
      <div className="flex-grow min-w-0 overflow-hidden">
        <a
          href={track.external_urls.spotify}
          target="_blank"
          rel="noopener noreferrer"
          className="block min-w-0"
        >
          <p className="secondary-link text-foreground font-medium truncate text-sm">
            {track.name}
          </p>
        </a>
        <p className="text-muted-foreground text-xs truncate">
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
  const img = artist.images[artist.images.length - 1];
  return (
    <div className="flex items-center space-x-3 py-2">
      <div className="flex-shrink-0 w-6 text-right">
        <span className="text-xs font-serif text-muted-foreground">
          {rank}
        </span>
      </div>
      <div className="flex-shrink-0 w-12 h-12 relative">
        {img && (
          <Image
            className="rounded-full object-cover"
            src={img.url}
            alt={`${artist.name} profile picture`}
            fill
            sizes="48px"
          />
        )}
      </div>
      <div className="flex-grow min-w-0 overflow-hidden">
        <a
          href={artist.external_urls.spotify}
          target="_blank"
          rel="noopener noreferrer"
          className="block min-w-0"
        >
          <p className="secondary-link text-foreground font-medium truncate text-sm">
            {artist.name}
          </p>
        </a>
      </div>
    </div>
  );
}
