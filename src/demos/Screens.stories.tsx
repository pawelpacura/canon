import type { Meta, StoryObj } from "@storybook/react";
import type { Decorator } from "@storybook/react";
import { DashboardDemo } from "./DashboardDemo";
import { ReportsDemo } from "./ReportsDemo";
import { ReportDetailDemo } from "./ReportDetailDemo";

/** Cancel global Storybook canvas padding for full-page screens. */
const fullscreenPage: Decorator = (Story) => (
  <div
    style={{
      margin: "calc(-1 * var(--spacing-2xl))",
      width: "calc(100% + 2 * var(--spacing-2xl))",
      minHeight: "100dvh",
    }}
  >
    <Story />
  </div>
);

const meta = {
  title: "Screens/Testonaut",
  parameters: {
    layout: "fullscreen",
  },
  decorators: [fullscreenPage],
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const Dashboard: Story = {
  name: "Pulpit",
  render: () => <DashboardDemo />,
};

export const Reports: Story = {
  name: "Raporty",
  render: () => <ReportsDemo />,
};

export const ReportDetail: Story = {
  name: "Raport — detal",
  render: () => <ReportDetailDemo />,
};
