import {
  Button,
  Checkbox,
  InputChip,
  SegmentedControl,
  EditIcon,
  IconButton,
  InputText,
  KeyboardArrowDownIcon,
  Label,
  Modal,
  Radio,
  Select,
  Tag,
  VisibilityIcon,
} from "@pacurap/design-system";

const PREVIEW_ANSWERS = [
  "Social media",
  "Email marketing",
  "TV",
  "Content marketing",
] as const;

export function QuestionOverlay({
  mode,
  onMode,
  onClose,
}: {
  mode: "preview" | "edit";
  onMode: (mode: "preview" | "edit") => void;
  onClose: () => void;
}) {
  return (
    <div className="ds-modal-scrim proto-qoverlay">
      <div className="proto-qoverlay__toolbar">
        <p className="proto-qoverlay__count">1 / 10</p>
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
        <Button variant="secondary" inverted onClick={onClose}>
          Zamknij
        </Button>
      </div>

      <div className="proto-qoverlay__nav">
        <IconButton variant="primary" inverted aria-label="Poprzednie pytanie">
          <KeyboardArrowDownIcon style={{ transform: "rotate(180deg)" }} />
        </IconButton>
        <IconButton variant="primary" inverted aria-label="Następne pytanie">
          <KeyboardArrowDownIcon />
        </IconButton>
      </div>

      {mode === "preview" ? (
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
        <Modal
          showFooter
          className="proto-qoverlay__modal"
          footer={
            <>
              <Button variant="secondary" onClick={onClose}>
                Anuluj
              </Button>
              <Button variant="primary" onClick={onClose}>
                Zapisz zmiany
              </Button>
            </>
          }
        >
          <div className="proto-settings__fields">
            <InputText
              label="Treść pytania *"
              defaultValue="Jakie są główne cele kampanii marketingowej w mediach społecznościowych?"
            />
            <div className="proto-edit__field">
              <Label htmlFor="q-cat">Kategoria *</Label>
              <Select id="q-cat" defaultValue="Marketing">
                <option>Marketing</option>
              </Select>
            </div>
            <div className="proto-edit__field">
              <Label htmlFor="q-type">Typ pytania *</Label>
              <Select id="q-type" defaultValue="multi">
                <option value="multi">Wielokrotnego wyboru</option>
              </Select>
            </div>
            <p className="proto-edit__section">
              Odpowiedzi * (zaznacz wszystkie poprawne)
            </p>
            {PREVIEW_ANSWERS.map((answer, index) => (
              <label key={answer} className="proto-qoverlay__option">
                <Checkbox />
                <strong>{String.fromCharCode(65 + index)}.</strong>
                <span>{answer}</span>
              </label>
            ))}
            <InputText placeholder="Wpisz treść odpowiedzi..." />
            <div className="proto-edit__field">
              <Label>Tagi</Label>
              <InputChip placeholder="Dodaj kolejny tag...">
                <Tag>tag1</Tag>
                <Tag>tag2</Tag>
              </InputChip>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
