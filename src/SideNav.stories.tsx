import type { Meta, StoryObj } from "@storybook/react";
import { SideNav } from "./SideNav";
import { SideNavItem } from "./SideNavItem";
import {
  ChevronForwardIcon,
  ClockLoader40Icon,
  HomeIcon,
  LibraryAddCheckIcon,
  NewsstandIcon,
} from "./icons";

const meta = {
  title: "Components/SideNav",
  component: SideNav,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof SideNav>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <SideNav>
      <SideNavItem active aria-label="Strona główna" icon={<HomeIcon />} />
      <SideNavItem aria-label="Testy" icon={<LibraryAddCheckIcon />} />
      <SideNavItem aria-label="Archiwum" icon={<NewsstandIcon />} />
      <SideNavItem aria-label="Postępy" icon={<ClockLoader40Icon />} />
      <SideNavItem aria-label="Więcej" icon={<ChevronForwardIcon />} />
    </SideNav>
  ),
};

export const SingleItem: Story = {
  render: () => (
    <SideNav>
      <SideNavItem active aria-label="Strona główna" icon={<HomeIcon />} />
    </SideNav>
  ),
};
