import { define } from "../../utils.ts";

export const handler = define.middleware(async (ctx) => {
  const response = await ctx.next();
  if (!response.headers.has("Cache-Control")) {
    response.headers.set(
      "Cache-Control",
      "private, max-age=300, must-revalidate",
    );
  }
  return response;
});
