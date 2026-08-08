import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { Button } from "./Button";
import { Tab } from "./Tab";
import { Tabs } from "./Tabs";

export interface PageHeaderTab {
  id: string;
  label: ReactNode;
}

export interface PageHeaderProps
  extends Omit<HTMLAttributes<HTMLElement>, "title"> {
  title: ReactNode;
  subtitle?: ReactNode;
  tabs?: PageHeaderTab[];
  activeTabId?: string;
  onTabChange?: (tabId: string) => void;
  /**
   * Actions slot (Figma `Actions`). When set, replaces the convenience
   * `actionLabel` / `actionIcon` / `onAction` button.
   */
  actions?: ReactNode;
  /** Convenience primary action — used when `actions` is not provided. */
  actionLabel?: ReactNode;
  actionIcon?: ReactNode;
  onAction?: () => void;
  /** Right side of the addons row (e.g. view-mode iconButtons). */
  filters?: ReactNode;
}

export const PageHeader = forwardRef<HTMLElement, PageHeaderProps>(
  function PageHeader(
    {
      title,
      subtitle,
      tabs,
      activeTabId,
      onTabChange,
      actions,
      actionLabel,
      actionIcon,
      onAction,
      filters,
      className,
      ...rest
    },
    ref
  ) {
    const classes = ["ds-page-header"];
    if (className) classes.push(className);

    const actionSlot =
      actions ??
      (actionLabel ? (
        <Button
          variant="primary"
          className="ds-page-header__action"
          icon={!actionIcon}
          onClick={onAction}
        >
          {actionIcon}
          {actionLabel}
        </Button>
      ) : null);

    const hasAddons =
      (tabs != null && tabs.length > 0) || filters != null;

    return (
      <header ref={ref} className={classes.join(" ")} {...rest}>
        <div className="ds-page-header__header">
          <div className="ds-page-header__intro">
            <h1 className="ds-page-header__title">{title}</h1>
            {subtitle ? (
              <p className="ds-page-header__subtitle">{subtitle}</p>
            ) : null}
          </div>
          {actionSlot ? (
            <div className="ds-page-header__actions">{actionSlot}</div>
          ) : null}
        </div>

        {hasAddons ? (
          <div className="ds-page-header__addons">
            {tabs && tabs.length > 0 ? (
              <Tabs className="ds-page-header__tabs">
                {tabs.map((tab) => (
                  <Tab
                    key={tab.id}
                    active={tab.id === activeTabId}
                    onClick={() => onTabChange?.(tab.id)}
                  >
                    {tab.label}
                  </Tab>
                ))}
              </Tabs>
            ) : (
              <div />
            )}
            {filters != null ? (
              <div className="ds-page-header__filters">{filters}</div>
            ) : null}
          </div>
        ) : null}
      </header>
    );
  }
);
