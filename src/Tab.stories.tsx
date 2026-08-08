import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Tab } from "./Tab";
import { Tabs } from "./Tabs";

const meta = {
  title: "Components/Tab",
  component: Tab,
  tags: ["autodocs"],
  argTypes: {
    active: { control: "boolean" },
  },
  args: {
    children: "Wszystkie",
    active: false,
  },
} satisfies Meta<typeof Tab>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Active: Story = {
  args: { active: true },
};

export const TabList: Story = {
  render: () => {
    const [active, setActive] = useState("all");
    return (
      <Tabs aria-label="Filtry">
        <Tab active={active === "all"} onClick={() => setActive("all")}>
          Wszystkie
        </Tab>
        <Tab active={active === "active"} onClick={() => setActive("active")}>
          Aktywne
        </Tab>
        <Tab active={active === "draft"} onClick={() => setActive("draft")}>
          Wersje robocze
        </Tab>
      </Tabs>
    );
  },
};
