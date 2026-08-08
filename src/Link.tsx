import { forwardRef, type AnchorHTMLAttributes, type ReactNode } from "react";

export type LinkVariant = "default" | "inverted";

export interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  /** Visual variant — `inverted` for dark brand surfaces (not dark mode). */
  variant?: LinkVariant;
  /** Selected / current page — mirrors Figma `state=active`. */
  active?: boolean;
  /** Show leading icon (placeholder until external-link icon exists). */
  showIcon?: boolean;
  icon?: ReactNode;
}

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(function Link(
  { variant = "default", active, showIcon, icon, className, children, ...rest },
  ref
) {
  const classes = ["ds-link", "ds-focusable"];
  if (variant === "inverted") classes.push("ds-link--inverted");
  if (active) classes.push("ds-link--active");
  if (className) classes.push(className);
  return (
    <a ref={ref} className={classes.join(" ")} {...rest}>
      {showIcon && icon ? (
        <span className="ds-link__icon" aria-hidden>
          {icon}
        </span>
      ) : null}
      {children}
    </a>
  );
});
