import {
  forwardRef,
  useId,
  type InputHTMLAttributes,
  type ReactNode,
} from "react";

export interface InputTextProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  /** Error state, mirrors `state=error` in Figma. */
  error?: boolean;
  /** Input type (text-like types only). */
  type?: "text" | "email" | "password" | "search" | "tel" | "url" | "number";
  /** Visible label, rendered above the field and linked via `htmlFor`. */
  label?: ReactNode;
  /** Helper text shown below the field, linked via `aria-describedby`. */
  helperText?: ReactNode;
  /**
   * Error message shown below the field. Implies the error state and is wired
   * to the input via `aria-describedby`.
   */
  errorMessage?: ReactNode;
  /** Left icon inside the field — mirrors Figma `showLeftIcon`. */
  leftIcon?: ReactNode;
  /** Right icon inside the field — mirrors Figma `showRightIcon`. */
  rightIcon?: ReactNode;
}

export const InputText = forwardRef<HTMLInputElement, InputTextProps>(
  function InputText(
    {
      error = false,
      className,
      type = "text",
      id: idProp,
      label,
      helperText,
      errorMessage,
      leftIcon,
      rightIcon,
      "aria-describedby": ariaDescribedBy,
      ...rest
    },
    ref
  ) {
    const reactId = useId();
    const id = idProp ?? reactId;
    const hasError = error || errorMessage != null;
    const hasIcons = leftIcon != null || rightIcon != null;

    const messageId =
      errorMessage != null
        ? `${id}-error`
        : helperText != null
          ? `${id}-helper`
          : undefined;

    const describedBy =
      [ariaDescribedBy, messageId].filter(Boolean).join(" ") || undefined;

    const fieldClasses = ["ds-field", "ds-focusable"];
    if (hasError) fieldClasses.push("ds-field--error");
    if (hasIcons) fieldClasses.push("ds-field--with-icons");
    if (className && !hasIcons) fieldClasses.push(className);

    const input = (
      <input
        ref={ref}
        id={id}
        type={type}
        className={fieldClasses.join(" ")}
        aria-invalid={hasError || undefined}
        aria-describedby={describedBy}
        {...rest}
      />
    );

    const control = hasIcons ? (
      <div
        className={[
          "ds-field-control",
          hasError ? "ds-field-control--error" : "",
          className ?? "",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        {leftIcon != null ? (
          <span className="ds-field-control__icon" aria-hidden="true">
            {leftIcon}
          </span>
        ) : null}
        {input}
        {rightIcon != null ? (
          <span className="ds-field-control__icon" aria-hidden="true">
            {rightIcon}
          </span>
        ) : null}
      </div>
    ) : (
      input
    );

    if (label == null && helperText == null && errorMessage == null) {
      return control;
    }

    return (
      <div className="ds-field-group">
        {label != null ? (
          <label className="ds-field-label" htmlFor={id}>
            {label}
          </label>
        ) : null}
        {control}
        {errorMessage != null ? (
          <span
            id={`${id}-error`}
            className="ds-field-message ds-field-message--error"
          >
            {errorMessage}
          </span>
        ) : helperText != null ? (
          <span id={`${id}-helper`} className="ds-field-message">
            {helperText}
          </span>
        ) : null}
      </div>
    );
  }
);
