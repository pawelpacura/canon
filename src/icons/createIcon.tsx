import { forwardRef } from "react";
import { Icon, type IconProps } from "./Icon";

export interface IconPath {
  x: number;
  y: number;
  d: string;
}

export function createIcon(name: string, paths: IconPath[]) {
  const Component = forwardRef<SVGSVGElement, IconProps>(function NamedIcon(
    props,
    ref
  ) {
    return (
      <Icon ref={ref} viewBox="0 0 24 24" {...props}>
        {paths.map((p, i) => (
          <path
            key={i}
            d={p.d}
            fill="currentColor"
            transform={`translate(${p.x} ${p.y})`}
          />
        ))}
      </Icon>
    );
  });
  Component.displayName = name;
  return Component;
}
