# Katalog widoków (flow produktu)

**Wejście do eksportu:** user podaje link do **ramki kopii Make** w Figma Design (`source-input.md`).  
Poniższa tabela to mapa flow / nazewnictwo — nie sztywny backlog ani lista plików TS do czytania.

Cel eksportu: strona **Designs** · shell: [`138:9148`](https://www.figma.com/design/BGEwLOj9VeR8CDwzj0ClA3/Designs?node-id=138-9148)

Kolejność eksportu ustala **user** (mapa FigJam + prośba + link do kopii).

| Widok / rola | Uwagi eksportu |
|---|---|
| Lista testów (dashboard) | Kanoniczny shell/treść jak `138:9148`; nie duplikuj bez prośby |
| Bank pytań | `exams` + kompozyt **`table`** + pagination — `reference-gold-standard.md` |
| Kreacja testu (wizard) | Kroki → osobne ramki; spięte na mapie |
| Edycja / podgląd testu | Osobne stany gdy user poda kolejne kopie |

## Legacy — Make (`Testy`, kod React)

Gdy **brak** kopii w Figma Design, user może wskazać Make. Wtedy katalog plików TS:

| Stan `view` | Komponent | Plik główny |
|---|---|---|
| `dashboard` | `TestsDashboard` | `src/app/components/TestsDashboard.tsx` |
| `questionBank` | `QuestionBank` | `src/app/components/QuestionBank.tsx` |
| `create` | `TestCreationWizard` | `src/app/components/TestCreationWizard.tsx` |
| `edit` | `TestEditor` | `src/app/components/TestEditor.tsx` |

Stare importy (`src/imports/*`) — **nie kopiuj** layoutu; tylko treść merytoryczna jeśli brak tekstów w kopii.

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

Z warstw TEXT w **ramce źródłowej** (kopia Make). Dla listy zwykle **5–6** pozycji jak na `138:9148`. Teksty PL przenieś dosłownie.
