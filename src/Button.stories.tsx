import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";

const meta = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "tertiary", "destructive"],
      description: "Visual variant — mirrors the `variant` axis in Figma.",
    },
    icon: {
      control: "boolean",
      description: "Leading add icon (Figma: `Icon` boolean).",
    },
    disabled: { control: "boolean" },
    children: { control: "text" },
  },
  args: {
    children: "Zapisz",
    variant: "primary",
    icon: false,
    disabled: false,
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: { variant: "primary", children: "Zapisz" },
};

export const Secondary: Story = {
  args: { variant: "secondary", children: "Anuluj" },
};

export const Tertiary: Story = {
  args: { variant: "tertiary", children: "Więcej" },
};

export const Destructive: Story = {
  args: { variant: "destructive", children: "Usuń" },
};

export const Disabled: Story = {
  args: { variant: "primary", children: "Disabled", disabled: true },
};

export const WithIcon: Story = {
  args: {
    variant: "primary",
    icon: true,
    children: "Utwórz test",
  },
};

export const AllVariants: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        gap: "var(--spacing-m)",
        flexWrap: "wrap",
        alignItems: "center",
      }}
    >
      <Button variant="primary">Zapisz</Button>
      <Button variant="secondary">Anuluj</Button>
      <Button variant="tertiary">Więcej</Button>
      <Button variant="destructive">Usuń</Button>
      <Button variant="primary" disabled>
        Disabled
      </Button>
      <Button variant="primary" icon>
        Utwórz test
      </Button>
    </div>
  ),
};
