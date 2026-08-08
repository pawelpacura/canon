import {
  forwardRef,
  useCallback,
  useEffect,
  useId,
  useImperativeHandle,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import { KeyboardArrowDownIcon } from "./icons";

export interface MultiSelectOption {
  value: string;
  label: ReactNode;
  disabled?: boolean;
}

interface MultiSelectBaseProps {
  options: MultiSelectOption[];
  placeholder?: string;
  error?: boolean;
  disabled?: boolean;
  className?: string;
  id?: string;
  name?: string;
  /** Accessible label when no visible label is associated. */
  "aria-label"?: string;
}

export interface MultiSelectSingleProps extends MultiSelectBaseProps {
  multiple?: false;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
}

export interface MultiSelectMultipleProps extends MultiSelectBaseProps {
  multiple: true;
  value?: string[];
  defaultValue?: string[];
  onChange?: (value: string[]) => void;
}

export type MultiSelectProps = MultiSelectSingleProps | MultiSelectMultipleProps;

export interface MultiSelectHandle {
  focus: () => void;
  blur: () => void;
}

function isSelected(
  optionValue: string,
  multiple: boolean,
  value: string | string[] | undefined
) {
  if (multiple) {
    return Array.isArray(value) && value.includes(optionValue);
  }
  return value === optionValue;
}

function getDisplayLabel(
  options: MultiSelectOption[],
  multiple: boolean,
  value: string | string[] | undefined
): ReactNode | null {
  if (multiple) {
    const selected = Array.isArray(value) ? value : [];
    if (selected.length === 0) return null;
    const labels = selected
      .map((item) => options.find((option) => option.value === item)?.label)
      .filter((label) => label != null);
    return labels.join(", ");
  }

  if (!value) return null;
  return options.find((option) => option.value === value)?.label ?? null;
}

export const MultiSelect = forwardRef<MultiSelectHandle, MultiSelectProps>(
  function MultiSelect(props, ref) {
    const {
      options,
      placeholder = "Wybierz...",
      error = false,
      disabled = false,
      className,
      id: idProp,
      name,
      "aria-label": ariaLabel,
    } = props;

    const multiple = props.multiple === true;
    const isControlled = props.value !== undefined;

    const [uncontrolledValue, setUncontrolledValue] = useState<string | string[]>(
      () => {
        if (multiple) {
          return props.defaultValue ?? [];
        }
        return props.defaultValue ?? "";
      }
    );

    const value = isControlled ? props.value : uncontrolledValue;

    const [open, setOpen] = useState(false);
    const [activeIndex, setActiveIndex] = useState(-1);

    const generatedId = useId();
    const id = idProp ?? generatedId;
    const listboxId = `${id}-listbox`;

    const rootRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLButtonElement>(null);

    useImperativeHandle(ref, () => ({
      focus: () => triggerRef.current?.focus(),
      blur: () => triggerRef.current?.blur(),
    }));

    const emitChange = useCallback(
      (next: string | string[]) => {
        if (!isControlled) {
          setUncontrolledValue(next);
        }
        if (multiple) {
          (props as MultiSelectMultipleProps).onChange?.(next as string[]);
        } else {
          (props as MultiSelectSingleProps).onChange?.(next as string);
        }
      },
      [isControlled, multiple, props]
    );

    const selectOption = useCallback(
      (option: MultiSelectOption) => {
        if (option.disabled) return;

        if (multiple) {
          const current = Array.isArray(value) ? value : [];
          const next = current.includes(option.value)
            ? current.filter((item) => item !== option.value)
            : [...current, option.value];
          emitChange(next);
          return;
        }

        emitChange(option.value);
        setOpen(false);
        triggerRef.current?.focus();
      },
      [emitChange, multiple, value]
    );

    const enabledOptions = options.filter((option) => !option.disabled);

    const moveActive = (direction: 1 | -1) => {
      if (enabledOptions.length === 0) return;
      setActiveIndex((current) => {
        const start = current < 0 ? (direction === 1 ? -1 : 0) : current;
        let next = start;
        for (let i = 0; i < enabledOptions.length; i += 1) {
          next = (next + direction + enabledOptions.length) % enabledOptions.length;
          if (!enabledOptions[next]?.disabled) break;
        }
        return next;
      });
    };

    useEffect(() => {
      if (!open) return;
      const onDocumentMouseDown = (event: MouseEvent) => {
        if (!rootRef.current?.contains(event.target as Node)) {
          setOpen(false);
        }
      };
      document.addEventListener("mousedown", onDocumentMouseDown);
      return () => document.removeEventListener("mousedown", onDocumentMouseDown);
    }, [open]);

    useEffect(() => {
      if (!open) {
        setActiveIndex(-1);
      }
    }, [open]);

    const onTriggerKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
      if (disabled) return;

      switch (event.key) {
        case "ArrowDown":
          event.preventDefault();
          if (!open) {
            setOpen(true);
            setActiveIndex(0);
          } else {
            moveActive(1);
          }
          break;
        case "ArrowUp":
          event.preventDefault();
          if (!open) {
            setOpen(true);
            setActiveIndex(enabledOptions.length - 1);
          } else {
            moveActive(-1);
          }
          break;
        case "Enter":
        case " ":
          event.preventDefault();
          if (!open) {
            setOpen(true);
            setActiveIndex(0);
          } else if (activeIndex >= 0) {
            selectOption(enabledOptions[activeIndex]);
          }
          break;
        case "Escape":
          event.preventDefault();
          setOpen(false);
          break;
        case "Tab":
          setOpen(false);
          break;
        default:
          break;
      }
    };

    const displayLabel = getDisplayLabel(options, multiple, value);
    const classes = ["ds-multiselect"];
    if (className) classes.push(className);

    const triggerClasses = [
      "ds-multiselect__trigger",
      "ds-field",
      "ds-focusable",
    ];
    if (error) triggerClasses.push("ds-field--error");
    if (open) triggerClasses.push("ds-multiselect__trigger--open");

    return (
      <div ref={rootRef} className={classes.join(" ")}>
        {name ? (
          multiple ? (
            (Array.isArray(value) ? value : []).map((item) => (
              <input key={item} type="hidden" name={`${name}[]`} value={item} />
            ))
          ) : value ? (
            <input type="hidden" name={name} value={value as string} />
          ) : null
        ) : null}

        <button
          ref={triggerRef}
          id={id}
          type="button"
          className={triggerClasses.join(" ")}
          disabled={disabled}
          aria-invalid={error || undefined}
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-controls={listboxId}
          aria-label={ariaLabel}
          onClick={() => {
            if (disabled) return;
            setOpen((current) => !current);
          }}
          onKeyDown={onTriggerKeyDown}
        >
          <span
            className={
              displayLabel
                ? "ds-multiselect__value"
                : "ds-multiselect__placeholder"
            }
          >
            {displayLabel ?? placeholder}
          </span>
          <KeyboardArrowDownIcon
            className={`ds-multiselect__chevron${open ? " ds-multiselect__chevron--open" : ""}`}
            size={20}
          />
        </button>

        {open ? (
          <ul
            id={listboxId}
            role="listbox"
            aria-multiselectable={multiple || undefined}
            aria-labelledby={id}
            className="ds-multiselect__menu"
          >
            {options.map((option) => {
              const selected = isSelected(option.value, multiple, value);
              const enabledIndex = enabledOptions.findIndex(
                (item) => item.value === option.value
              );
              const focused = enabledIndex === activeIndex;
              const optionClasses = ["ds-multiselect__option"];
              if (selected) optionClasses.push("ds-multiselect__option--selected");
              if (focused) optionClasses.push("ds-multiselect__option--focused");
              if (option.disabled) optionClasses.push("ds-multiselect__option--disabled");

              return (
                <li
                  key={option.value}
                  role="option"
                  aria-selected={selected}
                  aria-disabled={option.disabled || undefined}
                  className={optionClasses.join(" ")}
                  onMouseEnter={() => {
                    if (!option.disabled && enabledIndex >= 0) {
                      setActiveIndex(enabledIndex);
                    }
                  }}
                  onMouseDown={(event) => event.preventDefault()}
                  onClick={() => selectOption(option)}
                >
                  {multiple ? (
                    <span
                      className={`ds-multiselect__option-indicator ds-multiselect__option-indicator--checkbox${selected ? " ds-multiselect__option-indicator--checked" : ""}`}
                      aria-hidden="true"
                    />
                  ) : null}
                  <span className="ds-multiselect__option-label">{option.label}</span>
                  {!multiple && selected ? (
                    <span
                      className="ds-multiselect__option-indicator ds-multiselect__option-indicator--single"
                      aria-hidden="true"
                    />
                  ) : null}
                </li>
              );
            })}
          </ul>
        ) : null}
      </div>
    );
  }
);
