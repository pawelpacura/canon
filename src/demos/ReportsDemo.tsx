import { useState } from "react";
import { AppShell } from "./AppShell";
import { PageHeader } from "../PageHeader";
import { Card } from "../Card";
import { Badge } from "../Badge";
import { Button } from "../Button";
import { IconButton } from "../IconButton";
import { InputText } from "../InputText";
import { Select } from "../Select";
import { VisibilityIcon, AddIcon } from "../icons";

type Tab = "tests" | "custom";

const tests = [
  { name: "BHP — onboarding", type: "Egzamin", n: 124, pass: "94%" },
  { name: "Ankieta satysfakcji Q2", type: "Ankieta", n: 89, pass: "—" },
  { name: "Quiz produktowy", type: "Quiz", n: 56, pass: "81%" },
  { name: "Compliance 2026", type: "Egzamin", n: 203, pass: "76%" },
  { name: "Szkolenie menedżerskie", type: "Egzamin", n: 41, pass: "88%" },
  { name: "Feedback po wdrożeniu", type: "Ankieta", n: 67, pass: "—" },
  { name: "Test wiedzy IT", type: "Quiz", n: 38, pass: "72%" },
  { name: "RODO — pracownicy", type: "Egzamin", n: 156, pass: "91%" },
  { name: "Ankieta NPS", type: "Ankieta", n: 112, pass: "—" },
];

const custom = [
  { name: "BHP + Compliance — Q2", scope: "Wiele testów", period: "Ten miesiąc", format: "PDF" },
  { name: "Trend zdawalności — sprzedaż", scope: "Porównanie", period: "Ostatnie 90 dni", format: "PDF" },
  { name: "Onboarding — trudne pytania", scope: "Jeden test", period: "Ten miesiąc", format: "PDF" },
  { name: "Ankiety satysfakcji — półrocze", scope: "Wiele testów", period: "Q2 2026", format: "PDF" },
  { name: "RODO vs BHP — YoY", scope: "Porównanie", period: "12 miesięcy", format: "PDF" },
];

export function ReportsDemo() {
  const [tab, setTab] = useState<Tab>("tests");

  return (
    <AppShell active="reports">
      <PageHeader
        title="Raporty"
        subtitle="Każdy test ma domyślny raport. Zaawansowane raporty tworzysz w kreatorze."
        tabs={[
          { id: "tests", label: "Raporty testów" },
          { id: "custom", label: "Niestandardowe" },
        ]}
        activeTabId={tab}
        onTabChange={(id) => setTab(id as Tab)}
        actions={
          tab === "custom" ? (
            <Button variant="primary">
              <AddIcon size={18} />
              Generuj raport
            </Button>
          ) : undefined
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
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
          <div style={{ flex: 1, maxWidth: 360 }}>
            <InputText
              placeholder={
                tab === "tests" ? "Szukaj testu lub grupy..." : "Szukaj raportu..."
              }
            />
          </div>
          {tab === "tests" ? (
            <>
              <Select defaultValue="all">
                <option value="all">Wszystkie typy</option>
                <option value="exam">Egzamin</option>
              </Select>
              <Select defaultValue="month">
                <option value="month">Ten miesiąc</option>
              </Select>
              <div style={{ marginLeft: "auto" }}>
                <Select defaultValue="n">
                  <option value="n">Sortuj: uczestnicy</option>
                </Select>
              </div>
            </>
          ) : (
            <>
              <Select defaultValue="all">
                <option value="all">Wszystkie zakresy</option>
              </Select>
              <Select defaultValue="month">
                <option value="month">Ten miesiąc</option>
              </Select>
              <div style={{ marginLeft: "auto" }}>
                <Select defaultValue="date">
                  <option value="date">Sortuj: data</option>
                </Select>
              </div>
            </>
          )}
        </div>

        <Card style={{ padding: 0, overflow: "hidden" }}>
          {tab === "tests" ? (
            <table style={table}>
              <thead>
                <tr>
                  <Th>Nazwa</Th>
                  <Th>Typ</Th>
                  <Th>Uczestnicy</Th>
                  <Th>Zdawalność</Th>
                  <Th align="right">Akcje</Th>
                </tr>
              </thead>
              <tbody>
                {tests.map((r) => (
                  <tr key={r.name}>
                    <Td>
                      <strong>{r.name}</strong>
                    </Td>
                    <Td>
                      <Badge variant="brand">{r.type}</Badge>
                    </Td>
                    <Td>{r.n}</Td>
                    <Td>{r.pass}</Td>
                    <Td align="right">
                      <IconButton variant="secondary" aria-label="Podgląd">
                        <VisibilityIcon size={16} />
                      </IconButton>
                    </Td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <table style={table}>
              <thead>
                <tr>
                  <Th>Nazwa</Th>
                  <Th>Zakres</Th>
                  <Th>Okres</Th>
                  <Th>Format</Th>
                  <Th align="right">Akcje</Th>
                </tr>
              </thead>
              <tbody>
                {custom.map((r) => (
                  <tr key={r.name}>
                    <Td>
                      <strong>{r.name}</strong>
                    </Td>
                    <Td>
                      <Badge variant="neutral">{r.scope}</Badge>
                    </Td>
                    <Td>{r.period}</Td>
                    <Td>{r.format}</Td>
                    <Td align="right">
                      <IconButton variant="secondary" aria-label="Podgląd">
                        <VisibilityIcon size={16} />
                      </IconButton>
                    </Td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </Card>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 13,
            color: "var(--color-foreground-secondary)",
          }}
        >
          <span>
            {tab === "tests"
              ? `Wyświetlanie 1–${tests.length} z 25 testów`
              : `Wyświetlanie 1–${custom.length} z ${custom.length} raportów`}
          </span>
          <div style={{ display: "flex", gap: 8 }}>
            <Button variant="secondary" disabled>
              Poprzednia
            </Button>
            <Button variant="primary">1</Button>
            <Button variant="secondary">2</Button>
            <Button variant="secondary">Następna</Button>
          </div>
        </div>
      </div>
    </AppShell>
  );
}

const table: React.CSSProperties = {
  width: "100%",
  borderCollapse: "collapse",
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
        padding: "12px 16px",
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
        padding: "14px 16px",
        fontSize: 13,
        borderTop: "1px solid var(--color-stroke-subtle)",
        color: "var(--color-foreground-primary)",
      }}
    >
      {children}
    </td>
  );
}
