import type { Meta, StoryObj } from "@storybook/react";
import { Radio } from "./Radio";

const meta = {
  title: "Components/Radio",
  component: Radio,
  tags: ["autodocs"],
  argTypes: {
    error: { control: "boolean" },
    disabled: { control: "boolean" },
    label: { control: "text" },
  },
  args: {
    name: "radio-story",
    label: "Opcja A",
    error: false,
    disabled: false,
  },
} satisfies Meta<typeof Radio>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Checked: Story = {
  args: { label: "Opcja B", defaultChecked: true },
};

export const AllStates: Story = {
  render: () => (
    <div style={{ display: "grid", gap: "var(--spacing-m)" }}>
      <Radio name="radio-all" label="Opcja A" />
      <Radio name="radio-all" label="Opcja B" defaultChecked />
      <Radio name="radio-all-error" label="Error" error />
      <Radio name="radio-all-disabled" label="Disabled" disabled />
    </div>
  ),
};
