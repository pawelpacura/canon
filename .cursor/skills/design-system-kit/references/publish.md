# Bump + publish `@pacurap/design-system`

## Dwa registry

| Registry | Cel |
|---|---|
| `https://registry.npmjs.org` | Publiczny pakiet dla devów — **tu publikujemy** |
| Registry Figma (lokalny `.npmrc`) | Make / Code Connect — **nie** używaj do `npm publish` |

Lokalny `.npmrc` często przekierowuje `@pacurap` na Figmę → zwykły `npm publish` kończy się 404. Zawsze:

```bash
npm run publish:public
```

Skrypt: `scripts/publish-public.mjs` (chowa `.npmrc` na czas publishu).

## Przed publish

1. Faza 2 i 3 zaakceptowane (albo user świadomie pomija).
2. Wersja w `package.json` **wyższa** niż na npm (`npm view @pacurap/design-system version`) — republish tej samej wersji jest zablokowany.
3. User powiedział wprost „publish” / „opublikuj”.

## Sekwencja

```bash
cd /Users/pawelpacura/Projects/design-system-kit   # lub root workspace

npm whoami --registry=https://registry.npmjs.org
# oczekiwane: pacurap

# jeśli brak sesji:
npm logout --registry=https://registry.npmjs.org
npm login --registry=https://registry.npmjs.org --auth-type=web

npm run publish:public
```

`prepublishOnly` odpala `build` (w tym `generate:icons`).

## Po publish

- Podaj wersję i potwierdzenie sukcesu.
- Konsument: `npm install @pacurap/design-system@x.y.z`
- Figma Make kit: odśwież / podbij zależność w Make gdy dotyczy.
- Commit / tag git — **tylko na prośbę** usera.

## Semver (przypomnienie)

| Zmiana | Bump |
|---|---|
| Fix stylu / a11y / docs | patch |
| Nowy komponent, token, prop | minor (przy 0.x) |
| Breaking | major — pytaj |

Nie bumpuj „na zapas” bez scope zmiany.
