import { forwardRef, type ButtonHTMLAttributes } from "react";

export interface TabProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Active tab — mirrors `state=active` in Figma `_tab`. */
  active?: boolean;
}

export const Tab = forwardRef<HTMLButtonElement, TabProps>(function Tab(
  { active = false, className, type, ...rest },
  ref
) {
  const classes = ["ds-tab", "ds-focusable"];
  if (active) classes.push("ds-tab--active");
  if (className) classes.push(className);
  return (
    <button
      ref={ref}
      type={type ?? "button"}
      role="tab"
      aria-selected={active || undefined}
      className={classes.join(" ")}
      {...rest}
    />
  );
});
