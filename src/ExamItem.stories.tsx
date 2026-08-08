import type { Meta, StoryObj } from "@storybook/react";
import { ExamItem } from "./ExamItem";

const meta = {
  title: "Components/ExamItem",
  component: ExamItem,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof ExamItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Szkolenie BHP — grudzień 2026",
    statusLabel: "aktywne",
    questionCount: "4 pytań",
    finishedCount: 6,
    totalCount: 10,
    completionPercent: "60%",
    publishedDate: "22.04.2026",
    onPreview: () => {},
    onMore: () => {},
  },
};

export const Minimal: Story = {
  args: {
    title: "Test wiedzy IT",
    statusLabel: "aktywne",
  },
};

export const List: Story = {
  args: {
    title: "Szkolenie BHP — grudzień 2026",
  },
  render: () => (
    <div style={{ display: "grid", gap: "var(--spacing-m)", maxWidth: 720 }}>
      <ExamItem
        title="Szkolenie BHP — grudzień 2026"
        statusLabel="aktywne"
        questionCount="4 pytań"
        finishedCount={6}
        totalCount={10}
        completionPercent="60%"
        publishedDate="22.04.2026"
        onPreview={() => {}}
        onMore={() => {}}
      />
      <ExamItem
        title="Test wiedzy IT"
        statusLabel="aktywne"
        questionCount="12 pytań"
        finishedCount={2}
        totalCount={8}
        completionPercent="25%"
        publishedDate="15.03.2026"
        onPreview={() => {}}
        onMore={() => {}}
      />
    </div>
  ),
};
