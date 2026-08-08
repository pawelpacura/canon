# Pliki i identyfikatory

## URLs

| Rola | Link |
|---|---|
| Design System (library source) | https://www.figma.com/design/p522mlcVwW78HOdKKBupPE/Design-System |
| Designs (target screens) | https://www.figma.com/design/BGEwLOj9VeR8CDwzj0ClA3/Designs |
| Make (source) | https://www.figma.com/make/1y05CnoIzJUMsB0hykv3No/Testy |
| Product map (FigJam) | https://www.figma.com/board/s5TEjN0KUj45gSLFW3Dotu/Workflow-diagram?node-id=0-1 |

## fileKey

| Plik | fileKey |
|---|---|
| Design System | `p522mlcVwW78HOdKKBupPE` |
| Designs | `BGEwLOj9VeR8CDwzj0ClA3` |
| Make | `1y05CnoIzJUMsB0hykv3No` |
| Workflow-diagram (FigJam) | `s5TEjN0KUj45gSLFW3Dotu` |

## Designs — strony

| Strona | Page nodeId | Uwagi |
|---|---|---|
| `Designs` | `0:1` | **Jedyny domyślny cel eksportu** + złoty wzorzec `138:9148` |
| `Test` | `52:1005` | Stara piaskownica — nie używaj bez prośby usera |
| `Pawel` | `56:1818` | Referencja układu tabeli Bank pytań `56:1819` (nie shell) |
| `old` | `36:1768` | Archiwum |

## Złoty wzorzec shella

| Frame | nodeId | Opis |
|---|---|---|
| **`Tests`** | **`138:9148`** | Shell + lista ExamItem — **źródło prawdy layoutu** |

Inne istniejące ekrany na Designs (przykłady z mapy): Kreacja kroków, Bank pytań, Publikacja, Podgląd, Grid, Wyniki — linkuj z FigJam; nie traktuj jako shell-template, chyba że user wskaże.

## Biblioteka w Designs

```text
name: Design System
libraryKey: lk-75a3bbae2ee65bae84e464b92a99d2355155aefa359326dfc7bacc4e4176423db3488c280865c89e55de1bbd131c1ca0a545fc6309f5353f6eb137823c1bdec0
```

Przy `search_design_system` przekaż `fileKey: BGEwLOj9VeR8CDwzj0ClA3` i powyższy `includeLibraryKeys`. Jeśli search nic nie znajdzie — odśwież klucz przez `get_libraries`.

## Make — odczyt źródła

- `get_metadata` **nie działa** na Make.
- `get_design_context` → `fileKey: 1y05CnoIzJUMsB0hykv3No`, `nodeId: 0:1`.
- Router: `src/app/App.tsx`.
- Pakiet: `@pacurap/design-system`.

## Linki po utworzeniu

```text
Designs frame:
https://www.figma.com/design/BGEwLOj9VeR8CDwzj0ClA3/Designs?node-id={id with - instead of :}

FigJam map:
https://www.figma.com/board/s5TEjN0KUj45gSLFW3Dotu/Workflow-diagram?node-id=0-1
```
