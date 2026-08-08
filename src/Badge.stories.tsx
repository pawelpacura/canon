import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "./Badge";

const meta = {
  title: "Components/Badge",
  component: Badge,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["success", "error", "neutral", "brand"],
    },
  },
  args: {
    children: "Aktywny",
    variant: "success",
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Success: Story = {
  args: { variant: "success", children: "Aktywny" },
};

export const Error: Story = {
  args: { variant: "error", children: "Błąd" },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "var(--spacing-m)", flexWrap: "wrap" }}>
      <Badge variant="success">Aktywny</Badge>
      <Badge variant="error">Błąd</Badge>
      <Badge variant="neutral">Neutralny</Badge>
      <Badge variant="brand">Brand</Badge>
    </div>
  ),
};
