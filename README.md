# Jheyson Saavedra — Portfolio

A personal portfolio website: philosophy, data analysis, and creative work.

## Built With

- **Next.js 16** — React framework with server components
- **Tailwind CSS v4** — Utility-first styling
- **next-intl** — Internationalization (EN/ES)
- **Inter & Newsreader** — Typography
- **ViewTransition API** — Page transitions

## Features

- **Bilingual** — `en` / `es` with `localePrefix: "always"`
- **Responsive** — Desktop sidebar (Dock effect) + mobile overlay nav
- **Page transitions** — Crossfade + vertical slide via ViewTransition
- **Spotify integration** — Top tracks and artists
- **RSS & sitemap** — SEO-friendly
- **Cache Components** — Instant navigation

## Architecture

```
personal-website/
├── app/                  # Next.js App Router
│   ├── [locale]/         # Route segments (page, work, lab, library, music)
│   ├── globals.css
│   ├── layout.tsx
│   ├── not-found.tsx
│   ├── robots.ts
│   ├── sitemap.ts
│   └── rss.xml/
├── components/           # UI components
│   ├── side-nav.tsx      # Desktop sidebar (Dock effect)
│   ├── mobile-nav.tsx    # Mobile overlay navigation
│   ├── language-switcher.tsx
│   ├── spotify.tsx
│   └── tech-badge.tsx
├── content/              # Work & project data
├── lib/                  # Utilities (seo, spotify, library, cache)
├── messages/             # i18n JSON dictionaries
├── assets/               # Markdown library posts
└── scripts/              # Developer utilities
```

## Development

```bash
pnpm install
pnpm dev        # Start dev server
pnpm build      # Production build
pnpm test       # Run tests
```

## Environment

```
SITE_URL=https://jheysonsaavedra.com
SPOTIFY_CLIENT_ID=...
SPOTIFY_CLIENT_SECRET=...
SPOTIFY_REFRESH_TOKEN=...
```

## Quality

```bash
pnpm lint
pnpm test
```
