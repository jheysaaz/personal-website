import { define } from "@/utils/state.ts";
import { getSiteUrl, SeoHead } from "@/lib/seo.tsx";
import { Artist, Track } from "@/components/spotify.tsx";
import {
  getSpotifyData,
  type SpotifyArtist,
  type SpotifyTrack,
} from "@/lib/spotify.ts";
import { createCache } from "@/lib/cache.ts";

const musicDataCache = createCache<{
  topTracks: SpotifyTrack[];
  topArtists: SpotifyArtist[];
}>(5 * 60 * 1000);

async function getMusicData(): Promise<
  {
    topTracks: SpotifyTrack[];
    topArtists: SpotifyArtist[];
  } | null
> {
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

export const handler = define.handlers({
  async GET(_ctx) {
    const musicData = await getMusicData();
    return { data: { musicData } };
  },
});

export default define.page<typeof handler>((props) => {
  const { intl } = props.state;
  const locale = intl.locale;
  const { musicData } = props.data;

  return (
    <>
      <SeoHead
        title={intl.t("pages.music.title")}
        description={intl.t("pages.music.description")}
        url={`${getSiteUrl()}/${locale}/music`}
      />
      <section class="space-y-8 md:space-y-12 overflow-hidden">
        <div>
          <h1 class="font-semibold text-2xl mb-6 md:mb-8 tracking-tighter font-serif">
            {intl.t("pages.music.title")}
          </h1>

          <p class="mb-8 md:mb-12">
            {intl.t("pages.music.description")}{" "}
            <a
              class="primary-link external-link"
              href="https://open.spotify.com/user/pu2wzcz975u24ql133gqi3d9q"
              target="_blank"
              rel="noopener noreferrer"
            >
              {intl.t("pages.music.mySpotify")}
            </a>
            .
          </p>
        </div>

        {!musicData
          ? (
            <div class="text-center py-8">
              <p class="text-foreground">{intl.t("pages.music.error")}</p>
            </div>
          )
          : (
            <div class="grid gap-8 md:gap-12 md:grid-cols-2">
              <div>
                <h2 class="font-semibold text-lg mb-4 md:mb-6 tracking-tight font-serif">
                  {intl.t("pages.music.topTracks")}
                </h2>
                <div class="space-y-2">
                  {musicData.topTracks.map((track, index) => (
                    <Track key={track.id} track={track} rank={index + 1} />
                  ))}
                </div>
              </div>

              <div>
                <h2 class="font-semibold text-lg mb-4 md:mb-6 tracking-tight font-serif">
                  {intl.t("pages.music.topArtists")}
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
    </>
  );
});
