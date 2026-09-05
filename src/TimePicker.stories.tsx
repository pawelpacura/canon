import type { Meta, StoryObj } from "@storybook/react";
import { TimePicker } from "./TimePicker";

const meta = {
  title: "Components/TimePicker",
  component: TimePicker,
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
} satisfies Meta<typeof TimePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Filled: Story = {
  args: { defaultValue: "09:00" },
};

export const Error: Story = {
  args: { error: true, defaultValue: "09:00" },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const AllStates: Story = {
  render: () => (
    <div style={{ display: "grid", gap: "var(--spacing-m)", width: 280 }}>
      <TimePicker placeholder="Wybierz godzinę" />
      <TimePicker defaultValue="09:00" />
      <TimePicker error defaultValue="09:00" />
      <TimePicker disabled />
      <TimePicker disabled defaultValue="09:00" />
    </div>
  ),
};
