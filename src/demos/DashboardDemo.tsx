import { AppShell } from "./AppShell";
import { SparkLine } from "./SparkLine";
import { PageHeader } from "../PageHeader";
import { Banner } from "../Banner";
import { Card } from "../Card";
import { Badge } from "../Badge";
import { Button } from "../Button";
import { IconButton } from "../IconButton";
import { Select } from "../Select";
import { Link } from "../Link";
import { AddIcon, MoreVertIcon } from "../icons";

const recentTests = [
  { name: "Szkolenie BHP — grudzień 2026", type: "Egzamin" },
  { name: "Quiz integracyjny - team building", type: "Szybki sprawdzian" },
  { name: "Quiz - nowe produkty 2026", type: "Ankieta" },
  { name: "Ankieta satysfakcji Q2", type: "Ankieta" },
];

const questions = [
  { text: "Jakie kanały marketingowe są priorytetowe w 2026?", cat: "Marketing" },
  { text: "Jak zabezpieczyć hasła w systemach firmowych?", cat: "IT" },
  { text: "Jakie są główne cele biznesowe na pierwszy kwartał?", cat: "Biznes" },
  { text: "Które narzędzia są używane w dziale IT?", cat: "IT" },
];

export function DashboardDemo() {
  return (
    <AppShell active="home">
      <PageHeader
        title="Pulpit"
        subtitle="Przegląd aktywności, statystyk i ostatnich testów"
        actions={
          <div style={{ display: "flex", gap: 8 }}>
            <Button variant="primary">
              <AddIcon size={18} />
              Utwórz test
            </Button>
            <IconButton variant="secondary" aria-label="Ustawienia">
              <MoreVertIcon size={18} />
            </IconButton>
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
        <Banner variant="information">
          Nowość: eksport wyników testów do PDF — dostępny w planie Pro.
        </Banner>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 16,
          }}
        >
          <Stat label="Aktywne testy" value="18" />
          <Stat label="Uczestnicy" value="847" />
          <Stat label="Średni postęp" value="68%" />
          <Stat label="Wersje robocze" value="4" />
        </div>

        <Card style={{ padding: "var(--spacing-l)" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 12,
              gap: 12,
              flexWrap: "wrap",
            }}
          >
            <h2 style={h2}>Aktywność uczestników</h2>
            <div style={{ display: "flex", gap: 10 }}>
              <Select defaultValue="month">
                <option value="month">Ten miesiąc</option>
                <option value="year">Ten rok</option>
              </Select>
              <Select defaultValue="active">
                <option value="active">Aktywni uczestnicy</option>
              </Select>
            </div>
          </div>
          <SparkLine
            points={[42, 48, 55, 62, 70, 78, 86, 94]}
            dashedPoints={[38, 40, 44, 50, 54, 60, 66, 72]}
          />
        </Card>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 16,
          }}
        >
          <Card style={{ padding: 0, overflow: "hidden" }}>
            <CardHead title="Ostatnie testy" />
            <table style={table}>
              <thead>
                <tr>
                  <Th>Nazwa</Th>
                  <Th>Typ</Th>
                  <Th>Status</Th>
                </tr>
              </thead>
              <tbody>
                {recentTests.map((r) => (
                  <tr key={r.name}>
                    <Td>
                      <strong>{r.name}</strong>
                    </Td>
                    <Td>
                      <Badge variant="neutral">{r.type}</Badge>
                    </Td>
                    <Td>
                      <Badge variant="success">Aktywny</Badge>
                    </Td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>

          <Card style={{ padding: 0, overflow: "hidden" }}>
            <CardHead title="Bank pytań" />
            <table style={table}>
              <thead>
                <tr>
                  <Th>Pytanie</Th>
                  <Th>Kategoria</Th>
                </tr>
              </thead>
              <tbody>
                {questions.map((q) => (
                  <tr key={q.text}>
                    <Td>
                      <strong>{q.text}</strong>
                    </Td>
                    <Td>
                      <Badge variant="neutral">{q.cat}</Badge>
                    </Td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </div>
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

function CardHead({ title }: { title: string }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "14px 16px",
      }}
    >
      <h2 style={h2}>{title}</h2>
      <Link href="#">Zobacz wszystkie</Link>
    </div>
  );
}

const h2: React.CSSProperties = {
  margin: 0,
  fontSize: 16,
  fontWeight: 500,
  color: "var(--color-foreground-primary)",
};

const table: React.CSSProperties = {
  width: "100%",
  borderCollapse: "collapse",
};

function Th({ children }: { children: React.ReactNode }) {
  return (
    <th
      style={{
        textAlign: "left",
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

function Td({ children }: { children: React.ReactNode }) {
  return (
    <td
      style={{
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
