# Eval — wnioski (antywzorce)

Wnioski z nieudanych eksportów (m.in. Bank pytań vs wzorzec tabeli). Czytaj przy listach/tabelach.

**Shell aplikacji** zawsze z [`138:9148`](https://www.figma.com/design/BGEwLOj9VeR8CDwzj0ClA3/Designs?node-id=138-9148).  
**Układ tabeli Bank pytań:** `reference-gold-standard.md` (`56:1819` — tylko treść `exams`, nie stary shell `1:2`).

## Definicja „done”

Ekran jest gotowy dopiero gdy:

1. **Treść** — mock data z Make, nie placeholdery „Cell content”
2. **Architektura** — shell jak `138:9148`; dla tabel: `main` → `exams` → Filters + **`table`** + `pagination`
3. **Jedna kanoniczna ramka** na widok na stronie **Designs** (+ osobne ramki stanów)
4. **Mapa** zaktualizowana linkiem
5. **Screenshot** porównany ze shelliem / wzorcem treści

Shell sam w sobie ≠ sukces.

## Błędy (nie powtarzać)

| # | Błąd | Skutek |
|---|---|---|
| 1 | `card` + ręczne `table/row` | Zła struktura, puste komórki |
| 2 | `multiselect` zamiast `select` (filtry QB) | Niezgodność z mappingiem |
| 3 | Warstwy `qb-filters` / `qb-table` | Bałagan obok pageHeader |
| 4 | `tag` zamiast `badge` | Zły komponent |
| 5 | Duplikat „Lista testów” zamiast update | Śmietnik na Designs |
| 6 | Raport DONE przy samym shellu | Fałszywy sukces |
| 7 | Tworzenie brakującego komponentu w tej sesji | Miało być `[GAP]` + prompt do nowego okna |
| 8 | Odtwarzanie GRID za wszelką cenę | Zepsuty layout MCP |

## Kolejność (Bank pytań / tabela)

1. Klonuj shell z **`138:9148`**
2. `pageHeader` — copy; ukryj tabs/filters jeśli nie należą
3. `exams` — Filters + **`table`** + pagination (wzorzec treści `56:1819`)
4. Wypełnij SLOT `rows` mock data
5. Cleanup Designs + mapa FigJam

## Komunikacja

- Nie obiecuj idealnego wyniku w „5 min” — ocena w Figma
- Blokada MCP → **PARTIAL** z listą braków, nie DONE
