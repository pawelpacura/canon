import {
  forwardRef,
  useState,
  type HTMLAttributes,
  type MouseEvent,
} from "react";
import { ChevronBackIcon, ChevronForwardIcon } from "./icons";

export interface SideNavProps extends HTMLAttributes<HTMLElement> {
  /** Mirrors Figma `Expanded`. Omit for uncontrolled expand/collapse. */
  expanded?: boolean;
  /** Mirrors Figma `Show Expand Strip`. Hover and keyboard focus still reveal the strip. */
  showExpandStrip?: boolean;
  /** Called when the expand strip is pressed. */
  onExpandedChange?: (expanded: boolean) => void;
  /** Accessible label for the collapsed expand strip. */
  expandLabel?: string;
  /** Accessible label for the expanded collapse strip. */
  collapseLabel?: string;
}

export const SideNav = forwardRef<HTMLElement, SideNavProps>(function SideNav(
  {
    className,
    expanded: expandedProp,
    showExpandStrip = false,
    onExpandedChange,
    expandLabel = "Rozwiń menu",
    collapseLabel = "Zwiń menu",
    children,
    onMouseLeave,
    ...rest
  },
  ref
) {
  const [uncontrolled, setUncontrolled] = useState(false);
  const [hoverLocked, setHoverLocked] = useState(false);
  const expanded = expandedProp ?? uncontrolled;

  function toggle() {
    const next = !expanded;
    if (expandedProp === undefined) setUncontrolled(next);
    onExpandedChange?.(next);
    setHoverLocked(!next);
  }

  function handleMouseLeave(event: MouseEvent<HTMLElement>) {
    setHoverLocked(false);
    onMouseLeave?.(event);
  }

  const classes = ["ds-side-nav"];
  if (expanded) classes.push("ds-side-nav--expanded");
  if (showExpandStrip) classes.push("ds-side-nav--show-expand-strip");
  if (hoverLocked) classes.push("ds-side-nav--hover-locked");
  if (className) classes.push(className);

  return (
    <nav
      ref={ref}
      className={classes.join(" ")}
      onMouseLeave={handleMouseLeave}
      {...rest}
    >
      {children}
      <button
        type="button"
        className="ds-side-nav__expand-strip ds-focusable"
        aria-label={expanded ? collapseLabel : expandLabel}
        aria-expanded={expanded}
        onClick={(event) => {
          toggle();
          if (expanded) event.currentTarget.blur();
        }}
      >
        <span className="ds-side-nav-item__icon">
          {expanded ? <ChevronBackIcon /> : <ChevronForwardIcon />}
        </span>
      </button>
    </nav>
  );
});
