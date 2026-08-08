# Antywzorce — design-system-kit

Czytaj gdy coś „idzie nie tak” albo przed fazą 1/2 jako szybki self-check.

| Antywzorzec | Dlaczego boli | Zamiast tego |
|---|---|---|
| Tokeny naraz w Figmie i `tokens.css` bez approve | Drift Light/Dark, różne nazwy | Faza 1 → STOP → faza 2 |
| Bind węzła do `semantic/*` lub Generic | Łamie kontrakt Theme / komponentów | Tylko `component/*` |
| Siatka size × state × type „na zapas” | Niemożliwy 1:1 z CSS; puchnie set | BOOLEAN / SLOT / TEXT; stany w CSS |
| Czyszczenie strokes na `COMPONENT_SET` | Znika fioletowy chrome Figmy | Chrome zostaje; fill tylko na surface |
| `npm publish` zamiast `publish:public` | `.npmrc` Figma → 404 na npmjs | `npm run publish:public` |
| Surowy output `get_design_context` jako React | Inny styl niż kit (Make-like) | Adaptuj do `Button` / `Card` / `.ds-*` |
| Hex w `components.css` | Dark mode i Theme nie działają | `var(--color-component-…)` |
| Rebuild Figmy gdy „dopisz React” | Duplikaty, strata czasu | Phase 0 → Phase 2 |
| Publish / commit bez prośby | Utrata kontroli maintainerera | STOP + czekaj |
| Make → static w tym skillu | Zły plik, zły workflow | `figma-make-to-static-screen` |
| Material 3 / obce libki jako źródło | Niespójność z DS | Wzorce `modal` / `panel` / `button` w pliku |
| Pełny `figma-generate-library` od zera | Rozjeżdża istniejący plik | Przyrostowo + Wasze rules |
| Redesign „po frontend-design” (nowe fonty, glow, pill soup) | Drift od Theme / rodzeństwa | `visual-qa.md` — spójność, nie nowa tożsamość |
| Lorem / angielski filler w Storybook/GUIDELINES | Niespójny głos produktu | PL, domena (testy/badania), active voice |
| Brak focus / `aria-label` na ikon-only | A11y regresja vs Button/IconButton | Podłoga z `visual-qa.md` |
