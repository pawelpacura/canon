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
        <Step number="1" label="Typ" filled />
        <Step number="2" label="Podstawy" selected />
        <Step number="3" label="Pytania" />
        <Step number="4" label="Publikacja" showLine={false} />
      </Stepper>
    </div>
  ),
};

export const WentBack: Story = {
  render: () => (
    <div style={{ width: 560 }}>
      <Stepper>
        <Step number="1" label="Typ" filled selected />
        <Step number="2" label="Podstawy" filled />
        <Step number="3" label="Pytania" filled />
        <Step number="4" label="Publikacja" showLine={false} />
      </Stepper>
    </div>
  ),
};

export const AllStates: Story = {
  render: () => (
    <div
      style={{
        width: 480,
        display: "flex",
        flexDirection: "column",
        gap: "var(--spacing-l)",
      }}
    >
      <Step number="1" label="Default" showLine={false} />
      <Step number="1" label="Selected" selected showLine={false} />
      <Step number="1" label="Filled" filled showLine={false} />
      <Step number="1" label="Filled + selected" filled selected showLine={false} />
    </div>
  ),
};
