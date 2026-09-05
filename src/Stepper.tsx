import { forwardRef, type HTMLAttributes, type ReactNode } from "react";

export type StepState = "default" | "active" | "completed";

export interface StepProps extends HTMLAttributes<HTMLDivElement> {
  /** Number shown inside the ball, e.g. "1". */
  number?: ReactNode;
  /** Step caption below the ball. */
  label?: ReactNode;
  /** Mirrors Figma `state` variant. Default `default`. */
  state?: StepState;
  /** Mirrors Figma `Show Line` boolean — hide on the last step. Default `true`. */
  showLine?: boolean;
}

/** Stepper atom: ball + connector line + label. Compose inside `Stepper`'s `Steps` slot. */
export const Step = forwardRef<HTMLDivElement, StepProps>(function Step(
  { number, label, state = "default", showLine = true, className, ...rest },
  ref
) {
  const classes = ["ds-step", `ds-step--${state}`];
  if (className) classes.push(className);
  return (
    <div ref={ref} className={classes.join(" ")} {...rest}>
      <div className="ds-step__marker">
        <div className="ds-step__ball">{number}</div>
        <div className="ds-step__label">{label}</div>
      </div>
      {showLine ? (
        <div className="ds-step__line-rail">
          <div className="ds-step__line" />
        </div>
      ) : null}
    </div>
  );
});

export interface StepperProps extends HTMLAttributes<HTMLDivElement> {
  /** `Step` instances — mirrors Figma `Steps` slot. Last step should set `showLine={false}`. */
  children?: ReactNode;
}

/** Horizontal stepper. Place `Step` instances as children. */
export const Stepper = forwardRef<HTMLDivElement, StepperProps>(
  function Stepper({ children, className, ...rest }, ref) {
    const classes = ["ds-stepper"];
    if (className) classes.push(className);
    return (
      <div ref={ref} className={classes.join(" ")} {...rest}>
        {children}
      </div>
    );
  }
);
