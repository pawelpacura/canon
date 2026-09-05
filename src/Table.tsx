import {
  forwardRef,
  type ButtonHTMLAttributes,
  type HTMLAttributes,
  type ReactNode,
} from "react";

export interface TableCellProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  /** Mirrors Figma `variant` axis. Default `body`. */
  variant?: "body" | "header";
}

/** Single cell — compose into `TableRow`. */
export const TableCell = forwardRef<HTMLDivElement, TableCellProps>(
  function TableCell({ children, variant = "body", className, ...rest }, ref) {
    const classes = ["ds-table-cell", `ds-table-cell--${variant}`];
    if (className) classes.push(className);
    return (
      <div ref={ref} className={classes.join(" ")} {...rest}>
        {children}
      </div>
    );
  }
);

export interface TableRowProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  /** Striped background — mirrors Figma `zebra` axis. */
  zebra?: boolean;
  /** Selected/expanded row highlight — mirrors Figma `state=active`. */
  active?: boolean;
  /** Renders header-style cells wrapper. Set on the header row. */
  header?: boolean;
}

/** Row of `TableCell`s. Hover styling on body cells is automatic (`:hover`). */
export const TableRow = forwardRef<HTMLDivElement, TableRowProps>(
  function TableRow(
    { children, zebra = false, active = false, header = false, className, ...rest },
    ref
  ) {
    const classes = [header ? "ds-table-header-row" : "ds-table-row"];
    if (zebra) classes.push("ds-table-row--zebra");
    if (active) classes.push("ds-table-row--active");
    if (className) classes.push(className);
    return (
      <div ref={ref} className={classes.join(" ")} {...rest}>
        {children}
      </div>
    );
  }
);

export interface TableProps extends HTMLAttributes<HTMLDivElement> {
  /** Header row — mirrors Figma `table/header`. Typically a `TableRow` of header `TableCell`s. */
  header?: ReactNode;
  /** Body rows — mirrors Figma `rows`. Typically `TableRow` of body `TableCell`s. */
  children?: ReactNode;
  /** Footer slot — mirrors Figma `Footer` (page size + pagination). */
  footer?: ReactNode;
  /** Mirrors Figma presence of the `Footer` frame. Default `true` when `footer` is given. */
  showFooter?: boolean;
}

/** Data table shell — header row + body rows + optional footer. */
export const Table = forwardRef<HTMLDivElement, TableProps>(function Table(
  { header, children, footer, showFooter = true, className, ...rest },
  ref
) {
  const classes = ["ds-table"];
  if (className) classes.push(className);
  return (
    <div ref={ref} className={classes.join(" ")} role="table" {...rest}>
      {header}
      <div role="rowgroup">{children}</div>
      {showFooter && footer ? <div className="ds-table-footer">{footer}</div> : null}
    </div>
  );
});

export interface TablePageSizeProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

/** Bordered page-size readout, e.g. "10" — pair with "Pokazuj"/"na stronie" text in the footer. */
export const TablePageSize = forwardRef<HTMLDivElement, TablePageSizeProps>(
  function TablePageSize({ children, className, ...rest }, ref) {
    const classes = ["ds-table-page-size"];
    if (className) classes.push(className);
    return (
      <div ref={ref} className={classes.join(" ")} {...rest}>
        {children}
      </div>
    );
  }
);

export interface TableFooterSectionProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

/** Groups related footer controls, e.g. "Pokazuj" + page-size + "na stronie". */
export function TableFooterSection({
  children,
  className,
  ...rest
}: TableFooterSectionProps) {
  const classes = ["ds-table-footer__section"];
  if (className) classes.push(className);
  return (
    <div className={classes.join(" ")} {...rest}>
      {children}
    </div>
  );
}

export interface TablePaginationProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

/** Compact in-table pagination — pair with plain page-number text/buttons. */
export function TablePagination({
  children,
  className,
  ...rest
}: TablePaginationProps) {
  const classes = ["ds-table-pagination"];
  if (className) classes.push(className);
  return (
    <div className={classes.join(" ")} {...rest}>
      {children}
    </div>
  );
}

export interface TablePaginationPageProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
}

/** Single page number inside `TablePagination`. */
export function TablePaginationPage({
  active = false,
  className,
  ...rest
}: TablePaginationPageProps) {
  const classes = ["ds-table-pagination__page"];
  if (active) classes.push("ds-table-pagination__page--active");
  if (className) classes.push(className);
  return <button type="button" className={classes.join(" ")} {...rest} />;
}
