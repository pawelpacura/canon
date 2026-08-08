import { forwardRef, type SVGAttributes } from "react";

export interface IconProps extends SVGAttributes<SVGSVGElement> {
  /** Icon size in px. Default 24 (matches Figma icon components). */
  size?: number;
  /** SVG viewBox. Material Symbols use `0 -960 960 960`. */
  viewBox?: string;
}

export const Icon = forwardRef<SVGSVGElement, IconProps>(function Icon(
  { size = 24, viewBox = "0 -960 960 960", className, children, ...rest },
  ref
) {
  const classes = ["ds-icon"];
  if (className) classes.push(className);
  return (
    <svg
      ref={ref}
      width={size}
      height={size}
      viewBox={viewBox}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden={rest["aria-label"] ? undefined : true}
      className={classes.join(" ")}
      {...rest}
    >
      {children}
    </svg>
  );
});
