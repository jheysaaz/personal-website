import type { Metadata } from 'next';
import { getDictionary } from '../../../i18n/get-dictionary';
import { Track, Artist } from '../../../components/spotify';
import { getSpotifyData, SpotifyTrack, SpotifyArtist } from '../../../lib/spotify';
import { BackNavigation } from '../../../components/back-navigation';

// Revalidate every hour
export const revalidate = 3600;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: 'en' | 'es' }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  
  return {
    title: `${dict.pages.music.title} – Jheyson Saavedra`,
    description: dict.pages.music.description,
  };
}

interface MusicData {
  topTracks: SpotifyTrack[];
  topArtists: SpotifyArtist[];
}

async function getMusicData(): Promise<MusicData | null> {
  try {
    const { tracks, artists } = await getSpotifyData();

    if (!tracks.ok || !artists.ok) {
      console.error('Failed to fetch music data:', {
        tracks: tracks.status,
        artists: artists.status,
      });
      return null;
    }

    const [tracksData, artistsData] = await Promise.all([
      tracks.json(),
      artists.json(),
    ]);

    return {
      topTracks: tracksData.items || [],
      topArtists: artistsData.items || [],
    };
  } catch (error) {
    console.error('Error fetching music data:', error);
    return null;
  }
}

export default async function MusicPage({
  params,
}: {
  params: Promise<{ locale: 'en' | 'es' }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  const musicData = await getMusicData();

  return (
    <section className="space-y-12">
      <BackNavigation href={`/${locale}`} label={dict.navigation.backToEarth} />

      <div>
        <h1 className="font-semibold text-2xl mb-8 tracking-tighter font-serif">
          {dict.pages.music.title}
        </h1>

        <p className="mb-12">
          {dict.pages.music.description}{' '}
          <a
            href="https://open.spotify.com/user/pu2wzcz975u24ql133gqi3d9q"
            target="_blank"
            rel="noopener noreferrer"
          >
            {dict.pages.music.mySpotify}
          </a>
          .
        </p>
      </div>

      {!musicData ? (
        <div className="text-center py-8">
          <p className="text-foreground">{dict.pages.music.error}</p>
        </div>
      ) : (
        <div className="grid gap-12 md:grid-cols-2">
          {/* Top Tracks */}
          <div>
            <h2 className="font-semibold text-lg mb-6 tracking-tight font-serif">
              {dict.pages.music.topTracks}
            </h2>
            <div className="space-y-2">
              {musicData.topTracks.map((track, index) => (
                <Track key={track.id} track={track} rank={index + 1} />
              ))}
            </div>
          </div>

          {/* Top Artists */}
          <div>
            <h2 className="font-semibold text-lg mb-6 tracking-tight font-serif">
              {dict.pages.music.topArtists}
            </h2>
            <div className="space-y-2">
              {musicData.topArtists.map((artist, index) => (
                <Artist key={artist.id} artist={artist} rank={index + 1} />
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
