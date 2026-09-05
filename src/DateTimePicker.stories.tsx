import type { Meta, StoryObj } from "@storybook/react";
import { DateTimePicker } from "./DateTimePicker";

const meta = {
  title: "Components/DateTimePicker",
  component: DateTimePicker,
  tags: ["autodocs"],
  argTypes: {
    error: { control: "boolean" },
    disabled: { control: "boolean" },
    placeholder: { control: "text" },
  },
  args: {
    error: false,
    disabled: false,
  },
} satisfies Meta<typeof DateTimePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Filled: Story = {
  args: { defaultValue: "12.08.2026, 09:00" },
};

export const Error: Story = {
  args: { error: true, defaultValue: "12.08.2026, 09:00" },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const AllStates: Story = {
  render: () => (
    <div style={{ display: "grid", gap: "var(--spacing-m)", width: 280 }}>
      <DateTimePicker placeholder="Wybierz datę i godzinę" />
      <DateTimePicker defaultValue="12.08.2026, 09:00" />
      <DateTimePicker error defaultValue="12.08.2026, 09:00" />
      <DateTimePicker disabled />
      <DateTimePicker disabled defaultValue="12.08.2026, 09:00" />
    </div>
  ),
};
