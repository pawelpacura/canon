import type { Meta, StoryObj } from "@storybook/react";
import { Label } from "./Label";
import { InputText } from "./InputText";

const meta = {
  title: "Components/Label",
  component: Label,
  tags: ["autodocs"],
  argTypes: {
    required: { control: "boolean" },
    children: { control: "text" },
  },
  args: {
    children: "Kategoria",
    required: false,
  },
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Required: Story = {
  args: { required: true },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "var(--spacing-l)" }}>
      <Label>Kategoria</Label>
      <Label required>Treść pytania</Label>
    </div>
  ),
};

export const WithField: Story = {
  name: "Z polem (niezależny atom)",
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "var(--spacing-xs)",
        width: 280,
      }}
    >
      <Label htmlFor="kategoria" required>
        Kategoria
      </Label>
      <InputText id="kategoria" placeholder="Wybierz kategorię" />
    </div>
  ),
};
