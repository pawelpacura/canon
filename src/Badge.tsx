import { forwardRef, type HTMLAttributes, type ReactNode } from "react";

export type BadgeVariant = "success" | "error" | "neutral" | "brand";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  children?: ReactNode;
  /** Visual variant — mirrors Figma `variant` axis. Default `success`. */
  variant?: BadgeVariant;
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(function Badge(
  { children, variant = "success", className, ...rest },
  ref
) {
  const classes = ["ds-badge", `ds-badge--${variant}`];
  if (className) classes.push(className);
  return (
    <span ref={ref} className={classes.join(" ")} {...rest}>
      {children}
    </span>
  );
});
