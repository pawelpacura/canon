import type { Meta, StoryObj } from "@storybook/react";
import { Card } from "./Card";

const meta = {
  title: "Components/Card",
  component: Card,
  tags: ["autodocs"],
  argTypes: {
    interactive: { control: "boolean" },
  },
  args: {
    children: "Szkolenie BHP — grudzień 2026",
    interactive: false,
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Card {...args} style={{ padding: "var(--spacing-l)", width: 320 }}>
      {args.children}
    </Card>
  ),
};

export const Interactive: Story = {
  render: () => (
    <Card
      interactive
      onClick={() => {}}
      style={{ padding: "var(--spacing-l)", width: 320, cursor: "pointer" }}
    >
      Klikalna karta — hover dla cienia elevated
    </Card>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "grid", gap: "var(--spacing-m)", width: 320 }}>
      <Card style={{ padding: "var(--spacing-l)" }}>Statyczna karta</Card>
      <Card interactive style={{ padding: "var(--spacing-l)" }}>
        Interaktywna karta
      </Card>
    </div>
  ),
};
