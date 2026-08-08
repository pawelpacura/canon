# Question Bank — wypełnianie treścią (Make → Figma)

> **Shell:** [`138:9148`](https://www.figma.com/design/BGEwLOj9VeR8CDwzj0ClA3/Designs?node-id=138-9148). **Układ tabeli:** [`reference-gold-standard.md`](reference-gold-standard.md) (`56:1819`).

Klonuj shell z `138:9148`, potem zbuduj sekcję **`exams`** + kompozyt **`table`**.

## Ramka docelowa

- **Shell:** `138:9148` na stronie **Designs**
- **Referencja tabeli:** [`56:1819`](https://www.figma.com/design/BGEwLOj9VeR8CDwzj0ClA3/Designs?node-id=56-1819) (Pawel) — tylko treść `exams`

## Mock data (pierwsze 5 pytań z Make)

| # | PYTANIE | KATEGORIA | TYP | UŻYCIE |
|---|---|---|---|---|
| 1 | Jakie są podstawowe zasady BHP w miejscu pracy? | BHP | Jednokrotny | 2 testów |
| 2 | Które z poniższych działań są obowiązkowe przed rozpoczęciem pracy? | BHP | Wielokrotny | 1 test |
| 3 | Opisz procedurę postępowania w przypadku pożaru w miejscu pracy. | BHP | Otwarte | 1 test |
| 4 | Jakie są główne cele biznesowe na pierwszy kwartał? | Biznes | Wielokrotny | 0 testów |
| 5 | Które wartości są kluczowe w naszej organizacji? | HR | Wielokrotny | 1 test |

Typy: `single` → Jednokrotny, `multiple` → Wielokrotny, `open` → Otwarte.

## Tabela — użyj kompozytu `table`

**componentKey:** `42e416ec70fe5668a122b8ada02b2a37ea63dc66`

- SLOT **`rows#292:10`** — dodawaj `table/row` instancje
- Nagłówek: `tableHeader` wewnątrz komponentu (nie osobno na page)
- Kategoria: **`badge`** (variant=neutral), tekst w node **`szkic`**
- Akcje: `iconButton` + `swapComponent` → `icon / visibility`, **`icon / edit`** (`72da0aea…`)

## Filtry (`exams` > `Filters`)

| Pole | Komponent | Etykieta |
|---|---|---|
| Search | `inputText` | Szukaj pytań... |
| Typ | **`select`** | Typ |
| Kategoria | **`select`** | Kategoria |
| Sort | `select` (prawa strona) | Data: Najnowsze |

Spec: `references/filter-labels.md` — **select**, nie multiselect.

## sideNav (Make)

4 pozycje aktywne + opcjonalnie Ustawienia; Bank pytań = **active**.  
`icon/library_add_check` na aktywnym. Szczegóły: `reference-gold-standard.md`.

## Cleanup

`references/cleanup-checklist.md` — jedna ramka, brak luźnych instancji, brak antywzorców `qb-*`.
