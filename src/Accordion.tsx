import {
  forwardRef,
  useId,
  useState,
  type HTMLAttributes,
  type ReactNode,
} from "react";
import { KeyboardArrowDownIcon } from "./icons";

export interface AccordionProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "title" | "onToggle"> {
  /** Section heading — mirrors Figma `Title` text property. */
  title?: ReactNode;
  /** Content slot — mirrors Figma `Content` slot, shown when expanded. */
  children?: ReactNode;
  /** Mirrors Figma `Expanded` boolean. Uncontrolled default when `onToggle` is omitted. */
  expanded?: boolean;
  /** Notified with the next expanded state when the header is clicked. */
  onToggle?: (expanded: boolean) => void;
}

/** Simple accordion for form sections. Title header toggles the Content slot. */
export const Accordion = forwardRef<HTMLDivElement, AccordionProps>(
  function Accordion(
    { title, children, expanded, onToggle, className, ...rest },
    ref
  ) {
    const [internalExpanded, setInternalExpanded] = useState(true);
    const isControlled = expanded !== undefined;
    const isExpanded = isControlled ? expanded : internalExpanded;
    const contentId = useId();

    const handleToggle = () => {
      if (!isControlled) setInternalExpanded((prev) => !prev);
      onToggle?.(!isExpanded);
    };

    const classes = ["ds-accordion"];
    if (isExpanded) classes.push("ds-accordion--expanded");
    if (className) classes.push(className);

    return (
      <div ref={ref} className={classes.join(" ")} {...rest}>
        <button
          type="button"
          className="ds-accordion__header"
          aria-expanded={isExpanded}
          aria-controls={contentId}
          onClick={handleToggle}
        >
          <h3 className="ds-accordion__title">{title}</h3>
          <span className="ds-accordion__icon">
            <KeyboardArrowDownIcon size={16} />
          </span>
        </button>
        {isExpanded ? (
          <div id={contentId} className="ds-accordion__content">
            {children}
          </div>
        ) : null}
      </div>
    );
  }
);
