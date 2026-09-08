# AGENTS.md

## Cursor Cloud specific instructions

Canon is a single npm package (`@pacurap/design-system`) — a React + CSS design-system library mirrored from Figma. There is **no backend, database, or API**; the only runnable service is Storybook.

Standard dev commands live in `README.md` ("Development") and `package.json` `scripts`. Key ones:

- `npm run typecheck` — the closest thing to a lint/test gate (`tsc --noEmit`); there is no ESLint or test runner configured.
- `npm run build` — runs `generate:icons` then `tsup` to emit `dist/` (ESM + CJS + d.ts + CSS). `generate:icons` reads SVGs from `node_modules/@material-symbols/svg-300`, so dependencies must be installed first.
- `npm run storybook` — the single runnable service; serves the component playground and `Screens/Testonaut` demo screens at http://localhost:6006. Use this to visually verify components end to end.

Non-obvious caveats:

- **Do not create `.npmrc` from `.npmrc.example`.** The example points the `@pacurap` scope at a private Figma registry that needs a token; a plain `npm install` of the public dependencies works without it, and a stray `.npmrc` will break installs. `.npmrc` is gitignored.
- `npm run publish:public` is release tooling (publishes to npmjs.org) and is not needed for local development.
- Node 20+ is required (Storybook 10 / Vite 8). The VM ships Node 22, which works.
