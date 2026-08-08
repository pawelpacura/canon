import type { Meta, StoryObj } from "@storybook/react";
import { Banner } from "./Banner";

const meta = {
  title: "Components/Banner",
  component: Banner,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["information", "success", "warning"],
    },
  },
  args: {
    variant: "information",
    children:
      "Test jest aktywny — uczestnicy mogą już wypełniać odpowiedzi. Edycja treści pytań jest zablokowana.",
  },
} satisfies Meta<typeof Banner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Information: Story = {
  args: {
    variant: "information",
    children:
      "Test jest aktywny — uczestnicy mogą już wypełniać odpowiedzi. Edycja treści pytań jest zablokowana.",
  },
};

export const Success: Story = {
  args: {
    variant: "success",
    children: "Zmiany zostały zapisane pomyślnie.",
  },
};

export const Warning: Story = {
  args: {
    variant: "warning",
    children: "Uwaga — sprawdź ustawienia przed publikacją testu.",
  },
};

export const AllVariants: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "var(--spacing-m)",
        maxWidth: 640,
      }}
    >
      <Banner variant="information">
        Test jest aktywny — uczestnicy mogą już wypełniać odpowiedzi. Edycja
        treści pytań jest zablokowana.
      </Banner>
      <Banner variant="success">Zmiany zostały zapisane pomyślnie.</Banner>
      <Banner variant="warning">
        Uwaga — sprawdź ustawienia przed publikacją testu.
      </Banner>
    </div>
  ),
};
