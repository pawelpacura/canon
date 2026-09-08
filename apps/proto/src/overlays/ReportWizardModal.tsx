import { useMemo, useState } from "react";
import {
  Button,
  Checkbox,
  Label,
  Modal,
  Select,
} from "@pacurap/design-system";

const PERIODS = [
  "Ten miesiąc",
  "Ostatnie 90 dni",
  "Q2 2026",
  "12 miesięcy",
] as const;

const FORMATS = ["Online", "PDF"] as const;

const METRICS = ["Ukończenia"] as const;

const SECTIONS = [
  { id: "results", label: "Wyniki i zdawalność", summary: "Wyniki" },
  {
    id: "participants",
    label: "Lista uczestników",
    summary: "uczestnicy",
  },
  {
    id: "hard",
    label: "Najtrudniejsze pytania",
    summary: "najtrudniejsze pytania",
  },
  {
    id: "comparison",
    label: "Porównanie z poprzednim okresem",
    summary: "porównanie",
  },
] as const;

type SectionId = (typeof SECTIONS)[number]["id"];

export type CustomReportDraft = {
  name: string;
  scope: string;
  period: string;
  format: string;
};

export function ReportWizardModal({
  tests,
  onClose,
  onGenerate,
}: {
  tests: readonly string[];
  onClose: () => void;
  onGenerate: (draft: CustomReportDraft) => void;
}) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [test, setTest] = useState(tests[0] ?? "BHP — onboarding");
  const [sections, setSections] = useState<Record<SectionId, boolean>>({
    results: true,
    participants: true,
    hard: false,
    comparison: false,
  });
  const [period, setPeriod] = useState<(typeof PERIODS)[number]>("Ten miesiąc");
  const [format, setFormat] = useState<(typeof FORMATS)[number]>("Online");
  const [metric, setMetric] = useState<(typeof METRICS)[number]>("Ukończenia");
  const [trend, setTrend] = useState(true);
  const [email, setEmail] = useState(false);

  const sectionSummary = useMemo(() => {
    const parts = SECTIONS.filter((item) => sections[item.id]).map(
      (item) => item.summary
    );
    if (trend) parts.push("wykres trendu");
    return parts.join(", ");
  }, [sections, trend]);

  function toggleSection(id: SectionId) {
    setSections((current) => ({ ...current, [id]: !current[id] }));
  }

  function generate() {
    onGenerate({
      name: test,
      scope: "Jeden test",
      period,
      format,
    });
  }

  const title =
    step === 1
      ? "1/3  ·  Zakres raportu"
      : step === 2
        ? "2/3  ·  Ustawienia"
        : "3/3  ·  Podsumowanie";

  return (
    <div className="ds-modal-scrim" style={{ zIndex: 30 }}>
      <Modal
        className="proto-report-wizard"
        title={title}
        onClose={onClose}
        style={{ width: "var(--component-input-max-width)" }}
        footer={
          <>
            {step === 1 ? (
              <Button variant="secondary" onClick={onClose}>
                Anuluj
              </Button>
            ) : (
              <Button
                variant="secondary"
                onClick={() => setStep(step === 3 ? 2 : 1)}
              >
                Wstecz
              </Button>
            )}
            {step < 3 ? (
              <Button
                variant="primary"
                onClick={() => setStep(step === 1 ? 2 : 3)}
              >
                Dalej
              </Button>
            ) : (
              <Button variant="primary" onClick={generate}>
                Generuj raport
              </Button>
            )}
          </>
        }
      >
        {step === 1 ? (
          <div className="proto-report-wizard__body">
            <p className="proto-report-wizard__lead">
              Wybierz test i sekcje, które mają znaleźć się w raporcie.
            </p>
            <Select
              aria-label="Test"
              value={test}
              onChange={(event) => setTest(event.target.value)}
            >
              {tests.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </Select>
            <Label>Sekcje</Label>
            <div className="proto-report-wizard__checks">
              {SECTIONS.map((item) => (
                <Checkbox
                  key={item.id}
                  label={item.label}
                  checked={sections[item.id]}
                  onChange={() => toggleSection(item.id)}
                />
              ))}
            </div>
          </div>
        ) : null}
        {step === 2 ? (
          <div className="proto-report-wizard__body">
            <p className="proto-report-wizard__lead">
              Ustal okres, format i metrykę główną.
            </p>
            <div className="proto-report-wizard__pair">
              <Select
                aria-label="Okres"
                value={period}
                onChange={(event) =>
                  setPeriod(event.target.value as (typeof PERIODS)[number])
                }
              >
                {PERIODS.map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </Select>
              <Select
                aria-label="Format"
                value={format}
                onChange={(event) =>
                  setFormat(event.target.value as (typeof FORMATS)[number])
                }
              >
                {FORMATS.map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </Select>
            </div>
            <Label>Metryka główna</Label>
            <Select
              aria-label="Metryka główna"
              value={metric}
              onChange={(event) =>
                setMetric(event.target.value as (typeof METRICS)[number])
              }
            >
              {METRICS.map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </Select>
            <div className="proto-report-wizard__checks">
              <Checkbox
                label="Dołącz wykres trendu"
                checked={trend}
                onChange={() => setTrend((value) => !value)}
              />
              <Checkbox
                label="Wyślij raport e-mailem po wygenerowaniu"
                checked={email}
                onChange={() => setEmail((value) => !value)}
              />
            </div>
          </div>
        ) : null}
        {step === 3 ? (
          <div className="proto-report-wizard__body">
            <p className="proto-report-wizard__lead">
              Sprawdź ustawienia przed wygenerowaniem.
            </p>
            <SummaryRow label="Test" value={test} />
            <SummaryRow label="Okres" value={period} />
            <SummaryRow label="Format" value={format} />
            <SummaryRow label="Metryka" value={metric} />
            <SummaryRow label="Sekcje" value={sectionSummary} />
          </div>
        ) : null}
      </Modal>
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="proto-report-wizard__summary">
      <span className="proto-report-wizard__summary-key">{label}</span>
      <span className="proto-report-wizard__summary-value">{value}</span>
    </div>
  );
}
