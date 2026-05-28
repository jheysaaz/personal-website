# Jheyson Saavedra - Portfolio

A personal portfolio website showcasing the intersection of philosophy and data
analysis.

## 🚀 Built With

- **Fresh 2.3** - Deno web framework with island architecture
- **Deno** - TypeScript-first runtime
- **Tailwind CSS v4** - Modern styling
- **Preact** - Lightweight React alternative
- **Inter & Newsreader** - Typography system
- **i18n Support** - English and Spanish

## 🌐 Features

- **Bilingual** - Auto-detects browser language, supports EN/ES
- **Dark Mode** - Respects system preferences
- **Responsive** - Works on all devices
- **Performance** - Server-rendered with zero JS by default
- **Accessibility** - Semantic HTML and proper contrast

## 🏗️ Architecture

```
personal-website/
├── routes/               # File-based routing
├── components/           # Server-only components
├── content/              # Data for work, projects
├── i18n/                 # Internationalization
├── lib/                  # Utilities
├── static/               # Static assets
└── utils/                # Helpers
```

## 🛠️ Development

```bash
# Install dependencies
deno install

# Start development server
deno task dev

# Build for production
deno task build

# Start production server
deno task start
```

## 📄 Pages

- **Home** (`/en`, `/es`) - Bio and navigation
- **Work** (`/en/work`, `/es/work`) - Professional experience
- **Library** (`/en/library`, `/es/library`) - Philosophical essays (WIP)
- **Lab** (`/en/lab`, `/es/lab`) - Projects and experiments
- **Music** (`/en/music`, `/es/music`) - Spotify top tracks/artists

## 🔐 Environment

```
SITE_URL=https://jheysonsaavedra.com
SPOTIFY_CLIENT_ID=...
SPOTIFY_CLIENT_SECRET=...
SPOTIFY_REFRESH_TOKEN=...
```

## ✅ Quality


Run these regularly:

```bash
deno fmt
deno lint
deno test
```

---

Built with ❤️ and ☕ by [Jheyson Saavedra](mailto:contact@jheysonsaavedra.com)
