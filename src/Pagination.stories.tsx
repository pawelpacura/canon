import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Pagination, PaginationPageButton, PaginationEllipsis } from "./Pagination";

const meta = {
  title: "Components/Pagination",
  component: Pagination,
  tags: ["autodocs"],
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [page, setPage] = useState(1);
    return (
      <div style={{ width: 960 }}>
        <Pagination
          summary="Wyświetlanie 1–9 z 25 testów"
          onPrevious={page > 1 ? () => setPage(page - 1) : undefined}
          onNext={page < 12 ? () => setPage(page + 1) : undefined}
        >
          <PaginationPageButton active={page === 1} onClick={() => setPage(1)}>
            1
          </PaginationPageButton>
          <PaginationPageButton active={page === 2} onClick={() => setPage(2)}>
            2
          </PaginationPageButton>
          <PaginationPageButton active={page === 3} onClick={() => setPage(3)}>
            3
          </PaginationPageButton>
          <PaginationEllipsis />
          <PaginationPageButton active={page === 12} onClick={() => setPage(12)}>
            12
          </PaginationPageButton>
        </Pagination>
      </div>
    );
  },
};

export const NoSummary: Story = {
  render: () => (
    <div style={{ width: 960 }}>
      <Pagination showSummary={false} onPrevious={() => {}} onNext={() => {}}>
        <PaginationPageButton active>1</PaginationPageButton>
        <PaginationPageButton>2</PaginationPageButton>
      </Pagination>
    </div>
  ),
};
