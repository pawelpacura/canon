import type { Meta, StoryObj } from "@storybook/react";
import { Avatar } from "./Avatar";
import { PersonIcon } from "./icons";

const meta = {
  title: "Components/Avatar",
  component: Avatar,
  tags: ["autodocs"],
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const CustomIcon: Story = {
  render: () => (
    <Avatar>
      <PersonIcon />
    </Avatar>
  ),
};

export const WithImage: Story = {
  render: () => (
    <Avatar>
      <img
        src="https://i.pravatar.cc/72"
        alt=""
        style={{ width: "100%", height: "100%", borderRadius: "50%" }}
      />
    </Avatar>
  ),
};
