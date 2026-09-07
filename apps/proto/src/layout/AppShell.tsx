import { useState, type ReactNode } from "react";
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
import { UserMenu } from "../overlays/UserMenu";
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
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  function go(next: Route) {
    setUserMenuOpen(false);
    onNavigate(next);
  }
  const nav: Route | null =
    route === "create" || route === "edit"
      ? "tests"
      : route === "report"
        ? "reports"
        : route === "profile" || route === "settings"
          ? null
          : route;

  return (
    <div
      className="proto-shell"
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
        onUserClick={() => setUserMenuOpen((open) => !open)}
      />
      {userMenuOpen ? (
        <UserMenu
          onProfile={() => go("profile")}
          onSettings={() => go("settings")}
          onLogout={() => setUserMenuOpen(false)}
          onClose={() => setUserMenuOpen(false)}
        />
      ) : null}
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
          className={
            route === "create" || route === "tests"
              ? "proto-main proto-main--fill"
              : "proto-main"
          }
        >
          {children}
        </main>
      </div>
    </div>
  );
}
