---
name: figma-make-to-static-screen
description: "Convert user-provided Figma Design frames (copies exported from Figma Make) into static Figma screens in Designs, built only from the published Design System library — Theme tokens (component/*), never flat hex/RGB; report missing tokens as [GAP: token …] to design-system-kit — preserve functional flow, match shell gold standard Tests (138:9148), report DS gaps as copy-paste prompts, and register each new view on the FigJam product map. Trigger whenever the user sends a Figma design URL of a Make copy, asks Make → static Figma / Make to Designs / przerób kopię Make na DS / przenieś widok z prototypu / statyczna makieta z DS / eksport ekranu do Designs / dodaj widok do mapy produktu — even if they don't say 'skill'. Do not use for building a single DS component (design-system-kit) or designing a screen from scratch without a source frame (figma-generate-design). Requires Figma MCP (user-Figma)."
compatibility: "Figma MCP (use_figma, get_design_context, get_metadata, get_screenshot, get_figjam, search_design_system, get_libraries). Load resource:figma-design-to-code before get_design_context on source frames. Load resource:figma-use before every use_figma. FigJam map: use_figma on board file + get_figjam for read. Gap prompts target skill design-system-kit in a separate chat — do not call figma-generate-library from this workflow."
---

# Kopia Make (Figma Design) → statyczny ekran (Design System)

User wysyła **link do ramki w zwykłej Figmie** — to kopia widoku z Figma Make. Na jej bazie zbuduj **statyczną ramkę** w pliku **Designs**, składając UI **wyłącznie z instancji biblioteki Design System**.

```text
User: figma.com/design/…?node-id=…  (kopia Make)
  → odczyt (screenshot + metadata + design context)
  → rebuild w Designs (shell 138:9148 + INSTANCE DS + tokeny component/*)
  → FigJam + [GAP] gdy brakuje DS
```

## Trzy priorytety (w tej kolejności)

1. **Flow funkcjonalny** — zachowaj ścieżkę z kopii (kroki, CTA, stany listy/modali) tak, by mapa produktu miała sens. Nie skracaj kroków bez zgody usera.
2. **Wyłącznie komponenty DS** — każda kontrolka to INSTANCE z biblioteki Design System. Brak 1:1 → **luka** (prompt do nowego okna), nie rysuj zamienników ręcznie.
3. **Tokeny Theme, nie płaskie kolory** — reguła workspace `.cursor/rules/figma-designs-tokens.mdc`. Brak tokenu → `[GAP: token …]` (`references/gap-prompt.md`).

## Stałe pliki

| Rola | URL | fileKey |
|---|---|---|
| **Wejście (kopia Make)** | **User podaje w prompcie** — `figma.com/design/…?node-id=…` | z URL |
| **Design System** | [Design System](https://www.figma.com/design/p522mlcVwW78HOdKKBupPE/Design-System) | `p522mlcVwW78HOdKKBupPE` |
| **Designs** (cel eksportu) | [Designs](https://www.figma.com/design/BGEwLOj9VeR8CDwzj0ClA3/Designs) | `BGEwLOj9VeR8CDwzj0ClA3` |
| **Mapa produktu** | [Workflow-diagram](https://www.figma.com/board/s5TEjN0KUj45gSLFW3Dotu/Workflow-diagram?node-id=0-1) | `s5TEjN0KUj45gSLFW3Dotu` |
| Make (legacy, opcjonalnie) | [Testy](https://www.figma.com/make/1y05CnoIzJUMsB0hykv3No/Testy) | `1y05CnoIzJUMsB0hykv3No` |

**Złoty wzorzec shella:** [`Tests` / `138:9148`](https://www.figma.com/design/BGEwLOj9VeR8CDwzj0ClA3/Designs?node-id=138-9148) na stronie **Designs**.

Wejście i odczyt kopii: `references/source-input.md`. Klucze i libraryKey: `references/files.md`. Shell: `references/layout-shell.md`. Przed `use_figma`: `references/mcp-code-constraints.md` + `resource:figma-use`.

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

- Jeden stan ekranu; instancje DS; mock data z **ramki źródłowej** (kopia Make).
- Overlaye / kolejne kroki → **osobne ramki**, nie ukryte warstwy.
- Motyw: **Light**, o ile user nie prosi inaczej.
- Iteracja: jeden podstawowy widok → akceptacja → dopiero kolejne stany.
- Native Figma Prototype (hotspoty) — **tylko gdy user poprosi** (szkic w `references/prototyping.md`).

## Luki w Design System

1. Nie składaj obejść z shape/text.
2. Najbliższy DS tylko gdy mapping jest w `component-map.md`.
3. Oznacz **`[GAP: nazwa]`** (komponent) lub **`[GAP: token component/…]`** (brak tokenu) i daj **wypełniony prompt w fenced code block** (język `text`, łatwy copy-paste) — szablon: `references/gap-prompt.md`.
4. Prompt idzie do **nowego okna Cursor** ze skillem **`design-system-kit`**. W tej sesji **nie** twórz komponentu/tokenu w Design System i **nie** wołaj `figma-generate-library`.
5. **Nie używaj płaskich kolorów** jako obejścia brakującego tokenu — zgłoś lukę; user doda token w DS, potem rebind w follow-up.

## Mapa produktu (obowiązkowy krok)

Po dodaniu / istotnej aktualizacji widoku: zaktualizuj FigJam (`references/product-map.md`) — node z markdown-linkiem do frame + connectory zgodnie z flow. Bez mapy = **PARTIAL**.

## Skille MCP (ta sesja)

- Przed **`get_design_context`** na ramce źródłowej: `resource:figma-design-to-code`
- Przed **`use_figma`**: `resource:figma-use`
- Przy składaniu ekranu: `resource:figma-generate-design`
- FigJam: `resource:figma-use` (+ `resource:figma-use-figjam` gdy dostępne)
- **Nie** ładuj `figma-generate-library` tutaj — to robi osobny czat z `design-system-kit`

W `skillNames`: `resource:figma-design-to-code,resource:figma-use,resource:figma-generate-design,figma-make-to-static-screen`.

## Workflow

### 1. Ramka źródłowa i flow

1. Weź **URL Figma Design** od usera (`references/source-input.md`) — brak linku → poproś o ramkę kopii Make.
2. Równolegle: `get_screenshot` + `get_metadata` + `get_design_context` na `fileKey` / `nodeId` źródła.
3. Zanotuj CTA, przejścia, mock data, overlaye z warstw kopii.
4. `get_figjam` — czy node i kanoniczny frame w Designs już istnieją.
5. **Nie** czytaj Figma Make bezpośrednio, chyba że user poda make URL i brak kopii w Design.

### 2. Klucze DS

1. Read-only discovery na `138:9148` (skrypt w `layout-shell.md`) albo użyj `component-map.md`.
2. `search_design_system` na Designs + `includeLibraryKeys` z `files.md` dla braków.
3. Tylko biblioteka **Design System**.

### 3. Ramka docelowa w Designs

1. Klon shella lub aktualizacja istniejącej ramki.
2. Pozycja nowych ramek: `maxX + 200` na stronie **Designs**.
3. `pageHeader` + treść (INSTANCE + mock data z kopii).
4. Własne powierzchnie (overlay, scrim) — rule `figma-designs-tokens.mdc`; brak → `[GAP: token …]`.
5. Screenshot docelowy vs shell, vs **ramka źródłowa** (intencja wizualna).
6. `cleanup-checklist.md` na stronie Designs.

### 4. Luki + mapa + odpowiedź

Wypisz GAP-y, zaktualizuj FigJam, zakończ **szablonem poniżej**.

## Definition of done

- [ ] Shell jak `138:9148` (wizualnie; GRID nieobowiązkowy)
- [ ] Kontrolki = INSTANCE DS; treść wypełniona (shell-only = PARTIAL)
- [ ] Kolory/spacing/radius = tokeny **`component/*`**; brak płaskich hex/RGB na nowych warstwach
- [ ] Flow zachowany (osobne ramki na stany gdy trzeba)
- [ ] Luki = `[GAP]` / `[GAP: token …]` + prompt w bloku kodu (albo zero luk)
- [ ] FigJam z linkiem; cleanup strony Designs

## Szablon odpowiedzi końcowej

Zawsze kończ w tej formie:

```markdown
## Eksport: {ViewName}

- **Źródło (kopia Make):** {URL ramki źródłowej}
- **Frame:** https://www.figma.com/design/BGEwLOj9VeR8CDwzj0ClA3/Designs?node-id={id-with-dashes}
- **Status:** DONE | PARTIAL — {jedno zdanie dlaczego}
- **Mapa:** zaktualizowana | pominięta ({powód}) — {link node jeśli nowy}

### Luki DS
{„brak” albo sekcje [GAP: …] / [GAP: token …] z promptem w fenced code block language=text}

### Uwagi
{opcjonalnie: co wymaga akceptacji przed kolejnymi stanami}
```

## Granice

- **Nie edytuj** pliku źródłowego (kopii Make) — tylko odczyt.
- Nie edytuj Design System w tej sesji.
- Nie czytaj Figma Make, dopóki user nie wskaże make URL z brakiem kopii w Design.
- Nie modyfikuj plików TS (`routes.ts`, `pages/*`, `apps/proto`) — prototyp w kodzie to osobny czat w repo Canon (`references/prototyping.md`).
- Nie używaj `generate_figma_design` jako finalnego deliverable.
- Nie wymagaj `layoutMode: GRID`.
- Nie buduj Prototype, dopóki user nie poprosi.

## Odniesienia (ładuj gdy potrzeba)

| Plik | Kiedy |
|---|---|
| `references/source-input.md` | **Zawsze na start** — URL kopii Make, odczyt MCP |
| `references/files.md` | Klucze plików / libraryKey |
| `references/layout-shell.md` | Shell, klon, checklist |
| `scripts/clone-shell.js` | Bezpieczny klon `138:9148` pod MCP JSON |
| `references/component-map.md` | Keys komponentów |
| `references/gap-prompt.md` | Szablon promptu luki |
| `references/product-map.md` | FigJam |
| `references/make-views.md` | Katalog widoków (legacy Make — flow) |
| `references/cleanup-checklist.md` | Po eksporcie |
| `references/tokens.md` | Index → workspace rule + linki skillowe |
| `references/mcp-code-constraints.md` | Przed `use_figma` |
| `references/eval-learnings.md` | Antywzorce (tabele / Bank pytań) |
| `references/reference-gold-standard.md` | Układ tabeli Bank pytań |
| `references/prototyping.md` | Tylko gdy user chce prototyp poza Make (native Figma Prototype **lub** SPA w kodzie — oba poza tą sesją; patrz plik) |
| `GUIDELINES.md` (repo) | API React kitu |
