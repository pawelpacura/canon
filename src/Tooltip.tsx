import { forwardRef, type HTMLAttributes, type ReactNode } from "react";

export type TooltipDirection = "top" | "bottom" | "left" | "right";

export interface TooltipProps extends HTMLAttributes<HTMLDivElement> {
  /** Tooltip text. */
  children?: ReactNode;
  /** Mirrors Figma `direction` variant. Default `top`. */
  direction?: TooltipDirection;
}

/** Small text bubble with a directional arrow. Position it relative to its trigger yourself. */
export const Tooltip = forwardRef<HTMLDivElement, TooltipProps>(
  function Tooltip({ children, direction = "top", className, role, ...rest }, ref) {
    const classes = ["ds-tooltip", `ds-tooltip--${direction}`];
    if (className) classes.push(className);
    const bubble = (
      <span className="ds-tooltip__bubble" role={role ?? "tooltip"}>
        {children}
      </span>
    );
    const arrow = <span className="ds-tooltip__arrow" aria-hidden="true" />;
    const bubbleFirst = direction === "top" || direction === "left";
    return (
      <div ref={ref} className={classes.join(" ")} {...rest}>
        {bubbleFirst ? bubble : arrow}
        {bubbleFirst ? arrow : bubble}
      </div>
    );
  }
);
