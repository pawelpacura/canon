import { forwardRef, type ButtonHTMLAttributes } from "react";
import type { ButtonVariant } from "./Button";

export interface IconButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual variant, mirrors the `variant` axis in Figma. */
  variant?: ButtonVariant;
  /** Light styling for dark brand surfaces — mirrors Figma `Inverted` boolean. Not dark mode. */
  inverted?: boolean;
  /** Accessible name — required because the button has no text. */
  "aria-label": string;
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  function IconButton(
    { variant = "primary", inverted = false, className, type, ...rest },
    ref
  ) {
    const classes = [
      "ds-button",
      "ds-icon-button",
      `ds-button--${variant}`,
      "ds-focusable",
    ];
    if (inverted) classes.push("ds-button--inverted");
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
