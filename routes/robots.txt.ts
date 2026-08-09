import { define } from "@/utils/state.ts";

export const handler = define.handlers({
  GET() {
    const body = `User-agent: *
Allow: /

Sitemap: https://jheysonsaavedra.com/sitemap.xml
`;

    return new Response(body, {
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  },
});
