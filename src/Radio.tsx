import { forwardRef, type InputHTMLAttributes, type ReactNode } from "react";

export interface RadioProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  /** Error state, mirrors `state=error` in Figma. */
  error?: boolean;
  /** Optional label rendered next to the control. */
  label?: ReactNode;
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  function Radio({ error = false, label, className, disabled, ...rest }, ref) {
    const classes = ["ds-control", "ds-radio", "ds-focusable"];
    if (error) classes.push("ds-control--error");
    if (className) classes.push(className);

    const input = (
      <input
        ref={ref}
        type="radio"
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
