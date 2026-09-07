import { useState, type DragEvent } from "react";
import {
  Badge,
  Button,
  Card,
  Checkbox,
  InputChip,
  CloseIcon,
  EditIcon,
  IconButton,
  InputText,
  Label,
  LibraryAddCheckIcon,
  NewsstandIcon,
  Panel,
  Radio,
  Select,
  TextArea,
} from "@pacurap/design-system";

export type QuestionKind = "single" | "multi" | "open";

export type DraftAnswer = {
  id: string;
  text: string;
  correct: boolean;
};

export type DraftQuestion = {
  id: string;
  kind: QuestionKind;
  text: string;
  answers: DraftAnswer[];
  expected: string;
  editing: boolean;
};

export type BankItem = {
  text: string;
  kind: QuestionKind;
  meta: string;
  answers?: { text: string; correct?: boolean }[];
  expected?: string;
};

export const BANK_ITEMS: BankItem[] = [
  {
    text: "Jakie są podstawowe zasady BHP w miejscu pracy?",
    kind: "single",
    meta: "Jednokrotnego wyboru • BHP",
    answers: [
      { text: "Pracuj szybko, nawet bez środków ochrony" },
      {
        text: "Stosuj środki ochrony indywidualnej i przestrzegaj procedur",
        correct: true,
      },
      { text: "BHP dotyczy wyłącznie nowych pracowników" },
      { text: "Zgłaszaj wypadki dopiero po zakończeniu zmiany" },
    ],
  },
  {
    text: "Wymień środki ochrony osobistej",
    kind: "multi",
    meta: "Wielokrotnego wyboru • BHP",
  },
  {
    text: "Co to jest pierwsza pomoc przedmedyczna?",
    kind: "open",
    meta: "Pytanie otwarte • Pierwsza pomoc",
    expected:
      "Oczekiwana odpowiedź: działania na miejscu zdarzenia do przyjazdu służb medycznych, chroniące życie i zdrowie poszkodowanego.",
  },
  {
    text: "Jak postępować w przypadku pożaru?",
    kind: "single",
    meta: "Jednokrotnego wyboru • Bezpieczeństwo",
  },
  {
    text: "Kiedy należy zgłosić wypadek przy pracy?",
    kind: "single",
    meta: "Jednokrotnego wyboru • Prawo pracy",
  },
];

const KIND_LABEL: Record<QuestionKind, string> = {
  single: "Jednokrotnego wyboru",
  multi: "Wielokrotnego wyboru",
  open: "Pytanie otwarte",
};

function uid(prefix: string) {
  return `${prefix}-${Math.random().toString(36).slice(2, 9)}`;
}

function emptyAnswer(): DraftAnswer {
  return { id: uid("a"), text: "", correct: false };
}

function emptyQuestion(): DraftQuestion {
  return {
    id: uid("q"),
    kind: "single",
    text: "",
    answers: [emptyAnswer()],
    expected: "",
    editing: true,
  };
}

export function fromBank(item: BankItem): DraftQuestion {
  const answers = (item.answers ?? []).map((answer) => ({
    id: uid("a"),
    text: answer.text,
    correct: Boolean(answer.correct),
  }));
  return {
    id: uid("q"),
    kind: item.kind,
    text: item.text,
    answers: item.kind === "open" ? [] : [...answers, emptyAnswer()],
    expected: item.expected ?? "",
    editing: false,
  };
}

function moveItem<T>(list: T[], from: number, to: number) {
  if (from === to || from < 0 || to < 0 || from >= list.length || to > list.length) {
    return list;
  }
  const next = [...list];
  const [item] = next.splice(from, 1);
  next.splice(to, 0, item);
  return next;
}

function withTrailingEmpty(answers: DraftAnswer[]) {
  const filled = answers.filter((answer) => answer.text.trim());
  return [...filled, emptyAnswer()];
}

function letter(index: number) {
  return String.fromCharCode(65 + index);
}

function DragHandle({
  label,
  onDragStart,
}: {
  label: string;
  onDragStart?: (event: DragEvent<HTMLSpanElement>) => void;
}) {
  return (
    <span
      className="proto-drag"
      role="button"
      tabIndex={0}
      aria-label={label}
      title={label}
      draggable={Boolean(onDragStart)}
      onDragStart={onDragStart}
    >
      <span className="proto-drag__dots" aria-hidden />
    </span>
  );
}

export function QuestionBuilder({
  questions,
  onChange,
  bankOpen,
  onBankOpen,
}: {
  questions: DraftQuestion[];
  onChange: (questions: DraftQuestion[]) => void;
  bankOpen: boolean;
  onBankOpen: () => void;
}) {
  const [dropIndex, setDropIndex] = useState<number | null>(null);
  const [answerDrop, setAnswerDrop] = useState<string | null>(null);

  function update(id: string, patch: Partial<DraftQuestion>) {
    onChange(
      questions.map((question) =>
        question.id === id ? { ...question, ...patch } : question
      )
    );
  }

  function setAnswers(id: string, answers: DraftAnswer[]) {
    update(id, { answers: withTrailingEmpty(answers) });
  }

  function importBank(items: BankItem[]) {
    onChange([...questions, ...items.map(fromBank)]);
  }

  return (
    <div className="proto-builder">
      <div
        className="proto-builder__list"
        onDragOver={(event) => {
          if (event.dataTransfer.types.includes("application/x-bank-question")) {
            event.preventDefault();
            setDropIndex(questions.length);
          }
        }}
        onDragLeave={() => setDropIndex(null)}
        onDrop={(event) => {
          const payload = event.dataTransfer.getData(
            "application/x-bank-question"
          );
          if (!payload) return;
          event.preventDefault();
          const item = BANK_ITEMS.find((row) => row.text === payload);
          if (item) importBank([item]);
          setDropIndex(null);
        }}
      >
        {questions.length === 0 ? (
          <Card
            className={
              dropIndex !== null
                ? "proto-wizard__empty-card proto-drop--over"
                : "proto-wizard__empty-card"
            }
          >
            <p className="proto-wizard__empty">
              Nie dodano jeszcze żadnych pytań. Dodaj pierwsze pytanie poniżej
              albo przeciągnij je z banku.
            </p>
          </Card>
        ) : null}

        {questions.map((question, index) => (
          <div
            key={question.id}
            className={
              dropIndex === index
                ? "proto-builder__slot proto-drop--over"
                : "proto-builder__slot"
            }
            onDragOver={(event) => {
              if (
                event.dataTransfer.types.includes("application/x-question") ||
                event.dataTransfer.types.includes("application/x-bank-question")
              ) {
                event.preventDefault();
                event.stopPropagation();
                setDropIndex(index);
              }
            }}
            onDrop={(event) => {
              event.preventDefault();
              event.stopPropagation();
              const bank = event.dataTransfer.getData(
                "application/x-bank-question"
              );
              if (bank) {
                const item = BANK_ITEMS.find((row) => row.text === bank);
                if (item) {
                  const next = [...questions];
                  next.splice(index, 0, fromBank(item));
                  onChange(next);
                }
                setDropIndex(null);
                return;
              }
              const fromId = event.dataTransfer.getData(
                "application/x-question"
              );
              const from = questions.findIndex((row) => row.id === fromId);
              if (from >= 0) onChange(moveItem(questions, from, index));
              setDropIndex(null);
            }}
          >
            {question.editing ? (
              <EditorCard
                question={question}
                index={index}
                answerDrop={answerDrop}
                onQuestionDragStart={(event) => {
                  event.dataTransfer.setData(
                    "application/x-question",
                    question.id
                  );
                  event.dataTransfer.effectAllowed = "move";
                }}
                onKind={(kind) => {
                  if (kind === "open") {
                    update(question.id, { kind, answers: [] });
                    return;
                  }
                  let answers = withTrailingEmpty(question.answers);
                  if (kind === "single") {
                    const first = answers.find((answer) => answer.correct);
                    answers = answers.map((answer) => ({
                      ...answer,
                      correct: Boolean(first && answer.id === first.id),
                    }));
                  }
                  update(question.id, { kind, answers });
                }}
                onText={(text) => update(question.id, { text })}
                onExpected={(expected) => update(question.id, { expected })}
                onAnswerText={(answerId, text) => {
                  setAnswers(
                    question.id,
                    question.answers.map((answer) =>
                      answer.id === answerId ? { ...answer, text } : answer
                    )
                  );
                }}
                onAnswerCorrect={(answerId) => {
                  setAnswers(
                    question.id,
                    question.answers.map((answer) => {
                      if (question.kind === "single") {
                        return { ...answer, correct: answer.id === answerId };
                      }
                      if (answer.id !== answerId) return answer;
                      return { ...answer, correct: !answer.correct };
                    })
                  );
                }}
                onAnswerDragStart={(answerId) => {
                  setAnswerDrop(question.id);
                  return answerId;
                }}
                onAnswerDrop={(targetId, sourceId) => {
                  const from = question.answers.findIndex(
                    (answer) => answer.id === sourceId
                  );
                  const to = question.answers.findIndex(
                    (answer) => answer.id === targetId
                  );
                  const filled = question.answers.filter((answer) =>
                    answer.text.trim()
                  );
                  const moved = moveItem(filled, from, to);
                  setAnswers(question.id, moved);
                  setAnswerDrop(null);
                }}
                onSave={() => update(question.id, { editing: false })}
                onCancel={() => {
                  if (!question.text.trim()) {
                    onChange(questions.filter((row) => row.id !== question.id));
                    return;
                  }
                  update(question.id, { editing: false });
                }}
              />
            ) : (
              <SavedCard
                question={question}
                index={index}
                onQuestionDragStart={(event) => {
                  event.dataTransfer.setData(
                    "application/x-question",
                    question.id
                  );
                  event.dataTransfer.effectAllowed = "move";
                }}
                onEdit={() => update(question.id, { editing: true })}
                onRemove={() =>
                  onChange(questions.filter((row) => row.id !== question.id))
                }
              />
            )}
          </div>
        ))}
      </div>

      <div className="proto-wizard__question-actions">
        <Button
          variant="primary"
          icon
          onClick={() => onChange([...questions, emptyQuestion()])}
        >
          Dodaj pytanie
        </Button>
        <Button
          variant={bankOpen ? "primary" : "secondary"}
          icon={<NewsstandIcon />}
          onClick={onBankOpen}
        >
          Bank pytań
        </Button>
      </div>
    </div>
  );
}

export function QuestionBankPanel({
  picked,
  onPicked,
  onClose,
  onImport,
}: {
  picked: string[];
  onPicked: (picked: string[]) => void;
  onClose: () => void;
  onImport: (items: BankItem[]) => void;
}) {
  return (
    <Panel
      className="proto-dock__surface proto-wizard__bank"
      title="Bank pytań"
      onClose={onClose}
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>
            Anuluj
          </Button>
          <Button
            variant="primary"
            disabled={picked.length === 0}
            onClick={() =>
              onImport(BANK_ITEMS.filter((item) => picked.includes(item.text)))
            }
          >
            Importuj wybrane
          </Button>
        </>
      }
    >
      <div className="proto-settings__fields">
        <InputText
          label="Szukaj pytań"
          placeholder="Wpisz frazę lub kategorię..."
        />
        <div>
          <p className="proto-wizard__bank-count">Dostępne pytania (5)</p>
          <p className="proto-wizard__bank-hint">
            Przeciągnij pytanie do listy pytań lub zaznacz i użyj przycisku
          </p>
        </div>
        {BANK_ITEMS.map((item) => (
          <div key={item.text} className="proto-wizard__bank-row">
            <DragHandle
              label="Przeciągnij pytanie do testu"
              onDragStart={(event) => {
                event.dataTransfer.setData(
                  "application/x-bank-question",
                  item.text
                );
                event.dataTransfer.effectAllowed = "copy";
              }}
            />
            <Checkbox
              checked={picked.includes(item.text)}
              onChange={(event) => {
                const on = event.currentTarget.checked;
                onPicked(
                  on
                    ? [...picked, item.text]
                    : picked.filter((text) => text !== item.text)
                );
              }}
              label={
                <span className="proto-wizard__bank-copy">
                  <strong>{item.text}</strong>
                  <small>{item.meta}</small>
                </span>
              }
            />
          </div>
        ))}
      </div>
    </Panel>
  );
}

function EditorCard({
  question,
  index,
  answerDrop,
  onQuestionDragStart,
  onKind,
  onText,
  onExpected,
  onAnswerText,
  onAnswerCorrect,
  onAnswerDragStart,
  onAnswerDrop,
  onSave,
  onCancel,
}: {
  question: DraftQuestion;
  index: number;
  answerDrop: string | null;
  onQuestionDragStart: (event: DragEvent<HTMLSpanElement>) => void;
  onKind: (kind: QuestionKind) => void;
  onText: (text: string) => void;
  onExpected: (text: string) => void;
  onAnswerText: (id: string, text: string) => void;
  onAnswerCorrect: (id: string) => void;
  onAnswerDragStart: (id: string) => string;
  onAnswerDrop: (targetId: string, sourceId: string) => void;
  onSave: () => void;
  onCancel: () => void;
}) {
  return (
    <Card className="proto-wizard__editor">
      <DragHandle
        label="Przenieś pytanie"
        onDragStart={onQuestionDragStart}
      />
      <p className="proto-wizard__editor-num">{index + 1}.</p>
      <div className="proto-settings__fields">
        <div className="proto-edit__field">
          <Label htmlFor={`${question.id}-body`}>Treść pytania *</Label>
          <TextArea
            id={`${question.id}-body`}
            rows={3}
            placeholder="Wpisz treść pytania..."
            value={question.text}
            onChange={(event) => onText(event.target.value)}
          />
        </div>
        <div className="proto-edit__field">
          <Label htmlFor={`${question.id}-kind`}>Typ pytania *</Label>
          <Select
            id={`${question.id}-kind`}
            value={question.kind}
            onChange={(event) => onKind(event.target.value as QuestionKind)}
          >
            <option value="single">Jednokrotnego wyboru</option>
            <option value="multi">Wielokrotnego wyboru</option>
            <option value="open">Pytanie otwarte</option>
          </Select>
        </div>
        {question.kind === "open" ? (
          <div className="proto-edit__field">
            <Label htmlFor={`${question.id}-expected`}>
              Oczekiwana odpowiedź
            </Label>
            <TextArea
              id={`${question.id}-expected`}
              rows={3}
              placeholder="Wpisz oczekiwaną odpowiedź..."
              value={question.expected}
              onChange={(event) => onExpected(event.target.value)}
            />
          </div>
        ) : (
          <>
            <p className="proto-edit__section">
              Odpowiedzi *{" "}
              {question.kind === "multi"
                ? "(zaznacz wszystkie poprawne)"
                : "(zaznacz poprawną)"}
            </p>
            {question.answers.map((answer, answerIndex) => {
              const filled = Boolean(answer.text.trim());
              return (
                <div
                  key={answer.id}
                  className={
                    answerDrop === question.id
                      ? "proto-qoverlay__option proto-builder__answer"
                      : "proto-qoverlay__option proto-builder__answer"
                  }
                  onDragStart={(event) => {
                    event.stopPropagation();
                  }}
                  onDragOver={(event) => {
                    if (!event.dataTransfer.types.includes("application/x-answer")) {
                      return;
                    }
                    event.preventDefault();
                    event.stopPropagation();
                  }}
                  onDrop={(event) => {
                    const sourceId = event.dataTransfer.getData(
                      "application/x-answer"
                    );
                    if (!sourceId || !filled) return;
                    event.preventDefault();
                    event.stopPropagation();
                    onAnswerDrop(answer.id, sourceId);
                  }}
                >
                  {filled ? (
                    <DragHandle
                      label="Przenieś odpowiedź"
                      onDragStart={(event) => {
                        event.stopPropagation();
                        event.dataTransfer.setData(
                          "application/x-answer",
                          onAnswerDragStart(answer.id)
                        );
                        event.dataTransfer.effectAllowed = "move";
                      }}
                    />
                  ) : (
                    <span className="proto-drag proto-drag--ghost" aria-hidden />
                  )}
                  {question.kind === "single" ? (
                    <Radio
                      name={`${question.id}-correct`}
                      checked={answer.correct}
                      onChange={() => onAnswerCorrect(answer.id)}
                    />
                  ) : (
                    <Checkbox
                      checked={answer.correct}
                      onChange={() => onAnswerCorrect(answer.id)}
                    />
                  )}
                  <strong>{letter(answerIndex)}</strong>
                  <InputText
                    placeholder="Wpisz treść odpowiedzi..."
                    value={answer.text}
                    onChange={(event) =>
                      onAnswerText(answer.id, event.target.value)
                    }
                  />
                </div>
              );
            })}
          </>
        )}
        <div className="proto-edit__field">
          <Label>Tagi</Label>
          <InputChip placeholder="Dodaj kolejny tag..." />
        </div>
        <div className="proto-wizard__editor-tools">
          <IconButton
            variant="primary"
            aria-label="Zapisz pytanie"
            onClick={onSave}
          >
            <LibraryAddCheckIcon />
          </IconButton>
          <IconButton
            variant="tertiary"
            aria-label="Anuluj pytanie"
            onClick={onCancel}
          >
            <CloseIcon />
          </IconButton>
        </div>
      </div>
    </Card>
  );
}

function SavedCard({
  question,
  index,
  onQuestionDragStart,
  onEdit,
  onRemove,
}: {
  question: DraftQuestion;
  index: number;
  onQuestionDragStart: (event: DragEvent<HTMLSpanElement>) => void;
  onEdit: () => void;
  onRemove: () => void;
}) {
  const filled = question.answers.filter((answer) => answer.text.trim());
  return (
    <Card className="proto-edit__question">
      <div className="proto-edit__question-head">
        <DragHandle
          label="Przenieś pytanie"
          onDragStart={onQuestionDragStart}
        />
        <strong>{index + 1}.</strong>
        <div className="proto-edit__question-body">
          <div className="proto-wizard__added-top">
            <p className="proto-edit__question-title">
              {question.text || "Nowe pytanie"}
            </p>
            <div className="proto-edit__actions">
              <IconButton
                variant="tertiary"
                aria-label="Edytuj pytanie"
                onClick={onEdit}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                variant="tertiary"
                aria-label="Usuń pytanie"
                onClick={onRemove}
              >
                <CloseIcon />
              </IconButton>
            </div>
          </div>
          <div className="proto-edit__question-meta">
            <Badge variant={question.kind === "open" ? "neutral" : "brand"}>
              {KIND_LABEL[question.kind]}
            </Badge>
            <span>
              {question.kind === "open"
                ? "Odpowiedź tekstowa"
                : `${filled.length} odpowiedzi`}
            </span>
          </div>
          {question.kind === "open" ? (
            question.expected ? (
              <p className="proto-wizard__expected">{question.expected}</p>
            ) : null
          ) : (
            <div className="proto-edit__answers">
              {filled.map((answer, answerIndex) => (
                <div
                  key={answer.id}
                  className={
                    answer.correct
                      ? "proto-edit__answer proto-edit__answer--correct"
                      : "proto-edit__answer"
                  }
                >
                  {question.kind === "single" ? (
                    <Radio disabled checked={answer.correct} readOnly />
                  ) : (
                    <Checkbox disabled checked={answer.correct} readOnly />
                  )}
                  <strong>{letter(answerIndex)}.</strong>
                  <span>{answer.text}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
