import type { Meta, StoryObj } from "@storybook/react";
import { ChipInput } from "./ChipInput";
import { Tag } from "./Tag";

const meta = {
  title: "Components/ChipInput",
  component: ChipInput,
  tags: ["autodocs"],
} satisfies Meta<typeof ChipInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <ChipInput style={{ width: 480 }}>
      <Tag onRemove={() => {}}>anna.nowak@firma.pl</Tag>
      <Tag onRemove={() => {}}>jan.kowalski@firma.pl</Tag>
    </ChipInput>
  ),
};

export const Empty: Story = {
  render: () => (
    <ChipInput
      style={{ width: 480 }}
      inputProps={{ placeholder: "Dodaj adres e-mail..." }}
    />
  ),
};
