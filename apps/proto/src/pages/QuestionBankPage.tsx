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

const QUESTIONS = [
  {
    text: "Jakie kanały marketingowe są priorytetowe w 2026?",
    category: "Marketing",
    type: "Wielokrotny",
    usage: "0 testów",
  },
  {
    text: "Jak zabezpieczyć hasła w systemach firmowych?",
    category: "IT",
    type: "Wielokrotny",
    usage: "0 testów",
  },
  {
    text: "Jakie są główne cele biznesowe na pierwszy kwartał?",
    category: "Biznes",
    type: "Wielokrotny",
    usage: "0 testów",
  },
  {
    text: "Które narzędzia są używane w dziale IT?",
    category: "IT",
    type: "Wielokrotny",
    usage: "0 testów",
  },
  {
    text: "Opisz procedurę postępowania w przypadku pożaru w miejscu pracy.",
    category: "BHP",
    type: "Wielokrotny",
    usage: "0 testów",
  },
  {
    text: "Jakie są trendy w obsłudze klienta na 2026 rok?",
    category: "Obsługa Klienta",
    type: "Wielokrotny",
    usage: "0 testów",
  },
  {
    text: "Jakie technologie wspierają zdalną pracę zespołów?",
    category: "Technologia",
    type: "Wielokrotny",
    usage: "0 testów",
  },
  {
    text: "Jakie są najskuteczniejsze metody rekrutacji w branży IT?",
    category: "HR",
    type: "Wielokrotny",
    usage: "0 testów",
  },
  {
    text: "Jakie są zasady etyki w marketingu cyfrowym?",
    category: "Marketing",
    type: "Wielokrotny",
    usage: "0 testów",
  },
  {
    text: "Jakie wyzwania czekają na firmy po pandemii?",
    category: "Biznes",
    type: "Wielokrotny",
    usage: "0 testów",
  },
  {
    text: "Jakie są kluczowe elementy strategii SEO w 2026 roku?",
    category: "Marketing",
    type: "Wielokrotny",
    usage: "0 testów",
  },
  {
    text: "Jakie są najnowsze przepisy dotyczące ochrony danych osobowych?",
    category: "Prawo",
    type: "Wielokrotny",
    usage: "0 testów",
  },
] as const;

export function QuestionBankPage() {
  const [query, setQuery] = useState("");
  const [type, setType] = useState("Typ");
  const [category, setCategory] = useState("Kategoria");

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    return QUESTIONS.filter((row) => {
      if (q && !row.text.toLowerCase().includes(q)) return false;
      if (type !== "Typ" && row.type !== type) return false;
      if (category !== "Kategoria" && row.category !== category) return false;
      return true;
    });
  }, [query, type, category]);

  return (
    <>
      <PageHeader
        title="Bank pytań"
        subtitle="Zarządzaj biblioteką pytań używanych w testach"
        actionLabel="Dodaj pytanie"
      />
      <div className="proto-filters">
        <div className="proto-filters__left">
          <InputText
            className="proto-filters__search proto-filters__search--bank"
            placeholder="Szukaj pytań..."
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          <Select
            className="proto-filters__select"
            value={type}
            onChange={(event) => setType(event.target.value)}
            aria-label="Typ"
          >
            <option>Typ</option>
            <option>Wielokrotny</option>
          </Select>
          <Select
            className="proto-filters__select"
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            aria-label="Kategoria"
          >
            <option>Kategoria</option>
            {[
              "Marketing",
              "IT",
              "Biznes",
              "BHP",
              "Obsługa Klienta",
              "Technologia",
              "HR",
              "Prawo",
            ].map((item) => (
              <option key={item}>{item}</option>
            ))}
          </Select>
        </div>
        <Select className="proto-filters__sort" defaultValue="newest" aria-label="Sortowanie">
          <option value="newest">Data: Najnowsze</option>
        </Select>
      </div>
      <Card className="proto-table-card">
        <Table
          showFooter={false}
          header={
            <TableRow header>
              <TableCell variant="header">Pytanie</TableCell>
              <TableCell variant="header" className="proto-table__cat">
                Kategoria
              </TableCell>
              <TableCell variant="header" className="proto-table__type">
                Typ
              </TableCell>
              <TableCell variant="header" className="proto-table__usage">
                Użycie
              </TableCell>
              <TableCell variant="header" className="proto-table__actions">
                Akcje
              </TableCell>
            </TableRow>
          }
        >
          {rows.map((row) => (
            <TableRow key={row.text}>
              <TableCell>{row.text}</TableCell>
              <TableCell className="proto-table__cat">
                <Badge variant="neutral">{row.category}</Badge>
              </TableCell>
              <TableCell className="proto-table__type">{row.type}</TableCell>
              <TableCell className="proto-table__usage">{row.usage}</TableCell>
              <TableCell className="proto-table__actions">
                <IconButton variant="tertiary" aria-label="Podgląd pytania">
                  <VisibilityIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </Table>
      </Card>
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
