# Wzorzec treści — Bank pytań (tabele)

**Shell aplikacji** (header / sideNav / main 16px): zawsze [`138:9148`](https://www.figma.com/design/BGEwLOj9VeR8CDwzj0ClA3/Designs?node-id=138-9148) — zob. `layout-shell.md`.

**Referencja układu tabeli:** strona **Pawel** → frame **Bank pytań** [`56:1819`](https://www.figma.com/design/BGEwLOj9VeR8CDwzj0ClA3/Designs?node-id=56-1819)  
**1440×681** · treść w `exams` jak lista testów

> Agent **nie** składa tabeli z `card` + ręcznych `table/row`. Użyj kompozytu **`table`** i sekcji **`exams`**.

## Hierarchia

```
Bank pytań (FRAME — GRID jak Tests)
├── header          (INSTANCE)
├── sideNav         (INSTANCE, Expanded=False)
└── main            (FRAME)
    ├── pageHeader  (INSTANCE)
    │   ├── tytuł: Bank pytań
    │   ├── subtitle: Zarządzaj biblioteką pytań…
    │   ├── button: Dodaj pytanie (+ icon/add)
    │   ├── tabs      → ukryj (visible=false)
    │   └── filters   → ukryj (view-mode z Tests)
    └── exams         (FRAME — treść widoku, jak lista testów)
        ├── Filters   (FRAME)
        │   ├── Left Side (HORIZONTAL)
        │   │   ├── inputText   — „Szukaj pytań...”
        │   │   ├── select      — „Typ”
        │   │   └── select      — „Kategoria”
        │   └── select          — „Data: Najnowsze” (sort, po prawej)
        ├── Frame 1 / wrapper
        │   └── table (INSTANCE) — kompozyt DS, nie card!
        └── pagination (INSTANCE)
```

## Kluczowe komponenty (z referencji)

| Figma | componentKey | Uwagi |
|---|---|---|
| **`table`** | `42e416ec70fe5668a122b8ada02b2a37ea63dc66` | SLOT `rows#292:10` — wiersze w środku |
| `table/header` | `aee4b6612c7160e9cca632a6ab1bbe95361f6c6f` | wewnątrz `table` |
| `table/row` | `7268af8d2f72ec4a5d9664e67ad57084d27b9e1f` | w SLOT `rows` |
| `badge` | `245cd4cdbfc844bc0f1ee0f03d74c62228e14557` | kategoria w komórce (nie `tag`) |
| `icon / edit` | `72da0aea353d7b25ac7b7fc9769369025c1f6603` | akcja edycji |
| `icon / visibility` | `7e034f35f86a2a4924a4e49418e3cd750dba57ee` | akcja podglądu |
| `select` | `c63ec552…` | filtry Typ/Kategoria + sort (×3, **nie** multiselect) |
| `pagination` | `7261f0d4983170192bfb2d7e8be0881c5b9ff6b7` | footer listy |

## Tabela — kolumny (Make QuestionTable)

| PYTANIE | KATEGORIA | TYP | UŻYCIE | AKCJE |
|---|---|---|---|---|
| treść pytania (truncate ~120) | `badge` neutral | Jednokrotny / Wielokrotny / Otwarte | „N testów” | 2× `iconButton` (visibility + edit) |

## Filtry

- **3× `select`** + **1× `inputText`** — zgodnie z referencją (FilterDropdown z Make → `select`, nie `multiselect`)
- Etykiety pól: `label#81:0` / edycja TEXT w Field
- **Bez** osobnych TEXT wrapperów nad select — DS wystarczy

## pageHeader

- Teksty: Bank pytań + subtitle + CTA
- **Ukryj:** `tabs`, wewnętrzne `filters` (iconButton grid/list z Tests)

## sideNav

- 3. pozycja **active** (Bank pytań)
- Ikony zgodne z Make; etykiety przez `SideNavItem` `Label#301:6` lub TEXT `Page name`

## Workflow agenta (poprawiony)

1. **Klonuj** shell z **`138:9148`** (`scripts/clone-shell.js`)
2. **pageHeader** — podmień copy; ukryj tabs + filters jeśli nie należą do widoku
3. **Sekcja `exams`** — układ Filters + table + pagination jak tutaj (`56:1819`)
4. **Instancja `table`** — wypełnij SLOT `rows` mock data z Make
5. **Cleanup** Designs + **mapa** FigJam
6. **Nie** twórz `qb-filters` / `qb-table` / `card`+ręczne składanie

## Antywzorce (unikaj)

| ❌ Źle | ✅ Dobrze |
|---|---|
| `card` + `table/header` + N× `table/row` ręcznie | jedna instancja **`table`** |
| `multiselect` ×2 dla filtrów | **`select`** ×2 (Typ, Kategoria) |
| `tag` na kategorię | **`badge`** neutral |
| `qb-filters` / `qb-table` obok pageHeader | **`exams` > Filters** |
| Luźne instancje / duplikaty na Designs | jedna kanoniczna ramka per widok |
| Shell z `1:2` (stary node) | shell z **`138:9148`** |
