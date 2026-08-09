# Jheyson Saavedra — Portfolio

A personal portfolio website: philosophy, data analysis, and creative work.

## Built With

- **Fresh 2** — The next-gen web framework for Deno
- **Preact** — Fast, tiny React alternative (islands architecture)
- **Tailwind CSS v4** — Utility-first styling
- **@intlkit/intlkit** — Internationalization (EN/ES)
- **@dreamer/markdown** — Library post rendering
- **Inter & Newsreader** — Typography
- **View Transitions API** — Page transitions

## Features

- **Bilingual** — `en` / `es` with locale-first URLs (`/en`, `/es`)
- **Responsive** — Desktop sidebar (Dock effect) + mobile overlay nav
- **Page transitions** — Crossfade + vertical slide via View Transitions
- **Spotify integration** — Top tracks and artists
- **RSS, sitemap & llms.txt** — SEO-friendly
- **Islands** — Interactive components ship minimal JS

## Architecture

```
personal-website/
├── routes/               # Fresh file-system routes
│   ├── [locale]/         # Locale segments (page, work, lab, library, music)
│   ├── _app.tsx          # Root layout shell
│   ├── _middleware.ts    # Locale redirect + state
│   └── _error.tsx        # 404 / error page
├── islands/              # Interactive (client) components
│   ├── nav.tsx            # Desktop dock + mobile overlay navigation
├── components/           # Server-rendered UI components
├── content/              # Work & project data
├── lib/                  # Utilities (seo, spotify, library, cache, i18n)
├── messages/             # i18n JSON dictionaries
├── assets/               # Global CSS + Markdown library posts
├── static/               # Fonts & favicon
└── scripts/              # Developer utilities
```

## Development

```bash
deno install        # Install dependencies
deno task dev       # Start dev server
deno task build     # Production build
deno task start     # Serve production build
deno task check     # fmt + lint + typecheck
deno task test      # Run tests
```

## Environment

```
SITE_URL=https://jheysonsaavedra.com
SPOTIFY_CLIENT_ID=...
SPOTIFY_CLIENT_SECRET=...
SPOTIFY_REFRESH_TOKEN=...
```

## Deployment

```bash
deno task deploy    # deployctl deploy --project=jheysonsaavedra --prod
```
