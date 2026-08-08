import { forwardRef, type HTMLAttributes } from "react";
import { Avatar } from "./Avatar";
import { InputText } from "./InputText";
import { Logo } from "./Logo";
import { KeyboardArrowDownIcon, SearchIcon } from "./icons";

export interface HeaderProps extends HTMLAttributes<HTMLElement> {
  /** Accessible label for the brand logo. */
  logoAlt?: string;
  /** Search field placeholder. */
  searchPlaceholder?: string;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  /** User display name shown next to the avatar. */
  userName?: string;
  /** Click handler for the user area (e.g. open profile menu). */
  onUserClick?: () => void;
}

export const Header = forwardRef<HTMLElement, HeaderProps>(function Header(
  {
    logoAlt,
    searchPlaceholder = "Szukaj",
    searchValue,
    onSearchChange,
    userName,
    onUserClick,
    className,
    ...rest
  },
  ref
) {
  const classes = ["ds-header"];
  if (className) classes.push(className);

  return (
    <header ref={ref} className={classes.join(" ")} {...rest}>
      <Logo alt={logoAlt} />

      <div className="ds-header__search">
        <InputText
          type="search"
          placeholder={searchPlaceholder}
          value={searchValue}
          onChange={
            onSearchChange
              ? (e) => onSearchChange(e.target.value)
              : undefined
          }
          aria-label={searchPlaceholder}
          leftIcon={<SearchIcon />}
          rightIcon={<KeyboardArrowDownIcon />}
        />
      </div>

      {userName ? (
        <button
          type="button"
          className="ds-header__user ds-focusable"
          onClick={onUserClick}
        >
          <Avatar />
          <span className="ds-header__user-name">{userName}</span>
          <KeyboardArrowDownIcon />
        </button>
      ) : null}
    </header>
  );
});
