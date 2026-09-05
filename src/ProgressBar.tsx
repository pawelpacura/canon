import { forwardRef, type HTMLAttributes } from "react";

export type ProgressBarSize = "s" | "m" | "l";

export interface ProgressBarProps extends HTMLAttributes<HTMLDivElement> {
  /** Mirrors Figma `size` variant. Default `s`. */
  size?: ProgressBarSize;
  /** Progress percentage, 0–100. */
  value?: number;
}

/** Determinate progress indicator — track + fill. */
export const ProgressBar = forwardRef<HTMLDivElement, ProgressBarProps>(
  function ProgressBar({ size = "s", value = 0, className, ...rest }, ref) {
    const classes = ["ds-progress-bar", `ds-progress-bar--${size}`];
    if (className) classes.push(className);
    const clamped = Math.min(100, Math.max(0, value));
    return (
      <div
        ref={ref}
        className={classes.join(" ")}
        role="progressbar"
        aria-valuenow={clamped}
        aria-valuemin={0}
        aria-valuemax={100}
        {...rest}
      >
        <div className="ds-progress-bar__fill" style={{ width: `${clamped}%` }} />
      </div>
    );
  }
);
