# Mapa produktu — FigJam Workflow-diagram

**Board:** [Workflow-diagram](https://www.figma.com/board/s5TEjN0KUj45gSLFW3Dotu/Workflow-diagram?node-id=0-1)  
**fileKey:** `s5TEjN0KUj45gSLFW3Dotu`

Każdy nowy (lub istotnie zaktualizowany) widok w Designs **musi** pojawić się na mapie jako klikalny link do frame.

## Konwencja node’ów (stan boardu)

| Kształt | Znaczenie |
|---|---|
| Rounded rect (niebieski / szary) | Wejście / wyjście / stan końcowy |
| Square | Krok / widok UI |
| Diamond | Decyzja (bez obowiązkowego linku do Designs) |
| Section | Grupa ścieżki (np. „Sciezka standardowa”) |

Tekst widoku z designem: **markdown link**

```text
[Lista testow](https://www.figma.com/design/BGEwLOj9VeR8CDwzj0ClA3/Designs?node-id=138-9148)
```

`node-id` z myślnikami (`138-9148`), nie dwukropkami.

## Workflow agenta po eksporcie ekranu

1. `get_figjam` na `0:1` — znajdź istniejący node o tej samej nazwie / roli.
2. Jeśli jest — **zaktualizuj** tekst linku na nowy `node-id` (nie twórz duplikatu).
3. Jeśli brak — dodaj `shape-with-text` w logicznym miejscu flow (obok sąsiadów z Make).
4. Dodaj `connector` od/do poprzedniego i następnego kroku zgodnie z Make / istniejącą mapą.
5. Diamenty decyzyjne i toasty bez osobnego frame: zostaw bez linku lub linkuj do najbliższego ekranu bazowego (jak sticky „LINKI DO DESIGNS” na boardzie).

## use_figma na FigJam

- Załaduj `resource:figma-use` (+ `resource:figma-use-figjam` jeśli dostępne).
- `fileKey: s5TEjN0KUj45gSLFW3Dotu`.
- Twórz tylko typy FigJam: `figma.createShapeWithText()`, `figma.createConnector()`, sekcje — nie FRAME designowe.
- Po mutacji zwróć `createdNodeIds` / `mutatedNodeIds`.

### Minimalny wzorzec — update linku na istniejącym shape

```javascript
// Pseudokod — dopasuj ID po get_figjam
const node = await figma.getNodeByIdAsync('SHAPE_ID');
await figma.loadFontAsync(node.text.fontName);
node.text.characters = 'Lista testow';
// Jeśli API wspiera hyperlink w characters — ustaw link do Designs;
// inaczej trzymaj markdown link w characters jak reszta boardu.
return { mutatedNodeIds: [node.id] };
```

Preferuj **ten sam styl** co istniejące node’y (markdown w tekście kształtu).

## Definition of done (mapa)

- [ ] Jest node dla widoku
- [ ] Link otwiera właściwy frame w Designs
- [ ] Connectorami spięty z flow (nie „wiszący” izolat)
- [ ] Brak duplikatu tej samej nazwy z innym starym node-id
