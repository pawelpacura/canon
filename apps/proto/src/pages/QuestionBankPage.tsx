import { useMemo, useState } from "react";
import {
  Badge,
  Card,
  IconButton,
  InputText,
  PageHeader,
  Pagination,
  PaginationPageButton,
  Select,
  Table,
  TableCell,
  TableRow,
  EditIcon,
  VisibilityIcon,
} from "@pacurap/design-system";
import { interactiveRow, stopRowClick } from "../tableRow";

export const QUESTIONS = [
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

const PAGE_SIZE = 9;

export function QuestionBankPage({
  onPreview,
  onEdit,
}: {
  onPreview: (index: number) => void;
  onEdit: (index: number) => void;
}) {
  const [query, setQuery] = useState("");
  const [type, setType] = useState("Typ");
  const [category, setCategory] = useState("Kategoria");
  const [page, setPage] = useState(1);

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    return QUESTIONS.filter((row) => {
      if (q && !row.text.toLowerCase().includes(q)) return false;
      if (type !== "Typ" && row.type !== type) return false;
      if (category !== "Kategoria" && row.category !== category) return false;
      return true;
    });
  }, [query, type, category]);

  const pageCount = Math.max(1, Math.ceil(rows.length / PAGE_SIZE));
  const safePage = Math.min(page, pageCount);
  const start = (safePage - 1) * PAGE_SIZE;
  const slice = rows.slice(start, start + PAGE_SIZE);
  const from = rows.length === 0 ? 0 : start + 1;
  const to = start + slice.length;

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
            onChange={(event) => {
              setQuery(event.target.value);
              setPage(1);
            }}
          />
          <Select
            className="proto-filters__select"
            value={type}
            onChange={(event) => {
              setType(event.target.value);
              setPage(1);
            }}
            aria-label="Typ"
          >
            <option>Typ</option>
            <option>Wielokrotny</option>
          </Select>
          <Select
            className="proto-filters__select"
            value={category}
            onChange={(event) => {
              setCategory(event.target.value);
              setPage(1);
            }}
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
          {slice.map((row) => {
            const index = QUESTIONS.findIndex((item) => item.text === row.text);
            return (
            <TableRow key={row.text} {...interactiveRow(() => onPreview(index))}>
              <TableCell>{row.text}</TableCell>
              <TableCell className="proto-table__cat">
                <Badge variant="neutral">{row.category}</Badge>
              </TableCell>
              <TableCell className="proto-table__type">{row.type}</TableCell>
              <TableCell className="proto-table__usage">{row.usage}</TableCell>
              <TableCell className="proto-table__actions">
                <IconButton
                  variant="tertiary"
                  aria-label="Edytuj pytanie"
                  onClick={stopRowClick(() => onEdit(index))}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  variant="tertiary"
                  aria-label="Podgląd pytania"
                  onClick={stopRowClick(() => onPreview(index))}
                >
                  <VisibilityIcon />
                </IconButton>
              </TableCell>
            </TableRow>
            );
          })}
        </Table>
      </Card>
      <Pagination
        summary={`Wyświetlanie ${from}–${to} z ${rows.length} pytań`}
        onPrevious={safePage > 1 ? () => setPage(safePage - 1) : undefined}
        onNext={safePage < pageCount ? () => setPage(safePage + 1) : undefined}
      >
        {Array.from({ length: pageCount }, (_, i) => i + 1).map((item) => (
          <PaginationPageButton
            key={item}
            active={item === safePage}
            onClick={() => setPage(item)}
          >
            {item}
          </PaginationPageButton>
        ))}
      </Pagination>
    </>
  );
}
