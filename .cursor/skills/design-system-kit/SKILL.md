---
name: design-system-kit
description: >-
  Build or update Canon (Testonaut design system, npm @pacurap/design-system)
  end-to-end in gated phases: Figma Design System first (tokens + components),
  user approve, then mirror to the npm kit (tokens.css, components.css, React,
  GUIDELINES), Storybook, semver bump, and npm publish via publish:public. ALWAYS
  use this skill when the user says or means any of these exact intents: "dodaj /
  zaktualizuj komponent w DS", "sync / mirror Figma → kod", "bump / publish
  @pacurap/design-system", "zaktualizuj design system / rozszerz bibliotekę DS"
  — including close variants (Canon, design-system-kit, zaktualizuj DS, dodaj
  komponent do DS, mirror Figma do kodu, sync Figma, publish the design-system
  package, add a Drawer/Modal/token to the DS library). Use even if they do not
  say "skill". Near-miss: Make prototype to static Designs screens belongs to
  figma-make-to-static-screen, NOT this skill — except when the user pastes a
  [GAP] create-component prompt. Requires Figma MCP.
compatibility: >-
  Figma MCP (use_figma, get_design_context, get_screenshot, get_variable_defs,
  search_design_system). Load resource:figma-use before every use_figma.
  Workspace: canon (@pacurap/design-system).
---

# Canon — Figma → kod → npm

Jedna zmiana DS = jedna transakcja przez bramkowane fazy. **Figma prowadzi**, żeby nie rozjechać tokenów między plikiem a repo — kod dopiero po approve. Generyczny `figma-generate-library` nie zastępuje tego skilla na Waszym pliku (przyrostowo + rules w repo). Make → Designs: `figma-make-to-static-screen`; wklejony `[GAP: …]` z tamtego skilla to brief **tu**.

## Stałe

| Co | Wartość |
|---|---|
| Nazwa | **Canon** (Testonaut) |
| Paczka | `@pacurap/design-system` (lokalnie sprawdzaj `package.json`) |
| Figma DS | `p522mlcVwW78HOdKKBupPE` — [Design System](https://www.figma.com/design/p522mlcVwW78HOdKKBupPE/Design-System) |
| Przykład node | `259:20` |

Klucze, libraryKey, wzorce, luka Figma↔React: `references/files.md`.

Kontekst tylko gdy potrzebny:

- `HANDOFF.md` — dwa npm registry, publish
- `.cursor/rules/figma-component-frames.mdc` — przed mutacją Figmy
- `GUIDELINES.md` — gdy ruszasz publiczne API

## Bramki

```text
0 Discovery → plan
1 Figma          ← STOP, approve
2 Kod            ← STOP po typecheck/build + approve
3 Storybook      ← STOP + approve
4 Bump           ← STOP + approve
5 Publish npm    ← tylko gdy user wprost każe publish
```

Po każdej fazie: **Phase N Summary** (`references/phase-templates.md`) i:

`STOP — czekam na approve fazy N zanim ruszę fazę N+1.`

**Approve** = ok / approve / jedź / dalej / akceptuję / rób kod / itd.  
Commit / push / publish bez prośby usera oddaje kontrolę nad publiczną paczką — pomijaj. Faza 2 bez approve Figmy = drift tokenów.

Skrót faz tylko przy jawnym scope („tylko bump i publish”, „tylko Storybook dla X”, „już jest w Figmie — tylko kod”).

## Skille MCP

| Kiedy | Skill |
|---|---|
| Każde `use_figma` | `resource:figma-use` |
| Budowa komponentu w DS | + `resource:figma-generate-library` (checklista; **Wasze rules wygrywają**) |
| `get_design_context` (faza 2) | `resource:figma-design-to-code` |
| Opcjonalnie Code Connect | `resource:figma-code-connect` |

`skillNames`: `resource:figma-use,resource:figma-generate-library,design-system-kit`.  
Plugin JS: `references/mcp-code-constraints.md`. Antywzorce: `references/anti-patterns.md`.  
Craft wizualny / copy / a11y **w ramach DS** (nie redesign): `references/visual-qa.md`.

---

## Phase 0 — Discovery (read-only)

Zero zapisów. Typ zmiany → gap Figma vs repo → plan z ID `P0.a`….

```markdown
### Gap analysis
- Figma only: …
- Repo only: …
- Conflicts: …
- Proposed scope: …
- Out of scope: …
- Entry phase: P1 | P2 | P3 | P4 | P5
```

`STOP` na plan, **chyba że** prompt już precyzuje scope i entry phase (np. „tylko Figmę i stop”, „już w Figmie, dopisz React”) — wtedy 2–3 zdania potwierdzenia i od razu wskazana faza.

Wzorce: `references/files.md`.

---

## Phase 1 — Figma DS

Tokeny + komponent w DS. **Bez zmian w repo.**

Przed mutacją:

- [ ] `P1.a` `component/*` → alias `semantic/*` (Generic tylko gdy brak prymitywu)
- [ ] `P1.b` Preferuj jeden `COMPONENT`; BOOLEAN / SLOT / TEXT / INSTANCE_SWAP
- [ ] `P1.c` Bind węzłów tylko do `component/*`
- [ ] `P1.d` Overlaye jak modal/panel (Header + Content + Footer + `Show Footer`)
- [ ] `P1.e` Fioletowy chrome `COMPONENT_SET` zostaje widoczny
- [ ] `P1.f` Screenshot + Visual QA vs rodzeństwo (`references/visual-qa.md`)
- [ ] `P1.g` Lista vars/properties pod mirror w kodzie

Siatki size×state×type trudno utrzymać 1:1 z CSS/React — stąd less-is-more; hover/pressed zwykle w fazie 2 (wyjątek: istniejące sety button/inputText). Ikony: Material Symbols Outlined w300 / 24; manifest w fazie 2. Nie „ulepszaj” estetyki poza Theme / wzorcami pliku.

**Exit:** Summary (nodeId, URL, properties, `component/*`) + screenshot + mini-raport Visual QA + STOP fazy 1.

---

## Phase 2 — Kod (mirror)

Mirror zaakceptowanej Figmy: `references/code-mirror.md`.

- [ ] `P2.a` `tokens.css`
- [ ] `P2.b` `components.css` (`.ds-*`, stany pseudo)
- [ ] `P2.c` React + `forwardRef`; props ≈ Figma
- [ ] `P2.d` `src/index.ts`
- [ ] `P2.e` Ikona → manifest → `npm run generate:icons`
- [ ] `P2.f` `GUIDELINES.md` — copy PL / active voice / domena produktu (`visual-qa.md`)
- [ ] `P2.g` `npm run typecheck` && `npm run build`
- [ ] `P2.h` A11y podłoga: focus, `aria-*` / labels jak rodzeństwo; `prefers-reduced-motion` jeśli jest motion

`get_design_context` na zatwierdzonym node — adaptuj do `Button.tsx` / `Card.tsx` / tokenów. Hex poza tokenami psuje Theme.

**Exit:** pliki + wynik checków + krótki note a11y/copy + STOP fazy 2.

---

## Phase 3 — Storybook

- [ ] `P3.a` `*.stories.tsx` — `Components/…`, `autodocs`, argTypes jak Figma
- [ ] `P3.b` Default + kluczowe stany; copy przykładów jak w produkcie (nie Lorem)
- [ ] `P3.c` Visual QA w UI Storybook vs Figma screenshot + rodzeństwo (`visual-qa.md`)
- [ ] `P3.d` Opcjonalnie `build-storybook`; zerknij addon a11y na oczywiste violation
- [ ] `P3.e` Wskaż `npm run storybook` → `:6006`

Storybook nie wchodzi do tarballu npm.

**Exit:** Summary + Visual QA mini-raport + STOP fazy 3.

---

## Phase 4 — Bump

| Zmiana | Bump |
|---|---|
| Nowy komponent / publiczny token / prop | minor (przy 0.x) |
| Breaking | major — pytaj |
| Fix stylu / a11y / docs | patch |

Zaproponuj wersję (`package.json` vs `npm view @pacurap/design-system version`), po approve zaktualizuj `package.json`. Nie publikuj tutaj.

**Exit:** STOP — publish tylko na osobne „publish”.

---

## Phase 5 — Publish

Tylko na wprost: publish / opublikuj / `publish:public`. Kroki: `references/publish.md`.

`npm whoami --registry=https://registry.npmjs.org` → `pacurap` → `npm run publish:public` (nie zwykły `npm publish`).

---

## Definition of done

Approve po fazach w scope + brak hardcodów + mirror 1:1 + Visual QA (rodzeństwo / anti-slop / copy / a11y) bez redesignu poza DS. Publish tylko na prośbę. Częściowy → **PARTIAL** + co zostało.

## Routing

| User | Start |
|---|---|
| Nowy komponent / „jak panel” | P0 → P1… |
| Token w Figmie, potem kod | P1 → approve → P2 |
| „Już w Figmie, dopisz React” | P0 → **P2** (P1 tylko przy fix Figmy) |
| Tylko Storybook | P3 |
| Bump + publish | P4 → approve → P5 |
| Wklejony `[GAP: …]` | brief P0/P1 |

## Granice

- Nie edytuj Make; Designs tylko na prośbę po publish biblioteki.
- Nie bierz Material 3 / obcych libek jako źródła DS.
- Nie buduj całego pliku „od zera” generycznym library flow.
- Nie stosuj `frontend-design` do wymyślania nowej tożsamości komponentu — tylko QA spójności (`visual-qa.md`).
- Bugbot / CI — poza skillem; możesz zaproponować po fazie 2.

## Odniesienia

| Plik | Kiedy |
|---|---|
| `references/files.md` | fileKey, libraryKey, nodeId, luki |
| `references/code-mirror.md` | Figma → CSS/React |
| `references/publish.md` | registry + `publish:public` |
| `references/mcp-code-constraints.md` | przed `use_figma` |
| `references/phase-templates.md` | checklist / summary |
| `references/anti-patterns.md` | częste błędy agentów |
| `references/visual-qa.md` | screenshot / Storybook: rodzeństwo, copy, a11y, anti-slop |
