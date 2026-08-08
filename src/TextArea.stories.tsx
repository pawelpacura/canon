import type { Meta, StoryObj } from "@storybook/react";
import { TextArea } from "./TextArea";

const meta = {
  title: "Components/TextArea",
  component: TextArea,
  tags: ["autodocs"],
  argTypes: {
    error: { control: "boolean" },
    disabled: { control: "boolean" },
    placeholder: { control: "text" },
  },
  args: {
    placeholder: "Opis...",
    rows: 4,
    error: false,
    disabled: false,
  },
} satisfies Meta<typeof TextArea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Error: Story = {
  args: { error: true, defaultValue: "Błędna treść" },
};

export const Disabled: Story = {
  args: { disabled: true, placeholder: "Disabled" },
};

export const AllStates: Story = {
  render: () => (
    <div style={{ display: "grid", gap: "var(--spacing-m)", width: 320 }}>
      <TextArea placeholder="Opis..." rows={4} />
      <TextArea error defaultValue="Błędna treść" rows={4} />
      <TextArea disabled placeholder="Disabled" rows={4} />
    </div>
  ),
};
