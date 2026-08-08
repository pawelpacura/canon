import { forwardRef, type HTMLAttributes } from "react";

export interface TabsProps extends HTMLAttributes<HTMLDivElement> {
  /** ID of the tab panel controlled by these tabs (for a11y). */
  "aria-label"?: string;
}

export const Tabs = forwardRef<HTMLDivElement, TabsProps>(function Tabs(
  { className, ...rest },
  ref
) {
  const classes = ["ds-tabs"];
  if (className) classes.push(className);
  return <div ref={ref} role="tablist" className={classes.join(" ")} {...rest} />;
});
