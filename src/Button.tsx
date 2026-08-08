import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { Add2Icon } from "./icons";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "tertiary"
  | "destructive";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual variant, mirrors the `variant` axis in Figma. */
  variant?: ButtonVariant;
  /** Light styling for dark brand surfaces — mirrors Figma `Inverted` boolean. Not dark mode. */
  inverted?: boolean;
  /**
   * Leading/trailing icon. `true` renders the default add icon (Figma: `Icon`
   * boolean); pass any node to render a custom icon.
   */
  icon?: boolean | ReactNode;
  /** Icon placement relative to the label. Defaults to `start`. */
  iconPosition?: "start" | "end";
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    {
      variant = "primary",
      inverted = false,
      icon = false,
      iconPosition = "start",
      className,
      type,
      children,
      ...rest
    },
    ref
  ) {
    const classes = ["ds-button", `ds-button--${variant}`, "ds-focusable"];
    if (inverted) classes.push("ds-button--inverted");
    if (className) classes.push(className);

    const iconNode = icon === true ? <Add2Icon /> : icon || null;

    return (
      <button
        ref={ref}
        type={type ?? "button"}
        className={classes.join(" ")}
        {...rest}
      >
        {iconNode && iconPosition === "start" ? iconNode : null}
        {children}
        {iconNode && iconPosition === "end" ? iconNode : null}
      </button>
    );
  }
);
