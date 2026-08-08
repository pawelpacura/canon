import type { Meta, StoryObj } from "@storybook/react";
import { IconButton } from "./IconButton";
import { VisibilityIcon } from "./icons";

const brandSurface = {
  padding: "var(--spacing-m)",
  background: "var(--color-background-brand)",
  borderRadius: "var(--radius-m)",
} as const;

const meta = {
  title: "Components/IconButton",
  component: IconButton,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "tertiary", "destructive"],
    },
    inverted: { control: "boolean" },
    disabled: { control: "boolean" },
  },
  args: {
    variant: "tertiary",
    inverted: false,
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
      <div style={brandSurface}>
        <div style={{ display: "flex", gap: "var(--spacing-m)" }}>
          <IconButton variant="primary" inverted aria-label="Primary inverted">
            <VisibilityIcon />
          </IconButton>
          <IconButton variant="secondary" inverted aria-label="Secondary inverted">
            <VisibilityIcon />
          </IconButton>
          <IconButton variant="tertiary" inverted aria-label="Tertiary inverted">
            <VisibilityIcon />
          </IconButton>
          <IconButton
            variant="destructive"
            inverted
            aria-label="Destructive inverted"
          >
            <VisibilityIcon />
          </IconButton>
        </div>
      </div>
      <IconButton variant="tertiary" aria-label="Disabled" disabled>
        <VisibilityIcon />
      </IconButton>
    </div>
  ),
};
