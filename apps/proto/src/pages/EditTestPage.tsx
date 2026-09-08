import { useState } from "react";
import {
  Accordion,
  Badge,
  Banner,
  Button,
  Card,
  Checkbox,
  InputChip,
  DateTimePicker,
  GroupIcon,
  InputText,
  Label,
  LibraryAddCheckIcon,
  PageHeader,
  Radio,
  ScheduleIcon,
  Select,
  SelectIcon,
  Switcher,
  Tag,
  TextArea,
  TimePicker,
} from "@pacurap/design-system";
import { DockedPage, DockResizeHandle } from "../layout/DockedPage";
import { UserPickerPanel } from "../overlays/UserPickerPanel";
import { EDIT_QUESTIONS } from "../mocks/questions";
import type { EditTab, TestItem } from "../types";

function questionKindLabel(kind: (typeof EDIT_QUESTIONS)[number]["kind"]) {
  if (kind === "single") return "Jednokrotnego wyboru";
  if (kind === "multi") return "Wielokrotnego wyboru";
  return "Otwarte";
}

export function EditTestPage({
  test,
  onBack,
}: {
  test: TestItem;
  onBack: () => void;
}) {
  const [tab, setTab] = useState<EditTab>("questions");
  const [advancedOpen, setAdvancedOpen] = useState(false);
  const [usersOpen, setUsersOpen] = useState(false);
  const [usersWidth, setUsersWidth] = useState(320);
  const [usersResizing, setUsersResizing] = useState(false);
  const [recipients, setRecipients] = useState([
    "anna.nowak@firma.pl",
    "jan.kowalski@firma.pl",
  ]);
  const [userPicked, setUserPicked] = useState<string[]>([]);
  const locked = test.status === "active";
  const questionCount = EDIT_QUESTIONS.length;

  function closeUsers() {
    setUsersOpen(false);
    setUsersResizing(false);
  }

  function openUsers() {
    if (usersOpen) {
      closeUsers();
      return;
    }
    setUserPicked(recipients);
    setUsersOpen(true);
  }

  function addRecipient(email: string) {
    setRecipients((current) =>
      current.includes(email) ? current : [...current, email]
    );
  }

  return (
    <DockedPage
      open={usersOpen}
      resizing={usersResizing}
      width={usersWidth}
      panel={
        <>
          <DockResizeHandle
            width={usersWidth}
            onWidth={setUsersWidth}
            onResizing={setUsersResizing}
            label="Szerokość listy użytkowników"
          />
          <UserPickerPanel
            picked={userPicked}
            onPicked={setUserPicked}
            onClose={closeUsers}
            onConfirm={(emails) => {
              setRecipients(emails);
              closeUsers();
            }}
          />
        </>
      }
    >
      <PageHeader
        title={test.title}
        subtitle={
          locked
            ? "Edycja testu (ograniczona — test aktywny)"
            : "Edycja testu"
        }
        actions={
          <div className="proto-edit__actions">
            <Button variant="secondary" onClick={onBack}>
              Wróć
            </Button>
            <Button variant="primary">Zapisz zmiany</Button>
          </div>
        }
        tabs={[
          { id: "settings", label: "Ustawienia" },
          { id: "questions", label: `Pytania (${questionCount})` },
          { id: "send", label: "Wysyłka" },
        ]}
        activeTabId={tab}
        onTabChange={(id) => {
          setTab(id as EditTab);
          if (id !== "send") closeUsers();
        }}
      />

      {tab === "settings" ? (
        <Card className="proto-edit__stack">
          <p className="proto-edit__section">Podstawowe informacje o teście</p>
          <div className="proto-edit__fields">
            <InputText
              label="Nazwa testu *"
              defaultValue={test.title}
              disabled={locked}
            />
            <div className="proto-edit__field">
              <Label htmlFor="edit-group">Grupa / Dział</Label>
              <Select id="edit-group" defaultValue="it" disabled={locked}>
                <option value="">Wybierz grupę</option>
                <option value="it">IT</option>
                <option value="hr">HR</option>
                <option value="ops">Operacje</option>
              </Select>
            </div>
          </div>
          <Accordion
            title="Ustawienia zaawansowane (limity czasu, dostępność, przypomnienia)"
            expanded={advancedOpen}
            onToggle={setAdvancedOpen}
          >
            <div className="proto-edit__fields">
              <InputText
                label="Limit czasu (min)"
                defaultValue="60"
                disabled={locked}
              />
              <Switcher defaultChecked label="Test dostępny dla uczestników" />
            </div>
          </Accordion>
        </Card>
      ) : null}

      {tab === "questions" ? (
        <Card className="proto-edit__stack">
          {locked ? (
            <Banner>
              Test BHP jest aktywny — uczestnicy mogą wypełniać odpowiedzi.
              Edycja pytań jest tymczasowo zablokowana.
            </Banner>
          ) : null}
          {EDIT_QUESTIONS.map((question, index) => (
            <Card key={question.text} className="proto-edit__question">
              <div className="proto-edit__question-head">
                <strong>{index + 1}.</strong>
                <div className="proto-edit__question-body">
                  <p className="proto-edit__question-title">{question.text}</p>
                  <div className="proto-edit__question-meta">
                    <Badge variant="brand">{questionKindLabel(question.kind)}</Badge>
                    <span>
                      {question.kind === "open"
                        ? "Odpowiedź tekstowa"
                        : `${question.answers.length} odpowiedzi`}
                    </span>
                  </div>
                  {question.kind === "open" ? (
                    <TextArea
                      disabled
                      placeholder="Miejsce na odpowiedź uczestnika…"
                      rows={4}
                    />
                  ) : (
                    <div className="proto-edit__answers">
                      {question.answers.map((answer) => (
                        <div
                          key={answer.label}
                          className={
                            answer.correct
                              ? "proto-edit__answer proto-edit__answer--correct"
                              : "proto-edit__answer"
                          }
                        >
                          {question.kind === "single" ? (
                            <Radio
                              disabled
                              checked={Boolean(answer.correct)}
                              readOnly
                            />
                          ) : (
                            <Checkbox
                              disabled
                              checked={Boolean(answer.correct)}
                              readOnly
                            />
                          )}
                          <strong>{answer.label}</strong>
                          <span>{answer.text}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </Card>
      ) : null}

      {tab === "send" ? (
        <Card className="proto-edit__stack">
          <div className="proto-send__summary">
            <div className="proto-send__summary-icon">
              <LibraryAddCheckIcon size={32} />
            </div>
            <div className="proto-send__summary-copy">
              <p className="proto-send__summary-title">{test.title}</p>
              <p className="proto-send__summary-meta">
                {test.type} • IT
              </p>
              <p className="proto-send__summary-stats">
                <span>Pytań: {questionCount}</span>
                <span>Czas: 60 min</span>
              </p>
            </div>
          </div>

          <p className="proto-send__heading">
            Wybierz odbiorców i opublikuj test
          </p>

          <div
            className="proto-send__block"
            onDragOver={(event) => {
              if (
                event.dataTransfer.types.includes("application/x-directory-user")
              ) {
                event.preventDefault();
              }
            }}
            onDrop={(event) => {
              const email = event.dataTransfer.getData(
                "application/x-directory-user"
              );
              if (!email) return;
              event.preventDefault();
              addRecipient(email);
            }}
          >
            <p className="proto-edit__section">
              <GroupIcon size={20} />
              Odbiorcy
            </p>
            <InputChip>
              {recipients.map((email) => (
                <Tag
                  key={email}
                  onRemove={() =>
                    setRecipients((current) =>
                      current.filter((item) => item !== email)
                    )
                  }
                >
                  {email}
                </Tag>
              ))}
            </InputChip>
            <Button
              variant={usersOpen ? "primary" : "secondary"}
              icon={<SelectIcon />}
              onClick={openUsers}
            >
              Wybierz z listy użytkowników
            </Button>
            <Banner>
              Test zostanie wysłany do {recipients.length}{" "}
              {recipients.length === 1 ? "osoby" : "osób"}
            </Banner>
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
        </Card>
      ) : null}
    </DockedPage>
  );
}
