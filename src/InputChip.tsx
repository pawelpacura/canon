import {
  forwardRef,
  useId,
  useRef,
  type ChangeEventHandler,
  type HTMLAttributes,
  type InputHTMLAttributes,
  type KeyboardEventHandler,
  type MouseEvent,
  type ReactNode,
} from "react";

export interface InputChipProps
  extends Omit<
    HTMLAttributes<HTMLDivElement>,
    "onChange" | "onKeyDown" | "placeholder"
  > {
  /** Tag instances in the Figma `Chips` slot. */
  children?: ReactNode;
  /** Figma `Placeholder` text property — shown on the inner input. */
  placeholder?: string;
  /** Visible label above the field, linked via `htmlFor`. */
  label?: ReactNode;
  /** Helper text below the field, linked via `aria-describedby`. */
  helperText?: ReactNode;
  /** Error state — same tokens as `InputText` `state=error`. */
  error?: boolean;
  /** Error message below the field. Implies the error state. */
  errorMessage?: ReactNode;
  disabled?: boolean;
  name?: string;
  value?: string;
  defaultValue?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onKeyDown?: KeyboardEventHandler<HTMLInputElement>;
  /** Extra props forwarded to the inner text input. */
  inputProps?: InputHTMLAttributes<HTMLInputElement>;
}

/**
 * Text field like `InputText`, with chips inserted inside the control.
 * Place `Tag` instances as children. Not a dropdown — see `MultiSelect`.
 */
export const InputChip = forwardRef<HTMLInputElement, InputChipProps>(
  function InputChip(
    {
      children,
      placeholder,
      label,
      helperText,
      error = false,
      errorMessage,
      disabled = false,
      name,
      value,
      defaultValue,
      onChange,
      onKeyDown,
      inputProps,
      className,
      id: idProp,
      onClick,
      "aria-describedby": ariaDescribedBy,
      ...rest
    },
    ref
  ) {
    const reactId = useId();
    const id = idProp ?? reactId;
    const hasError = error || errorMessage != null;
    const inputRef = useRef<HTMLInputElement>(null);

    const messageId =
      errorMessage != null
        ? `${id}-error`
        : helperText != null
          ? `${id}-helper`
          : undefined;

    const describedBy =
      [ariaDescribedBy, messageId].filter(Boolean).join(" ") || undefined;

    const classes = ["ds-input-chip"];
    if (hasError) classes.push("ds-input-chip--error");
    if (disabled) classes.push("ds-input-chip--disabled");
    if (className) classes.push(className);

    function setInputRef(node: HTMLInputElement | null) {
      inputRef.current = node;
      if (typeof ref === "function") ref(node);
      else if (ref) ref.current = node;
    }

    function handleShellClick(event: MouseEvent<HTMLDivElement>) {
      onClick?.(event);
      if (event.defaultPrevented || disabled) return;
      const target = event.target as HTMLElement;
      if (target.closest("button, input, a, textarea, select")) return;
      inputRef.current?.focus();
    }

    const control = (
      <div
        className={classes.join(" ")}
        onClick={handleShellClick}
        {...rest}
      >
        {children}
        <input
          ref={setInputRef}
          id={id}
          type="text"
          className="ds-input-chip__field"
          placeholder={placeholder}
          disabled={disabled}
          name={name}
          value={value}
          defaultValue={defaultValue}
          onChange={onChange}
          onKeyDown={onKeyDown}
          aria-invalid={hasError || undefined}
          aria-describedby={describedBy}
          {...inputProps}
        />
      </div>
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
