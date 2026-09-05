import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { IconButton } from "./IconButton";
import { CloseIcon } from "./icons";
import { Button } from "./Button";

export interface PanelProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  /** Panel heading — mirrors Figma `Title` text property. */
  title?: ReactNode;
  /** Content slot — mirrors Figma `Content` slot. */
  children?: ReactNode;
  /** Footer slot — mirrors Figma `Footer` slot. Defaults to Cancel/Confirm buttons. */
  footer?: ReactNode;
  /** Mirrors Figma `Show Footer` boolean. Default `true`. */
  showFooter?: boolean;
  /** Called when the header close button is pressed. Omit to hide the button. */
  onClose?: () => void;
  /** Accessible label for the close button. */
  closeLabel?: string;
}

/** Side panel surface (320px wide) — header (title + close) + content slot + footer slot. */
export const Panel = forwardRef<HTMLDivElement, PanelProps>(function Panel(
  {
    title,
    children,
    footer,
    showFooter = true,
    onClose,
    closeLabel = "Zamknij",
    className,
    role,
    ...rest
  },
  ref
) {
  const classes = ["ds-panel"];
  if (className) classes.push(className);
  return (
    <div
      ref={ref}
      className={classes.join(" ")}
      role={role ?? "complementary"}
      {...rest}
    >
      <div className="ds-panel__header">
        <h2 className="ds-panel__title">{title}</h2>
        {onClose ? (
          <IconButton
            variant="tertiary"
            aria-label={closeLabel}
            onClick={onClose}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </div>
      <div className="ds-panel__content">{children}</div>
      {showFooter ? (
        <div className="ds-panel__footer">
          {footer ?? (
            <>
              <Button variant="secondary">Anuluj</Button>
              <Button variant="primary">Potwierdz</Button>
            </>
          )}
        </div>
      ) : null}
    </div>
  );
});
