import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Track, Artist } from "@/components/spotify";
import { getSpotifyData, type SpotifyArtist, type SpotifyTrack } from "@/lib/spotify";
import { createCache } from "@/lib/cache";
import { getSiteUrl } from "@/lib/seo";

export const unstable_instant = false;
// unstable_instant = false: page awaits params for getTranslations + fetches
// from Spotify API at render time. Same i18n pattern as the locale layout —
// kept as a documented Block.

type Props = { params: Promise<{ locale: string }> };

const musicDataCache = createCache<{
  topTracks: SpotifyTrack[];
  topArtists: SpotifyArtist[];
}>(5 * 60 * 1000);

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.music" });

  return {
    title: t("title"),
    description: t("description"),
    alternates: { canonical: `${getSiteUrl()}/${locale}/music` },
  };
}

async function getMusicData(): Promise<{
  topTracks: SpotifyTrack[];
  topArtists: SpotifyArtist[];
} | null> {
  const cached = musicDataCache.get();
  if (cached) return cached;

  try {
    const { tracks, artists } = await getSpotifyData();

    if (!tracks.ok || !artists.ok) {
      console.error("Failed to fetch music data:", {
        tracks: tracks.status,
        artists: artists.status,
      });
      return null;
    }

    const [tracksData, artistsData] = await Promise.all([
      tracks.json(),
      artists.json(),
    ]);

    const result = {
      topTracks: (tracksData.items || []) as SpotifyTrack[],
      topArtists: (artistsData.items || []) as SpotifyArtist[],
    };

    musicDataCache.set(result);
    return result;
  } catch (error) {
    console.error("Error fetching music data:", error);
    return null;
  }
}

export default async function MusicPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  const musicData = await getMusicData();

  return (
    <section className="space-y-8 md:space-y-12 overflow-hidden">
      <div>
        <h1 className="font-semibold text-2xl mb-6 md:mb-8 tracking-tighter font-serif">
          {t("pages.music.title")}
        </h1>

        <p className="mb-8 md:mb-12">
          {t("pages.music.description")}{" "}
          <a
            className="primary-link external-link"
            href="https://open.spotify.com/user/pu2wzcz975u24ql133gqi3d9q"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t("pages.music.mySpotify")}
          </a>
          .
        </p>
      </div>

      {!musicData
        ? (
          <div className="text-center py-8">
            <p className="text-foreground">{t("pages.music.error")}</p>
          </div>
        )
        : (
          <div className="grid gap-8 md:gap-12 md:grid-cols-2">
            <div>
              <h2 className="font-semibold text-lg mb-4 md:mb-6 tracking-tight font-serif">
                {t("pages.music.topTracks")}
              </h2>
              <div className="space-y-2">
                {musicData.topTracks.map((track, index) => (
                  <Track key={track.id} track={track} rank={index + 1} />
                ))}
              </div>
            </div>

            <div>
              <h2 className="font-semibold text-lg mb-4 md:mb-6 tracking-tight font-serif">
                {t("pages.music.topArtists")}
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
