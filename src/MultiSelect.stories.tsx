import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { MultiSelect } from "./MultiSelect";

const options = [
  { value: "active", label: "Aktywne" },
  { value: "draft", label: "Wersje robocze" },
  { value: "archived", label: "Archiwum" },
];

const multiOptions = [
  { value: "bhp", label: "BHP" },
  { value: "it", label: "IT" },
  { value: "hr", label: "HR" },
];

const meta = {
  title: "Components/MultiSelect",
  component: MultiSelect,
  tags: ["autodocs"],
  argTypes: {
    error: { control: "boolean" },
    disabled: { control: "boolean" },
  },
  args: {
    options,
    placeholder: "Wybierz status",
    "aria-label": "Status",
  },
} satisfies Meta<typeof MultiSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Single: Story = {
  render: () => {
    const [value, setValue] = useState("active");
    return (
      <div style={{ width: 280 }}>
        <MultiSelect
          options={options}
          value={value}
          onChange={setValue}
          placeholder="Wybierz status"
          aria-label="Status"
        />
      </div>
    );
  },
};

export const Multiple: Story = {
  render: () => {
    const [value, setValue] = useState<string[]>(["bhp", "it"]);
    return (
      <div style={{ width: 280 }}>
        <MultiSelect
          multiple
          options={multiOptions}
          value={value}
          onChange={setValue}
          placeholder="Wybierz kategorie"
          aria-label="Kategorie"
        />
      </div>
    );
  },
};

export const Error: Story = {
  render: () => (
    <div style={{ width: 280 }}>
      <MultiSelect
        options={options}
        defaultValue="draft"
        error
        placeholder="Wybierz status"
        aria-label="Status"
      />
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div style={{ width: 280 }}>
      <MultiSelect
        options={options}
        disabled
        placeholder="Disabled"
        aria-label="Status"
      />
    </div>
  ),
};
