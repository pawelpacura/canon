import type { Meta, StoryObj } from "@storybook/react";
import { Select } from "./Select";

const options = (
  <>
    <option value="">Wybierz opcję...</option>
    <option value="a">Opcja A</option>
    <option value="b">Opcja B</option>
  </>
);

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
    <Select {...args} defaultValue="">
      {options}
    </Select>
  ),
};

export const Filled: Story = {
  render: (args) => (
    <Select {...args} defaultValue="a">
      {options}
    </Select>
  ),
};

export const Error: Story = {
  render: (args) => (
    <Select {...args} error defaultValue="a">
      {options}
    </Select>
  ),
};

export const Disabled: Story = {
  render: (args) => (
    <Select {...args} disabled defaultValue="">
      {options}
    </Select>
  ),
};

export const AllStates: Story = {
  render: () => (
    <div style={{ display: "grid", gap: "var(--spacing-m)", width: 280 }}>
      <Select defaultValue="">{options}</Select>
      <Select defaultValue="a">{options}</Select>
      <Select error defaultValue="a">{options}</Select>
      <Select disabled defaultValue="">{options}</Select>
      <Select disabled defaultValue="a">{options}</Select>
    </div>
  ),
};
