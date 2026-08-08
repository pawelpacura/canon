import type { Meta, StoryObj } from "@storybook/react";
import { Switcher } from "./Switcher";

const meta = {
  title: "Components/Switcher",
  component: Switcher,
  tags: ["autodocs"],
  argTypes: {
    disabled: { control: "boolean" },
    label: { control: "text" },
  },
  args: {
    label: "Tryb ciemny",
    disabled: false,
  },
} satisfies Meta<typeof Switcher>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Checked: Story = {
  args: { defaultChecked: true },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const AllStates: Story = {
  render: () => (
    <div style={{ display: "grid", gap: "var(--spacing-m)" }}>
      <Switcher label="Wyłączony" />
      <Switcher label="Włączony" defaultChecked />
      <Switcher label="Disabled" disabled />
    </div>
  ),
};
