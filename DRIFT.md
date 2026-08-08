# Figma ↔ repo — rozjazd (snapshot 2026-08-08)

Jednorazowy audyt Design System (`p522mlcVwW78HOdKKBupPE`) vs `@pacurap/design-system`.  
Dalsza praca: skill `.cursor/skills/design-system-kit/` (Figma → approve → kod), bez stałego trybu audit.

## Theme

| | |
|---|---|
| Modes | Light, Dark |
| `component/*` | 310 |
| `semantic/*` | 110 |

## Figma jest → pełnego React brak

| Komponent Figma | node / page | Tokeny `component/*` | React | CSS |
|---|---|---|---|---|
| `modal` | `280:377` | tak | brak | brak |
| `panel` | `280:750` | tak | brak | brak |
| `accordion` | `359:599` | tak | brak | brak |
| `table` (+ cell/row/header) | `292:465` itd. | tak (dużo) | brak | częściowo `.ds-table` |
| `pagination` | `330:75` | tak | brak | brak |
| `progressBar` | set na stronie progressBar | tak | brak | brak |
| `stepper` / `step` | `401:595` / set | tak | brak | brak |
| `tag` | `287:35` | tak | brak | brak |
| `tooltip` | set | tak | brak | brak |
| `chipInput` | `414:537` | brak osobnej grupy (pewnie `input/*`) | brak | brak |

## W repo jest (React + zwykle Storybook)

Button, IconButton, InputText, Select, MultiSelect, TextArea, Checkbox, Radio, Switcher, Avatar, Badge, Banner, Logo, Link, Tab/Tabs, SideNav/SideNavItem, Header, PageHeader, ExamItem, Card + ikony z manifestu.

## Ikony

- Figma (Icons): ~33 unikalne komponenty
- `scripts/icons.manifest.json`: 22

Brak w manifescie m.in.: `alarm`, `article`, `check`, `close_small`, `drag_indicator`, `edit`, `help`, `settings`, `list`, `splitscreen`, `electric_bolt`.

## Drift odwrotny

`Banner` + tokeny banner w `tokens.css` są w kodzie; w Theme Figma nie widać grupy `component/banner/*` — do ewentualnego dopięcia w Figmie.

## Priorytet mirroru (propozycja)

1. `accordion` / `modal` / `panel` (tokeny gotowe, wzorce referencyjne)
2. `table` + `pagination`
3. `tooltip` / `tag` / `progressBar` / `stepper` / `chipInput`
4. Ikony z listy braków
5. Banner tokens → Figma Theme
