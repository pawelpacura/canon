import type { Meta, StoryObj } from "@storybook/react";
import { SideNav } from "./SideNav";
import { SideNavItem } from "./SideNavItem";
import {
  ClockLoader40Icon,
  HomeIcon,
  LibraryAddCheckIcon,
  NewsstandIcon,
} from "./icons";

const items = (
  <>
    <SideNavItem active aria-label="Strona główna" icon={<HomeIcon />} />
    <SideNavItem aria-label="Testy" icon={<LibraryAddCheckIcon />} />
    <SideNavItem aria-label="Archiwum" icon={<NewsstandIcon />} />
    <SideNavItem aria-label="Postępy" icon={<ClockLoader40Icon />} />
  </>
);

const meta = {
  title: "Components/SideNav",
  component: SideNav,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    expanded: { control: "boolean" },
    showExpandStrip: { control: "boolean" },
  },
} satisfies Meta<typeof SideNav>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => <SideNav {...args}>{items}</SideNav>,
};

export const ExpandStrip: Story = {
  args: {
    showExpandStrip: true,
  },
  render: (args) => <SideNav {...args}>{items}</SideNav>,
};

export const Expanded: Story = {
  args: {
    expanded: true,
  },
  render: (args) => <SideNav {...args}>{items}</SideNav>,
};

export const SingleItem: Story = {
  render: (args) => (
    <SideNav {...args}>
      <SideNavItem active aria-label="Strona główna" icon={<HomeIcon />} />
    </SideNav>
  ),
};
