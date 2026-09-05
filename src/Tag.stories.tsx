import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Tag } from "./Tag";

const meta = {
  title: "Components/Tag",
  component: Tag,
  tags: ["autodocs"],
  args: {
    children: "Tag",
  },
} satisfies Meta<typeof Tag>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Removable: Story = {
  render: () => {
    const [visible, setVisible] = useState(true);
    return visible ? (
      <Tag onRemove={() => setVisible(false)}>anna.nowak@firma.pl</Tag>
    ) : (
      <span>Usunięto</span>
    );
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "var(--spacing-s)", flexWrap: "wrap" }}>
      <Tag>Tag</Tag>
      <Tag>anna.nowak@firma.pl</Tag>
      <Tag onRemove={() => {}}>jan.kowalski@firma.pl</Tag>
    </div>
  ),
};
