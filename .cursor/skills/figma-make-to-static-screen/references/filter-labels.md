# Filtry — etykiety i placeholdery (DS)

**Bank pytań (wzorzec user):** `select` ×3 + `inputText` — **nie** `multiselect`. Layout w `exams` > `Filters` — patrz `reference-gold-standard.md`.

## inputText (`80a419dc…`)

| Property | Typ | Przykład |
|---|---|---|
| `label#80:0` | TEXT | `Szukaj pytań...` |

W MCP JSON klucz z dwukropkiem: `'label#80' + String.fromCharCode(58) + '0'`

Jeśli `setProperties` nie aktualizuje widocznego tekstu — edytuj `TEXT` w `Field/wrapper` bezpośrednio (`loadFontAsync` → `characters`).

## select (`c63ec552…`) — Typ, Kategoria, sort

| Property | Typ | Przykład |
|---|---|---|
| `label#81:0` | TEXT | `Typ` / `Kategoria` / `Data: Najnowsze` |

Ustaw property **i** widoczny `TEXT` w `Field`, jeśli DS nie synchronizuje.

## multiselect (`799c9d8f…`) — tylko gdy Make/DS wyraźnie wymaga

Nie używaj w Bank pytań — wzorzec user ma **`select`**. FilterDropdown z Make mapuj na `select`.

## Layout filtrów (wzorzec user)

```
exams (FRAME)
└── Filters (FRAME, SPACE_BETWEEN)
    ├── Left Side (HORIZONTAL, gap 10)
    │   ├── inputText      — Szukaj pytań...
    │   ├── select         — Typ
    │   └── select         — Kategoria
    └── select             — Data: Najnowsze (sort, prawa strona)
```

**Antywzorzec:** `qb-filters`, osobne TEXT labele nad select, `multiselect-typ-wrap`.
