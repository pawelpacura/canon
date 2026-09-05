import type { Meta, StoryObj } from "@storybook/react";
import type { ReactNode } from "react";
import { Modal } from "./Modal";

const meta = {
  title: "Components/Modal",
  component: Modal,
  tags: ["autodocs"],
  args: {
    title: "Tytul modala",
    children: "Krotki opis akcji.",
    showFooter: true,
  },
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

const scrim = (children: ReactNode) => (
  <div className="ds-modal-scrim" style={{ position: "relative", height: 320 }}>
    {children}
  </div>
);

export const Default: Story = {
  render: (args) => scrim(<Modal {...args} style={{ width: 320 }} />),
};

export const WithClose: Story = {
  render: (args) =>
    scrim(<Modal {...args} onClose={() => {}} style={{ width: 320 }} />),
};

export const NoFooter: Story = {
  render: () =>
    scrim(
      <Modal title="Informacja" showFooter={false} style={{ width: 320 }}>
        Operacja zakonczona sukcesem.
      </Modal>
    ),
};
