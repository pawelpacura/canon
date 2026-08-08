import type { Meta, StoryObj } from "@storybook/react";
import { Checkbox } from "./Checkbox";

const meta = {
  title: "Components/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
  argTypes: {
    error: { control: "boolean" },
    disabled: { control: "boolean" },
    label: { control: "text" },
  },
  args: {
    label: "Domyślny",
    error: false,
    disabled: false,
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Checked: Story = {
  args: { label: "Zaznaczony", defaultChecked: true },
};

export const Error: Story = {
  args: { label: "Error", error: true },
};

export const AllStates: Story = {
  render: () => (
    <div style={{ display: "grid", gap: "var(--spacing-m)" }}>
      <Checkbox label="Domyślny" />
      <Checkbox label="Zaznaczony" defaultChecked />
      <Checkbox label="Error" error />
      <Checkbox label="Disabled" disabled />
    </div>
  ),
};
