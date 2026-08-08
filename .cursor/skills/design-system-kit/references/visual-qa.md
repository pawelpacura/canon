# Visual QA — w ramach istniejącego DS

**Nie** stosuj skilla `frontend-design` jako licencji na redesign. Estetyka = plik Design System + Theme; craft = spójność z rodzeństwem, copy, a11y, gęstość.

Czytaj przy exit Phase 1 (screenshot) i Phase 3 (Storybook). Przy Phase 2 — gdy ruszasz CSS/React wyglądu.

## Rodzeństwo (porównuj, nie wymyślaj)

Nowe / zmienione UI musi wyglądać jak członek tej samej rodziny co:

| Typ | Porównaj z |
|---|---|
| Overlay / shell | `modal` `280:377`, `panel` `280:750` |
| Form control | `button`, `inputText`, `select` |
| Content surface | `card`, `accordion` |
| Nav / chrome | `header`, `sideNav`, `pageHeader` |

Sprawdź: spacing (tokeny), typografia (Poppins / istniejące text styles), radius, border, cień, gęstość, hierarchia tytułu vs body. **Jedna** świadoma różnica OK (np. szerokość drawera) — reszta cicha.

## Anti-slop (nowe komponenty)

Unikaj, chyba że już jest w DS / user prosi:

- glow, neon, blur „AI”
- pill clusters / badge soup
- wielowarstwowe ozdobne cienie
- dekoracyjne gradienty na surface
- nowe fonty poza `--font-family-primary` (Poppins)
- kolory poza Theme (hex „na oko”, obcy purple)
- motion ambient / scroll theatre na atomach

Wasze Generic indigo / neutrals = brand — OK. Nie dokładaj drugiego akcentu „dla fajności”.

## Copy (GUIDELINES + Storybook)

Słowa = materiał UI, nie filler.

- PL, zdania w active voice, sentence case
- Nazwy z perspektywy użytkownika / produktu (`showFooter`, „Zapisz”, „Szukaj testów…”)
- Przykłady z domeny (testy, badania, bank pytań) — nie Lorem / „Click me”
- Błędy i empty w docs: co się stało + co zrobić; bez „oops” / przeprosin
- Ten sam czasownik w całym flow props → przykład → opis

## A11y (podłoga, nie opcjonalny extras)

- Focus: `.ds-focusable` / ten sam ring co rodzeństwo
- Kontrolki ikon-only: wymagany `aria-label` (jak `IconButton`)
- `disabled`, `aria-invalid` / `error` jak w istniejących formach
- Jeśli dodajesz transition: szanuj `prefers-reduced-motion`
- Storybook: addon a11y już w kit — nie ignoruj oczywistych violation przy nowym komponencie

## Motion

Domyślnie **tylko** stany CSS jak w Button (`:hover` / `:active` / focus).  
Żadnych 2–3 „signature animations” na atomie. Większy motion tylko gdy user prosi i da się spiąć z tokenami / istniejącym wzorcem.

## Mini-raport (wklej w Phase Summary)

```markdown
### Visual QA
- Rodzeństwo: {modal|panel|button|…} — zgodne / różnice: …
- Anti-slop: OK | problem: …
- Copy (GUIDELINES/Storybook): OK | …
- A11y: focus / labels / reduced-motion — …
```
