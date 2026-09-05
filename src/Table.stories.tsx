import type { Meta, StoryObj } from "@storybook/react";
import { ChevronBackIcon, ChevronForwardIcon } from "./icons";
import { IconButton } from "./IconButton";
import {
  Table,
  TableRow,
  TableCell,
  TablePageSize,
  TableFooterSection,
  TablePagination,
  TablePaginationPage,
} from "./Table";

const meta = {
  title: "Components/Table",
  component: Table,
  tags: ["autodocs"],
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

const columns = ["Uczestnik", "Test", "Wynik", "Data"];
const rows = [
  ["Anna Nowak", "BHP — poziom 1", "92%", "12.01.2026"],
  ["Jan Kowalski", "BHP — poziom 1", "78%", "12.01.2026"],
  ["Maria Wiśniewska", "RODO — podstawy", "100%", "11.01.2026"],
];

export const Default: Story = {
  render: () => (
    <div style={{ width: 768 }}>
      <Table
        header={
          <TableRow header>
            {columns.map((col) => (
              <TableCell key={col} variant="header">
                {col}
              </TableCell>
            ))}
          </TableRow>
        }
        footer={
          <>
            <TableFooterSection>
              <span>Pokazuj</span>
              <TablePageSize>10</TablePageSize>
              <span>na stronie</span>
            </TableFooterSection>
            <TablePagination>
              <IconButton variant="tertiary" aria-label="Poprzednia strona">
                <ChevronBackIcon size={16} />
              </IconButton>
              <TablePaginationPage active>1</TablePaginationPage>
              <TablePaginationPage>2</TablePaginationPage>
              <TablePaginationPage>3</TablePaginationPage>
              <IconButton variant="tertiary" aria-label="Następna strona">
                <ChevronForwardIcon size={16} />
              </IconButton>
            </TablePagination>
          </>
        }
      >
        {rows.map((row, i) => (
          <TableRow key={row[0]} zebra={i % 2 === 1}>
            {row.map((cell, j) => (
              <TableCell key={columns[j]}>{cell}</TableCell>
            ))}
          </TableRow>
        ))}
      </Table>
    </div>
  ),
};

export const NoFooter: Story = {
  render: () => (
    <div style={{ width: 768 }}>
      <Table
        header={
          <TableRow header>
            {columns.map((col) => (
              <TableCell key={col} variant="header">
                {col}
              </TableCell>
            ))}
          </TableRow>
        }
      >
        {rows.map((row) => (
          <TableRow key={row[0]}>
            {row.map((cell, j) => (
              <TableCell key={columns[j]}>{cell}</TableCell>
            ))}
          </TableRow>
        ))}
      </Table>
    </div>
  ),
};
