import { forwardRef, type HTMLAttributes, type ReactNode } from "react";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  /**
   * Hover + pressed surface feedback (`shadow/drop/elevated` on hover).
   * Default `false` — static cards stay unchanged for existing layouts.
   */
  interactive?: boolean;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(function Card(
  { children, className, interactive = false, ...rest },
  ref
) {
  const classes = ["ds-card"];
  if (interactive) classes.push("ds-card--interactive");
  if (className) classes.push(className);
  return (
    <div ref={ref} className={classes.join(" ")} {...rest}>
      {children}
    </div>
  );
});
