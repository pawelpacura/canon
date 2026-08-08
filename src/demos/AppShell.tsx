import type { ReactNode } from "react";
import { Header } from "../Header";
import { SideNav } from "../SideNav";
import { SideNavItem } from "../SideNavItem";
import {
  HomeIcon,
  ContentPasteSearchIcon,
  LibraryAddCheckIcon,
  PercentIcon,
  DarkModeIcon,
} from "../icons";

export type AppShellNav = "home" | "tests" | "bank" | "reports";

export function AppShell({
  active,
  children,
}: {
  active: AppShellNav;
  children: ReactNode;
}) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100dvh",
        width: "100%",
        background: "var(--color-background-secondary)",
        fontFamily: "var(--font-family-primary)",
      }}
    >
      <Header
        searchPlaceholder="Szukaj testów..."
        userName="Jan Kowalski"
      />
      <div style={{ display: "flex", flex: 1, minHeight: 0 }}>
        <SideNav>
          <SideNavItem
            icon={<HomeIcon />}
            aria-label="Pulpit"
            active={active === "home"}
          />
          <SideNavItem
            icon={<ContentPasteSearchIcon />}
            aria-label="Testy"
            active={active === "tests"}
          />
          <SideNavItem
            icon={<LibraryAddCheckIcon />}
            aria-label="Bank pytań"
            active={active === "bank"}
          />
          <SideNavItem
            icon={<PercentIcon />}
            aria-label="Raporty"
            active={active === "reports"}
          />
          <SideNavItem
            icon={<DarkModeIcon />}
            aria-label="Tryb ciemny"
            style={{ marginTop: "auto" }}
          />
        </SideNav>
        <main style={{ flex: 1, overflow: "auto" }}>{children}</main>
      </div>
    </div>
  );
}
