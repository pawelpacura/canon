# Prototyp klikany (nie Figma Make) — opcje techniczne

Cel: klikalny flow na bazie **statycznych ramek w Designs** + **mapy FigJam**, bez utrzymywania drugiego źródła prawdy w Make.

Skill **nie** buduje prototypu domyślnie — tylko gdy user poprosi. Poniżej ranking rekomendacji dla tego projektu.

## Rekomendacja: A → B → C

### A. Native Figma Prototype (najlepszy stosunek koszt/efekt)

**Co:** w pliku Designs, Prototype mode — hotspoty `ON_CLICK` → `NAVIGATE` / `OPEN_OVERLAY` między istniejącymi frame’ami.

| Plus | Minus |
|---|---|
| Zero nowego toola; te same DS instances | Hotspoty trzeba utrzymywać przy zmianie layoutu |
| Overlaye (modal/panel) = `OPEN_OVERLAY` | Słabe „prawdziwe” stany formularzy |
| Flow Starting Points 1:1 z sekcjami mapy | Brak logiki poza Conditional (Variables) |
| Da się automatyzować częściowo przez Plugin API (`reactions`) | |

**Mapa ↔ prototyp:** FigJam = dokumentacja + linki; Designs Prototype = demo do klikania. Node na mapie i Flow Starting Point powinny mieć te same nazwy.

**Automatyzacja w skillu (opcjonalny krok „wire prototype”):**

1. Weź krawędzie z FigJam (connectors) + CTA z Make.
2. Na frame źródłowym znajdź INSTANCE przycisku (np. „Utwórz test”).
3. Ustaw `reactions`: navigate do frame docelowego (smart animate / instant).
4. Modale: `OPEN_OVERLAY` + `CLOSE_OVERLAY` na Cancel.

### B. Prototype + Figma Variables (gdy potrzeba zakładek / filtrów)

Użyj **Variables** (np. `activeTab`, `viewMode`) + Conditional prototyping, żeby jedna ramka przełączała warianty tabs / list vs grid bez duplikowania całego shella.

| Kiedy warto | Kiedy nie |
|---|---|
| 2–4 stany tego samego shella | Cały wizard 4 kroków — lepiej osobne frame’y |
| List vs Grid (`153:12160`) | Złożona walidacja formularza |

Trzymaj Variables prototypowe lokalnie w Designs (nie mieszaj z Theme DS).

### C. „Prototype graph” utrzymywany przez agenta

Lekki plik / sekcja w skillu: lista krawędzi

```json
{ "from": "138:9148", "trigger": "CTA Utwórz test", "to": "124:4898", "type": "NAVIGATE" }
```

Agent po każdym eksporcie synchronizuje `reactions` z grafem i z FigJam. FigJam zostaje kanoniczną mapą produktu; graf = implementacja klików.

## Czego unikać

| Podejście | Dlaczego nie jako default |
|---|---|
| **Figma Make** jako prototyp docelowy | To źródło niedoskonałe; celem są Designs + DS |
| **Osobny Framer / ProtoPie** | Drugi stack, drift od biblioteki Figma |
| **Jeden gigantyczny frame ze wszystkimi stanami** | Łamie czytelność mapy i review |
| **Tylko linki w FigJam bez Prototype** | OK do dokumentacji, słabe do demo z stakeholderami |

## Praktyczny MVP dla Was

1. Zostawicie FigJam jako mapę + linki (już działa).
2. Na Designs dodacie **Flow Starting Points**: „Lista testów”, „Kreacja”, „Bank pytań”, „Publikacja”.
3. Zwirecie tylko **happy path** + 1–2 branche (np. Standard vs Z pliku).
4. Overlaye (potwierdzenie usunięcia, panel banku) jako `OPEN_OVERLAY` na frame bazowym kroku.
5. Reszta node’ów mapy bez hotspota — wystarczy link z FigJam do statycznego ekranu.

Gdy user powie „zbuduj prototyp”, agent realizuje MVP powyższe (A), bez Make.
