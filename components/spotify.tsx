import Image from 'next/image';
import { SpotifyTrack, SpotifyArtist } from '../lib/spotify';

interface TrackProps {
  track: SpotifyTrack;
  rank: number;
}

export function Track({ track, rank }: TrackProps) {
  return (
    <div className="flex items-center space-x-3 py-2">
      <div className="flex-shrink-0 w-6 text-right">
        <span className="text-xs font-serif text-muted-foreground">
          {rank}
        </span>
      </div>
      <div className="relative flex-shrink-0 w-12 h-12">
        {track.album.images[0] && (
          <Image
            className="rounded object-cover"
            src={track.album.images[0].url}
            alt={`${track.album.name} album cover`}
            fill
            sizes="48px"
          />
        )}
      </div>
      <div className="flex-grow min-w-0">
        <a
          href={track.external_urls.spotify}
          target="_blank"
          rel="noopener noreferrer"
          className="no-persistent-underline"
        >
          <p className="text-foreground font-medium truncate text-sm">
            {track.name}
          </p>
        </a>
        <p className="text-muted-foreground text-xs truncate">
          {track.artists.map(artist => artist.name).join(', ')}
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
    <div className="flex items-center space-x-3 py-2">
      <div className="flex-shrink-0 w-6 text-right">
        <span className="text-xs font-serif text-muted-foreground">
          {rank}
        </span>
      </div>
      <div className="relative flex-shrink-0 w-12 h-12">
        {artist.images[0] && (
          <Image
            className="rounded-full object-cover"
            src={artist.images[0].url}
            alt={`${artist.name} profile picture`}
            fill
            sizes="48px"
          />
        )}
      </div>
      <div className="flex-grow min-w-0">
        <a
          href={artist.external_urls.spotify}
          target="_blank"
          rel="noopener noreferrer"
          className="block no-persistent-underline"
        >
          <p className="text-foreground font-medium truncate text-sm">
            {artist.name}
          </p>
        </a>
      </div>
    </div>
  );
}
