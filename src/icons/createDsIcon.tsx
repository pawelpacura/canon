import { forwardRef } from "react";
import { Icon, type IconProps } from "./Icon";

/** Material Symbols coordinate space (outlined, weight 300). */
export const MATERIAL_SYMBOL_VIEWBOX = "0 -960 960 960";

export interface MaterialSymbolPath {
  d: string;
}

export function createDsIcon(name: string, paths: MaterialSymbolPath[]) {
  const Component = forwardRef<SVGSVGElement, IconProps>(function NamedIcon(
    props,
    ref
  ) {
    return (
      <Icon ref={ref} viewBox={MATERIAL_SYMBOL_VIEWBOX} {...props}>
        {paths.map((p, i) => (
          <path key={i} d={p.d} fill="currentColor" />
        ))}
      </Icon>
    );
  });
  Component.displayName = name;
  return Component;
}
