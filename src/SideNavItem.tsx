import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";

export interface SideNavItemProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Active nav item — mirrors `state=active` in Figma. */
  active?: boolean;
  /** Icon shown in the item (24×24). */
  icon: ReactNode;
  /** Accessible label — required because the nav is icon-only. */
  "aria-label": string;
}

export const SideNavItem = forwardRef<HTMLButtonElement, SideNavItemProps>(
  function SideNavItem({ active = false, icon, className, type, ...rest }, ref) {
    const classes = ["ds-side-nav-item", "ds-focusable"];
    if (active) classes.push("ds-side-nav-item--active");
    if (className) classes.push(className);
    return (
      <button
        ref={ref}
        type={type ?? "button"}
        className={classes.join(" ")}
        {...rest}
      >
        <span className="ds-side-nav-item__icon">{icon}</span>
      </button>
    );
  }
);
