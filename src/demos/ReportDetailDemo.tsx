import { AppShell } from "./AppShell";
import { SparkLine } from "./SparkLine";
import { PageHeader } from "../PageHeader";
import { Card } from "../Card";
import { Badge } from "../Badge";
import { Button } from "../Button";
import { IconButton } from "../IconButton";
import { Select } from "../Select";
import { VisibilityIcon } from "../icons";

const participants = [
  { name: "Anna Kowalska", status: "Zaliczony", score: "98%", time: "9 min" },
  { name: "Piotr Nowak", status: "Zaliczony", score: "91%", time: "11 min" },
  { name: "Magda Wiśniewska", status: "Zaliczony", score: "88%", time: "14 min" },
  { name: "Tomasz Lewandowski", status: "Niezaliczony", score: "54%", time: "18 min" },
  { name: "Kasia Wójcik", status: "Zaliczony", score: "95%", time: "10 min" },
];

const hard = [
  { q: "Co należy zrobić przy ewakuacji?", pct: "38% poprawnych" },
  { q: "Który środek ochrony jest obowiązkowy?", pct: "45% poprawnych" },
  { q: "Jak zgłosić wypadek w pracy?", pct: "52% poprawnych" },
];

export function ReportDetailDemo() {
  return (
    <AppShell active="reports">
      <PageHeader
        title="BHP — onboarding"
        subtitle="Raport testu w aplikacji  ·  ten miesiąc  ·  124 uczestników"
        actions={
          <div style={{ display: "flex", gap: 8 }}>
            <Button variant="secondary">Wróć</Button>
            <Button variant="primary">Eksportuj PDF</Button>
          </div>
        }
        style={{
          paddingInline: "var(--spacing-2xl)",
          paddingTop: "var(--spacing-l)",
        }}
      />

      <div
        style={{
          padding: "0 var(--spacing-2xl) var(--spacing-2xl)",
          display: "flex",
          flexDirection: "column",
          gap: 16,
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 16,
          }}
        >
          <Stat label="Uczestnicy" value="124" />
          <Stat label="Zdawalność" value="94%" />
          <Stat label="Śr. wynik" value="86%" />
          <Stat label="Śr. czas" value="12 min" />
        </div>

        <Card style={{ padding: "var(--spacing-l)" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 12,
              gap: 12,
              flexWrap: "wrap",
            }}
          >
            <h2 style={h2}>Zdawalność w czasie</h2>
            <div style={{ display: "flex", gap: 10 }}>
              <Select defaultValue="month">
                <option value="month">Ten miesiąc</option>
              </Select>
              <Select defaultValue="period">
                <option value="period">Ten okres</option>
              </Select>
            </div>
          </div>
          <SparkLine
            points={[72, 76, 80, 84, 88, 90, 92, 94]}
            dashedPoints={[64, 66, 70, 72, 74, 78, 80, 82]}
          />
        </Card>

        <Card style={{ padding: 0, overflow: "hidden" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "14px 16px",
            }}
          >
            <h2 style={h2}>Uczestnicy</h2>
            <span style={{ fontSize: 12, color: "var(--color-foreground-secondary)" }}>
              Wyniki w aplikacji — bez eksportu PDF
            </span>
          </div>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <Th>Uczestnik</Th>
                <Th>Status</Th>
                <Th>Wynik</Th>
                <Th>Czas</Th>
                <Th align="right">Akcje</Th>
              </tr>
            </thead>
            <tbody>
              {participants.map((p) => (
                <tr key={p.name}>
                  <Td>
                    <strong>{p.name}</strong>
                  </Td>
                  <Td>
                    <Badge variant={p.status === "Zaliczony" ? "brand" : "error"}>
                      {p.status}
                    </Badge>
                  </Td>
                  <Td>{p.score}</Td>
                  <Td>{p.time}</Td>
                  <Td align="right">
                    <IconButton variant="secondary" aria-label="Podgląd">
                      <VisibilityIcon size={16} />
                    </IconButton>
                  </Td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>

        <Card style={{ padding: "var(--spacing-l)" }}>
          <h2 style={{ ...h2, marginBottom: 12 }}>Najtrudniejsze pytania</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {hard.map((item, i) => (
              <div
                key={item.q}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: 16,
                  fontSize: 13,
                }}
              >
                <span>
                  {i + 1}. {item.q}
                </span>
                <span style={{ color: "var(--color-foreground-secondary)", fontWeight: 500 }}>
                  {item.pct}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </AppShell>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <Card style={{ padding: "var(--spacing-l)" }}>
      <div style={{ fontSize: 13, color: "var(--color-foreground-secondary)" }}>
        {label}
      </div>
      <div
        style={{
          marginTop: 8,
          fontSize: 28,
          fontWeight: 600,
          color: "var(--color-foreground-primary)",
        }}
      >
        {value}
      </div>
    </Card>
  );
}

const h2: React.CSSProperties = {
  margin: 0,
  fontSize: 16,
  fontWeight: 500,
  color: "var(--color-foreground-primary)",
};

function Th({
  children,
  align = "left",
}: {
  children: React.ReactNode;
  align?: "left" | "right";
}) {
  return (
    <th
      style={{
        textAlign: align,
        padding: "10px 16px",
        fontSize: 12,
        fontWeight: 600,
        color: "var(--color-foreground-secondary)",
        background: "var(--color-background-tertiary)",
      }}
    >
      {children}
    </th>
  );
}

function Td({
  children,
  align = "left",
}: {
  children: React.ReactNode;
  align?: "left" | "right";
}) {
  return (
    <td
      style={{
        textAlign: align,
        padding: "12px 16px",
        fontSize: 13,
        borderTop: "1px solid var(--color-stroke-subtle)",
        color: "var(--color-foreground-primary)",
      }}
    >
      {children}
    </td>
  );
}
