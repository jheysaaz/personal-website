import { define } from "../../utils.ts";
import { getDictionary } from "../../i18n/get-dictionary.ts";
import { normalizeLocale } from "../../utils/locale.ts";
import { Artist, Track } from "../../components/spotify.tsx";
import {
  getSpotifyData,
  type SpotifyArtist,
  type SpotifyTrack,
} from "../../lib/spotify.ts";
import { BackNavigation } from "../../components/back-navigation.tsx";
import { Head } from "fresh/runtime";
import { canonicalUrl, siteDefaults } from "../../utils/seo.ts";

interface MusicData {
  topTracks: SpotifyTrack[];
  topArtists: SpotifyArtist[];
}

const CACHE_TTL_MS = 5 * 60 * 1000;
let cachedAt = 0;
let cachedMusicData: MusicData | null = null;

async function getMusicData(): Promise<MusicData | null> {
  if (cachedMusicData && Date.now() - cachedAt < CACHE_TTL_MS) {
    return cachedMusicData;
  }

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

    cachedMusicData = {
      topTracks: tracksData.items || [],
      topArtists: artistsData.items || [],
    };
    cachedAt = Date.now();

    return cachedMusicData;
  } catch (error) {
    console.error("Error fetching music data:", error);
    return null;
  }
}

export const handler = define.handlers(async (ctx) => {
  const locale = normalizeLocale(ctx.params.locale);
  const dict = await getDictionary(locale);
  const musicData = await getMusicData();
  const response = { data: { dict, locale, musicData } };
  return {
    ...response,
    headers: {
      "Cache-Control": "public, max-age=300, stale-while-revalidate=600",
    },
  };
});

export default define.page<typeof handler>(({ data }) => {
  const { dict, locale, musicData } = data;
  const canonical = canonicalUrl(`/${locale}/music`);

  return (
    <section class="space-y-12">
      <Head>
        <title>{dict.pages.music.title}</title>
        <meta name="description" content={dict.pages.music.description} />
        <meta name="keywords" content={siteDefaults.keywords} />
        <link rel="canonical" href={canonical} />
        <link rel="alternate" hrefLang="en" href={canonicalUrl("/en/music")} />
        <link rel="alternate" hrefLang="es" href={canonicalUrl("/es/music")} />
      </Head>
      <BackNavigation
        href={`/${locale}`}
        label={dict.navigation.backToEarth}
      />

      <div>
        <h1 class="font-semibold text-2xl mb-8 tracking-tighter font-serif">
          {dict.pages.music.title}
        </h1>

        <p class="mb-12">
          {dict.pages.music.description}{" "}
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

      {!musicData
        ? (
          <div class="text-center py-8">
            <p class="text-foreground">{dict.pages.music.error}</p>
          </div>
        )
        : (
          <div class="grid gap-12 md:grid-cols-2">
            <div>
              <h2 class="font-semibold text-lg mb-6 tracking-tight font-serif">
                {dict.pages.music.topTracks}
              </h2>
              <div class="space-y-2">
                {musicData.topTracks.map((track, index) => (
                  <Track key={track.id} track={track} rank={index + 1} />
                ))}
              </div>
            </div>

            <div>
              <h2 class="font-semibold text-lg mb-6 tracking-tight font-serif">
                {dict.pages.music.topArtists}
              </h2>
              <div class="space-y-2">
                {musicData.topArtists.map((artist, index) => (
                  <Artist key={artist.id} artist={artist} rank={index + 1} />
                ))}
              </div>
            </div>
          </div>
        )}
    </section>
  );
});
