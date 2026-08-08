# Luki DS — raport + prompt do stworzenia komponentu

Gdy Make (lub widok) wymaga UI, którego **nie ma** w Design System (albo nie da się uczciwie zmapować 1:1):

1. Oznacz lukę w odpowiedzi: **`[GAP: ComponentName]`**
2. Wskaż najbliższy istniejący odpowiednik (jeśli jest) i dlaczego nie wystarcza
3. Dołącz **wypełniony prompt w fenced code block** (```text … ```) — user kopiuje w całości
4. User odpala prompt w **nowym oknie / nowym czacie** Cursor ze skillem **`design-system-kit`**. Ta sesja eksportu ekranu **nie** edytuje pliku Design System.

## Format raportu (w odpowiedzi do usera)

```markdown
### [GAP: NazwaKomponentu]

- **Potrzebne w widoku:** {ViewName} (`node-id` jeśli już jest)
- **W Make / kodzie:** {plik + zachowanie}
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
- Widok / flow: {skąd z Make / mapy}
- Zachowanie: {co robi, stany logiczne które MUSZĄ być properties}
- Zawartość: {sloty, tekst, ikony, footer…}

Wymagane properties (minimalny zestaw):
- {TEXT / BOOLEAN / INSTANCE_SWAP / SLOT — lista}

Tokeny (alias component/* → semantic/*):
- background, border, foreground, padding, radius, … (doprecyzuj)

Referencje wizualne:
- Make: {opis lub ścieżka pliku}
- Podobny komponent w DS: {modal / panel / select / …} — skopiuj schemat API jeśli pasuje

Acceptance:
- Instancja da się wstawić w Designs w shellu Tests (138:9148)
- Light + Dark przez Theme
- Opis komponentu uzupełniony
- Nie dodawaj wariantów size/position/state bez prośby
- Po approve Figmy: mirror w @pacurap/design-system (tokens/CSS/React/GUIDELINES/Storybook)
```

## Kiedy NIE zgłaszać GAP

| Sytuacja | Zamiast GAP |
|---|---|
| FilterDropdown / podobny single-select | `select` (patrz `component-map.md`) |
| Ikona Lucide | `icon/*` z DS |
| Kolor hex z Tailwinda | token Theme / wariant `badge` |
| Modal / panel / dialog | istniejące overlaye DS (`modal`, `panel`, …) |

## Po skopiowaniu promptu przez usera

User otwiera **nowe okno / nowy czat** i wkleja prompt. Ta sesja:

1. Ładuje skill `design-system-kit` (+ `resource:figma-use` / library wg skilla)
2. Phase 1: komponent w Design System → approve → Phase 2+: mirror w repo
3. User publikuje bibliotekę w Designs / npm wg faz skilla
4. W sesji eksportu ekranu (lub follow-up) zamieniamy lukę na właściwą instancję
