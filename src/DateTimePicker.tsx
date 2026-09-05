import { forwardRef, type ReactNode } from "react";
import { InputText, type InputTextProps } from "./InputText";
import { CalendarMonthIcon } from "./icons";

export interface DateTimePickerProps
  extends Omit<InputTextProps, "type" | "rightIcon"> {
  /** Calendar icon inside the field — mirrors Figma `showLeftIcon`. Defaults to `<CalendarMonthIcon />`; pass `null` to hide it. */
  leftIcon?: ReactNode;
}

/**
 * Date + time field — mirrors Figma `dateTimePicker`. Same states/tokens as
 * `InputText` (default/hover/filled/error/disabled), with a calendar icon.
 * Wire an actual date/time picker overlay via `onClick` / `onFocus`.
 */
export const DateTimePicker = forwardRef<HTMLInputElement, DateTimePickerProps>(
  function DateTimePicker(
    { leftIcon, placeholder = "Wybierz datę i godzinę", ...rest },
    ref
  ) {
    return (
      <InputText
        ref={ref}
        type="text"
        placeholder={placeholder}
        leftIcon={leftIcon === undefined ? <CalendarMonthIcon /> : leftIcon}
        {...rest}
      />
    );
  }
);
