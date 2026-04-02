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
        <span className="text-sm font-mono text-foreground">
          {rank}
        </span>
      </div>
      <div className="flex-shrink-0">
        {track.album.images[0] && (
          <Image
            className="rounded"
            src={track.album.images[0].url}
            alt={`${track.album.name} album cover`}
            width={48}
            height={48}
          />
        )}
      </div>
      <div className="flex-grow min-w-0">
        <a
          href={track.external_urls.spotify}
          target="_blank"
          rel="noopener noreferrer"
          className="block no-persistent-underline"
        >
          <p className="text-foreground font-medium truncate text-sm">
            {track.name}
          </p>
          <p className="text-foreground text-sm truncate">
            {track.artists.map(artist => artist.name).join(', ')}
          </p>
        </a>
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
        <span className="text-sm font-mono text-foreground">
          {rank}
        </span>
      </div>
      <div className="flex-shrink-0">
        {artist.images[0] && (
          <Image
            className="rounded-full"
            src={artist.images[0].url}
            alt={`${artist.name} profile picture`}
            width={48}
            height={48}
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