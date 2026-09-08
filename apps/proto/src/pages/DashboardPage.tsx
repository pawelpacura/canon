import {
  useRef,
  useState,
  type DragEvent,
  type PointerEvent as ReactPointerEvent,
} from "react";
import {
  Add2Icon,
  Badge,
  Banner,
  Button,
  Card,
  DeleteIcon,
  IconButton,
  Link,
  PageHeader,
  Select,
  SettingsIcon,
  Table,
  TableCell,
  TableRow,
} from "@pacurap/design-system";
import { interactiveRow } from "../tableRow";

const RECENT_TESTS = [
  { title: "Szkolenie BHP — grudzień 2026", type: "Egzamin" },
  { title: "Quiz integracyjny - team building", type: "Szybki sprawdzian" },
  { title: "Quiz - nowe produkty 2026", type: "Ankieta" },
  { title: "Szkolenie BHP — grudzień 2026", type: "Egzamin" },
] as const;

const BANK_QUESTIONS = [
  {
    text: "Jakie kanały marketingowe są priorytetowe w 2026?",
    category: "Marketing",
  },
  {
    text: "Jak zabezpieczyć hasła w systemach firmowych?",
    category: "IT",
  },
  {
    text: "Jakie są główne cele biznesowe na pierwszy kwartał?",
    category: "Biznes",
  },
  {
    text: "Które narzędzia są używane w dziale IT?",
    category: "IT",
  },
] as const;

const THIS_YEAR = [
  [8, 136],
  [201, 126],
  [393, 118],
  [586, 100],
  [778, 80],
  [971, 69],
  [1164, 44],
  [1308, 24],
] as const;

const LAST_YEAR = [
  [8, 138],
  [201, 132],
  [393, 128],
  [586, 122],
  [778, 118],
  [971, 115],
  [1164, 108],
  [1308, 105],
] as const;

const AXIS = [
  [6, "1"],
  [197, "5"],
  [390, "9"],
  [580, "13"],
  [773, "17"],
  [966, "21"],
  [1157, "25"],
  [1301, "28"],
] as const;

type WidgetId =
  | "stat-tests"
  | "stat-participants"
  | "stat-progress"
  | "stat-drafts"
  | "chart"
  | "tests"
  | "bank";

type WidgetSpan = 1 | 2 | 3 | 4;

type DashWidget = {
  id: WidgetId;
  span: WidgetSpan;
  height: number | null;
};

const STAT_TILES: Record<
  Extract<WidgetId, `stat-${string}`>,
  { label: string; value: string }
> = {
  "stat-tests": { label: "Aktywne testy", value: "18" },
  "stat-participants": { label: "Uczestnicy", value: "847" },
  "stat-progress": { label: "Średni postęp", value: "68%" },
  "stat-drafts": { label: "Wersje robocze", value: "4" },
};

const DEFAULT_WIDGETS: DashWidget[] = [
  { id: "stat-tests", span: 1, height: null },
  { id: "stat-participants", span: 1, height: null },
  { id: "stat-progress", span: 1, height: null },
  { id: "stat-drafts", span: 1, height: null },
  { id: "chart", span: 4, height: null },
  { id: "tests", span: 2, height: null },
  { id: "bank", span: 2, height: null },
];

const TESTS_POOL = [0, 1, 2].flatMap((cycle) =>
  RECENT_TESTS.map((row, index) => ({
    ...row,
    key: `${cycle}-${index}`,
  }))
);

const BANK_POOL = [0, 1, 2].flatMap((cycle) =>
  BANK_QUESTIONS.map((row, index) => ({
    ...row,
    key: `${cycle}-${index}`,
  }))
);

function spanFromWidth(width: number, colW: number, gap: number): WidgetSpan {
  const raw = Math.round((width + gap) / (colW + gap));
  return Math.max(1, Math.min(4, raw)) as WidgetSpan;
}

function leftoverSpan(widgets: DashWidget[]): WidgetSpan {
  const rem = widgets.reduce((sum, widget) => sum + widget.span, 0) % 4;
  return (rem === 0 ? 4 : 4 - rem) as WidgetSpan;
}

const MIN_WIDGET_HEIGHT = 140;

const RESIZE_EDGES = [
  "n",
  "s",
  "e",
  "w",
  "ne",
  "nw",
  "se",
  "sw",
] as const;

type ResizeEdge = (typeof RESIZE_EDGES)[number];

const DRAG_BLOCK_SELECTOR =
  "a, button, input, select, textarea, label, .proto-dash__edge, .proto-dash__widget-delete";

function cloneWidgets(widgets: DashWidget[]) {
  return widgets.map((widget) => ({ ...widget }));
}

function defaultWidget(id: WidgetId): DashWidget {
  return { ...DEFAULT_WIDGETS.find((widget) => widget.id === id)! };
}

function moveItem<T>(list: T[], from: number, to: number) {
  if (from === to || from < 0 || to < 0 || from >= list.length || to >= list.length) {
    return list;
  }
  const next = [...list];
  const [item] = next.splice(from, 1);
  next.splice(to, 0, item);
  return next;
}

export function DashboardPage({
  onCreate,
  onOpenTests,
  onOpenBank,
  onOpenQuestion,
}: {
  onCreate: () => void;
  onOpenTests: () => void;
  onOpenBank: () => void;
  onOpenQuestion: () => void;
}) {
  const [editing, setEditing] = useState(false);
  const [widgets, setWidgets] = useState<DashWidget[]>(DEFAULT_WIDGETS);
  const [snapshot, setSnapshot] = useState<DashWidget[] | null>(null);
  const [draggingId, setDraggingId] = useState<WidgetId | null>(null);
  const [dropId, setDropId] = useState<WidgetId | "add" | null>(null);
  const suppressDragRef = useRef(false);

  const visibleIds = new Set(widgets.map((widget) => widget.id));
  const hiddenIds = DEFAULT_WIDGETS.map((widget) => widget.id).filter(
    (id) => !visibleIds.has(id)
  );
  const addSpan = leftoverSpan(widgets);

  function startEdit() {
    setSnapshot(cloneWidgets(widgets));
    setEditing(true);
  }

  function cancelEdit() {
    if (snapshot) setWidgets(snapshot);
    setSnapshot(null);
    setEditing(false);
    setDraggingId(null);
    setDropId(null);
  }

  function finishEdit() {
    setSnapshot(null);
    setEditing(false);
    setDraggingId(null);
    setDropId(null);
  }

  function patchWidget(id: WidgetId, patch: Partial<DashWidget>) {
    setWidgets((current) =>
      current.map((widget) =>
        widget.id === id ? { ...widget, ...patch } : widget
      )
    );
  }

  function removeWidget(id: WidgetId) {
    setWidgets((current) => current.filter((widget) => widget.id !== id));
    if (draggingId === id) setDraggingId(null);
    if (dropId === id) setDropId(null);
  }

  function addHiddenWidget() {
    setWidgets((current) => {
      const visible = new Set(current.map((widget) => widget.id));
      const nextId = DEFAULT_WIDGETS.map((widget) => widget.id).find(
        (id) => !visible.has(id)
      );
      if (!nextId) return current;
      return [...current, defaultWidget(nextId)];
    });
  }

  function onPreviewPanStart(event: ReactPointerEvent<HTMLDivElement>) {
    if (editing) return;
    const target = event.target as HTMLElement;
    if (target.closest(DRAG_BLOCK_SELECTOR)) return;
    const scroller = event.currentTarget;
    const canPanX = scroller.scrollWidth > scroller.clientWidth + 1;
    const canPanY = scroller.scrollHeight > scroller.clientHeight + 1;
    if (!canPanX && !canPanY) return;
    event.preventDefault();
    const startX = event.clientX;
    const startY = event.clientY;
    const startLeft = scroller.scrollLeft;
    const startTop = scroller.scrollTop;
    scroller.setPointerCapture(event.pointerId);
    scroller.classList.add("proto-dash__chart-scroll--panning");

    function move(next: PointerEvent) {
      scroller.scrollLeft = startLeft - (next.clientX - startX);
      scroller.scrollTop = startTop - (next.clientY - startY);
    }

    function up() {
      scroller.classList.remove("proto-dash__chart-scroll--panning");
      scroller.removeEventListener("pointermove", move);
      scroller.removeEventListener("pointerup", up);
      scroller.removeEventListener("pointercancel", up);
    }

    scroller.addEventListener("pointermove", move);
    scroller.addEventListener("pointerup", up);
    scroller.addEventListener("pointercancel", up);
  }

  function onWidgetDragStart(
    event: DragEvent<HTMLDivElement>,
    id: WidgetId
  ) {
    if (suppressDragRef.current) {
      event.preventDefault();
      return;
    }
    event.dataTransfer.setData("application/x-dash-widget", id);
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setDragImage(event.currentTarget, 40, 24);
    setDraggingId(id);
  }

  function onResizeStart(
    event: ReactPointerEvent<HTMLSpanElement>,
    id: WidgetId,
    edge: ResizeEdge
  ) {
    event.preventDefault();
    event.stopPropagation();
    suppressDragRef.current = true;
    const widgetEl = event.currentTarget.closest(".proto-dash__widget");
    const grid = event.currentTarget.closest(".proto-dash");
    if (!(widgetEl instanceof HTMLElement) || !(grid instanceof HTMLElement)) {
      return;
    }
    const startX = event.clientX;
    const startY = event.clientY;
    const startH = widgetEl.offsetHeight;
    const startW = widgetEl.offsetWidth;
    const gap = parseFloat(getComputedStyle(grid).columnGap) || 16;
    const colW = (grid.clientWidth - gap * 3) / 4;
    widgetEl.setPointerCapture(event.pointerId);

    function move(next: PointerEvent) {
      const dx = next.clientX - startX;
      const dy = next.clientY - startY;
      let width = startW;
      let height = startH;
      if (edge.includes("e")) width = startW + dx;
      if (edge.includes("w")) width = startW - dx;
      if (edge.includes("s")) height = startH + dy;
      if (edge.includes("n")) height = startH - dy;
      patchWidget(id, {
        span: spanFromWidth(width, colW, gap),
        height: Math.max(MIN_WIDGET_HEIGHT, height),
      });
    }

    function up() {
      widgetEl.removeEventListener("pointermove", move);
      widgetEl.removeEventListener("pointerup", up);
      widgetEl.removeEventListener("pointercancel", up);
    }

    widgetEl.addEventListener("pointermove", move);
    widgetEl.addEventListener("pointerup", up);
    widgetEl.addEventListener("pointercancel", up);
  }

  return (
    <>
      <PageHeader
        title="Pulpit"
        subtitle={
          editing
            ? "Przeciągnij sekcje i zmień ich rozmiar, potem zapisz układ."
            : "Przegląd aktywności, statystyk i ostatnich testów"
        }
        actions={
          <div className="proto-edit__actions">
            {editing ? (
              <>
                <Button variant="secondary" onClick={cancelEdit}>
                  Anuluj
                </Button>
                <Button variant="primary" onClick={finishEdit}>
                  Gotowe
                </Button>
              </>
            ) : (
              <Button variant="primary" icon onClick={onCreate}>
                Utwórz test
              </Button>
            )}
            <IconButton
              variant={editing ? "primary" : "tertiary"}
              aria-label={
                editing ? "Zakończ konfigurację pulpitu" : "Konfiguruj pulpit"
              }
              aria-pressed={editing}
              onClick={() => (editing ? finishEdit() : startEdit())}
            >
              <SettingsIcon />
            </IconButton>
          </div>
        }
      />
      <div className={editing ? "proto-dash proto-dash--editing" : "proto-dash"}>
        {editing ? (
          <Banner className="proto-dash__banner">
            Przeciągnij kartę, żeby zmienić kolejność. Najedź na krawędź ramki,
            żeby zmienić szerokość i wysokość sekcji.
          </Banner>
        ) : (
          <Banner className="proto-dash__banner" variant="information">
            Nowość: eksport wyników testów do PDF — dostępny w planie Pro.
          </Banner>
        )}
        {widgets.map((widget) => {
          const classes = [
            "proto-dash__widget",
            `proto-dash__widget--span-${widget.span}`,
          ];
          if (editing) classes.push("proto-dash__widget--editing");
          if (draggingId === widget.id) classes.push("proto-dash__widget--dragging");
          if (dropId === widget.id && draggingId !== widget.id) {
            classes.push("proto-dash__widget--over");
          }
          return (
            <div
              key={widget.id}
              className={classes.join(" ")}
              style={
                widget.height
                  ? { height: widget.height, minHeight: widget.height }
                  : undefined
              }
              draggable={editing}
              onPointerDown={(event) => {
                if (!editing) return;
                const target = event.target as HTMLElement;
                suppressDragRef.current = Boolean(
                  target.closest(DRAG_BLOCK_SELECTOR)
                );
              }}
              onDragStart={(event) => onWidgetDragStart(event, widget.id)}
              onDragEnd={() => {
                setDraggingId(null);
                setDropId(null);
              }}
              onDragOver={(event) => {
                if (!editing || !draggingId) return;
                event.preventDefault();
                event.dataTransfer.dropEffect = "move";
                if (widget.id !== draggingId) setDropId(widget.id);
              }}
              onDragLeave={(event) => {
                const next = event.relatedTarget;
                if (next instanceof Node && event.currentTarget.contains(next)) {
                  return;
                }
                setDropId((current) => (current === widget.id ? null : current));
              }}
              onDrop={(event) => {
                const sourceId = event.dataTransfer.getData(
                  "application/x-dash-widget"
                ) as WidgetId;
                if (!sourceId) return;
                event.preventDefault();
                const from = widgets.findIndex((row) => row.id === sourceId);
                const to = widgets.findIndex((row) => row.id === widget.id);
                setWidgets(moveItem(widgets, from, to));
                setDraggingId(null);
                setDropId(null);
              }}
            >
              {editing ? (
                <>
                  {RESIZE_EDGES.map((edge) => (
                    <span
                      key={edge}
                      className={`proto-dash__edge proto-dash__edge--${edge}`}
                      onPointerDown={(event) =>
                        onResizeStart(event, widget.id, edge)
                      }
                    />
                  ))}
                  <IconButton
                    variant="destructive"
                    className="proto-dash__widget-delete"
                    aria-label="Usuń sekcję"
                    onPointerDown={(event) => {
                      event.stopPropagation();
                      suppressDragRef.current = true;
                    }}
                    onClick={(event) => {
                      event.stopPropagation();
                      removeWidget(widget.id);
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </>
              ) : null}
              <div className="proto-dash__widget-body" inert={editing}>
                <WidgetBody
                  id={widget.id}
                  height={widget.height}
                  onChartPanStart={onPreviewPanStart}
                  onOpenTests={onOpenTests}
                  onOpenBank={onOpenBank}
                  onOpenQuestion={onOpenQuestion}
                />
              </div>
            </div>
          );
        })}
        {editing ? (
          <div
            className={[
              "proto-dash__add",
              `proto-dash__add--span-${addSpan}`,
              dropId === "add" ? "proto-dash__add--over" : "",
            ]
              .filter(Boolean)
              .join(" ")}
            onDragOver={(event) => {
              if (!draggingId) return;
              event.preventDefault();
              event.dataTransfer.dropEffect = "move";
              setDropId("add");
            }}
            onDragLeave={(event) => {
              const next = event.relatedTarget;
              if (next instanceof Node && event.currentTarget.contains(next)) {
                return;
              }
              setDropId((current) => (current === "add" ? null : current));
            }}
            onDrop={(event) => {
              const sourceId = event.dataTransfer.getData(
                "application/x-dash-widget"
              ) as WidgetId;
              if (!sourceId) return;
              event.preventDefault();
              const from = widgets.findIndex((row) => row.id === sourceId);
              if (from < 0) return;
              const next = [...widgets];
              const [item] = next.splice(from, 1);
              next.push(item);
              setWidgets(next);
              setDraggingId(null);
              setDropId(null);
            }}
          >
            <Card className="proto-dash__add-card">
              <IconButton
                variant="primary"
                aria-label="Dodaj sekcję"
                disabled={hiddenIds.length === 0}
                onClick={addHiddenWidget}
              >
                <Add2Icon />
              </IconButton>
            </Card>
          </div>
        ) : null}
      </div>
    </>
  );
}

function WidgetBody({
  id,
  height,
  onChartPanStart,
  onOpenTests,
  onOpenBank,
  onOpenQuestion,
}: {
  id: WidgetId;
  height: number | null;
  onChartPanStart: (event: ReactPointerEvent<HTMLDivElement>) => void;
  onOpenTests: () => void;
  onOpenBank: () => void;
  onOpenQuestion: () => void;
}) {
  const stat = id in STAT_TILES ? STAT_TILES[id as keyof typeof STAT_TILES] : null;
  if (stat) {
    return <Stat label={stat.label} value={stat.value} />;
  }
  if (id === "chart") {
    return (
      <Card className="proto-dash__chart-card">
        <div className="proto-dash__chart-head">
          <h2 className="proto-dash__card-title">Aktywność uczestników</h2>
          <div className="proto-dash__chart-controls">
            <div className="proto-dash__legend" aria-hidden>
              <span className="proto-dash__legend-item">
                <span className="proto-dash__legend-line" />
                Ten rok
              </span>
              <span className="proto-dash__legend-item">
                <span className="proto-dash__legend-dash" />
                Zeszły rok
              </span>
            </div>
            <Select
              className="proto-dash__select proto-dash__select--period"
              defaultValue="month"
              aria-label="Okres"
            >
              <option value="month">Ten miesiąc</option>
            </Select>
            <Select
              className="proto-dash__select proto-dash__select--metric"
              defaultValue="active"
              aria-label="Metryka"
            >
              <option value="active">Aktywni uczestnicy</option>
            </Select>
          </div>
        </div>
        <div
          className="proto-dash__chart-scroll"
          onPointerDown={onChartPanStart}
        >
          <ActivityChart />
        </div>
      </Card>
    );
  }
  if (id === "tests") {
    return (
      <Card className="proto-dash__table-card">
        <div className="proto-dash__card-head">
          <h2 className="proto-dash__card-title">Ostatnie testy</h2>
          <SeeAll href="#tests" onClick={onOpenTests} />
        </div>
        <Table
          showFooter={false}
          header={
            <TableRow header>
              <TableCell variant="header">Nazwa</TableCell>
              <TableCell variant="header" className="proto-dash__cell-type">
                Typ
              </TableCell>
              <TableCell variant="header" className="proto-dash__cell-status">
                Status
              </TableCell>
            </TableRow>
          }
        >
          {(height == null ? TESTS_POOL.slice(0, 4) : TESTS_POOL).map((row) => (
            <TableRow
              key={row.key}
              {...interactiveRow(onOpenTests)}
            >
              <TableCell>{row.title}</TableCell>
              <TableCell className="proto-dash__cell-type">
                <Badge variant="neutral">{row.type}</Badge>
              </TableCell>
              <TableCell className="proto-dash__cell-status">
                <Badge variant="success">Aktywny</Badge>
              </TableCell>
            </TableRow>
          ))}
        </Table>
      </Card>
    );
  }
  return (
    <Card className="proto-dash__table-card">
      <div className="proto-dash__card-head">
        <h2 className="proto-dash__card-title">Bank pytań</h2>
        <SeeAll href="#bank" onClick={onOpenBank} />
      </div>
      <Table
        showFooter={false}
        header={
          <TableRow header>
            <TableCell variant="header">Pytanie</TableCell>
            <TableCell variant="header" className="proto-dash__cell-cat">
              Kategoria
            </TableCell>
          </TableRow>
        }
      >
        {(height == null ? BANK_POOL.slice(0, 4) : BANK_POOL).map((row) => (
          <TableRow key={row.key} {...interactiveRow(onOpenQuestion)}>
            <TableCell>{row.text}</TableCell>
            <TableCell className="proto-dash__cell-cat">
              <Badge variant="neutral">{row.category}</Badge>
            </TableCell>
          </TableRow>
        ))}
      </Table>
    </Card>
  );
}

function SeeAll({ href, onClick }: { href: string; onClick: () => void }) {
  return (
    <Link
      href={href}
      onClick={(event) => {
        event.preventDefault();
        onClick();
      }}
    >
      Zobacz wszystkie
    </Link>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <Card className="proto-dash__stat">
      <p className="proto-dash__stat-label">{label}</p>
      <p className="proto-dash__stat-value">{value}</p>
    </Card>
  );
}

function ActivityChart() {
  const thisLine = THIS_YEAR.map(([x, y]) => `${x},${y}`).join(" ");
  const lastLine = LAST_YEAR.map(([x, y]) => `${x},${y}`).join(" ");
  const area = `8,172 ${thisLine} 1308,172`;

  return (
    <svg
      className="proto-dash__chart"
      viewBox="0 0 1316 200"
      preserveAspectRatio="none"
      role="img"
      aria-label="Aktywność uczestników w tym i zeszłym roku"
    >
      <line x1="8" y1="8" x2="1308" y2="8" className="proto-dash__grid" />
      <line x1="8" y1="63" x2="1308" y2="63" className="proto-dash__grid" />
      <line x1="8" y1="117" x2="1308" y2="117" className="proto-dash__grid" />
      <line x1="8" y1="172" x2="1308" y2="172" className="proto-dash__grid" />
      <polygon points={area} className="proto-dash__area" />
      <polyline
        points={lastLine}
        className="proto-dash__series proto-dash__series--last"
      />
      <polyline
        points={thisLine}
        className="proto-dash__series proto-dash__series--this"
      />
      {THIS_YEAR.map(([x, y]) => (
        <circle
          key={`${x}-${y}`}
          cx={x}
          cy={y}
          r="4"
          className="proto-dash__dot"
        />
      ))}
      {AXIS.map(([x, label]) => (
        <text key={label} x={x} y="196" className="proto-dash__axis">
          {label}
        </text>
      ))}
    </svg>
  );
}
