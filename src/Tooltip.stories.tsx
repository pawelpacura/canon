import type { Meta, StoryObj } from "@storybook/react";
import { Tooltip } from "./Tooltip";

const meta = {
  title: "Components/Tooltip",
  component: Tooltip,
  tags: ["autodocs"],
  argTypes: {
    direction: { control: "select", options: ["top", "bottom", "left", "right"] },
  },
  args: {
    children: "Tooltip text",
    direction: "top",
  },
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const AllDirections: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "var(--spacing-2xl)", padding: "var(--spacing-l)" }}>
      <Tooltip direction="top">Tooltip text</Tooltip>
      <Tooltip direction="bottom">Tooltip text</Tooltip>
      <Tooltip direction="left">Tooltip text</Tooltip>
      <Tooltip direction="right">Tooltip text</Tooltip>
    </div>
  ),
};
