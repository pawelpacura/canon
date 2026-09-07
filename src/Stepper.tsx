import { forwardRef, type HTMLAttributes, type ReactNode } from "react";

export type StepState =
  | "default"
  | "active"
  | "completed"
  | "completed-selected";

export interface StepProps extends HTMLAttributes<HTMLDivElement> {
  /** Number shown inside the ball, e.g. "1". */
  number?: ReactNode;
  /** Step caption below the ball. */
  label?: ReactNode;
  /**
   * Filled (completed) is sticky — going back to an earlier step does not
   * unfill this one. Independent from `selected`.
   */
  filled?: boolean;
  /** Current step the user is viewing. Independent from `filled`. */
  selected?: boolean;
  /**
   * Mirrors Figma `state`. Prefer `filled` + `selected`.
   * `completed-selected` = filled and current (revisited).
   */
  state?: StepState;
  /** Mirrors Figma `Show Line` boolean — hide on the last step. Default `true`. */
  showLine?: boolean;
}

function resolveFlags(
  filled: boolean | undefined,
  selected: boolean | undefined,
  state: StepState | undefined
) {
  const fromStateFilled =
    state === "completed" || state === "completed-selected";
  const fromStateSelected =
    state === "active" || state === "completed-selected";
  return {
    filled: filled ?? fromStateFilled,
    selected: selected ?? fromStateSelected,
  };
}

/** Stepper atom: ball + connector line + label. Compose inside `Stepper`'s `Steps` slot. */
export const Step = forwardRef<HTMLDivElement, StepProps>(function Step(
  {
    number,
    label,
    filled,
    selected,
    state = "default",
    showLine = true,
    className,
    ...rest
  },
  ref
) {
  const flags = resolveFlags(filled, selected, state);
  const classes = ["ds-step"];
  if (flags.filled) classes.push("ds-step--filled", "ds-step--completed");
  if (flags.selected) classes.push("ds-step--selected", "ds-step--active");
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
