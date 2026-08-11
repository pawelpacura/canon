# Cleanup — strona Designs po eksporcie

Po każdym eksporcie sprawdź stronę **Designs** (nie piaskownicę `Test`) i usuń artefakty z iteracji.

## Usuń z page level

| Artefakt | Akcja |
|---|---|
| Duplikat ramki o tej samej roli (np. druga „Lista testów” / „Question Bank”) | Zostaw **jedną** kanoniczną; resztę `remove()` — albo pytaj usera |
| Luźne `table/row`, `badge`, puste `Frame` na page | `remove()` |
| Ramki debug / placeholder ze shimmerem | `remove()` lub dokończ i wyłącz placeholder |

## Wewnątrz kanonicznej ramki

| Problem | Naprawa |
|---|---|
| Ukryte TEXT placeholdery po wstawieniu badge | usuń niewidoczne śmieci |
| `tabs` / `filters` w `pageHeader` gdy widok ich nie ma | ukryj (`visible` bez literału `false` w MCP — patrz `mcp-code-constraints.md`) |
| Własne `qb-*` warstwy obok `exams` | przenieś treść do `exams` / usuń qb-* |
| Shell bez treści | nie raportuj DONE — uzupełnij mock data |
| FRAME/RECTANGLE z ręcznym SOLID (hex/RGB) | rule `figma-designs-tokens.mdc` — bind albo `[GAP: token …]` |

## Walidacja końcowa

```javascript
const COLON = String.fromCharCode(58);
const page = figma.root.children.find(function (p) { return p.name === 'Designs'; });
await figma.setCurrentPageAsync(page);
return page.children.map(function (n) { return n.name + ' ' + n.type; }).join('\n');
```

- [ ] Jedna kanoniczna ramka na widok (plus osobne ramki stanów/modali gdy zamierzone)
- [ ] Brak luźnych instancji DS na page
- [ ] `main`: `pageHeader` → sekcja treści (`exams` / content)
- [ ] Screenshot bez ghost layers
