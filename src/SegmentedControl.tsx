import { forwardRef, type HTMLAttributes, type ReactNode } from "react";

export interface SegmentedControlProps extends HTMLAttributes<HTMLDivElement> {
  /** Button instances in the Figma `Items` slot. */
  children?: ReactNode;
  /**
   * Figma `onDark` — translucent track for brand surfaces.
   * Pair segment buttons with `inverted`.
   */
  onDark?: boolean;
}

/**
 * Compact mutually-exclusive mode switch. Nest `Button` instances as children;
 * the active segment is the `primary` button. Not a fifth button variant.
 */
export const SegmentedControl = forwardRef<
  HTMLDivElement,
  SegmentedControlProps
>(function SegmentedControl(
  { children, onDark = false, className, ...rest },
  ref
) {
  const classes = ["ds-segmented-control"];
  if (onDark) classes.push("ds-segmented-control--on-dark");
  if (className) classes.push(className);

  return (
    <div ref={ref} role="group" className={classes.join(" ")} {...rest}>
      {children}
    </div>
  );
});
