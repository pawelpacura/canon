import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { IconButton } from "./IconButton";
import { PageHeader } from "./PageHeader";
import {
  BorderAllIcon,
  DataTableIcon,
  GridViewIcon,
} from "./icons";

const meta = {
  title: "Components/PageHeader",
  component: PageHeader,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof PageHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Testy i ankiety",
    subtitle: "Zarządzaj testami, monitoruj postępy i analizuj wyniki",
    actionLabel: "Utwórz test",
  },
};

export const WithTabs: Story = {
  args: {
    title: "Testy i ankiety",
    subtitle: "Zarządzaj testami, monitoruj postępy i analizuj wyniki",
    actionLabel: "Utwórz test",
  },
  render: (args) => {
    const [activeTabId, setActiveTabId] = useState("active");
    const [view, setView] = useState<"detailed" | "grid" | "list">("detailed");
    return (
      <PageHeader
        {...args}
        tabs={[
          { id: "active", label: "Aktywne (16)" },
          { id: "draft", label: "Wersje robocze (3)" },
          { id: "done", label: "Zakończone (4)" },
          { id: "archive", label: "Archiwum (2)" },
        ]}
        activeTabId={activeTabId}
        onTabChange={setActiveTabId}
        filters={
          <>
            <IconButton
              variant={view === "detailed" ? "primary" : "tertiary"}
              aria-label="Widok szczegółowy"
              onClick={() => setView("detailed")}
            >
              <DataTableIcon />
            </IconButton>
            <IconButton
              variant={view === "grid" ? "primary" : "tertiary"}
              aria-label="Widok siatki"
              onClick={() => setView("grid")}
            >
              <GridViewIcon />
            </IconButton>
            <IconButton
              variant={view === "list" ? "primary" : "tertiary"}
              aria-label="Widok listy"
              onClick={() => setView("list")}
            >
              <BorderAllIcon />
            </IconButton>
          </>
        }
      />
    );
  },
};
