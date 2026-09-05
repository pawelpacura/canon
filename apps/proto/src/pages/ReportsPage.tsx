import { useMemo, useState } from "react";
import {
  Badge,
  Card,
  IconButton,
  InputText,
  PageHeader,
  Pagination,
  PaginationEllipsis,
  PaginationPageButton,
  Select,
  Table,
  TableCell,
  TableRow,
  VisibilityIcon,
} from "@pacurap/design-system";

const TEST_REPORTS = [
  { name: "BHP — onboarding", type: "Egzamin", n: "124", pass: "94%" },
  { name: "Ankieta satysfakcji Q2", type: "Ankieta", n: "89", pass: "—" },
  { name: "Quiz produktowy", type: "Quiz", n: "56", pass: "81%" },
  { name: "Compliance 2026", type: "Egzamin", n: "203", pass: "76%" },
  { name: "Szkolenie menedżerskie", type: "Egzamin", n: "41", pass: "88%" },
  { name: "Feedback po wdrożeniu", type: "Ankieta", n: "67", pass: "—" },
  { name: "Test wiedzy IT", type: "Quiz", n: "38", pass: "72%" },
  { name: "RODO — pracownicy", type: "Egzamin", n: "156", pass: "91%" },
  { name: "Ankieta NPS", type: "Ankieta", n: "112", pass: "—" },
  { name: "Wprowadzenie do sprzedaży", type: "Egzamin", n: "78", pass: "85%" },
  { name: "Ocena kompetencji Q3", type: "Ankieta", n: "54", pass: "—" },
  { name: "Bezpieczeństwo informacji", type: "Egzamin", n: "97", pass: "89%" },
] as const;

const CUSTOM_REPORTS = [
  {
    name: "BHP + Compliance — Q2",
    scope: "Wiele testów",
    period: "Ten miesiąc",
    format: "PDF",
  },
  {
    name: "Trend zdawalności — sprzedaż",
    scope: "Porównanie",
    period: "Ostatnie 90 dni",
    format: "PDF",
  },
  {
    name: "Onboarding — trudne pytania",
    scope: "Jeden test",
    period: "Ten miesiąc",
    format: "PDF",
  },
  {
    name: "Ankiety satysfakcji — półrocze",
    scope: "Wiele testów",
    period: "Q2 2026",
    format: "PDF",
  },
  {
    name: "RODO vs BHP — YoY",
    scope: "Porównanie",
    period: "12 miesięcy",
    format: "PDF",
  },
] as const;

export function ReportsPage() {
  const [tab, setTab] = useState("tests");
  const [query, setQuery] = useState("");

  const testRows = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return TEST_REPORTS;
    return TEST_REPORTS.filter((row) => row.name.toLowerCase().includes(q));
  }, [query]);

  const customRows = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return CUSTOM_REPORTS;
    return CUSTOM_REPORTS.filter((row) => row.name.toLowerCase().includes(q));
  }, [query]);

  return (
    <>
      <PageHeader
        title="Raporty"
        subtitle="Każdy test ma domyślny raport. Zaawansowane raporty tworzysz w kreatorze."
        tabs={[
          { id: "tests", label: "Raporty testów" },
          { id: "custom", label: "Niestandardowe" },
        ]}
        activeTabId={tab}
        onTabChange={(id) => {
          setTab(id);
          setQuery("");
        }}
      />
      {tab === "tests" ? (
        <>
          <div className="proto-filters">
            <div className="proto-filters__left">
              <InputText
                className="proto-filters__search proto-filters__search--reports"
                placeholder="Szukaj testu lub grupy..."
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />
              <Select className="proto-filters__select" defaultValue="all" aria-label="Typ">
                <option value="all">Wszystkie typy</option>
              </Select>
              <Select className="proto-filters__select" defaultValue="month" aria-label="Okres">
                <option value="month">Ten miesiąc</option>
              </Select>
            </div>
            <Select className="proto-filters__sort" defaultValue="n" aria-label="Sortowanie">
              <option value="n">Sortuj: uczestnicy</option>
            </Select>
          </div>
          <Card className="proto-table-card">
            <Table
              showFooter={false}
              header={
                <TableRow header>
                  <TableCell variant="header">Nazwa</TableCell>
                  <TableCell variant="header" className="proto-table__type">
                    Typ
                  </TableCell>
                  <TableCell variant="header" className="proto-table__n">
                    Uczestnicy
                  </TableCell>
                  <TableCell variant="header" className="proto-table__pass">
                    Zdawalność
                  </TableCell>
                  <TableCell variant="header" className="proto-table__actions">
                    Akcje
                  </TableCell>
                </TableRow>
              }
            >
              {testRows.map((row) => (
                <TableRow key={row.name}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell className="proto-table__type">
                    <Badge variant="neutral">{row.type}</Badge>
                  </TableCell>
                  <TableCell className="proto-table__n">{row.n}</TableCell>
                  <TableCell className="proto-table__pass">{row.pass}</TableCell>
                  <TableCell className="proto-table__actions">
                    <IconButton variant="tertiary" aria-label="Otwórz raport">
                      <VisibilityIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </Table>
          </Card>
        </>
      ) : (
        <>
          <div className="proto-filters">
            <div className="proto-filters__left">
              <InputText
                className="proto-filters__search proto-filters__search--custom"
                placeholder="Szukaj raportu..."
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />
              <Select className="proto-filters__select" defaultValue="all" aria-label="Zakres">
                <option value="all">Wszystkie zakresy</option>
              </Select>
              <Select className="proto-filters__select" defaultValue="month" aria-label="Okres">
                <option value="month">Ten miesiąc</option>
              </Select>
            </div>
            <Select className="proto-filters__sort" defaultValue="date" aria-label="Sortowanie">
              <option value="date">Sortuj: data</option>
            </Select>
          </div>
          <Card className="proto-table-card">
            <Table
              showFooter={false}
              header={
                <TableRow header>
                  <TableCell variant="header">Nazwa</TableCell>
                  <TableCell variant="header" className="proto-table__type">
                    Zakres
                  </TableCell>
                  <TableCell variant="header" className="proto-table__n">
                    Okres
                  </TableCell>
                  <TableCell variant="header" className="proto-table__pass">
                    Format
                  </TableCell>
                  <TableCell variant="header" className="proto-table__actions">
                    Akcje
                  </TableCell>
                </TableRow>
              }
            >
              {customRows.map((row) => (
                <TableRow key={row.name}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell className="proto-table__type">
                    <Badge variant="neutral">{row.scope}</Badge>
                  </TableCell>
                  <TableCell className="proto-table__n">{row.period}</TableCell>
                  <TableCell className="proto-table__pass">{row.format}</TableCell>
                  <TableCell className="proto-table__actions">
                    <IconButton variant="tertiary" aria-label="Otwórz raport">
                      <VisibilityIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </Table>
          </Card>
        </>
      )}
      <Pagination summary="Wyświetlanie 1–9 z 25 testów">
        <PaginationPageButton active>1</PaginationPageButton>
        <PaginationPageButton>2</PaginationPageButton>
        <PaginationPageButton>3</PaginationPageButton>
        <PaginationEllipsis />
        <PaginationPageButton>12</PaginationPageButton>
      </Pagination>
    </>
  );
}
