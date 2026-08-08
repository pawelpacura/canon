import { forwardRef, type ButtonHTMLAttributes } from "react";
import type { ButtonVariant } from "./Button";

export interface IconButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual variant, mirrors the `variant` axis in Figma. */
  variant?: ButtonVariant;
  /** Accessible name — required because the button has no text. */
  "aria-label": string;
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  function IconButton({ variant = "primary", className, type, ...rest }, ref) {
    const classes = [
      "ds-button",
      "ds-icon-button",
      `ds-button--${variant}`,
      "ds-focusable",
    ];
    if (className) classes.push(className);
    return (
      <button
        ref={ref}
        type={type ?? "button"}
        className={classes.join(" ")}
        {...rest}
      />
    );
  }
);
