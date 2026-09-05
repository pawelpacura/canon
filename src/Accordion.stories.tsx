import type { Meta, StoryObj } from "@storybook/react";
import { Accordion } from "./Accordion";

const meta = {
  title: "Components/Accordion",
  component: Accordion,
  tags: ["autodocs"],
  args: {
    title: "Sekcja",
    children: "Tresc sekcji",
  },
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Expanded: Story = {
  render: (args) => (
    <div style={{ width: 480 }}>
      <Accordion {...args} />
    </div>
  ),
};

export const Collapsed: Story = {
  args: { expanded: false },
  render: (args) => (
    <div style={{ width: 480 }}>
      <Accordion {...args} />
    </div>
  ),
};

export const Multiple: Story = {
  render: () => (
    <div style={{ width: 480, display: "flex", flexDirection: "column", gap: "var(--spacing-m)" }}>
      <Accordion title="Podstawy">Nazwa, typ i opis testu.</Accordion>
      <Accordion title="Pytania" expanded={false}>
        Lista pytań i odpowiedzi.
      </Accordion>
      <Accordion title="Publikacja" expanded={false}>
        Ustawienia widoczności i terminu.
      </Accordion>
    </div>
  ),
};
