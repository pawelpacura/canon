import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { Button } from "./Button";
import { ChevronBackIcon, ChevronForwardIcon } from "./icons";

export interface PaginationProps extends HTMLAttributes<HTMLDivElement> {
  /** Left-aligned summary text, e.g. "Wyświetlanie 1–9 z 25 testów". */
  summary?: ReactNode;
  /** Mirrors Figma `showSummary` boolean. Default `true`. */
  showSummary?: boolean;
  /** Page-number controls — mirrors Figma `Controls`/`Pages` slots. Compose with page-number buttons yourself. */
  children?: ReactNode;
  /** Called when the "Poprzednia" (previous) button is pressed. Button is disabled when omitted. */
  onPrevious?: () => void;
  /** Called when the "Następna" (next) button is pressed. Button is disabled when omitted. */
  onNext?: () => void;
  previousLabel?: string;
  nextLabel?: string;
}

/** Pagination shell — transparent, top border + summary + prev/next + page-number slot. */
export const Pagination = forwardRef<HTMLDivElement, PaginationProps>(
  function Pagination(
    {
      summary,
      showSummary = true,
      children,
      onPrevious,
      onNext,
      previousLabel = "Poprzednia",
      nextLabel = "Następna",
      className,
      ...rest
    },
    ref
  ) {
    const classes = ["ds-pagination"];
    if (className) classes.push(className);
    return (
      <div ref={ref} className={classes.join(" ")} {...rest}>
        {showSummary ? <p className="ds-pagination__summary">{summary}</p> : <span />}
        <div className="ds-pagination__controls">
          <Button variant="secondary" onClick={onPrevious} disabled={!onPrevious}>
            <ChevronBackIcon size={16} />
            {previousLabel}
          </Button>
          <div className="ds-pagination__pages">{children}</div>
          <Button variant="secondary" onClick={onNext} disabled={!onNext}>
            {nextLabel}
            <ChevronForwardIcon size={16} />
          </Button>
        </div>
      </div>
    );
  }
);

export interface PaginationPageButtonProps
  extends HTMLAttributes<HTMLButtonElement> {
  active?: boolean;
}

/** Single page-number button for `Pagination`'s page slot. */
export const PaginationPageButton = forwardRef<
  HTMLButtonElement,
  PaginationPageButtonProps
>(function PaginationPageButton({ active = false, className, ...rest }, ref) {
  return (
    <Button
      ref={ref}
      variant={active ? "secondary" : "tertiary"}
      aria-current={active ? "page" : undefined}
      className={className}
      {...rest}
    />
  );
});

/** Ellipsis separator between distant page numbers. */
export function PaginationEllipsis() {
  return <span className="ds-pagination__ellipsis">…</span>;
}
