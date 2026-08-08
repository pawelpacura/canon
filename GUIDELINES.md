# Canon — Design System Guidelines

Package: `@pacurap/design-system` (Canon / Testonaut). Check `package.json` for version.

Always use components and icons from this package for **ALL** UI.
Never build custom buttons, inputs, selects, textareas, checkboxes, radios,
tabs, nav, headers, cards, links or icons.

---

## Setup

Import the stylesheet exactly once in the app entry file:

```tsx
import "@pacurap/design-system/styles.css";
```

Load the Poppins font (referenced by tokens but not bundled):

```html
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap" rel="stylesheet" />
```

---

## Import

```tsx
import {
  // Layout
  Header,
  SideNav,
  SideNavItem,
  PageHeader,
  Logo,
  // Content
  Card,
  Badge,
  ExamItem,
  Link,
  Tab,
  Tabs,
  // Form
  Button,
  IconButton,
  InputText,
  MultiSelect,
  Select,
  TextArea,
  Checkbox,
  Radio,
  Switcher,
  // Media
  Avatar,
  // Icons
  HomeIcon,
  SearchIcon,
  PersonIcon,
  Add2Icon,
  AddIcon,
  KeyboardArrowDownIcon,
  ChevronForwardIcon,
  LibraryAddCheckIcon,
  NewsstandIcon,
  ClockLoader40Icon,
  VisibilityIcon,
  GroupIcon,
  ContentPasteSearchIcon,
  MoreVertIcon,
  PercentIcon,
  BorderAllIcon,
  GridViewIcon,
  GridOnIcon,
  DataTableIcon,
  SelectIcon,
} from "@pacurap/design-system";
```

---

## Icons

Icons use **Material Symbols — Outlined, weight 300** (same symbol set as `@mui/icons-material` `*Outlined`, but with correct w300 paths).

- **Style:** Outlined only. Never filled, rounded, or sharp.
- **Weight:** 300 only. Never 400+.
- **Source:** `@material-symbols/svg-300` (build-time). Bundled as inline SVG — zero runtime icon dependencies.
- **Import:** always `{Name}Icon` from `@pacurap/design-system`. Never import `@mui/icons-material` directly in apps or Make.
- **Figma:** use Material Symbols plugin → Outlined, weight **300**, optical size **24**.

Color inherits via `currentColor` — place inside a colored parent or pass `style`.

```tsx
<SideNavItem active aria-label="Strona główna" icon={<HomeIcon />} />
<IconButton variant="tertiary" aria-label="Podgląd"><VisibilityIcon /></IconButton>
```

| Figma component | Export | Material Symbol |
|---|---|---|
| `icon/home` | `HomeIcon` | `home` |
| `icon/search` | `SearchIcon` | `search` |
| `icon/person` | `PersonIcon` | `person` |
| `icon/add_2` | `Add2Icon` | `add_2` |
| `icon/add` | `AddIcon` | `add` |
| `icon/keyboard_arrow_down` | `KeyboardArrowDownIcon` | `keyboard_arrow_down` |
| `icon / chevron_forward` | `ChevronForwardIcon` | `chevron_forward` |
| `icon/library_add_check` | `LibraryAddCheckIcon` | `library_add_check` |
| `icon/newsstand` | `NewsstandIcon` | `newsstand` |
| `icon/clock_loader_40` | `ClockLoader40Icon` | `clock_loader_40` |
| `icon / visibility` | `VisibilityIcon` | `visibility` |
| `icon/group` | `GroupIcon` | `group` |
| `icon / content_paste_search` | `ContentPasteSearchIcon` | `content_paste_search` |
| `icon/more_vert` | `MoreVertIcon` | `more_vert` |
| `icon/percent` | `PercentIcon` | `percent` |
| `icon / border_all` | `BorderAllIcon` | `border_all` |
| `icon / grid_view` | `GridViewIcon` | `grid_view` |
| `icon / grid_on` | `GridOnIcon` | `grid_on` |
| `icon / data_table` | `DataTableIcon` | `data_table` |
| `icon/select` | `SelectIcon` | `select` |

- Default size: 24×24. Override with `size` prop.
- **Adding a new icon:** add component in Figma → add entry to `scripts/icons.manifest.json` → run `npm run generate:icons`.
- **Never** mix styles (filled / rounded / sharp) or weights other than 300.
- **Never** use Lucide, Heroicons, or direct MUI imports in UI code.

Icons © Google — [Apache 2.0](https://www.apache.org/licenses/LICENSE-2.0) via Material Symbols.

---

## Components

### Button

```tsx
<Button variant="primary">Zapisz</Button>
<Button variant="secondary">Anuluj</Button>
<Button variant="tertiary">Więcej</Button>
<Button variant="destructive">Usuń</Button>
<Button variant="primary" inverted>Akcja na ciemnym tle</Button>
<Button disabled>Disabled</Button>
<Button variant="primary" icon>Utwórz test</Button>
```

- `variant`: `"primary" | "secondary" | "tertiary" | "destructive"` (default `"primary"`)
- `inverted`: boolean — light styling for dark brand surfaces (SideNav, hero); **not** dark mode. Combines with any `variant`.
- `icon`: boolean — when `true`, shows leading `Add2Icon` (Figma: `Icon` axis)
- Accepts all native `<button>` props.
- Use `destructive` only for irreversible actions (delete, remove).

### IconButton

```tsx
<IconButton variant="tertiary" aria-label="Podgląd">
  <VisibilityIcon />
</IconButton>
```

- Same variants as Button; supports `inverted` boolean.
- `aria-label` is **required** (no visible text).
- Fixed square size (40px). Pass icon as children.

### InputText

```tsx
<InputText placeholder="Szukaj testów..." />
<InputText error value={value} onChange={...} />
<InputText disabled />
<InputText
  placeholder="Szukaj"
  leftIcon={<SearchIcon />}
  rightIcon={<KeyboardArrowDownIcon />}
/>
```

- `error?: boolean` — red error styling, sets `aria-invalid`.
- `leftIcon` / `rightIcon` — mirrors Figma `showLeftIcon` / `showRightIcon`.
- `type`: text-like types only (`text`, `email`, `password`, `search`, `tel`, `url`, `number`).
- Accepts all native `<input>` props.

### Select

Native `<select>` — use only when a system control is acceptable:

```tsx
<Select error={hasError}>
  <option>Wybrana opcja</option>
</Select>
```

- Chevron is built-in — do not add your own arrow.

### MultiSelect

Custom dropdown for single or multiple selection. **Prefer this over `Select`**
when you need a styled menu with checkboxes or single-pick list items.

```tsx
// Single select
<MultiSelect
  options={[
    { value: "active", label: "Aktywne" },
    { value: "draft", label: "Wersje robocze" },
  ]}
  value={status}
  onChange={setStatus}
  placeholder="Wybierz status"
/>

// Multi select
<MultiSelect
  multiple
  options={[
    { value: "bhp", label: "BHP" },
    { value: "it", label: "IT" },
    { value: "hr", label: "HR" },
  ]}
  value={tags}
  onChange={setTags}
  placeholder="Wybierz kategorie"
  error={hasError}
/>
```

- `multiple?: boolean` — `false` (default) = single pick, closes on select; `true` = multi pick with checkboxes, stays open.
- `options: { value: string; label: ReactNode; disabled?: boolean }[]`
- Single mode: `value` is `string`, `onChange(value: string)`
- Multiple mode: `value` is `string[]`, `onChange(value: string[])`
- Styled like `InputText` / `Select` field. Custom menu — not a native control.
- Keyboard: ArrowUp/Down navigate, Enter/Space select, Escape closes.
- `error?: boolean`, `disabled?: boolean`, `placeholder?: string`

### TextArea

```tsx
<TextArea placeholder="Opis..." rows={4} />
```

- `error?: boolean`. Vertically resizable, min-height 96px.

### Checkbox / Radio

```tsx
<Checkbox label="Zaznacz mnie" checked={checked} onChange={...} />
<Checkbox error label="Wymagane pole" />

<Radio name="plan" label="Opcja A" />
<Radio name="plan" label="Opcja B" />
```

- `label?: ReactNode` — clickable label next to the control.
- `error?: boolean`. Controlled or uncontrolled.

### Switcher

Toggle (on/off). Figma component: `switcher`.

```tsx
<Switcher
  checked={darkMode}
  onChange={(e) => setDarkMode(e.target.checked)}
  label="Tryb ciemny"
  aria-label="Tryb ciemny"
/>
```

- Uses native `checkbox` with `role="switch"` for accessibility.
- `label?: ReactNode` — optional text beside the track.
- Controlled or uncontrolled (`checked` / `defaultChecked`).

### Avatar

```tsx
<Avatar />
<Avatar><img src={photoUrl} alt="" /></Avatar>
```

- 36px circle, brand background, `PersonIcon` by default.
- Pass custom icon or photo as children.

### Logo

```tsx
<Logo src="/logo.png" alt="Nazwa aplikacji" />
```

- Fixed size 157×64 (matches Figma). Provide your own logo image URL.

### Link

```tsx
<Link href="/tests">Testy</Link>
<Link href="/tests" variant="inverted" showIcon icon={<SelectIcon size={16} />}>
  Zewnętrzny
</Link>
<Link href="/tests" active>Bieżąca strona</Link>
```

- `variant="default"` — indigo on light surfaces.
- `variant="inverted"` — light text on dark brand surfaces (SideNav, hero); **not** dark mode.
- `active` — current/selected link (`state=active` in Figma).
- `showIcon` + `icon` — optional leading icon (Figma: `Show Icon` boolean).
- Hover / pressed via CSS (`:hover`, `:active`).

### Tab / Tabs

```tsx
<Tabs aria-label="Filtry testów">
  <Tab active>Aktywne (16)</Tab>
  <Tab>Wersje robocze (3)</Tab>
  <Tab>Zakończone (4)</Tab>
</Tabs>
```

- `Tab`: set `active` on the selected tab (`role="tab"`).
- `Tabs`: container with bottom border (`role="tablist"`).

### SideNav / SideNavItem

```tsx
<SideNav>
  <SideNavItem active aria-label="Strona główna" icon={<HomeIcon />} />
  <SideNavItem aria-label="Testy" icon={<LibraryAddCheckIcon />} />
  <SideNavItem aria-label="Archiwum" icon={<NewsstandIcon />} />
  <SideNavItem aria-label="Postępy" icon={<ClockLoader40Icon />} />
  <SideNavItem aria-label="Więcej" icon={<ChevronForwardIcon />} />
</SideNav>
```

- Collapsed icon-only nav (60px wide), brand background.
- `SideNavItem`: `active` shows white pill behind icon. `aria-label` required.

### Header

```tsx
<Header
  searchPlaceholder="Szukaj"
  userName="Jan Kowalski"
  onUserClick={() => openMenu()}
/>
```

- App top bar: Logo + search `InputText` (left search + right chevron) + user menu trigger (Avatar + name + chevron).
- Search field max-width 500px; layout `space-between`.

### PageHeader

```tsx
<PageHeader
  title="Testy i ankiety"
  subtitle="Zarządzaj testami, monitoruj postępy i analizuj wyniki"
  tabs={[
    { id: "active", label: "Aktywne (16)" },
    { id: "drafts", label: "Wersje robocze (3)" },
    { id: "done", label: "Zakończone (4)" },
    { id: "archive", label: "Archiwum (2)" },
  ]}
  activeTabId="active"
  onTabChange={setTab}
  actionLabel="Utwórz test"
  onAction={() => createTest()}
  filters={
    <>
      <IconButton variant="primary" aria-label="Szczegółowy">…</IconButton>
      <IconButton variant="tertiary" aria-label="Siatka">…</IconButton>
      <IconButton variant="tertiary" aria-label="Lista">…</IconButton>
    </>
  }
/>
```

- Row 1: title + subtitle + Actions slot (`actions` or convenience `actionLabel`).
- Row 2 (addons): tabs + optional `filters` (view-mode iconButtons).
- Bottom border via `component/pageHeader/border`.
- Action button includes `Add2Icon` by default when using `actionLabel`.

### Badge

Status / label pill. Source: [Figma Frame 3](https://www.figma.com/design/p522mlcVwW78HOdKKBupPE/Design-System?node-id=139-221) (`aktywne` in ExamItem).

```tsx
<Badge variant="success">aktywne</Badge>
<Badge variant="error">błąd</Badge>
<Badge variant="neutral">szkic</Badge>
<Badge variant="brand">nowe</Badge>
```

| Variant | Background token | Text token |
|---|---|---|
| `success` (default) | `--color-background-success-subtle` | `--color-foreground-primary` |
| `error` | `--color-background-error-subtle` | `--color-foreground-error` |
| `neutral` | `--color-background-tertiary` | `--color-foreground-secondary` |
| `brand` | `--color-interactive-secondary-default` | `--color-interactive-primary-default` |

- Tokens: `radius/full`, padding `spacing/xs` × `spacing/s`, `font-size/xs`.
- `ExamItem` uses `<Badge variant="success">` for `statusLabel` — unchanged API.

### Card

```tsx
{/* Static surface — default, safe for dashboards */}
<Card>
  <h3 style={{ margin: 0, fontSize: "var(--font-size-m)", fontWeight: 600 }}>
    Card title
  </h3>
  <p style={{ margin: 0, color: "var(--color-foreground-secondary)" }}>
    Supporting text or content inside the card.
  </p>
</Card>

{/* Interactive — hover + pressed feedback */}
<Card interactive onClick={() => {}}>
  Clickable row…
</Card>
```

- Surface on `color/background/secondary` page background.
- Tokens: `color/background/primary`, `color/stroke/subtle`, `radius/m`, `spacing/l` padding.
- **`interactive` prop (default `false`)** — hover: `shadow/drop/elevated`; pressed: shadow off + slight shift. Omit on static layouts so existing screens stay unchanged.
- Static cards: no drop shadow. Elevated variant: class `ds-card-elevated`.

### ExamItem (pattern on `Card`)

**Not a separate surface primitive** — list-row layout built on **`Card` + `interactive`**. Same hover/pressed as interactive `Card`. API unchanged — safe drop-in for existing Make/production code.

```tsx
<ExamItem
  title="Szkolenie BHP — grudzień 2026"
  statusLabel="aktywne"
  questionCount="4 pytań"
  finishedCount={6}
  totalCount={10}
  completionPercent="60%"
  publishedDate="22.04.2026"
  onPreview={() => {}}
  onMore={() => {}}
/>
```

- Renders `<article class="ds-card ds-card--interactive ds-exam-item">` — do not replace with raw `Card` in production lists unless composing a new pattern.
- Built-in icons: `ContentPasteSearchIcon`, `GroupIcon`, `VisibilityIcon`, `ClockLoader40Icon`.

---

## Page layout

Do **not** recreate the full-page Figma `view` shell. Compose pages from components:

```tsx
<div style={{ display: "flex", minHeight: "100vh" }}>
  <SideNav>
    <SideNavItem active aria-label="Strona główna" icon={<HomeIcon />} />
    <SideNavItem aria-label="Testy" icon={<LibraryAddCheckIcon />} />
  </SideNav>

  <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
    <Header
      logoSrc="/logo.png"
      searchPlaceholder="Szukaj testów..."
      userName="Jan Kowalski"
    />

    <main style={{ padding: "var(--spacing-2xl)" }}>
      <PageHeader
        title="Testy i ankiety"
        subtitle="Zarządzaj testami, monitoruj postępy i analizuj wyniki"
        tabs={[
          { id: "active", label: "Aktywne (16)" },
          { id: "drafts", label: "Wersje robocze (3)" },
        ]}
        activeTabId="active"
        onTabChange={setTab}
        actionLabel="Utwórz test"
        onAction={() => {}}
      />

      <ExamItem
        title="Szkolenie BHP — grudzień 2026"
        statusLabel="aktywne"
        questionCount="4 pytań"
        finishedCount={6}
        totalCount={10}
        completionPercent="60%"
        publishedDate="22.04.2026"
        onPreview={() => {}}
        onMore={() => {}}
      />
    </main>
  </div>
</div>
```

---

## States (do not reimplement)

| State | How |
|---|---|
| hover / pressed | CSS automatic |
| focus | `:focus-visible` ring (2px indigo outline with gap) — never remove outlines |
| disabled | `disabled` attribute |
| error | `error` prop on form components |

---

## Design tokens

All tokens are CSS custom properties. Use them for custom layout/styles — never hard-code values.

### Light / Dark theme

Figma **Theme** collection has two modes: **Light** and **Dark** — **one switch** for all theme-aware tokens.

### Token layers (strict — no hybrid)

Three collections, always chained in one direction:

```
Generic (primitives)  →  semantic/*  →  component/*
```

| Layer | Figma collection | CSS | Who uses it |
|---|---|---|---|
| **Generic** | `Generic` | `--color-neutral-50`, `--spacing-m`, … | **Never** in components or product UI |
| **Semantic** | `Theme` → `semantic/*` | `--color-foreground-primary`, `--color-background-primary`, … | App layout, custom screens, canvas |
| **Component** | `Theme` → `component/*` | `--color-component-card-background`, … | **Figma components** + **package CSS** |

Rules:

- Every `component/*` token **aliases** a `semantic/*` token (Light and Dark) — never Generic directly.
- Figma component nodes bind **only** to `component/*` (color, stroke, spacing, radius, typography, opacity, shadow).
- Dark mode: override **semantic** in Theme/Dark; component tokens inherit via the alias chain (no per-component dark duplicates in CSS).
- Product code using package components should prefer `--color-component-*` over `--color-foreground-*` / `--color-interactive-*`.

**Groups inside Theme (same collection, same mode toggle):**
- `semantic/*` — global tokens (`semantic/color/foreground/*`, `semantic/color/interactive/*`, `semantic/spacing/*`, …)
- `component/*` — per-component tokens (`component/button/primary/background/default`, `component/input/border`, `component/card/radius`, …)

Package components bind to **`component/*`** tokens only.

**Enable dark mode** (pick one):

```html
<!-- Explicit dark -->
<html data-theme="dark">

<!-- Explicit light (overrides OS preference) -->
<html data-theme="light">

<!-- Auto: follows prefers-color-scheme when data-theme is unset -->
<html>
```

```tsx
// Toggle example
document.documentElement.dataset.theme = isDark ? "dark" : "light";
```

- **Light:** white surfaces (`neutral/50`), dark text (`neutral/900`), indigo/800 actions.
- **Dark:** page `neutral/800`, elevated `neutral/900`; brand nav `indigo/400`; controls `neutral/900`; light text (`neutral/50`); indigo/400 actions.
- Spacing, radius, typography — **unchanged** between themes.
- Figma page **`theme`** — side-by-side Light / Dark preview.

**Text**
- `--color-foreground-primary`
- `--color-foreground-secondary`
- `--color-foreground-placeholder`
- `--color-foreground-error`
- `--color-foreground-success`
- `--color-foreground-inverse`

**Surfaces (app / custom layout)**
- `--color-background-primary` — page canvas
- `--color-background-secondary`, `--color-background-tertiary`

**Component surfaces & properties (prefer in product UI)**
- `--color-component-card-background`, `--color-component-card-border`
- `--color-component-modal-background`, `--color-component-panel-background`
- `--color-component-header-background`, `--color-component-sideNav-background`
- `--color-component-input-background` (+ `-hover`, `-filled`, `-disabled`, `-error`, `-border`, `-foreground`)
- `--color-component-button-primary-background-default` (+ `-hover`, `-pressed`), `--color-component-button-primary-foreground`
- `--color-component-button-secondary-*`, `--color-component-button-tertiary-*`, `--color-component-button-destructive-*`, `--color-component-button-*-inverted-*`
- `--color-component-dropdown-background`, `--color-component-badge-*-background`, `--color-component-badge-*-foreground`
- `--color-component-checkbox-checked-background`, `--color-component-switcher-track-background`
- Full list: see `src/tokens.css` section **Component — always alias semantic**

**Legacy semantic backgrounds** (still in tokens, not used by package components):
- `--color-background-brand`, `--color-background-control`, etc.

**Borders**
- `--color-stroke-subtle`
- `--color-stroke-default`
- `--color-stroke-strong`
- `--color-stroke-error-strong`

**Actions**
- `--color-interactive-primary-default|hover|pressed|active`
- `--color-interactive-secondary-default|hover|pressed|active`
- `--color-interactive-error-default|hover|pressed|active`
- `--color-interactive-success-default|hover|pressed|active`

**Size & shape**
- `--radius-s` (4px), `--radius-m` (8px), `--radius-full`
- `--spacing-xs|s|m|l|xl|2xl|3xl`
- `--touch-target-s|m|l`
- `--font-size-xs|s|m|l|xl`

**Other**
- `--font-family-primary` (Poppins)
- `--shadow-inner-default`, `--shadow-inner-error`
- `--shadow-drop-elevated` (elevated cards)
- `--opacity-disabled`

Example custom card — prefer the `Card` component:

```tsx
<Card>...</Card>
```

Or with tokens only:

```css
.my-card {
  background: var(--color-component-card-background);
  border: 1px solid var(--color-stroke-subtle);
  border-radius: var(--radius-m);
  padding: var(--spacing-l);
}
```

---

## Hard rules

1. No hard-coded colors, radii, spacing or font sizes — tokens only.
2. No custom form controls — always use package components (`MultiSelect` for custom dropdowns).
3. No external icon libraries — always import icons from `@pacurap/design-system`.
4. Do not override component internals (classes start with `ds-`).
5. Headings and body text use `--font-family-primary`.
6. Destructive actions: `variant="destructive"` + confirmation step.
7. Do not recreate the Figma `view` page — compose from `SideNav`, `Header`, `PageHeader`, `ExamItem`.
