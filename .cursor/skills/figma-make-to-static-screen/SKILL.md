---
name: figma-make-to-static-screen
description: "Convert Figma Make prototype views into static Figma screens in Designs, built only from the published Design System library — preserve functional flow, match shell gold standard Tests (138:9148), report DS gaps as a copy-paste prompt for a new chat (design-system-kit), and register each new view on the FigJam product map. Use whenever the user mentions Figma Make → static Figma, Make to Designs, przerób Make na DS, zmapuj widok z prototypu, przenoszenie widoków z Make, statyczne makiety z prototypu, rebuilding Make UI with DS components, dodaj widok do mapy produktu, or eksport ekranu z Make — even if they don't say 'skill'. Do not use for building a single DS component (design-system-kit) or designing a screen from scratch without Make (figma-generate-design). Requires Figma MCP (user-Figma)."
compatibility: "Figma MCP (use_figma, get_design_context, get_screenshot, get_figjam, search_design_system, get_libraries). Load resource:figma-use before every use_figma. FigJam map: use_figma on board file + get_figjam for read. Gap prompts target skill design-system-kit in a separate chat — do not call figma-generate-library from this workflow."
---

# Figma Make → statyczny ekran (Design System)

Przenieś **widok z niedoskonałego prototypu Figma Make** do **statycznej ramki** w pliku Designs, składając UI **wyłącznie z instancji biblioteki Design System**.

## Dwa priorytety (w tej kolejności)

1. **Flow funkcjonalny** — zachowaj ścieżkę z Make (routing, kroki, CTA, stany listy/modali) tak, by mapa produktu miała sens. Nie skracaj kroków bez zgody usera.
2. **Wyłącznie komponenty DS** — każda kontrolka to INSTANCE z biblioteki Design System. Brak 1:1 → **luka** (prompt do nowego okna), nie rysuj zamienników ręcznie.

## Stałe pliki

| Rola | URL | fileKey |
|---|---|---|
| **Design System** | [Design System](https://www.figma.com/design/p522mlcVwW78HOdKKBupPE/Design-System) | `p522mlcVwW78HOdKKBupPE` |
| **Designs** (cel eksportu) | [Designs](https://www.figma.com/design/BGEwLOj9VeR8CDwzj0ClA3/Designs) | `BGEwLOj9VeR8CDwzj0ClA3` |
| **Make** (źródło) | [Testy](https://www.figma.com/make/1y05CnoIzJUMsB0hykv3No/Testy) | `1y05CnoIzJUMsB0hykv3No` |
| **Mapa produktu** | [Workflow-diagram](https://www.figma.com/board/s5TEjN0KUj45gSLFW3Dotu/Workflow-diagram?node-id=0-1) | `s5TEjN0KUj45gSLFW3Dotu` |

**Złoty wzorzec shella:** [`Tests` / `138:9148`](https://www.figma.com/design/BGEwLOj9VeR8CDwzj0ClA3/Designs?node-id=138-9148) na stronie **Designs**.

Klucze i libraryKey: `references/files.md`. Shell i skrypty: `references/layout-shell.md`. Przed `use_figma`: `references/mcp-code-constraints.md` + `resource:figma-use`.

## Shell (wizualny kontrakt)

Wzorzec ma `layoutMode: GRID` — **nie musisz** go odtwarzać. Musisz uzyskać tę strukturę wizualną:

```text
Frame "{ViewName}" 1440 × HUG
├── header   (INSTANCE) — pełna szerokość, na górze (~65px)
├── sideNav  (INSTANCE) — lewa kolumna, od dołu headera do dołu ramki
└── main     (FRAME VERTICAL) — padding + gap 16 (`semantic/spacing/l` na wzorcu)
    ├── pageHeader (INSTANCE) — zwykle
    └── {content}  (FRAME) — treść widoku
```

**Preferuj klon** `138:9148` (`scripts/clone-shell.js` / skrypt w `layout-shell.md`), potem podmień treść — zamiast składać shell od zera.

**Nie duplikuj** istniejącego ekranu o tej samej roli (np. druga „Lista testów”), jeśli na Designs / mapie już jest kanoniczna ramka — **aktualizuj** ją albo zapytaj usera.

## Czym jest „statyczny widok”

- Jeden stan ekranu; instancje DS; mock data z Make.
- Overlaye / kolejne kroki → **osobne ramki**, nie ukryte warstwy.
- Motyw: **Light**, o ile user nie prosi inaczej.
- Iteracja: jeden podstawowy widok → akceptacja → dopiero kolejne stany.
- Native Figma Prototype (hotspoty) — **tylko gdy user poprosi** (szkic w `references/prototyping.md`).

## Luki w Design System

1. Nie składaj obejść z shape/text.
2. Najbliższy DS tylko gdy mapping jest w `component-map.md`.
3. Oznacz **`[GAP: nazwa]`** i daj **wypełniony prompt w fenced code block** (język `text`, łatwy copy-paste) — szablon: `references/gap-prompt.md`.
4. Prompt idzie do **nowego okna Cursor** ze skillem **`design-system-kit`**. W tej sesji **nie** twórz komponentu w Design System i **nie** wołaj `figma-generate-library`.

## Mapa produktu (obowiązkowy krok)

Po dodaniu / istotnej aktualizacji widoku: zaktualizuj FigJam (`references/product-map.md`) — node z markdown-linkiem do frame + connectory zgodnie z flow. Bez mapy = **PARTIAL**.

## Skille MCP (ta sesja)

- Przed **`use_figma`**: `resource:figma-use`
- Przy składaniu ekranu: `resource:figma-generate-design`
- FigJam: `resource:figma-use` (+ `resource:figma-use-figjam` gdy dostępne)
- **Nie** ładuj `figma-generate-library` tutaj — to robi osobny czat z `design-system-kit`

W `skillNames`: `resource:figma-use,resource:figma-generate-design,figma-make-to-static-screen`.

## Workflow

### 1. Widok i flow

Make nie ma `get_metadata` — bierz **kod**: `get_design_context` → `App.tsx` + komponent widoku. Zanotuj CTA / przejścia. Sprawdź mapę (`get_figjam`), czy node i kanoniczny frame już istnieją.

### 2. Klucze DS

1. Read-only discovery na `138:9148` (skrypt w `layout-shell.md`) albo użyj `component-map.md`.
2. `search_design_system` na Designs + `includeLibraryKeys` z `files.md` dla braków.
3. Tylko biblioteka **Design System**.

### 3. Ramka

1. Klon shella lub aktualizacja istniejącej ramki.
2. Pozycja nowych ramek: `maxX + 200` na stronie **Designs**.
3. `pageHeader` + treść (INSTANCE + mock data).
4. Screenshot vs shell i intencja Make.
5. `cleanup-checklist.md` na stronie Designs.

### 4. Luki + mapa + odpowiedź

Wypisz GAP-y, zaktualizuj FigJam, zakończ **szablonem poniżej**.

## Definition of done

- [ ] Shell jak `138:9148` (wizualnie; GRID nieobowiązkowy)
- [ ] Kontrolki = INSTANCE DS; treść wypełniona (shell-only = PARTIAL)
- [ ] Flow zachowany (osobne ramki na stany gdy trzeba)
- [ ] Luki = `[GAP]` + prompt w bloku kodu (albo zero luk)
- [ ] FigJam z linkiem; cleanup strony Designs

## Szablon odpowiedzi końcowej

Zawsze kończ w tej formie:

```markdown
## Eksport: {ViewName}

- **Frame:** https://www.figma.com/design/BGEwLOj9VeR8CDwzj0ClA3/Designs?node-id={id-with-dashes}
- **Status:** DONE | PARTIAL — {jedno zdanie dlaczego}
- **Mapa:** zaktualizowana | pominięta ({powód}) — {link node jeśli nowy}

### Luki DS
{„brak” albo sekcje [GAP: …] z promptem w fenced code block language=text}

### Uwagi
{opcjonalnie: co wymaga akceptacji przed kolejnymi stanami}
```

## Granice

- Nie edytuj Make ani Design System w tej sesji.
- Nie używaj `generate_figma_design` jako finalnego deliverable.
- Nie wymagaj `layoutMode: GRID`.
- Nie buduj Prototype, dopóki user nie poprosi.

## Odniesienia (ładuj gdy potrzeba)

| Plik | Kiedy |
|---|---|
| `references/files.md` | Klucze plików / libraryKey |
| `references/layout-shell.md` | Shell, klon, checklist |
| `scripts/clone-shell.js` | Bezpieczny klon `138:9148` pod MCP JSON |
| `references/component-map.md` | Keys komponentów |
| `references/gap-prompt.md` | Szablon promptu luki |
| `references/product-map.md` | FigJam |
| `references/make-views.md` | Lista widoków Make |
| `references/cleanup-checklist.md` | Po eksporcie |
| `references/mcp-code-constraints.md` | Przed `use_figma` |
| `references/eval-learnings.md` | Antywzorce (tabele / Bank pytań) |
| `references/reference-gold-standard.md` | Układ tabeli Bank pytań |
| `references/prototyping.md` | Tylko gdy user chce native Prototype |
| `GUIDELINES.md` (repo) | API React kitu |
