import { forwardRef, type HTMLAttributes, type ReactNode } from "react";

export type BannerVariant = "information" | "success" | "warning";

export interface BannerProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  /** Semantic variant — mirrors Figma `variant` axis. Default `information`. */
  variant?: BannerVariant;
}

export const Banner = forwardRef<HTMLDivElement, BannerProps>(function Banner(
  { children, variant = "information", className, ...rest },
  ref
) {
  const classes = ["ds-banner", `ds-banner--${variant}`];
  if (className) classes.push(className);
  return (
    <div
      ref={ref}
      className={classes.join(" ")}
      role={variant === "warning" ? "alert" : "status"}
      {...rest}
    >
      {children}
    </div>
  );
});
