import type { Meta, StoryObj } from "@storybook/react";
import { InputText } from "./InputText";
import { KeyboardArrowDownIcon, SearchIcon } from "./icons";

const meta = {
  title: "Components/InputText",
  component: InputText,
  tags: ["autodocs"],
  argTypes: {
    error: { control: "boolean" },
    disabled: { control: "boolean" },
    placeholder: { control: "text" },
  },
  args: {
    placeholder: "Szukaj testów...",
    error: false,
    disabled: false,
  },
} satisfies Meta<typeof InputText>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Error: Story = {
  args: { error: true, defaultValue: "Błędna wartość" },
};

export const Disabled: Story = {
  args: { disabled: true, placeholder: "Disabled" },
};

export const WithIcons: Story = {
  args: {
    placeholder: "Szukaj",
    leftIcon: <SearchIcon />,
    rightIcon: <KeyboardArrowDownIcon />,
  },
};

export const AllStates: Story = {
  render: () => (
    <div style={{ display: "grid", gap: "var(--spacing-m)", width: 280 }}>
      <InputText placeholder="Szukaj testów..." />
      <InputText error defaultValue="Błędna wartość" />
      <InputText disabled placeholder="Disabled" />
      <InputText
        placeholder="Szukaj"
        leftIcon={<SearchIcon />}
        rightIcon={<KeyboardArrowDownIcon />}
      />
    </div>
  ),
};
