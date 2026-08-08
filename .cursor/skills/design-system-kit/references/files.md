# Pliki i identyfikatory — Design System Kit

## Figma

| Rola | fileKey | URL |
|---|---|---|
| **Design System** (źródło) | `p522mlcVwW78HOdKKBupPE` | https://www.figma.com/design/p522mlcVwW78HOdKKBupPE/Design-System |
| **Designs** (ekrany / konsumenci biblioteki) | `BGEwLOj9VeR8CDwzj0ClA3` | https://www.figma.com/design/BGEwLOj9VeR8CDwzj0ClA3/Designs |
| **Make** (nie edytuj w tym skillu) | `1y05CnoIzJUMsB0hykv3No` | https://www.figma.com/make/1y05CnoIzJUMsB0hykv3No/Testy |

Przykładowy node wejściowy DS: [`259:20`](https://www.figma.com/design/p522mlcVwW78HOdKKBupPE/Design-System?node-id=259-20).

### Biblioteka DS w Designs (`search_design_system`)

```
libraryKey: lk-75a3bbae2ee65bae84e464b92a99d2355155aefa359326dfc7bacc4e4176423db3488c280865c89e55de1bbd131c1ca0a545fc6309f5353f6eb137823c1bdec0
```

Używaj: `fileKey: BGEwLOj9VeR8CDwzj0ClA3` + `includeLibraryKeys: [powyższy]`.

Mutacje komponentów źródłowych: zawsze `fileKey: p522mlcVwW78HOdKKBupPE`.

## Wzorce referencyjne (user-approved)

| Komponent | nodeId | URL |
|---|---|---|
| `modal` | `280:377` | https://www.figma.com/design/p522mlcVwW78HOdKKBupPE/Design-System?node-id=280-377 |
| `panel` | `280:750` | https://www.figma.com/design/p522mlcVwW78HOdKKBupPE/Design-System?node-id=280-750 |
| `accordion` | `359:599` | https://www.figma.com/design/p522mlcVwW78HOdKKBupPE/Design-System?node-id=359-599 |
| `table` | `292:465` | https://www.figma.com/design/p522mlcVwW78HOdKKBupPE/Design-System?node-id=292-465 |
| `button` | strona `button` w DS | szukaj po nazwie / page |

Nowe overlaye (dialog, drawer, popover…): kopiuj schemat **modal/panel** — Header + Content slot + Footer slot + `Show Footer`.

## Repo

| Ścieżka | Rola |
|---|---|
| `src/tokens.css` | CSS custom properties (mirror Theme) |
| `src/components.css` | klasy `.ds-*` |
| `src/*.tsx` | komponenty React |
| `src/*.stories.tsx` | Storybook |
| `src/index.ts` | public exports |
| `src/icons/` + `scripts/icons.manifest.json` | Material Symbols w300 |
| `GUIDELINES.md` | docs dla konsumentów |
| `HANDOFF.md` | przepływ maintainer / agent |
| `scripts/publish-public.mjs` | publish na npmjs.org |
| `.cursor/rules/figma-component-frames.mdc` | reguły Figma |

## Luka Figma ahead of React (snapshot 2026-08-08 — nie audytuj w pętli)

Jednorazowy przegląd; skill **nie** ma stałego trybu audit. Przy nowym komponencie i tak robisz Phase 0 lokalnie.

| Figma (jest) | Tokeny `component/*` | React export | CSS `.ds-*` |
|---|---|---|---|
| `modal` `280:377` | tak | brak | brak |
| `panel` `280:750` | tak | brak | brak |
| `accordion` `359:599` | tak | brak | brak |
| `table` (+ cell/row/header) | tak (dużo) | brak | częściowo `.ds-table` |
| `pagination` `330:75` | tak | brak | brak |
| `progressBar` set | tak | brak | brak |
| `stepper` / `step` | tak | brak | brak |
| `tag` | tak | brak | brak |
| `tooltip` set | tak | brak | brak |
| `chipInput` `414:537` | brak osobnej grupy (pewnie `input/*`) | brak | brak |

Ikony: Figma Icons ≈ 33 unikalne; `icons.manifest.json` ≈ 22 — brak m.in. alarm, article, check, close_small, drag_indicator, edit, help, settings, list, splitscreen, electric_bolt.

„Dopisz React” ≠ „twórz od zera w Figmie”.

## CSS naming hint

- Kolory komponentu: `--color-component-{name}-{role}`
- Spacing/radius/size komponentu: często `--component-{name}-{slot}` (bez `color-`)
- Semantic publiczne: `--color-foreground-primary`, `--spacing-l`, `--radius-m`
