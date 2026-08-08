import { forwardRef, type InputHTMLAttributes, type ReactNode } from "react";

export interface SwitcherProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  /** Optional label rendered next to the switch. */
  label?: ReactNode;
}

export const Switcher = forwardRef<HTMLInputElement, SwitcherProps>(
  function Switcher({ label, className, disabled, ...rest }, ref) {
    const classes = ["ds-switcher", "ds-focusable"];
    if (className) classes.push(className);

    const input = (
      <input
        ref={ref}
        type="checkbox"
        role="switch"
        className={classes.join(" ")}
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
