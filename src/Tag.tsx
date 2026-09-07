import { forwardRef, type HTMLAttributes, type ReactNode } from "react";

export interface TagProps extends HTMLAttributes<HTMLSpanElement> {
  children?: ReactNode;
  /** Renders a small remove (×) button — mirrors chips inside `InputChip`. */
  onRemove?: () => void;
  /** Accessible label for the remove button. Defaults to "Remove {children}". */
  removeLabel?: string;
}

/** Standalone chip atom. Used on its own or inside `InputChip`'s `Chips` slot. */
export const Tag = forwardRef<HTMLSpanElement, TagProps>(function Tag(
  { children, onRemove, removeLabel, className, ...rest },
  ref
) {
  const classes = ["ds-tag"];
  if (className) classes.push(className);
  return (
    <span ref={ref} className={classes.join(" ")} {...rest}>
      {children}
      {onRemove ? (
        <button
          type="button"
          className="ds-tag__remove"
          onClick={onRemove}
          aria-label={removeLabel ?? `Usuń ${typeof children === "string" ? children : "element"}`}
        >
          ×
        </button>
      ) : null}
    </span>
  );
});
