# MyFundSIP

TanStack Start + React + TypeScript + Vite + Tailwind CSS.

## Run locally on Windows (VS Code)

1. Install **Node.js 22 LTS** from https://nodejs.org (npm comes with it).
2. Clone the repo from GitHub and open the folder in VS Code.
3. In the VS Code terminal:

```sh
npm install      # install dependencies
npm run dev      # start local site → http://localhost:8080 (port shown in terminal)
npm run build    # production build (output in .output/ and dist/)
```

Bun also works (`bun install`, `bun run dev`) — the repo includes `bun.lock`.
No API keys are needed to run locally. See `.env.example`.

## Project structure

- `src/routes/` – pages (file-based routing; `routeTree.gen.ts` is auto-generated)
- `src/components/layout/` – Header, Footer
- `src/components/sections/` – Hero, About, Services, Funds, Calculator, WhySip, Faq, Cta, Contact
- `src/components/ui/` – reusable UI pieces
- `src/lib/` – data (funds) and helpers

## Client review → production

1. Edit in VS Code, run `npm run dev`, show the client.
2. Commit & push approved changes to GitHub — they sync into Lovable automatically.
3. Click **Publish → Update** in Lovable to deploy to production.

The site renders pages on the server (SSR), so it runs as a Cloudflare Worker, not as static files.
Lovable's Publish handles that deployment for you.
