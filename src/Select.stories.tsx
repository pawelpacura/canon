import type { Meta, StoryObj } from "@storybook/react";
import { Select } from "./Select";

const meta = {
  title: "Components/Select",
  component: Select,
  tags: ["autodocs"],
  argTypes: {
    error: { control: "boolean" },
    disabled: { control: "boolean" },
  },
  args: { error: false, disabled: false },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Select {...args}>
      <option>Wybrana opcja</option>
      <option>Opcja A</option>
      <option>Opcja B</option>
    </Select>
  ),
};

export const Error: Story = {
  render: (args) => (
    <Select {...args} error>
      <option>Błąd wyboru</option>
    </Select>
  ),
};

export const Disabled: Story = {
  render: (args) => (
    <Select {...args} disabled>
      <option>Disabled</option>
    </Select>
  ),
};

export const AllStates: Story = {
  render: () => (
    <div style={{ display: "grid", gap: "var(--spacing-m)", width: 280 }}>
      <Select>
        <option>Wybrana opcja</option>
      </Select>
      <Select error>
        <option>Błąd wyboru</option>
      </Select>
      <Select disabled>
        <option>Disabled</option>
      </Select>
    </div>
  ),
};
