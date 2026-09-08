import { useState, type DragEvent } from "react";
import {
  Button,
  Checkbox,
  CloseIcon,
  DragIndicatorIcon,
  IconButton,
  InputChip,
  KeyboardArrowDownIcon,
  Label,
  Modal,
  Radio,
  Select,
  SegmentedControl,
  Tag,
  TextArea,
  EditIcon,
  VisibilityIcon,
} from "@pacurap/design-system";

type AnswerDraft = {
  id: string;
  text: string;
  correct: boolean;
};

const PREVIEW_ANSWERS = [
  "Social media",
  "Email marketing",
  "TV",
  "Content marketing",
] as const;

const EDIT_ANSWERS: AnswerDraft[] = [
  { id: "a", text: "Social media", correct: true },
  { id: "b", text: "Email marketing", correct: true },
  { id: "c", text: "TV", correct: false },
  { id: "d", text: "Content marketing", correct: true },
];

function uid() {
  return `a-${Math.random().toString(36).slice(2, 9)}`;
}

function emptyAnswer(): AnswerDraft {
  return { id: uid(), text: "", correct: false };
}

function ensureChoiceAnswers(answers: AnswerDraft[]) {
  const filled = answers.filter((answer) => answer.text.trim());
  const next = [...filled];
  while (next.length < 2) next.push(emptyAnswer());
  if (filled.length >= 2) next.push(emptyAnswer());
  return next;
}

function letter(index: number) {
  return String.fromCharCode(65 + index);
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

export function QuestionOverlay({
  mode,
  index,
  onMode,
  onClose,
}: {
  mode: "preview" | "edit";
  index: number;
  onMode: (mode: "preview" | "edit") => void;
  onClose: () => void;
}) {
  const isCreate = index < 0;

  return (
    <div className="ds-modal-scrim proto-qoverlay">
      <div className="proto-qoverlay__toolbar">
        <p className="proto-qoverlay__count">
          {isCreate ? "Nowe pytanie" : "1 / 10"}
        </p>
        {isCreate ? (
          <span />
        ) : (
          <SegmentedControl onDark aria-label="Tryb">
            <Button
              variant={mode === "edit" ? "primary" : "tertiary"}
              inverted
              icon={<EditIcon />}
              onClick={() => onMode("edit")}
            >
              Edycja
            </Button>
            <Button
              variant={mode === "preview" ? "primary" : "tertiary"}
              inverted
              icon={<VisibilityIcon />}
              onClick={() => onMode("preview")}
            >
              Podgląd
            </Button>
          </SegmentedControl>
        )}
        <Button variant="secondary" inverted onClick={onClose}>
          Zamknij
        </Button>
      </div>

      {isCreate ? null : (
        <div className="proto-qoverlay__nav">
          <IconButton variant="primary" inverted aria-label="Poprzednie pytanie">
            <KeyboardArrowDownIcon style={{ transform: "rotate(180deg)" }} />
          </IconButton>
          <IconButton variant="primary" inverted aria-label="Następne pytanie">
            <KeyboardArrowDownIcon />
          </IconButton>
        </div>
      )}

      {mode === "preview" && !isCreate ? (
        <Modal showFooter={false} className="proto-qoverlay__modal">
          <p className="proto-qoverlay__question">
            Jakie kanały marketingowe są priorytetowe w 2026?
          </p>
          <div className="proto-qoverlay__options">
            {PREVIEW_ANSWERS.map((answer) => (
              <label key={answer} className="proto-qoverlay__option">
                <Radio name="bank-preview" />
                <span>{answer}</span>
              </label>
            ))}
          </div>
        </Modal>
      ) : (
        <QuestionEditForm isCreate={isCreate} onClose={onClose} />
      )}
    </div>
  );
}

function QuestionEditForm({
  isCreate,
  onClose,
}: {
  isCreate: boolean;
  onClose: () => void;
}) {
  const [text, setText] = useState(
    isCreate
      ? ""
      : "Jakie są główne cele kampanii marketingowej w mediach społecznościowych?"
  );
  const [category, setCategory] = useState(isCreate ? "Marketing" : "Marketing");
  const [kind, setKind] = useState<"single" | "multi">(
    isCreate ? "multi" : "multi"
  );
  const [answers, setAnswers] = useState<AnswerDraft[]>(
    isCreate
      ? ensureChoiceAnswers([emptyAnswer(), emptyAnswer()])
      : ensureChoiceAnswers(EDIT_ANSWERS)
  );
  const [tags, setTags] = useState<string[]>(isCreate ? [] : ["tag1", "tag2"]);
  const [tagDraft, setTagDraft] = useState("");
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [dropId, setDropId] = useState<string | null>(null);

  function setChoiceAnswers(next: AnswerDraft[]) {
    setAnswers(ensureChoiceAnswers(next));
  }

  return (
    <Modal
      showFooter
      className="proto-qoverlay__modal proto-qoverlay__modal--edit"
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>
            Anuluj
          </Button>
          <Button variant="primary" onClick={onClose}>
            {isCreate ? "Zapisz pytanie" : "Zapisz zmiany"}
          </Button>
        </>
      }
    >
      <div className="proto-settings__fields">
        <div className="proto-edit__field">
          <Label htmlFor="q-body">Treść pytania *</Label>
          <TextArea
            id="q-body"
            rows={3}
            placeholder="Wpisz treść pytania..."
            value={text}
            onChange={(event) => setText(event.target.value)}
          />
        </div>
        <div className="proto-qoverlay__pair">
          <div className="proto-edit__field">
            <Label htmlFor="q-cat">Kategoria *</Label>
            <Select
              id="q-cat"
              value={category}
              onChange={(event) => setCategory(event.target.value)}
            >
              <option>Marketing</option>
              <option>IT</option>
              <option>Biznes</option>
              <option>BHP</option>
              <option>Obsługa Klienta</option>
              <option>Technologia</option>
              <option>HR</option>
              <option>Prawo</option>
            </Select>
          </div>
          <div className="proto-edit__field">
            <Label htmlFor="q-type">Typ pytania *</Label>
            <Select
              id="q-type"
              value={kind}
              onChange={(event) =>
                setKind(event.target.value as "single" | "multi")
              }
            >
              <option value="single">Jednokrotnego wyboru</option>
              <option value="multi">Wielokrotnego wyboru</option>
            </Select>
          </div>
        </div>
        <p className="proto-edit__section">
          Odpowiedzi *{" "}
          {kind === "multi"
            ? "(zaznacz wszystkie poprawne)"
            : "(zaznacz poprawną)"}
        </p>
        {answers.map((answer, answerIndex) => {
          const classes = ["proto-builder__answer"];
          if (draggingId === answer.id) classes.push("proto-builder__answer--dragging");
          if (dropId === answer.id && draggingId !== answer.id) {
            classes.push("proto-builder__answer--over");
          }
          return (
            <div
              key={answer.id}
              className={classes.join(" ")}
              onDragOver={(event) => {
                if (!draggingId) return;
                event.preventDefault();
                event.stopPropagation();
                event.dataTransfer.dropEffect = "move";
                if (answer.id !== draggingId) setDropId(answer.id);
              }}
              onDrop={(event) => {
                const sourceId = event.dataTransfer.getData(
                  "application/x-answer"
                );
                if (!sourceId) return;
                event.preventDefault();
                event.stopPropagation();
                const filled = answers.filter((row) => row.text.trim());
                const from = filled.findIndex((row) => row.id === sourceId);
                const to = filled.findIndex((row) => row.id === answer.id);
                const dest = to >= 0 ? to : filled.length;
                setChoiceAnswers(moveItem(filled, from, dest));
                setDraggingId(null);
                setDropId(null);
              }}
            >
              <span
                className="proto-drag"
                role="button"
                tabIndex={0}
                aria-label="Przenieś odpowiedź"
                draggable
                onDragStart={(event: DragEvent<HTMLSpanElement>) => {
                  event.stopPropagation();
                  event.dataTransfer.setData("application/x-answer", answer.id);
                  event.dataTransfer.effectAllowed = "move";
                  setDraggingId(answer.id);
                }}
                onDragEnd={() => {
                  setDraggingId(null);
                  setDropId(null);
                }}
              >
                <DragIndicatorIcon aria-hidden />
              </span>
              {kind === "single" ? (
                <Radio
                  name="overlay-correct"
                  checked={answer.correct}
                  onChange={() =>
                    setChoiceAnswers(
                      answers.map((row) => ({
                        ...row,
                        correct: row.id === answer.id,
                      }))
                    )
                  }
                />
              ) : (
                <Checkbox
                  checked={answer.correct}
                  onChange={() =>
                    setChoiceAnswers(
                      answers.map((row) =>
                        row.id === answer.id
                          ? { ...row, correct: !row.correct }
                          : row
                      )
                    )
                  }
                />
              )}
              <strong>{letter(answerIndex)}.</strong>
              <TextArea
                className="proto-builder__answer-text"
                rows={1}
                placeholder="Wpisz treść odpowiedzi..."
                value={answer.text}
                onChange={(event) =>
                  setChoiceAnswers(
                    answers.map((row) =>
                      row.id === answer.id
                        ? { ...row, text: event.target.value }
                        : row
                    )
                  )
                }
              />
              <IconButton
                variant="tertiary"
                aria-label={`Usuń odpowiedź ${letter(answerIndex)}`}
                onClick={() =>
                  setChoiceAnswers(
                    answers.filter((row) => row.id !== answer.id)
                  )
                }
              >
                <CloseIcon />
              </IconButton>
            </div>
          );
        })}
        <InputChip
          label="Tagi"
          placeholder="Dodaj kolejny tag..."
          value={tagDraft}
          onChange={(event) => setTagDraft(event.target.value)}
          onKeyDown={(event) => {
            if (event.key !== "Enter") return;
            event.preventDefault();
            const next = tagDraft.trim();
            if (!next || tags.includes(next)) return;
            setTags([...tags, next]);
            setTagDraft("");
          }}
        >
          {tags.map((tag) => (
            <Tag
              key={tag}
              onRemove={() => setTags(tags.filter((item) => item !== tag))}
            >
              {tag}
            </Tag>
          ))}
        </InputChip>
      </div>
    </Modal>
  );
}
