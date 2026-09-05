import {
  Badge,
  Banner,
  Card,
  Link,
  PageHeader,
  Select,
  Table,
  TableCell,
  TableRow,
} from "@pacurap/design-system";

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

export function DashboardPage({
  onCreate,
  onOpenTests,
  onOpenBank,
}: {
  onCreate: () => void;
  onOpenTests: () => void;
  onOpenBank: () => void;
}) {
  return (
    <>
      <PageHeader
        title="Pulpit"
        subtitle="Przegląd aktywności, statystyk i ostatnich testów"
        actionLabel="Utwórz test"
        onAction={onCreate}
      />
      <div className="proto-dash">
        <Banner variant="information">
          Nowość: eksport wyników testów do PDF — dostępny w planie Pro.
        </Banner>
        <div className="proto-dash__stats">
          <Stat label="Aktywne testy" value="18" />
          <Stat label="Uczestnicy" value="847" />
          <Stat label="Średni postęp" value="68%" />
          <Stat label="Wersje robocze" value="4" />
        </div>
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
          <ActivityChart />
        </Card>
        <div className="proto-dash__tables">
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
              {RECENT_TESTS.map((row, index) => (
                <TableRow key={`${row.title}-${index}`}>
                  <TableCell>
                    <button
                      type="button"
                      className="proto-linkish"
                      onClick={onOpenTests}
                    >
                      {row.title}
                    </button>
                  </TableCell>
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
              {BANK_QUESTIONS.map((row) => (
                <TableRow key={row.text}>
                  <TableCell>{row.text}</TableCell>
                  <TableCell className="proto-dash__cell-cat">
                    <Badge variant="neutral">{row.category}</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </Table>
          </Card>
        </div>
      </div>
    </>
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
