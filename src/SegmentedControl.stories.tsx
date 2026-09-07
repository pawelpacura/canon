import type { Meta, StoryObj } from "@storybook/react";
import { SegmentedControl } from "./SegmentedControl";
import { Button } from "./Button";
import { EditIcon, VisibilityIcon } from "./icons";

const brandSurface = {
  padding: "var(--spacing-l)",
  background: "var(--color-background-brand)",
  borderRadius: "var(--radius-m)",
} as const;

const meta = {
  title: "Components/SegmentedControl",
  component: SegmentedControl,
  tags: ["autodocs"],
  argTypes: {
    onDark: { control: "boolean" },
  },
  args: {
    onDark: false,
  },
} satisfies Meta<typeof SegmentedControl>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <SegmentedControl {...args} aria-label="Tryb">
      <Button variant="primary" icon={<EditIcon />}>
        Edycja
      </Button>
      <Button variant="tertiary" icon={<VisibilityIcon />}>
        Podgląd
      </Button>
    </SegmentedControl>
  ),
};

export const OnDark: Story = {
  args: { onDark: true },
  render: (args) => (
    <div style={brandSurface}>
      <SegmentedControl {...args} aria-label="Tryb">
        <Button variant="primary" inverted icon={<EditIcon />}>
          Edycja
        </Button>
        <Button variant="tertiary" inverted icon={<VisibilityIcon />}>
          Podgląd
        </Button>
      </SegmentedControl>
    </div>
  ),
};
