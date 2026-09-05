import {
  forwardRef,
  type HTMLAttributes,
  type InputHTMLAttributes,
  type ReactNode,
} from "react";

export interface ChipInputProps extends HTMLAttributes<HTMLDivElement> {
  /** Tag instances rendered in the `Chips` slot — see `Tag`. */
  children?: ReactNode;
  /** Props forwarded to the trailing free-text `<input>`. */
  inputProps?: InputHTMLAttributes<HTMLInputElement>;
}

/**
 * Text field that hosts tag/chips inside the control. Place `Tag` instances
 * as children — for recipients, labels, freeform multi-value entry. Not a
 * dropdown; see `MultiSelect` for that.
 */
export const ChipInput = forwardRef<HTMLDivElement, ChipInputProps>(
  function ChipInput({ children, inputProps, className, ...rest }, ref) {
    const classes = ["ds-chip-input"];
    if (className) classes.push(className);
    return (
      <div ref={ref} className={classes.join(" ")} {...rest}>
        {children}
        <input
          type="text"
          className="ds-chip-input__field"
          placeholder="Dodaj kolejny email…"
          {...inputProps}
        />
      </div>
    );
  }
);
