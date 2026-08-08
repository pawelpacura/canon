import type { Meta, StoryObj } from "@storybook/react";
import { Link } from "./Link";
import { SelectIcon } from "./icons";

const meta = {
  title: "Components/Link",
  component: Link,
  tags: ["autodocs"],
  argTypes: {
    variant: { control: "select", options: ["default", "inverted"] },
    active: { control: "boolean" },
    showIcon: { control: "boolean" },
  },
  args: {
    children: "Zobacz testy",
    href: "#",
    variant: "default",
    active: false,
    showIcon: false,
  },
} satisfies Meta<typeof Link>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Active: Story = {
  args: { active: true },
};

export const WithIcon: Story = {
  args: {
    showIcon: true,
    icon: <SelectIcon size={16} />,
    children: "Zobacz testy",
  },
};

export const Inverted: Story = {
  render: () => (
    <div
      style={{
        padding: "var(--spacing-l)",
        background: "var(--color-background-brand)",
        borderRadius: "var(--radius-m)",
      }}
    >
      <Link variant="inverted" href="#">
        Link na ciemnym tle
      </Link>
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "grid", gap: "var(--spacing-m)" }}>
      <Link href="#">Domyślny</Link>
      <Link href="#" active>
        Aktywny
      </Link>
      <Link href="#" showIcon icon={<SelectIcon size={16} />}>
        Z ikoną
      </Link>
      <div
        style={{
          padding: "var(--spacing-l)",
          background: "var(--color-background-brand)",
          borderRadius: "var(--radius-m)",
        }}
      >
        <Link variant="inverted" href="#">
          Inverted
        </Link>
      </div>
    </div>
  ),
};
