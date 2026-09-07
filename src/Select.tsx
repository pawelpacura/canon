import { forwardRef, type SelectHTMLAttributes } from "react";
import { KeyboardArrowDownIcon } from "./icons";

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  /** Error state, mirrors `state=error` in Figma. */
  error?: boolean;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  function Select({ error = false, className, children, ...rest }, ref) {
    const classes = ["ds-field", "ds-select", "ds-focusable"];
    if (error) classes.push("ds-field--error");
    if (className) classes.push(className);
    return (
      <span className="ds-select-wrap">
        <select
          ref={ref}
          className={classes.join(" ")}
          aria-invalid={error || undefined}
          {...rest}
        >
          {children}
        </select>
        <KeyboardArrowDownIcon className="ds-select__chevron" />
      </span>
    );
  }
);
