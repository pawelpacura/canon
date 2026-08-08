import type { Meta, StoryObj } from "@storybook/react";
import { IconButton } from "./IconButton";
import { VisibilityIcon } from "./icons";

const meta = {
  title: "Components/IconButton",
  component: IconButton,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "tertiary", "destructive"],
    },
    disabled: { control: "boolean" },
  },
  args: {
    variant: "tertiary",
    "aria-label": "Podgląd",
    disabled: false,
  },
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <IconButton {...args}>
      <VisibilityIcon />
    </IconButton>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "var(--spacing-m)", alignItems: "center" }}>
      <IconButton variant="primary" aria-label="Primary">
        <VisibilityIcon />
      </IconButton>
      <IconButton variant="secondary" aria-label="Secondary">
        <VisibilityIcon />
      </IconButton>
      <IconButton variant="tertiary" aria-label="Tertiary">
        <VisibilityIcon />
      </IconButton>
      <IconButton variant="destructive" aria-label="Destructive">
        <VisibilityIcon />
      </IconButton>
      <IconButton variant="tertiary" aria-label="Disabled" disabled>
        <VisibilityIcon />
      </IconButton>
    </div>
  ),
};
