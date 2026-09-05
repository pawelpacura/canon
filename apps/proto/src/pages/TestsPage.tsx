import {
  Badge,
  BorderAllIcon,
  Card,
  ClockLoader40Icon,
  ContentPasteSearchIcon,
  DataTableIcon,
  ExamItem,
  GridViewIcon,
  IconButton,
  PageHeader,
  Pagination,
  PaginationEllipsis,
  PaginationPageButton,
  Table,
  TableCell,
  TableRow,
  VisibilityIcon,
} from "@pacurap/design-system";
import type { TestItem, TestStatus, TestsView } from "../types";
import { countByStatus } from "../mocks/tests";

const PAGE_SIZE: Record<TestsView, number> = {
  detailed: 5,
  grid: 9,
  list: 9,
};

const BADGE: Record<TestStatus, "success" | "neutral" | "brand" | "error"> = {
  active: "success",
  drafts: "neutral",
  done: "brand",
  archive: "neutral",
};

export function TestsPage({
  tests,
  tab,
  view,
  page,
  onTab,
  onView,
  onPage,
  onCreate,
  onOpen,
  onPreview,
  onMore,
  onResults,
}: {
  tests: TestItem[];
  tab: TestStatus;
  view: TestsView;
  page: number;
  onTab: (tab: TestStatus) => void;
  onView: (view: TestsView) => void;
  onPage: (page: number) => void;
  onCreate: () => void;
  onOpen: (id: string) => void;
  onPreview: (id: string) => void;
  onMore: (id: string) => void;
  onResults: (id: string) => void;
}) {
  const counts = countByStatus(tests);
  const filtered = tests.filter((item) => item.status === tab);
  const pageSize = PAGE_SIZE[view];
  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
  const safePage = Math.min(page, pageCount);
  const start = (safePage - 1) * pageSize;
  const slice = filtered.slice(start, start + pageSize);
  const from = filtered.length === 0 ? 0 : start + 1;
  const to = start + slice.length;

  const tabs = [
    { id: "active", label: `Aktywne (${counts.active})` },
    { id: "drafts", label: `Wersje robocze (${counts.drafts})` },
    { id: "done", label: `Zakończone (${counts.done})` },
    { id: "archive", label: `Archiwum (${counts.archive})` },
  ];

  return (
    <>
      <PageHeader
        title="Testy i ankiety"
        subtitle="Zarządzaj testami, monitoruj postępy i analizuj wyniki"
        actionLabel="Utwórz test"
        onAction={onCreate}
        tabs={tabs}
        activeTabId={tab}
        onTabChange={(id) => onTab(id as TestStatus)}
        filters={
          <>
            <IconButton
              variant={view === "detailed" ? "secondary" : "tertiary"}
              aria-label="Widok szczegółowy"
              onClick={() => onView("detailed")}
            >
              <DataTableIcon />
            </IconButton>
            <IconButton
              variant={view === "grid" ? "secondary" : "tertiary"}
              aria-label="Widok siatki"
              onClick={() => onView("grid")}
            >
              <GridViewIcon />
            </IconButton>
            <IconButton
              variant={view === "list" ? "secondary" : "tertiary"}
              aria-label="Widok tabeli"
              onClick={() => onView("list")}
            >
              <BorderAllIcon />
            </IconButton>
          </>
        }
      />

      {slice.length === 0 ? (
        <Card>
          <p
            style={{
              margin: 0,
              fontSize: "var(--font-size-m)",
              fontWeight: 600,
            }}
          >
            Brak testów w tym widoku
          </p>
          <p
            style={{
              margin: "var(--spacing-s) 0 0",
              color: "var(--color-foreground-secondary)",
            }}
          >
            Zmień zakładkę, wyczyść wyszukiwanie albo utwórz nowy test.
          </p>
        </Card>
      ) : view === "detailed" ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "var(--spacing-l)",
          }}
        >
          {slice.map((test) => (
            <ExamItem
              key={test.id}
              title={test.title}
              statusLabel={test.statusLabel}
              examTypeLabel={test.type}
              questionCount={`${test.questionCount} pytań`}
              finishedCount={test.finishedCount}
              totalCount={test.totalCount}
              completionPercent={`${test.completionPercent}%`}
              publishedDate={test.publishedDate}
              onClick={(event) => {
                const target = event.target as HTMLElement;
                if (target.closest("button, .ds-exam-item__actions")) return;
                onOpen(test.id);
              }}
              onPreview={() => onPreview(test.id)}
              onMore={() => onResults(test.id)}
            />
          ))}
        </div>
      ) : view === "grid" ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
            gap: "var(--spacing-l)",
          }}
        >
          {slice.map((test) => (
            <Card key={test.id} interactive onClick={() => onOpen(test.id)}>
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                  gap: "var(--spacing-s)",
                  marginBottom: "var(--spacing-m)",
                }}
              >
                <div>
                  <h3
                    style={{
                      margin: 0,
                      fontSize: "var(--font-size-m)",
                      fontWeight: 600,
                      color: "var(--color-component-pageHeader-title-foreground)",
                    }}
                  >
                    {test.title}
                  </h3>
                  <div style={{ marginTop: "var(--spacing-s)" }}>
                    <Badge variant={BADGE[test.status]}>{test.statusLabel}</Badge>
                  </div>
                </div>
                <IconButton
                  variant="tertiary"
                  aria-label="Wyniki"
                  onClick={(event) => {
                    event.stopPropagation();
                    onResults(test.id);
                  }}
                >
                  <ClockLoader40Icon />
                </IconButton>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "var(--spacing-s)",
                  padding: "var(--spacing-s) var(--spacing-m)",
                  borderRadius: "var(--radius-m)",
                  background: "var(--color-background-secondary)",
                  fontSize: "var(--font-size-xs)",
                }}
              >
                <ContentPasteSearchIcon />
                <span>{test.type}</span>
                <span style={{ color: "var(--color-foreground-secondary)" }}>
                  {test.questionCount} pytań
                </span>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <Card style={{ padding: 0, overflow: "hidden" }}>
          <Table
            showFooter={false}
            header={
              <TableRow header>
                <TableCell variant="header">Nazwa</TableCell>
                <TableCell variant="header">Typ</TableCell>
                <TableCell variant="header">Status</TableCell>
                <TableCell variant="header">Postęp</TableCell>
                <TableCell variant="header">Pytania</TableCell>
                <TableCell variant="header">Akcje</TableCell>
              </TableRow>
            }
          >
            {slice.map((test, index) => (
              <TableRow key={test.id} zebra={index % 2 === 1}>
                <TableCell>
                  <button
                    type="button"
                    className="proto-linkish"
                    onClick={() => onOpen(test.id)}
                  >
                    {test.title}
                  </button>
                </TableCell>
                <TableCell>{test.type}</TableCell>
                <TableCell>
                  <Badge variant={BADGE[test.status]}>{test.statusLabel}</Badge>
                </TableCell>
                <TableCell>{test.completionPercent}%</TableCell>
                <TableCell>{test.questionCount}</TableCell>
                <TableCell>
                  <div style={{ display: "flex", gap: "var(--spacing-xs)" }}>
                    <IconButton
                      variant="tertiary"
                      aria-label="Podgląd"
                      onClick={() => onPreview(test.id)}
                    >
                      <VisibilityIcon />
                    </IconButton>
                    <IconButton
                      variant="tertiary"
                      aria-label="Wyniki"
                      onClick={() => onResults(test.id)}
                    >
                      <ClockLoader40Icon />
                    </IconButton>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </Table>
        </Card>
      )}

      <Pagination
        summary={`Wyświetlanie ${from}–${to} z ${filtered.length} testów`}
        onPrevious={safePage > 1 ? () => onPage(safePage - 1) : undefined}
        onNext={safePage < pageCount ? () => onPage(safePage + 1) : undefined}
      >
        {pageButtons(pageCount, safePage, onPage)}
      </Pagination>
    </>
  );
}

function pageButtons(
  pageCount: number,
  page: number,
  onPage: (page: number) => void
) {
  const numbers = pageCount <= 5
    ? Array.from({ length: pageCount }, (_, i) => i + 1)
    : [1, 2, 3, "ellipsis", pageCount] as const;

  return numbers.map((item) =>
    item === "ellipsis" ? (
      <PaginationEllipsis key="ellipsis" />
    ) : (
      <PaginationPageButton
        key={item}
        active={item === page}
        onClick={() => onPage(item)}
      >
        {item}
      </PaginationPageButton>
    )
  );
}
