import {
  Badge,
  Button,
  Card,
  IconButton,
  Link,
  PageHeader,
  Select,
  Table,
  TableCell,
  TableRow,
  EditIcon,
  VisibilityIcon,
} from "@pacurap/design-system";

const PARTICIPANTS = [
  { name: "Anna Kowalska", status: "Zaliczony", score: "98%", time: "9 min" },
  { name: "Piotr Nowak", status: "Zaliczony", score: "91%", time: "11 min" },
  { name: "Magda Wiśniewska", status: "Zaliczony", score: "88%", time: "14 min" },
  {
    name: "Tomasz Lewandowski",
    status: "Niezaliczony",
    score: "54%",
    time: "18 min",
  },
  { name: "Kasia Wójcik", status: "Zaliczony", score: "95%", time: "10 min" },
] as const;

const HARD_QUESTIONS = [
  { n: 1, text: "Co należy zrobić przy ewakuacji?", rate: "38% poprawnych" },
  {
    n: 2,
    text: "Który środek ochrony jest obowiązkowy?",
    rate: "45% poprawnych",
  },
  { n: 3, text: "Jak zgłosić wypadek w pracy?", rate: "52% poprawnych" },
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

export function ReportDetailPage({ onBack }: { onBack: () => void }) {
  return (
    <>
      <PageHeader
        title="BHP — onboarding"
        subtitle="Raport testu w aplikacji  ·  ten miesiąc  ·  124 uczestników"
        actions={
          <div className="proto-edit__actions">
            <Button variant="secondary" onClick={onBack}>
              Wróć
            </Button>
            <Button variant="primary">Eksportuj PDF</Button>
          </div>
        }
      />
      <div className="proto-dash">
        <div className="proto-dash__stats">
          <Stat label="Uczestnicy" value="124" />
          <Stat label="Zdawalność" value="94%" />
          <Stat label="Śr. wynik" value="86%" />
          <Stat label="Śr. czas" value="12 min" />
        </div>
        <Card className="proto-dash__chart-card">
          <div className="proto-dash__chart-head">
            <h2 className="proto-dash__card-title">Zdawalność w czasie</h2>
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
                defaultValue="period"
                aria-label="Zakres"
              >
                <option value="period">Ten okres</option>
              </Select>
            </div>
          </div>
          <PassRateChart />
        </Card>
        <Card className="proto-dash__table-card">
          <div className="proto-dash__card-head">
            <h2 className="proto-dash__card-title">Uczestnicy</h2>
            <Link href="#results" onClick={(event) => event.preventDefault()}>
              Wyniki w aplikacji — bez eksportu PDF
            </Link>
          </div>
          <Table
            showFooter={false}
            header={
              <TableRow header>
                <TableCell variant="header">Uczestnik</TableCell>
                <TableCell variant="header" className="proto-dash__cell-status">
                  Status
                </TableCell>
                <TableCell variant="header" className="proto-table__pass">
                  Wynik
                </TableCell>
                <TableCell variant="header" className="proto-table__n">
                  Czas
                </TableCell>
                <TableCell variant="header" className="proto-table__actions">
                  Akcje
                </TableCell>
              </TableRow>
            }
          >
            {PARTICIPANTS.map((row) => (
              <TableRow key={row.name}>
                <TableCell>{row.name}</TableCell>
                <TableCell className="proto-dash__cell-status">
                  <Badge variant="neutral">{row.status}</Badge>
                </TableCell>
                <TableCell className="proto-table__pass">{row.score}</TableCell>
                <TableCell className="proto-table__n">{row.time}</TableCell>
                <TableCell className="proto-table__actions">
                  <IconButton variant="tertiary" aria-label="Podgląd wyniku">
                    <VisibilityIcon />
                  </IconButton>
                  <IconButton variant="tertiary" aria-label="Edytuj wynik">
                    <EditIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </Table>
        </Card>
        <Card className="proto-dash__table-card">
          <h2 className="proto-dash__card-title">Najtrudniejsze pytania</h2>
          <div className="proto-report__hard">
            {HARD_QUESTIONS.map((item) => (
              <div key={item.n} className="proto-report__hard-row">
                <p>
                  {item.n}. {item.text}
                </p>
                <span>{item.rate}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </>
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

function PassRateChart() {
  const thisLine = THIS_YEAR.map(([x, y]) => `${x},${y}`).join(" ");
  const lastLine = LAST_YEAR.map(([x, y]) => `${x},${y}`).join(" ");
  const area = `8,172 ${thisLine} 1308,172`;

  return (
    <svg
      className="proto-dash__chart"
      viewBox="0 0 1316 200"
      preserveAspectRatio="none"
      role="img"
      aria-label="Zdawalność w tym i zeszłym roku"
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
