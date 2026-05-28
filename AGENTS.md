<!-- BEGIN:fresh-agent-rules -->

# Fresh 2.x Project (Deno)

This repository uses Fresh 2.x and Deno. Follow Fresh 2.x conventions:

- Routes live in `routes/` and must use Fresh 2.x handlers with a single `ctx`.
- Use `define.handlers()` and return `{ data: {...} }` for page data.
- Use `routes/_app.tsx` as the app wrapper.
- Use `routes/_error.tsx` for unified error handling.
- Use `vite.config.ts` with the Fresh Vite plugin.
- Prefer server components; use islands only for interactivity.
- Always use stable Fresh imports from `fresh` and `fresh/runtime`.

## Skills

Always use skills from https://github.com/denoland/skills when relevant.

<!-- END:fresh-agent-rules -->
