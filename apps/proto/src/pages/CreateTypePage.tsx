import { useState, type ReactNode } from "react";
import { DockedPage, DockResizeHandle } from "../layout/DockedPage";
import {
  Accordion,
  ArticleIcon,
  Banner,
  Button,
  Card,
  InputChip,
  CloseIcon,
  DateTimePicker,
  ElectricBoltIcon,
  GroupIcon,
  IconButton,
  InputText,
  Label,
  LibraryAddCheckIcon,
  ListIcon,
  ScheduleIcon,
  Select,
  SelectIcon,
  Step,
  Stepper,
  Switcher,
  Tag,
  TimePicker,
  VisibilityIcon,
} from "@pacurap/design-system";
import { PreviewModal } from "../overlays/PreviewModal";
import {
  QuestionBankPanel,
  QuestionBuilder,
  fromBank,
  type DraftQuestion,
} from "./QuestionBuilder";
import type { TestItem, TestType } from "../types";

type CreateType = "file" | "exam" | "survey" | "quiz";
type Phase =
  | "type"
  | "file"
  | "file-more"
  | "file-basics"
  | "basics"
  | "questions"
  | "publish";

const TYPES: {
  id: CreateType;
  title: string;
  description: string;
  points: string[];
  icon: ReactNode;
}[] = [
  {
    id: "file",
    title: "Utwórz z pliku",
    description: "Importuj pytania z pliku – AI automatycznie odczyta zawartośc",
    points: ["Szybkie tworzenie", "Obsługa PDF, DOCX, TXT", "AI odczyta pytania"],
    icon: <ArticleIcon />,
  },
  {
    id: "exam",
    title: "Egzamin",
    description: "Formalne badanie wiedzy z limitem czasu i oceną",
    points: ["Limit czasu", "Ocena punktowa", "Wymaga zaliczenia"],
    icon: <LibraryAddCheckIcon />,
  },
  {
    id: "survey",
    title: "Ankieta",
    description: "Zbieranie opinii i feedbacku bez oceniania",
    points: ["Bez limitu czasu", "Brak oceny", "Anonimowe odpowiedzi"],
    icon: <ListIcon />,
  },
  {
    id: "quiz",
    title: "Szybki sprawdzian",
    description: "Krótka weryfikacja wiedzy, mniej formalny",
    points: ["Krótki", "Szybka ocena", "Natychmiastowy feedback"],
    icon: <ElectricBoltIcon />,
  },
];

const STANDARD_STEPS = ["Typ", "Podstawy", "Pytania", "Publikacja"] as const;
const FILE_STEPS = ["Typ", "Plik", "Podstawy", "Pytania", "Publikacja"] as const;
const FILE_NAME = "8aee0662-b87e-42ac-9a76-0a4a4de2071e.pdf";
const FILE_AI_NAME = "8aee0662-b87e-42ac-9a76-0a4a4de207le";

function typeLabel(type: CreateType | null): TestType {
  if (type === "survey") return "Ankieta";
  if (type === "quiz") return "Szybki sprawdzian";
  return "Egzamin";
}

function WizardStepper({
  labels,
  current,
  filledThrough,
  onSelect,
}: {
  labels: readonly string[];
  current: number;
  filledThrough: number;
  onSelect: (step: number) => void;
}) {
  return (
    <Stepper>
      {labels.map((label, index) => {
        const number = index + 1;
        const isCurrent = number === current;
        return (
          <Step
            key={label}
            number={String(number)}
            label={label}
            filled={number <= filledThrough}
            selected={isCurrent}
            showLine={index < labels.length - 1}
            className={
              isCurrent
                ? "proto-wizard__step proto-wizard__step--current ds-focusable"
                : "proto-wizard__step ds-focusable"
            }
            role="button"
            tabIndex={0}
            aria-current={isCurrent ? "step" : undefined}
            aria-label={`${label}, krok ${number} z ${labels.length}`}
            onClick={() => {
              if (!isCurrent) onSelect(number);
            }}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                if (!isCurrent) onSelect(number);
              }
            }}
          />
        );
      })}
    </Stepper>
  );
}

function WizardFooter({
  cancelLabel = "Anuluj",
  onCancel,
  primaryLabel,
  onPrimary,
  extra,
}: {
  cancelLabel?: string;
  onCancel: () => void;
  primaryLabel: string;
  onPrimary: () => void;
  extra?: ReactNode;
}) {
  return (
    <div className="proto-wizard__footer">
      <Button variant="destructive" onClick={onCancel}>
        {cancelLabel}
      </Button>
      <div className="proto-wizard__footer-actions">
        {extra}
        <Button variant="primary" onClick={onPrimary}>
          {primaryLabel}
        </Button>
      </div>
    </div>
  );
}

export function CreateTypePage({ onCancel }: { onCancel: () => void }) {
  const [phase, setPhase] = useState<Phase>("type");
  const [selected, setSelected] = useState<CreateType | null>(null);
  const [name, setName] = useState("");
  const [advancedOpen, setAdvancedOpen] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [questions, setQuestions] = useState<DraftQuestion[]>([]);
  const [bankOpen, setBankOpen] = useState(false);
  const [bankWidth, setBankWidth] = useState(320);
  const [bankResizing, setBankResizing] = useState(false);
  const [bankPicked, setBankPicked] = useState<string[]>([]);
  const [fileAdded, setFileAdded] = useState(false);
  const [filledThrough, setFilledThrough] = useState(0);

  function closeBank() {
    setBankOpen(false);
    setBankResizing(false);
  }

  const fromFile = selected === "file";
  const stepperLabels = fromFile ? FILE_STEPS : STANDARD_STEPS;
  const stepperCurrent =
    phase === "type"
      ? 1
      : phase === "file" || phase === "file-more"
        ? 2
        : phase === "file-basics"
          ? 3
          : phase === "basics"
            ? 2
            : phase === "questions"
              ? fromFile
                ? 4
                : 3
              : fromFile
                ? 5
                : 4;

  function markCurrentFilled() {
    setFilledThrough((value) => Math.max(value, stepperCurrent));
  }

  function advance(next: Phase) {
    markCurrentFilled();
    setPhase(next);
  }

  function goToStep(step: number) {
    if (step === stepperCurrent) return;
    closeBank();
    const useFile = selected === "file";
    if (!selected && step > 1) setSelected("exam");
    if (useFile) {
      if (step === 1) setPhase("type");
      else if (step === 2) setPhase(fileAdded ? "file-more" : "file");
      else if (step === 3) setPhase("file-basics");
      else if (step === 4) setPhase("questions");
      else setPhase("publish");
      return;
    }
    if (step === 1) setPhase("type");
    else if (step === 2) setPhase("basics");
    else if (step === 3) setPhase("questions");
    else setPhase("publish");
  }

  function goBack() {
    closeBank();
    if (phase === "file" || phase === "basics") setPhase("type");
    else if (phase === "file-more") setPhase("file");
    else if (phase === "file-basics") setPhase("file-more");
    else if (phase === "questions") {
      setPhase(fromFile ? "file-basics" : "basics");
    } else if (phase === "publish") setPhase("questions");
  }

  const summaryTitle = name.trim() || "Szkolenie BHP – grudzień 2026";
  const previewTest: TestItem = {
    id: "create-preview",
    title: summaryTitle,
    status: "drafts",
    statusLabel: "szkic",
    type: typeLabel(selected),
    questionCount: Math.max(questions.length, 1),
    finishedCount: 0,
    totalCount: 1,
    completionPercent: 0,
    publishedDate: "—",
  };

  const actions = (
    <>
      <Button
        variant="secondary"
        icon={<VisibilityIcon />}
        onClick={() => setPreviewOpen(true)}
      >
        Podgląd
      </Button>
      <Button variant="secondary" onClick={goBack}>
        Wstecz
      </Button>
      <Button variant="secondary" onClick={onCancel}>
        Zapisz wersję roboczą
      </Button>
    </>
  );

  return (
    <DockedPage
      open={bankOpen}
      resizing={bankResizing}
      width={bankWidth}
      panel={
        <>
          <DockResizeHandle
            width={bankWidth}
            onWidth={setBankWidth}
            onResizing={setBankResizing}
            label="Szerokość banku pytań"
          />
          <QuestionBankPanel
            picked={bankPicked}
            onPicked={setBankPicked}
            onClose={closeBank}
            onImport={(items) => {
              setQuestions((current) => [...current, ...items.map(fromBank)]);
              setBankPicked([]);
              closeBank();
            }}
          />
        </>
      }
    >
      <Card className="proto-wizard">
        {phase === "type" ? (
          <>
            <WizardStepper
              labels={stepperLabels}
              current={stepperCurrent}
              filledThrough={filledThrough}
              onSelect={goToStep}
            />
            <div className="proto-wizard__body">
              <div className="proto-wizard__intro">
                <h1 className="proto-wizard__title">Wybierz typ testu</h1>
                <p className="proto-wizard__subtitle">
                  Wybór typu ustawi odpowiednie domyślne ustawienia
                </p>
              </div>
              <div className="proto-wizard__types">
                {TYPES.map((type) => (
                  <Card
                    key={type.id}
                    interactive
                    role="button"
                    tabIndex={0}
                    aria-pressed={selected === type.id}
                    className={
                      selected === type.id
                        ? "proto-wizard__type proto-wizard__type--selected"
                        : "proto-wizard__type"
                    }
                    onClick={() => setSelected(type.id)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        setSelected(type.id);
                      }
                    }}
                  >
                    <div className="proto-wizard__type-icon">{type.icon}</div>
                    <h2 className="proto-wizard__type-title">{type.title}</h2>
                    <p className="proto-wizard__type-desc">{type.description}</p>
                    <hr className="proto-wizard__type-rule" />
                    <ul className="proto-wizard__type-list">
                      {type.points.map((point) => (
                        <li key={point}>{point}</li>
                      ))}
                    </ul>
                  </Card>
                ))}
              </div>
            </div>
            <WizardFooter
              onCancel={onCancel}
              primaryLabel="Dalej"
              onPrimary={() => {
                if (selected === "file") advance("file");
                else if (selected) advance("basics");
              }}
            />
          </>
        ) : null}

        {phase === "file" || phase === "file-more" ? (
          <>
            <WizardStepper
              labels={FILE_STEPS}
              current={2}
              filledThrough={filledThrough}
              onSelect={goToStep}
            />
            <div className="proto-wizard__body">
              <div className="proto-wizard__intro">
                <h1 className="proto-wizard__title">
                  {phase === "file-more"
                    ? "Wgraj kolejny plik z pytaniami"
                    : "Wgraj plik z pytaniami"}
                </h1>
                <p className="proto-wizard__subtitle">
                  {phase === "file-more"
                    ? "Możesz dodać więcej plików — pytania z wszystkich źródeł zostaną połączone."
                    : "Przeciagnij plik lub kliknij aby wybrac. AI automatycznie odczyta pytania i odpowiedzi."}
                </p>
              </div>
              <div className="proto-wizard__drop">
                <div className="proto-wizard__drop-icon">
                  <ArticleIcon />
                </div>
                <p className="proto-wizard__drop-title">Przeciagnij plik tutaj</p>
                <p className="proto-wizard__drop-copy">
                  lub kliknij przycisk ponizej aby wybrac plik
                </p>
                <p className="proto-wizard__drop-hint">
                  Obslugiwane formaty: PDF, DOCX, DOC, TXT
                </p>
                <Button
                  variant="primary"
                  icon={<ArticleIcon />}
                  onClick={() => {
                    setFileAdded(true);
                    setPhase("file-more");
                  }}
                >
                  Wybierz plik
                </Button>
              </div>
              {phase === "file-more" ? (
                <div className="proto-wizard__files">
                  <div className="proto-wizard__files-head">
                    <p>Dodane pliki (1)</p>
                    <span>2 pytań</span>
                  </div>
                  <div className="proto-wizard__file">
                    <div className="proto-wizard__file-info">
                      <div className="proto-wizard__file-icon">
                        <ArticleIcon size={20} />
                      </div>
                      <div>
                        <p className="proto-wizard__file-name">{FILE_NAME}</p>
                        <p className="proto-wizard__file-meta">2 pytań</p>
                      </div>
                    </div>
                    <IconButton
                      variant="tertiary"
                      aria-label="Usuń plik"
                      onClick={() => {
                        setFileAdded(false);
                        setPhase("file");
                      }}
                    >
                      <CloseIcon />
                    </IconButton>
                  </div>
                </div>
              ) : null}
            </div>
            <WizardFooter
              onCancel={onCancel}
              primaryLabel="Dalej"
              onPrimary={() => {
                if (phase === "file-more") {
                  setName(FILE_AI_NAME);
                  advance("file-basics");
                }
              }}
              extra={
                phase === "file-more" ? (
                  actions
                ) : (
                  <Button variant="secondary" onClick={goBack}>
                    Wstecz
                  </Button>
                )
              }
            />
          </>
        ) : null}

        {phase === "file-basics" ? (
          <>
            <WizardStepper
              labels={FILE_STEPS}
              current={3}
              filledThrough={filledThrough}
              onSelect={goToStep}
            />
            <div className="proto-wizard__body">
              <p className="proto-wizard__title">
                Podstawowe informacje o teście – wypełnione automatycznie przez AI
              </p>
              <div className="proto-edit__fields">
                <InputText
                  label="Nazwa testu *"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  rightIcon={<ElectricBoltIcon />}
                />
                <div className="proto-edit__field">
                  <Label htmlFor="create-file-group">Grupa / Dział</Label>
                  <div className="proto-wizard__ai-control">
                    <Select id="create-file-group" defaultValue="IT">
                      <option value="IT">IT</option>
                    </Select>
                    <ElectricBoltIcon />
                  </div>
                </div>
              </div>
              <hr className="proto-wizard__divider" />
              <Accordion
                title="Ustawienia zaawansowane (limity czasu, dostępnoścć, przypomnienia)"
                expanded={advancedOpen}
                onToggle={setAdvancedOpen}
              >
                <div className="proto-wizard__advanced">
                  <div className="proto-wizard__advanced-block">
                    <p className="proto-wizard__advanced-title">Limity czasu</p>
                    <Switcher label="Limit czasu na cały test (min.)" />
                    <Switcher label="Limit czasu na pytanie (sek.)" />
                  </div>
                  <div className="proto-wizard__advanced-block">
                    <p className="proto-wizard__advanced-title">Dostępność</p>
                    <div className="proto-wizard__avail">
                      <DateTimePicker label="Dostępny od" />
                      <DateTimePicker label="Dostępny do" />
                    </div>
                  </div>
                  <div className="proto-wizard__advanced-block">
                    <p className="proto-wizard__advanced-title">Przypomnienia</p>
                    <Switcher label="Wyślij przypomnienia do osób, które nie rozpoczęły testu" />
                  </div>
                </div>
              </Accordion>
            </div>
            <WizardFooter
              onCancel={onCancel}
              primaryLabel="Dalej"
              onPrimary={() => advance("questions")}
              extra={actions}
            />
          </>
        ) : null}

        {phase === "basics" ? (
          <>
            <WizardStepper
              labels={stepperLabels}
              current={stepperCurrent}
              filledThrough={filledThrough}
              onSelect={goToStep}
            />
            <div className="proto-wizard__body">
              <p className="proto-wizard__title">Podstawowe informacje o teście</p>
              <div className="proto-edit__fields">
                <InputText
                  label="Nazwa testu *"
                  placeholder="np. Szkolenie BHP — grudzień 2026"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                />
                <div className="proto-edit__field">
                  <Label htmlFor="create-group">Grupa / Dział</Label>
                  <Select id="create-group" defaultValue="">
                    <option value="">Wybierz grupę</option>
                  </Select>
                </div>
              </div>
              <hr className="proto-wizard__divider" />
              <Accordion
                title="Ustawienia zaawansowane (limity czasu, dostępnoścć, przypomnienia)"
                expanded={advancedOpen}
                onToggle={setAdvancedOpen}
              >
                <div className="proto-wizard__advanced">
                  <div className="proto-wizard__advanced-block">
                    <p className="proto-wizard__advanced-title">Limity czasu</p>
                    <Switcher label="Limit czasu na cały test (min.)" />
                    <Switcher label="Limit czasu na pytanie (sek.)" />
                  </div>
                  <div className="proto-wizard__advanced-block">
                    <p className="proto-wizard__advanced-title">Dostępność</p>
                    <div className="proto-wizard__avail">
                      <DateTimePicker label="Dostępny od" />
                      <DateTimePicker label="Dostępny do" />
                    </div>
                  </div>
                  <div className="proto-wizard__advanced-block">
                    <p className="proto-wizard__advanced-title">Przypomnienia</p>
                    <Switcher label="Wyślij przypomnienia do osób, które nie rozpoczęły testu" />
                  </div>
                </div>
              </Accordion>
            </div>
            <WizardFooter
              onCancel={onCancel}
              primaryLabel="Dalej"
              onPrimary={() => advance("questions")}
              extra={actions}
            />
          </>
        ) : null}

        {phase === "questions" ? (
          <>
            <WizardStepper
              labels={stepperLabels}
              current={stepperCurrent}
              filledThrough={filledThrough}
              onSelect={goToStep}
            />
            <div className="proto-wizard__body">
              <div className="proto-send__summary">
                <div className="proto-send__summary-icon">
                  <LibraryAddCheckIcon size={32} />
                </div>
                <div className="proto-send__summary-copy">
                  <p className="proto-send__summary-title">{summaryTitle}</p>
                  <p className="proto-send__summary-meta">
                    {typeLabel(selected)} • IT
                  </p>
                  <p className="proto-send__summary-stats">
                    <span>Pytań: {questions.length}</span>
                    <span>Czas: 60 min</span>
                  </p>
                </div>
              </div>
              <p className="proto-wizard__title">
                Dodaj pytania — w edytorze lub z banku
              </p>
              <QuestionBuilder
                questions={questions}
                onChange={setQuestions}
                bankOpen={bankOpen}
                onBankOpen={() => {
                  if (bankOpen) closeBank();
                  else setBankOpen(true);
                }}
              />
            </div>
            <WizardFooter
              onCancel={onCancel}
              primaryLabel="Dalej"
              onPrimary={() => {
                closeBank();
                advance("publish");
              }}
              extra={actions}
            />
          </>
        ) : null}

        {phase === "publish" ? (
          <>
            <WizardStepper
              labels={stepperLabels}
              current={stepperCurrent}
              filledThrough={filledThrough}
              onSelect={goToStep}
            />
            <div className="proto-wizard__body">
              <div className="proto-send__summary">
                <div className="proto-send__summary-icon">
                  <LibraryAddCheckIcon size={32} />
                </div>
                <div className="proto-send__summary-copy">
                  <p className="proto-send__summary-title">{summaryTitle}</p>
                  <p className="proto-send__summary-meta">
                    {typeLabel(selected)} • IT
                  </p>
                  <p className="proto-send__summary-stats">
                    <span>Pytań: {questions.length}</span>
                    <span>Czas: 60 min</span>
                  </p>
                </div>
              </div>
              <p className="proto-send__heading">
                Wybierz odbiorców i opublikuj test
              </p>
              <div className="proto-send__block">
                <p className="proto-edit__section">
                  <GroupIcon size={20} />
                  Odbiorcy
                </p>
                <InputChip>
                  <Tag>anna.nowak@firma.pl</Tag>
                  <Tag>jan.kowalski@firma.pl</Tag>
                </InputChip>
                <Button variant="secondary" icon={<SelectIcon />}>
                  Wybierz z listy użytkowników
                </Button>
                <Banner>Test zostanie wysłany do 2 osób</Banner>
              </div>
              <div className="proto-send__block">
                <p className="proto-edit__section">
                  <ScheduleIcon size={20} />
                  Zaplanuj publikację
                </p>
                <Switcher label="Publikuj teraz" />
                <div className="proto-send__datetime">
                  <DateTimePicker label="Data *" defaultValue="15.12.2026" />
                  <TimePicker label="Godzina *" defaultValue="09:00" />
                </div>
              </div>
            </div>
            <WizardFooter
              onCancel={onCancel}
              primaryLabel="Opublikuj test"
              onPrimary={onCancel}
              extra={actions}
            />
          </>
        ) : null}
      </Card>
      {previewOpen ? (
        <PreviewModal test={previewTest} onClose={() => setPreviewOpen(false)} />
      ) : null}
    </DockedPage>
  );
}
