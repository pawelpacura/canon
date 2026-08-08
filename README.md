# Canon

Design system for **Testonaut** — React kit mirrored from the Figma Design System file (tokens + components).

npm package (publish name, unchanged for now): `@pacurap/design-system`

## Install

```bash
npm install @pacurap/design-system
```

## Usage

```tsx
import {
  Button,
  IconButton,
  InputText,
  Select,
  TextArea,
  Checkbox,
  Radio,
} from "@pacurap/design-system";
import "@pacurap/design-system/styles.css";

export function Example() {
  return (
    <>
      <Button variant="primary">Zapisz</Button>
      <Button variant="destructive">Usuń</Button>

      <InputText placeholder="Szukaj testów..." />
      <InputText error defaultValue="Błędna wartość" />

      <Select>
        <option>Wybrana opcja</option>
      </Select>

      <TextArea placeholder="Opis..." />

      <Checkbox label="Zaznacz mnie" />
      <Radio name="group" label="Opcja A" />
      <Radio name="group" label="Opcja B" />
    </>
  );
}
```

The package ships the **Poppins** font *reference* (CSS variable
`--font-family-primary`), but not the font files — load Poppins yourself,
e.g. via Google Fonts.

## Tokens

All Figma variables are exposed as CSS custom properties on `:root`:

| Figma | CSS |
| --- | --- |
| `color/background/control` | `--color-background-control` |
| `color/foreground/placeholder` | `--color-foreground-placeholder` |
| `color/interactive/primary/default` | `--color-interactive-primary-default` |
| `radius/m` | `--radius-m` |
| `spacing/l` | `--spacing-l` |
| `shadow/inner/default` (effect style) | `--shadow-inner-default` |
| `shadow/drop/elevated` (effect style) | `--shadow-drop-elevated` |

Use them directly in app code:

```css
.my-panel {
  background: var(--color-background-secondary);
  border-radius: var(--radius-m);
  box-shadow: var(--shadow-drop-elevated);
}
```

## State model (mirrors Figma)

- `state=hover` / `pressed` → CSS `:hover` / `:active`
- `state=disabled` → `disabled` attribute + `--opacity-disabled`
- `state=error` → `error` prop (`aria-invalid` is set automatically)
- `showFocus` boolean prop in Figma → `:focus-visible` ring
  (2px `--color-interactive-primary-default` outline with 1px gap)

## Using as a Figma Make kit

1. Publish this package to npm (public registry or your org's private
   registry):

   ```bash
   npm publish --access public
   ```

2. In a **Figma Make** file: gear icon → **Create a kit** → add your npm
   package.

3. Make will use these exact components and tokens when generating
   prototypes, keeping output consistent with the Figma library.

## Development

```bash
npm install
npm run dev        # watch mode
npm run build      # esm + cjs + d.ts + css to dist/
npm run typecheck
npm run storybook  # component playground (http://localhost:6006)
```

### Storybook

Local docs for components — starts with **Button** (same React + CSS as the
published npm package and Figma component set):

```bash
npm run storybook
```

Build a static bundle (e.g. for deploy):

```bash
npm run build-storybook
```

## Drift / skills

- `DRIFT.md` — Figma ↔ repo gap snapshot
- `.cursor/skills/design-system-kit/` — gated sync skill (Figma → code → npm)
- `.cursor/skills/figma-make-to-static-screen/` — Make → static Designs
