import { forwardRef, type LabelHTMLAttributes, type ReactNode } from "react";

export interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  children?: ReactNode;
  /** Appends a red asterisk after the text — mirrors Figma `Required`. */
  required?: boolean;
}

/**
 * Standalone label atom. Often placed above a form field, but has no
 * structural dependency on `InputText` / `Select` / `TextArea` — pass
 * `htmlFor` yourself to associate it with a control.
 */
export const Label = forwardRef<HTMLLabelElement, LabelProps>(function Label(
  { children, required = false, className, ...rest },
  ref
) {
  const classes = ["ds-label"];
  if (className) classes.push(className);
  return (
    <label ref={ref} className={classes.join(" ")} {...rest}>
      {children}
      {required ? (
        <span className="ds-label__required" aria-hidden="true">
          *
        </span>
      ) : null}
    </label>
  );
});
