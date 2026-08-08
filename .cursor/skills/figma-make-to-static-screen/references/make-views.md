# Widoki w Make (`Testy`)

Router: `src/app/App.tsx`  
Cel eksportu: strona **Designs** · shell: [`138:9148`](https://www.figma.com/design/BGEwLOj9VeR8CDwzj0ClA3/Designs?node-id=138-9148)

Kolejność eksportu ustala **user** (mapa FigJam + prośba). Poniższa tabela to katalog źródeł, nie sztywny backlog.

| Stan `view` | Komponent | Plik główny | Uwagi eksportu |
|---|---|---|---|
| `dashboard` | `TestsDashboard` | `src/app/components/TestsDashboard.tsx` | Lista testów — kanoniczny shell/treść jak `138:9148`; nie duplikuj bez prośby |
| `questionBank` | `QuestionBank` | `src/app/components/QuestionBank.tsx` | `exams` + kompozyt **`table`** + pagination — `reference-gold-standard.md` |
| `create` | `TestCreationWizard` | `src/app/components/TestCreationWizard.tsx` | Kroki wizarda → osobne ramki; spięte na mapie |
| `edit` | `TestEditor` | `src/app/components/TestEditor.tsx` | Edycja / podgląd — osobne stany |

## Imports / makiety historyczne

| Plik | Uwagi |
|---|---|
| `src/imports/Makiety.tsx` | Stare makiety — **nie kopiuj** layoutu; tylko treść merytoryczna |
| `src/imports/Tests-1/index.tsx` | Referencja wizualna, nie źródło instancji DS |
| `src/imports/Settings/index.tsx` | Porównaj z frame Settings w Designs |

## Dashboard — stany (osobne ramki gdy potrzeba)

| Stan | Jak w Designs |
|---|---|
| Zakładka statusu | `pageHeader` tabs — jedna `state=active` |
| Widok detailed | `Exam Item` × ~5 jak wzorzec |
| Widok grid | siatka `card` (osobna ramka jeśli na mapie) |
| Widok table | kompozyt **`table`** + pagination |
| Empty state | treść empty + CTA |
| Overlaye (menu, wyniki, podgląd) | osobne ramki; domyślnie nie composite na liście |

## Mock data

Z `TestsDashboard.tsx` / widoku Make — dla listy zwykle **5–6** pozycji jak na `138:9148`. Teksty PL przenieś dosłownie.
