import type { Meta, StoryObj } from "@storybook/react";
import { ProgressBar } from "./ProgressBar";

const meta = {
  title: "Components/ProgressBar",
  component: ProgressBar,
  tags: ["autodocs"],
  argTypes: {
    size: { control: "select", options: ["s", "m", "l"] },
    value: { control: { type: "range", min: 0, max: 100 } },
  },
  args: {
    size: "m",
    value: 60,
  },
} satisfies Meta<typeof ProgressBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div style={{ width: 240 }}>
      <ProgressBar {...args} />
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-l)" }}>
      <ProgressBar size="s" value={30} style={{ width: 160 }} />
      <ProgressBar size="m" value={60} style={{ width: 240 }} />
      <ProgressBar size="l" value={90} style={{ width: 256 }} />
    </div>
  ),
};
