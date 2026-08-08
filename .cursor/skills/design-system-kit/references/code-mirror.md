# Figma → kod — mirror 1:1

Czytaj po approve fazy 1 (albo od razu gdy entry = P2 i Figma już OK). Wzoruj się na `Button.tsx`, `Card.tsx`, `InputText.tsx`, `tokens.css`, `components.css`.

## Tokeny — konwencja nazw

| Figma (Theme) | CSS (sprawdź grepem zanim dodasz) |
|---|---|
| `semantic/color/foreground/primary` | `--color-foreground-primary` |
| `semantic/spacing/l` | `--spacing-l` |
| `semantic/radius/m` | `--radius-m` |
| `component/card/background` | `--color-component-card-background` |
| `component/modal/background` | `--color-component-modal-background` |
| `component/panel/background` | `--color-component-panel-background` |
| `component/accordion/…` | `--color-component-accordion-…` |
| `component/table/radius` | `--component-table-radius` |
| spacing/radius per-component | często `--component-{name}-{slot}` (nie zawsze `--color-`) |

Zasady:

1. W CSS komponentu: `var(--color-component-…)` / `var(--component-…)`, nie Generic.
2. Nowa `component/foo/bar` w Figmie = alias do jednego `semantic/*` = ta sama aliasowa struktura w `tokens.css`.
3. Light/Dark: kopiuj istniejący wzorzec dark w `tokens.css` (nie wymyślaj drugiej składni).
4. Jeśli token już jest w CSS (częsty przypadek: modal/panel/accordion colors) — **nie duplikuj**; dopisz tylko brakujące.

## Komponent CSS

- Prefiks: `.ds-{name}` (kebab), modyfikatory `.ds-{name}--{variant}`.
- Focus: `.ds-focusable` jak Button.
- Disabled: atrybut `disabled` + opacity z tokena gdy jest.
- Hover/pressed: `:hover` / `:active` dla nowych shelli bez osi state w Figmie.

Dziś w CSS często jest np. `.ds-table`, a brak pełnego `.ds-modal` / React — Phase 0 to oddziela.

## React

Wzorzec kontenera (jak `Card`):

```tsx
import { forwardRef, type HTMLAttributes, type ReactNode } from "react";

export interface FooProps extends HTMLAttributes<HTMLDivElement> {
  title?: string;
  showFooter?: boolean;
  footer?: ReactNode;
  children?: ReactNode;
}

export const Foo = forwardRef<HTMLDivElement, FooProps>(function Foo(
  { title, showFooter = true, footer, children, className, ...rest },
  ref
) {
  const classes = ["ds-foo"];
  if (className) classes.push(className);
  return (
    <div ref={ref} className={classes.join(" ")} {...rest}>
      {/* header / slots */}
    </div>
  );
});
```

Kontrolki formularza rozszerzają natywne atrybuty (`ButtonHTMLAttributes`, itd.) — jak istniejące pliki.

| Figma | React |
|---|---|
| TEXT `Title` | `title` lub children — jak podobny komponent |
| BOOLEAN `Show Footer` | `showFooter` (default jak w Figmie) |
| SLOT Content / Footer | `children` / `footer?: ReactNode` |
| INSTANCE_SWAP icon | `icon?: ReactNode` lub ikona z `./icons` |
| variant axis | `variant` union |

Eksport: typ + komponent w `src/index.ts`.

## Storybook

Wzorzec: `src/Button.stories.tsx` / `src/Card.stories.tsx`.

- `title: "Components/{Name}"`
- `tags: ["autodocs"]`
- `argTypes` ≈ props z Figmy
- Stories: default + kluczowe stany / edge (np. bez footera)

## GUIDELINES.md

- Import w bloku zbiorczym (jeśli nowy eksport)
- Przykład PL
- Props / kiedy używać
- Zakazy (bez hardcodów obok)

## Ikony

1. Figma: Material Symbols Outlined w300.
2. `scripts/icons.manifest.json`
3. `npm run generate:icons`
4. Re-export + wiersz w GUIDELINES

## Walidacja przed STOP fazy 2

```bash
npm run typecheck
npm run build
```

Fail → napraw w fazie 2, nie idź do Storybook.
