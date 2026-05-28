import { define } from "../../utils.ts";

export const handler = define.middleware(async (ctx) => {
  const response = await ctx.next();
  if (!response.headers.has("Cache-Control")) {
    response.headers.set(
      "Cache-Control",
      "public, max-age=3600, stale-while-revalidate=86400",
    );
  }
  return response;
});
