import { define } from "@/utils/state.ts";
import { getSiteUrl, siteDefaults } from "@/lib/seo.tsx";

export const handler = define.handlers({
  GET(_ctx) {
    const siteUrl = getSiteUrl();

    const body = `# ${siteDefaults.name}

> ${siteDefaults.description}

## About
${siteDefaults.name} is a data analyst and philosophy student based in Colombia.

## Docs
- Home: ${siteUrl}/en
- Work: ${siteUrl}/en/work
- Lab: ${siteUrl}/en/lab
- Music: ${siteUrl}/en/music
- Library: ${siteUrl}/en/library

## Social
- GitHub: https://github.com/jheysaaz
- LinkedIn: https://linkedin.com/in/jheysaaz
- X: https://x.com/jheysaaz
- Email: contact@jheysonsaavedra.com
`;

    return new Response(body, {
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  },
});
