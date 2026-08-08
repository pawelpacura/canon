import { forwardRef, type HTMLAttributes } from "react";

export interface SideNavProps extends HTMLAttributes<HTMLElement> {}

export const SideNav = forwardRef<HTMLElement, SideNavProps>(function SideNav(
  { className, ...rest },
  ref
) {
  const classes = ["ds-side-nav"];
  if (className) classes.push(className);
  return <nav ref={ref} className={classes.join(" ")} {...rest} />;
});
