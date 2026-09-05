import { forwardRef, type ReactNode } from "react";
import { InputText, type InputTextProps } from "./InputText";
import { ScheduleIcon } from "./icons";

export interface TimePickerProps
  extends Omit<InputTextProps, "type" | "rightIcon"> {
  /** Clock icon inside the field — mirrors Figma `showLeftIcon`. Defaults to `<ScheduleIcon />`; pass `null` to hide it. */
  leftIcon?: ReactNode;
}

/**
 * Time-only field — mirrors Figma `timePicker`. Same states/tokens as
 * `InputText` (default/hover/filled/error/disabled), with a clock icon.
 * Wire an actual time picker overlay via `onClick` / `onFocus`.
 */
export const TimePicker = forwardRef<HTMLInputElement, TimePickerProps>(
  function TimePicker(
    { leftIcon, placeholder = "Wybierz godzinę", ...rest },
    ref
  ) {
    return (
      <InputText
        ref={ref}
        type="text"
        placeholder={placeholder}
        leftIcon={leftIcon === undefined ? <ScheduleIcon /> : leftIcon}
        {...rest}
      />
    );
  }
);
