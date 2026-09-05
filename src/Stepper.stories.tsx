import type { Meta, StoryObj } from "@storybook/react";
import { Stepper, Step } from "./Stepper";

const meta = {
  title: "Components/Stepper",
  component: Stepper,
  tags: ["autodocs"],
} satisfies Meta<typeof Stepper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div style={{ width: 560 }}>
      <Stepper>
        <Step number="1" label="Typ" state="completed" />
        <Step number="2" label="Podstawy" state="active" />
        <Step number="3" label="Pytania" />
        <Step number="4" label="Publikacja" showLine={false} />
      </Stepper>
    </div>
  ),
};

export const AllStates: Story = {
  render: () => (
    <div style={{ width: 480, display: "flex", flexDirection: "column", gap: "var(--spacing-l)" }}>
      <Step number="1" label="Default" showLine={false} />
      <Step number="1" label="Active" state="active" showLine={false} />
      <Step number="1" label="Completed" state="completed" showLine={false} />
    </div>
  ),
};
