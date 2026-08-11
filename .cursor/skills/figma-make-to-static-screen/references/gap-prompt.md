# Luki DS — raport + prompt do stworzenia komponentu

Gdy **kopia Make** (ramka źródłowa) lub widok docelowy wymaga UI, którego **nie ma** w Design System (albo nie da się uczciwie zmapować 1:1):

1. Oznacz lukę w odpowiedzi: **`[GAP: ComponentName]`**
2. Wskaż najbliższy istniejący odpowiednik (jeśli jest) i dlaczego nie wystarcza
3. Dołącz **wypełniony prompt w fenced code block** (```text … ```) — user kopiuje w całości
4. User odpala prompt w **nowym oknie / nowym czacie** Cursor ze skillem **`design-system-kit`**. Ta sesja eksportu ekranu **nie** edytuje pliku Design System.

## Format raportu (w odpowiedzi do usera)

```markdown
### [GAP: NazwaKomponentu]

- **Potrzebne w widoku:** {ViewName} (`node-id` jeśli już jest)
- **W kopii Make (źródło):** {URL ramki + opis warstwy / zachowania}
- **Najbliższy DS:** {nazwa lub „brak”} — dlaczego za mało
- **Priorytet:** blokuje ekran | da się obejść tymczasowo przez {X}

#### Prompt — skopiuj do nowego okna

\`\`\`text
{wypełniony szablon z sekcji poniżej — cały tekst w jednym bloku}
\`\`\`
```

## Szablon promptu (wypełnij i oddaj userowi)

```text
Użyj skilla design-system-kit. Stwórz w Design System (fileKey p522mlcVwW78HOdKKBupPE)
komponent „{Nazwa}”: najpierw tylko Figma (Phase 1), STOP na approve — potem kod/Storybook
wg faz skilla. Theme: bind tylko component/* → semantic/*; less-is-more (jeden COMPONENT
bez siatki size×state×type, chyba że poproszę o warianty).

Kontekst produktowy:
- Widok / flow: {URL kopii Make / mapa FigJam}
- Zachowanie: {co robi, stany logiczne które MUSZĄ być properties}
- Zawartość: {sloty, tekst, ikony, footer…}

Wymagane properties (minimalny zestaw):
- {TEXT / BOOLEAN / INSTANCE_SWAP / SLOT — lista}

Tokeny (alias component/* → semantic/*):
- background, border, foreground, padding, radius, … (doprecyzuj)

Referencje wizualne:
- Kopia Make (źródło): {URL ramki + screenshot / opis}
- Podobny komponent w DS: {modal / panel / select / …} — skopiuj schemat API jeśli pasuje

Acceptance:
- Instancja da się wstawić w Designs w shellu Tests (138:9148)
- Light + Dark przez Theme
- Opis komponentu uzupełniony
- Nie dodawaj wariantów size/position/state bez prośby
- Po approve Figmy: mirror w @pacurap/design-system (tokens/CSS/React/GUIDELINES/Storybook)
```

## Luka tokenu — `[GAP: token component/…]`

Gdy widok wymaga koloru (lub spacing/radius), a **nie ma** odpowiedniego `component/*` w kolekcji Theme:

1. Oznacz **`[GAP: token component/{obszar}/{właściwość}]`**
2. Podaj hex / opis z kopii Make i najbliższy istniejący token (dlaczego nie pasuje)
3. **Nie** zostawiaj płaskiego `{ r, g, b }` / `#hex` jako finalnego stanu — ekran = **PARTIAL** do czasu tokenu w DS
4. Prompt → **`design-system-kit`** (nowe okno). Reguła: `.cursor/rules/figma-designs-tokens.mdc`

### Format raportu (token)

```markdown
### [GAP: token component/overlay/scrim/background]

- **Potrzebne w widoku:** {ViewName} — warstwa {np. Overlay podglądu}
- **Z kopii Make:** {#0A0F2E @ 95% — opis warstwy}
- **Najbliższy DS:** {component/modal/background lub brak} — dlaczego za mało
- **Propozycja:** component/… → semantic/… (Light + Dark)
- **Priorytet:** blokuje DONE | PARTIAL z placeholderem do rebindu
```

### Szablon promptu (token)

```text
Użyj skilla design-system-kit. Dodaj w Design System (fileKey p522mlcVwW78HOdKKBupPE)
token w kolekcji Theme: „{component/obszar/właściwość}” aliasujący „{semantic/…}”.
Phase 1: tylko Figma (variables + ewentualnie nowy component/* jeśli trzeba), STOP na approve.

Kontekst:
- Widok Designs: {ViewName} ({node-id})
- Warstwa: {overlay / highlight / border…}
- Wartość referencyjna z kopii Make: {hex + opacity / opis warstwy}
- Najbliższy istniejący token: {…} — dlaczego nie wystarcza

Wymagania:
- Light + Dark przez semantic/*
- Bind wyłącznie przez component/* (nigdy semantic/* na node)
- Po approve: mirror tokens.css + publish biblioteki; follow-up eksportu — rebind warstwy w Designs
```

## Kiedy NIE zgłaszać GAP

| Sytuacja | Zamiast GAP |
|---|---|
| FilterDropdown / podobny single-select | `select` (patrz `component-map.md`) |
| Ikona Lucide | `icon/*` z DS |
| Kolor już pokryty przez INSTANCE DS | nic nie rebindinguj |
| Istniejący `component/*` pasuje wizualnie | użyj `setBoundVariableForPaint` na tym tokenie |
| Modal / panel / dialog | istniejące overlaye DS (`modal`, `panel`, …) |

## Po skopiowaniu promptu przez usera

User otwiera **nowe okno / nowy czat** i wkleja prompt. Ta sesja:

1. Ładuje skill `design-system-kit` (+ `resource:figma-use` / library wg skilla)
2. Phase 1: komponent w Design System → approve → Phase 2+: mirror w repo
3. User publikuje bibliotekę w Designs / npm wg faz skilla
4. W sesji eksportu ekranu (lub follow-up) zamieniamy lukę na właściwą instancję
