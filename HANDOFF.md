# HANDOFF — przepływ Ja → Cursor → Figma → npm

Jestem właścicielem design systemu **@pacurap/design-system**. Pracuję w Cursorze nad projektem lokalnym, synchronizuję zmiany z Figmą przez MCP, a paczkę publikuję na npm. **Kontynuuj ten sam przepływ pracy** — nie wymyślaj od zera, nie omijaj Figma MCP, nie hardcoduj wartości poza tokenami.

---

## Środowisko

| Co | Wartość |
|---|---|
| Workspace | `/Users/pawelpacura/Projects/design-system-kit` |
| Paczka npm | `@pacurap/design-system` |
| Wersja lokalna | sprawdzaj `package.json` (ostatnio **0.13.3**) |
| Wersja na npmjs.org | `npm view @pacurap/design-system version` |
| Maintainer npm | `pacurap` |
| Font | Poppins (Google Fonts, nie w paczce) |

---

## Pliki Figma

| Rola | fileKey | URL |
|---|---|---|
| **Design System** (źródło biblioteki, tokeny, komponenty) | `p522mlcVwW78HOdKKBupPE` | https://www.figma.com/design/p522mlcVwW78HOdKKBupPE/Design-System |
| **Designs** (prototypy, ekrany docelowe) | `BGEwLOj9VeR8CDwzj0ClA3` | https://www.figma.com/design/BGEwLOj9VeR8CDwzj0ClA3/Designs |
| **Make** (kod źródłowy prototypów) | `1y05CnoIzJUMsB0hykv3No` | https://www.figma.com/make/1y05CnoIzJUMsB0hykv3No/Testy |

**Biblioteka DS w Designs:**

```
libraryKey: lk-75a3bbae2ee65bae84e464b92a99d2355155aefa359326dfc7bacc4e4176423db3488c280865c89e55de1bbd131c1ca0a545fc6309f5353f6eb137823c1bdec0
```

Przy `search_design_system` zawsze: `fileKey: BGEwLOj9VeR8CDwzj0ClA3` + ten `includeLibraryKeys`.

---

## Przepływ pracy (to ma działać tak samo)

```
Ja (decyzje, akceptacja)
  ↓
Cursor (implementacja)
  ├── Figma DS  → tokeny + komponenty źródłowe (use_figma, get_design_context)
  ├── Figma Designs → instancje DS na ekranach (podmiana pól, layout)
  ├── Repo      → tokens.css + components.css + React + Storybook
  └── npm       → build + publish publiczny
        ↓
Devs / Figma Make → npm install @pacurap/design-system
```

**Skill orkiestrujący DS (Figma → approve → kod → Storybook → bump → publish):**  
`.cursor/skills/design-system-kit/SKILL.md` — lead zawsze Figma; kolejne fazy tylko po approve.  
Ekrany Make → Designs: osobny skill `figma-make-to-static-screen`.

**Zasada:** Figma DS ↔ repo to **1:1 mirror**. Zmiana w Figmie → token/komponent w repo (po approve). Prototypy w Designs używają **instancji** z biblioteki DS, nie surowych ramek.

---

## MCP Figma — obowiązkowe reguły

1. **Przed `use_figma`** — zawsze wczytaj skill `figma-use` (`resource:figma-use`).
2. **Przed `get_design_context`** (design → code) — skill `figma-design-to-code`.
3. **Przed `generate_diagram`** — skill `figma-generate-diagram`.
4. **Przed tworzeniem komponentów w DS** — czytaj `.cursor/rules/figma-component-frames.mdc`.

**Architektura tokenów w Figmie (Theme collection):**

```
Generic → semantic/* → component/*
```

- **Nigdy** nie binduj węzłów bezpośrednio do Generic ani `semantic/*`.
- **Zawsze** binduj do `component/*` (aliasuje `semantic/*`).
- CSS publiczny: `--color-component-card-background`, `--radius-m`, `--component-table-radius` itd.

**Komponenty w Figmie — „less is more”:**

- Preferuj pojedynczy `COMPONENT`, nie siatki wariantów.
- BOOLEAN (`Show Footer`), SLOT (`Content`, `Footer`), TEXT (`Title`).
- Stany interakcji (hover/pressed) — w CSS/repo, nie jako warianty Figma (wyjątek: inputText, button itd. gdzie już istnieją).
- **Nie usuwaj fioletowej ramki** `COMPONENT_SET` (chrome `#9747FF`, dash 10/5).

**Wzorce referencyjne komponentów DS:**

| Komponent | nodeId |
|---|---|
| `modal` | `280:377` |
| `panel` | `280:750` |
| `accordion` | `359:599` |
| `table` | `292:465` |
| `button` | component set na stronie `button` |

---

## Kluczowe ekrany w Designs

| Frame | nodeId | Opis |
|---|---|---|
| `Tests` | `1:2` | Lista testów — wzorzec shell (header + sideNav + pageHeader + ExamItem) |
| `Settings` | `33:697` / content `33:698` | Ustawienia badań — accordiony + pola formularza |
| `Settings - All Opened` | `36:3167` | Rozwinięte sekcje |
| `Bank pytań` (strona Pawel) | `56:1819` | **Złoty standard** — tabela + paginacja |

---

## Repo — struktura

```
src/
  tokens.css      ← wszystkie CSS custom properties (mirror Figma Theme)
  components.css  ← klasy .ds-* (mirror komponentów Figma)
  *.tsx           ← komponenty React (Button, InputText, Card, …)
  *.stories.tsx   ← Storybook
  icons/          ← Material Symbols → React (scripts/generate-icons.mjs)
scripts/
  publish-public.mjs  ← publish na npm (omija konflikt .npmrc Figma)
.cursor/rules/figma-component-frames.mdc
.cursor/skills/figma-make-to-static-screen/  ← skill do ekranów Make→Designs
GUIDELINES.md   ← mapowanie Figma↔React dla devów
```

**Komponenty React w paczce:** Button, IconButton, InputText, Select, MultiSelect, TextArea, Checkbox, Radio, Switcher, Avatar, Badge, Banner, Logo, Link, Tab, Tabs, SideNav, SideNavItem, Header, PageHeader, ExamItem, Card + ikony.

**Brak jeszcze w React (są w Figmie / CSS):** `table`, `accordion`, `modal`, `panel`, `pagination` — tokeny/CSS częściowo istnieją (np. `.ds-table`, footer tabeli).

---

## npm — dwa registry (WAŻNE)

| Registry | Cel | Konfiguracja |
|---|---|---|
| **registry.npmjs.org** | Publiczny npm dla devów | `npm login`, `npm run publish:public` |
| **registry Figma** | Figma Make / Code Connect | lokalny `.npmrc` (gitignored) |

**Problem który już naprawiliśmy:** lokalny `.npmrc` kieruje `@pacurap` na Figma registry → publish na npmjs dawał **404**. Rozwiązanie: `scripts/publish-public.mjs` chowa `.npmrc` na czas publishu + `publishConfig` w `package.json`.

**Publish (zawsze ta kolejność):**

```bash
cd /Users/pawelpacura/Projects/design-system-kit
npm whoami --registry=https://registry.npmjs.org   # musi zwrócić: pacurap
# jeśli nie:
npm logout --registry=https://registry.npmjs.org
npm login --registry=https://registry.npmjs.org --auth-type=web

npm run publish:public   # build + publish 0.13.1+
```

**Instalacja u devów:**

```bash
npm install @pacurap/design-system
```

```tsx
import "@pacurap/design-system/styles.css";
import { Button, InputText, Card } from "@pacurap/design-system";
```

**Storybook lokalnie (NIE w paczce npm):**

```bash
npm run storybook          # http://localhost:6006
npm run build-storybook    # storybook-static/
```

---

## Ostatni stan pracy (lipiec 2026)

**Zrobione:**

- Tokeny tekstów (pageHeader, form labels)
- Ramki sekcji → tokeny `component/card/*`
- Komponent `accordion` w Figmie + podpięcie w Settings
- Pola Settings według spec API (9 accordionów, inputText/select/textArea/checkbox)
- Full-width inputy (Field HUG→FILL)
- **Tabela:** `component/table/radius` → `semantic/radius/m` (8px), `clipsContent: true` w Figmie; w repo `--component-table-radius` + `.ds-table`
- Publish script naprawiony; skill orkiestrujący: `.cursor/skills/design-system-kit/`

**Do dokończenia:**

- GitHub + minimalne CI (`typecheck` / `build`) — po skillu
- Utrzymywać mirror Figma↔React dla luk: table, accordion, modal, panel, pagination

---

## Jak formułować zadania (dla AI)

Przykłady które działają dobrze:

- „Dodaj token X w Figmie DS i w `tokens.css`, potem binduj w komponencie Y”
- „Podmień surowe pola w Settings (`33:698`) na instancje inputText/select”
- „Tabela musi mieć radius jak card — Figma + repo”
- „Bump do 0.13.2 i publish na npm”

**Nie rób:**

- Hardcodowanych kolorów/spacingów poza tokenami
- Usuwania fioletowej ramki component setów
- Commitów/pushy bez prośby użytkownika
- Publishu na npm bez bumpu wersji (npm blokuje republish)

---

## Pliki kontekstowe w repo (czytaj przy potrzebie)

- `.cursor/rules/figma-component-frames.mdc` — reguły komponentów Figma
- `.cursor/skills/design-system-kit/SKILL.md` — build/update DS (Figma → kod → npm), fazy z approve
- `.cursor/skills/figma-make-to-static-screen/SKILL.md` — Make → statyczne ekrany Designs
- `.cursor/skills/figma-make-to-static-screen/references/files.md` — nodeId, fileKey
- `.cursor/skills/figma-make-to-static-screen/references/component-map.md` — mapowanie komponentów
- `DRIFT.md` — snapshot rozjazdu Figma↔repo (2026-08-08)
- `GUIDELINES.md` — dokumentacja dla devów konsumujących paczkę

---

## Pierwsze polecenie po wklejeniu

Potwierdź że rozumiesz ten handoff i kontynuuj pracę w tym samym przepływie. Jeśli nie wiesz od czego zacząć — dokończ publish **0.13.1** na npm albo zapytaj mnie co jest priorytetem.
