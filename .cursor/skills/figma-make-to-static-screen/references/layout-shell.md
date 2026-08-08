# Shell layout — złoty wzorzec `Tests` (`138:9148`)

**Referencja:** [Tests](https://www.figma.com/design/BGEwLOj9VeR8CDwzj0ClA3/Designs?node-id=138-9148) · strona **Designs** · 1440 × ~1038

## Hierarchia wizualna (kontrakt)

```text
Tests (FRAME 1440×HUG)     ← na wzorcu layoutMode=GRID; klon OK, GRID nieobowiązkowy
├── header  (INSTANCE)     ← y=0, w=1440, h≈65, FILL szerokości
├── sideNav (INSTANCE)     ← x=0, y≈65, w≈60 (Expanded=False), h = wysokość pod headerem
└── main    (FRAME VERTICAL)
    padding + itemSpacing = 16 → bound `semantic/spacing/l`
    ├── pageHeader (INSTANCE)
    └── exams / content (FRAME VERTICAL) — treść widoku
```

Kolejność dzieci na wzorcu może być `main`, `sideNav`, `header` — **liczy się pozycja wizualna**, nie kolejność w warstwach.

## Dlaczego nie wymuszać GRID

Zewnętrzna ramka wzorca ma `layoutMode: "GRID"`. Agent + MCP często psują canvas grid. **Dozwolone obejścia:**

1. **Preferowane:** `clone` całego `138:9148`, potem podmiana treści.
2. **Alternatywa:** zwykły FRAME 1440 + absolute / auto-layout tak, by header był na górze, sideNav lewa kolumna FILL height, main obok — wizualnie jak screenshot wzorca.
3. **Nie** raportuj FAIL tylko dlatego, że brak `layoutMode: GRID`.

## Tokeny na `main` (z wzorca)

| Właściwość | Wartość | Binding na `138:9148` |
|---|---|---|
| paddingTop/Right/Bottom/Left | 16 | `semantic/spacing/l` |
| itemSpacing | 16 | `semantic/spacing/l` |

To **wyjątek user-approved** dla chrome aplikacji (shell). Wewnątrz komponentów DS nadal obowiązuje reguła Theme: bind do `component/*`.

## Skrypt discovery — componentKey ze wzorca

```javascript
const ref = await figma.getNodeByIdAsync('138:9148');
const uniqueSets = new Map();
ref.findAllWithCriteria({ types: ['INSTANCE'] }).forEach((inst) => {
  const mc = inst.mainComponent;
  const cs = mc?.parent?.type === 'COMPONENT_SET' ? mc.parent : null;
  const key = cs ? cs.key : mc?.key;
  const name = cs ? cs.name : mc?.name;
  if (key && !uniqueSets.has(key)) {
    uniqueSets.set(key, {
      name,
      key,
      isSet: !!cs,
      sampleVariant: mc?.name,
      remote: cs ? cs.remote : mc?.remote,
    });
  }
});
return {
  frameName: ref.name,
  width: ref.width,
  height: ref.height,
  components: [...uniqueSets.values()],
};
```

## Skrypt — klon shella + pozycja

Preferuj gotowy plik **`scripts/clone-shell.js`** (bezpieczny pod MCP JSON): wczytaj, zamień `VIEW_NAME`, wklej do `use_figma`.

Skrót (gdy edytujesz ręcznie — unikaj `:` w literałach ID, patrz `mcp-code-constraints.md`):

```javascript
const COLON = String.fromCharCode(58);
const page = figma.root.children.find(function (p) { return p.name === 'Designs'; });
await figma.setCurrentPageAsync(page);
const source = await figma.getNodeByIdAsync('138' + COLON + '9148');
if (!source || source.type !== 'FRAME') return { error: 'gold standard missing' };
let maxX = 0;
const kids = page.children;
for (let i = 0; i < kids.length; i++) {
  const right = kids[i].x + kids[i].width;
  if (right > maxX) maxX = right;
}
const clone = source.clone();
clone.name = 'VIEW_NAME';
clone.x = maxX + 200;
clone.y = source.y;
return { createdNodeIds: [clone.id], x: clone.x, y: clone.y };
```

Przed klonem: jeśli na Designs / mapie jest już kanoniczna ramka tej roli — **aktualizuj** ją zamiast klonować duplikat.

## Checklist shell

- [ ] Szerokość ekranu **1440**
- [ ] `header` — pełna szerokość, na górze
- [ ] `sideNav` — lewa strona, wysokość od dołu headera do dołu ramki; `Expanded=False` domyślnie
- [ ] Aktywny `SideNavItem` zgodny z widokiem Make
- [ ] `main` — padding i gap **16** (`semantic/spacing/l` lub wizualnie 16)
- [ ] `pageHeader` na górze `main` (gdy widok go ma)
- [ ] Treść pod headerem strony, nie obok shella

## sideNav — typowe stany Make

| Widok App | Aktywny SideNavItem |
|---|---|
| `TestsDashboard` | Testy |
| `QuestionBank` | Bank pytań |
| `TestCreationWizard` / `TestEditor` | Testy (kontekst edycji) |
