import type { ReactNode } from "react";
import {
  ClockLoader40Icon,
  ContentPasteSearchIcon,
  DarkModeIcon,
  Header,
  HomeIcon,
  NewsstandIcon,
  SideNav,
  SideNavItem,
} from "@pacurap/design-system";
import type { Route } from "../types";

export function AppShell({
  route,
  theme,
  search,
  onSearch,
  onNavigate,
  onToggleTheme,
  children,
}: {
  route: Route;
  theme: "light" | "dark";
  search: string;
  onSearch: (value: string) => void;
  onNavigate: (route: Route) => void;
  onToggleTheme: () => void;
  children: ReactNode;
}) {
  const nav: Route = route === "create" || route === "edit" ? "tests" : route;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100dvh",
        overflow: "hidden",
      }}
    >
      <Header
        searchPlaceholder="Szukaj testów..."
        searchValue={search}
        onSearchChange={onSearch}
        userName="Jan Kowalski"
      />
      <div style={{ display: "flex", flex: 1, minHeight: 0 }}>
        <SideNav>
          <SideNavItem
            icon={<HomeIcon />}
            aria-label="Pulpit"
            active={nav === "dashboard"}
            onClick={() => onNavigate("dashboard")}
          />
          <SideNavItem
            icon={<ContentPasteSearchIcon />}
            aria-label="Testy"
            active={nav === "tests"}
            onClick={() => onNavigate("tests")}
          />
          <SideNavItem
            icon={<NewsstandIcon />}
            aria-label="Bank pytań"
            active={nav === "bank"}
            onClick={() => onNavigate("bank")}
          />
          <SideNavItem
            icon={<ClockLoader40Icon />}
            aria-label="Raporty"
            active={nav === "reports"}
            onClick={() => onNavigate("reports")}
          />
          <SideNavItem
            icon={<DarkModeIcon />}
            aria-label={
              theme === "light" ? "Włącz tryb ciemny" : "Włącz tryb jasny"
            }
            onClick={onToggleTheme}
            style={{ marginTop: "auto" }}
          />
        </SideNav>
        <main
          style={{
            flex: 1,
            overflow: "auto",
            display: "flex",
            flexDirection: "column",
            gap: "var(--spacing-l)",
            padding: "var(--spacing-l)",
          }}
        >
          {children}
        </main>
      </div>
    </div>
  );
}
