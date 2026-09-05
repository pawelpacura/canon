import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { IconButton } from "./IconButton";
import { CloseIcon } from "./icons";
import { Button } from "./Button";

export interface ModalProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  /** Modal heading — mirrors Figma `Title` text property. */
  title?: ReactNode;
  /** Content slot — mirrors Figma `Conent` slot. */
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

/** Centered dialog surface — header (title + close) + content slot + footer slot. */
export const Modal = forwardRef<HTMLDivElement, ModalProps>(function Modal(
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
  const classes = ["ds-modal"];
  if (className) classes.push(className);
  return (
    <div
      ref={ref}
      className={classes.join(" ")}
      role={role ?? "dialog"}
      aria-modal="true"
      {...rest}
    >
      <div className="ds-modal__header">
        <h2 className="ds-modal__title">{title}</h2>
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
      <div className="ds-modal__content">{children}</div>
      {showFooter ? (
        <div className="ds-modal__footer">
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
