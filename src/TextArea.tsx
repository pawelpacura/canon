import { forwardRef, type TextareaHTMLAttributes } from "react";

export interface TextAreaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** Error state, mirrors `state=error` in Figma. */
  error?: boolean;
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  function TextArea({ error = false, className, ...rest }, ref) {
    const classes = ["ds-field", "ds-textarea", "ds-focusable"];
    if (error) classes.push("ds-field--error");
    if (className) classes.push(className);
    return (
      <textarea
        ref={ref}
        className={classes.join(" ")}
        aria-invalid={error || undefined}
        {...rest}
      />
    );
  }
);
