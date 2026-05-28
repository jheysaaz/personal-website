import { define } from "../utils.ts";

const siteUrl = Deno.env.get("SITE_URL") ||
  "https://jheysonsaavedra.com";

export const handler = define.handlers(() => {
  const body = [
    "User-agent: *",
    "Allow: /",
    "",
    `Sitemap: ${siteUrl}/sitemap.xml`,
  ].join("\n");

  return new Response(body, {
    headers: { "Content-Type": "text/plain" },
  });
});
