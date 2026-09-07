import type { Meta, StoryObj } from "@storybook/react";
import { InputChip } from "./InputChip";
import { Tag } from "./Tag";

const meta = {
  title: "Components/InputChip",
  component: InputChip,
  tags: ["autodocs"],
  argTypes: {
    placeholder: { control: "text" },
    label: { control: "text" },
    helperText: { control: "text" },
    error: { control: "boolean" },
    disabled: { control: "boolean" },
  },
  args: {
    placeholder: "Dodaj kolejny email...",
    error: false,
    disabled: false,
  },
} satisfies Meta<typeof InputChip>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleChips = (
  <>
    <Tag onRemove={() => {}}>anna.nowak@firma.pl</Tag>
    <Tag onRemove={() => {}}>jan.kowalski@firma.pl</Tag>
  </>
);

export const Default: Story = {
  render: (args) => <InputChip {...args} style={{ width: 480 }} />,
};

export const Filled: Story = {
  render: (args) => (
    <InputChip {...args} style={{ width: 480 }}>
      {sampleChips}
    </InputChip>
  ),
};

export const Error: Story = {
  args: {
    error: true,
    errorMessage: "Dodaj przynajmniej jednego odbiorcę",
  },
  render: (args) => (
    <InputChip {...args} style={{ width: 480 }}>
      {sampleChips}
    </InputChip>
  ),
};

export const Disabled: Story = {
  args: { disabled: true },
  render: (args) => <InputChip {...args} style={{ width: 480 }} />,
};

export const DisabledFilled: Story = {
  args: { disabled: true },
  render: (args) => (
    <InputChip {...args} style={{ width: 480 }}>
      {sampleChips}
    </InputChip>
  ),
};

export const WithLabel: Story = {
  args: {
    label: "Odbiorcy",
    helperText: "Wpisz adres i zatwierdź Enterem",
  },
  render: (args) => (
    <InputChip {...args} style={{ width: 480 }}>
      {sampleChips}
    </InputChip>
  ),
};

export const AllStates: Story = {
  render: () => (
    <div style={{ display: "grid", gap: "var(--spacing-m)", width: 480 }}>
      <InputChip placeholder="Dodaj kolejny email..." />
      <InputChip placeholder="Dodaj kolejny email...">{sampleChips}</InputChip>
      <InputChip error placeholder="Dodaj kolejny email...">
        {sampleChips}
      </InputChip>
      <InputChip disabled placeholder="Dodaj kolejny email..." />
      <InputChip disabled placeholder="Dodaj kolejny email...">
        {sampleChips}
      </InputChip>
    </div>
  ),
};
