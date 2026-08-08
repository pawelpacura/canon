# use_figma — ograniczenia kodu przez MCP JSON

Przy przekazywaniu `code` do `use_figma` przez `CallMcpTool` argument jest serializowany jako JSON. **Niektóre sekwencje w kodzie JS psują parser JSON** i kończą się błędem `Failed to parse arguments string as JSON`.

## Unikaj w kodzie pluginu

| Wzorzec | Problem | Obejście |
|---|---|---|
| `{` `}` | Zamyka obiekt JSON | `new Object()` + przypisania właściwości; tablice zamiast obiektów return |
| `:` w stringach | `'58:2840'`, `'1:2'` | `'58' + String.fromCharCode(58) + '2840'` |
| `null`, `true`, `false` | Tokeny JSON | `new Object()`, `1`/`0` zamiast boolean |
| `[0]`, `[1]` | Tablica JSON | `.at(0)`, `.find(...)` |
| `\uXXXX` | Escape JSON | ASCII w kodzie lub tekst z komponentów DS |
| `setProperties({...})` | Nawiasy klamrowe | Zbuduj props: `const p = new Object(); p[key]=val; inst.setProperties(p);` |

## Bezpieczne wzorce

```javascript
const COLON = String.fromCharCode(58);
const main = await figma.getNodeByIdAsync('58' + COLON + '2840');

const font = new Object();
font.family = 'Poppins';
font.style = 'SemiBold';
await figma.loadFontAsync(font);

return [wrapperId, mainId];
```

## Rekomendacja

Długie skrypty podziel na wiele krótkich wywołań `use_figma`. Każde wywołanie: **krótkie**, bez `{}`, bez `:` w cudzysłowach, bez `\u`.

Błąd parse czasem to zły JSON w samym wywołaniu MCP — najpierw test: `return 'ping';`.
