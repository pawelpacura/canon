import { forwardRef, type InputHTMLAttributes, type ReactNode } from "react";

export interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  /** Error state, mirrors `state=error` in Figma. */
  error?: boolean;
  /** Optional label rendered next to the box. */
  label?: ReactNode;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  function Checkbox({ error = false, label, className, disabled, ...rest }, ref) {
    const classes = ["ds-control", "ds-checkbox", "ds-focusable"];
    if (error) classes.push("ds-control--error");
    if (className) classes.push(className);

    const input = (
      <input
        ref={ref}
        type="checkbox"
        className={classes.join(" ")}
        aria-invalid={error || undefined}
        disabled={disabled}
        {...rest}
      />
    );

    if (label === undefined) return input;

    return (
      <label
        className={`ds-control-row${disabled ? " ds-control-row--disabled" : ""}`}
      >
        {input}
        <span>{label}</span>
      </label>
    );
  }
);
