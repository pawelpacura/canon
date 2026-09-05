import { useState } from "react";
import {
  Button,
  Card,
  LibraryAddCheckIcon,
  NewsstandIcon,
  BorderAllIcon,
  PercentIcon,
  Step,
  Stepper,
} from "@pacurap/design-system";

const TYPES = [
  {
    id: "file",
    title: "Utwórz z pliku",
    description: "Importuj pytania z pliku – AI automatycznie odczyta zawartość",
    points: ["Szybkie tworzenie", "Obsługa PDF, DOCX, TXT", "AI odczyta pytania"],
    icon: <NewsstandIcon />,
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
    icon: <BorderAllIcon />,
  },
  {
    id: "quiz",
    title: "Szybki sprawdzian",
    description: "Krótka weryfikacja wiedzy, mniej formalny",
    points: ["Krótki", "Szybka ocena", "Natychmiastowy feedback"],
    icon: <PercentIcon />,
  },
] as const;

export function CreateTypePage({ onCancel }: { onCancel: () => void }) {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <Card
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        gap: "var(--spacing-l)",
      }}
    >
      <Stepper>
        <Step number="1" label="Typ" state="completed" />
        <Step number="2" label="Podstawy" />
        <Step number="3" label="Pytania" />
        <Step number="4" label="Publikacja" showLine={false} />
      </Stepper>

      <div>
        <h1
          style={{
            margin: 0,
            fontSize: "var(--font-size-l)",
            fontWeight: 600,
          }}
        >
          Wybierz typ testu
        </h1>
        <p
          style={{
            margin: "var(--spacing-s) 0 0",
            color: "var(--color-foreground-secondary)",
          }}
        >
          Wybór typu ustawi odpowiednie domyślne ustawienia
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
          gap: "var(--spacing-l)",
        }}
      >
        {TYPES.map((type) => (
          <Card
            key={type.id}
            interactive
            onClick={() => setSelected(type.id)}
            style={{
              outline:
                selected === type.id
                  ? "2px solid var(--color-interactive-primary-default)"
                  : undefined,
            }}
          >
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: "var(--radius-m)",
                background: "var(--color-background-secondary)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "var(--spacing-m)",
              }}
            >
              {type.icon}
            </div>
            <h2
              style={{
                margin: 0,
                fontSize: "var(--font-size-m)",
                fontWeight: 600,
              }}
            >
              {type.title}
            </h2>
            <p
              style={{
                margin: "var(--spacing-s) 0",
                fontSize: "var(--font-size-xs)",
                color: "var(--color-foreground-secondary)",
              }}
            >
              {type.description}
            </p>
            <ul
              style={{
                margin: 0,
                paddingLeft: 18,
                fontSize: "var(--font-size-xs)",
                color: "var(--color-foreground-secondary)",
              }}
            >
              {type.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </Card>
        ))}
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          paddingTop: "var(--spacing-l)",
          borderTop: "1px solid var(--color-stroke-subtle)",
          marginTop: "auto",
        }}
      >
        <Button variant="destructive" onClick={onCancel}>
          Anuluj
        </Button>
        <Button variant="primary" disabled={!selected}>
          Dalej
        </Button>
      </div>
    </Card>
  );
}
