import type { Meta, StoryObj } from "@storybook/react";
import { Panel } from "./Panel";

const meta = {
  title: "Components/Panel",
  component: Panel,
  tags: ["autodocs"],
  args: {
    title: "Panel boczny",
    children: "Tresc panelu.",
    showFooter: true,
  },
} satisfies Meta<typeof Panel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithClose: Story = {
  args: { onClose: () => {} },
};

export const NoFooter: Story = {
  args: { showFooter: false },
};
