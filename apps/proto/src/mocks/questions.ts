export type PreviewQuestion = {
  text: string;
  options: string[];
};

export type EditQuestion =
  | {
      kind: "single";
      text: string;
      answers: { label: string; text: string; correct?: boolean }[];
    }
  | {
      kind: "multi";
      text: string;
      answers: { label: string; text: string; correct?: boolean }[];
    }
  | {
      kind: "open";
      text: string;
    };

export const PREVIEW_QUESTIONS: PreviewQuestion[] = [
  {
    text: "Jakie są podstawowe zasady BHP w miejscu pracy?",
    options: [
      "Zachować ostrożność i przestrzegać procedur",
      "Zgłaszać zagrożenia przełożonemu",
      "Nosić odpowiednie środki ochrony",
    ],
  },
  {
    text: "Co zrobisz, gdy zauważysz uszkodzony sprzęt?",
    options: [
      "Użyjesz go ostrożnie",
      "Zgłosisz przełożonemu i nie użyjesz",
      "Naprawisz samodzielnie",
    ],
  },
  {
    text: "Gdzie znajduje się najbliższa apteczka?",
    options: ["W kuchni", "Przy wyjściu ewakuacyjnym", "W biurze kierownika"],
  },
  {
    text: "Jak zgłosisz wypadek w pracy?",
    options: [
      "Natychmiast przełożonemu",
      "Na koniec zmiany",
      "Tylko gdy jest poważny",
    ],
  },
];

export const EDIT_QUESTIONS: EditQuestion[] = [
  {
    kind: "single",
    text: "Co należy zrobić w pierwszej kolejności po wykryciu pożaru w budynku?",
    answers: [
      {
        label: "A.",
        text: "Uruchomić alarm pożarowy i rozpocząć ewakuację",
        correct: true,
      },
      { label: "B.", text: "Spróbować ugasić ogień bez informowania innych" },
      {
        label: "C.",
        text: "Dokończyć bieżące zadanie i dopiero potem reagować",
      },
    ],
  },
  {
    kind: "multi",
    text: "Które z poniższych działań są obowiązkowe przed rozpoczęciem pracy?",
    answers: [
      {
        label: "A.",
        text: "Sprawdzenie stanu narzędzi i urządzeń",
        correct: true,
      },
      {
        label: "B.",
        text: "Zapoznanie się z instrukcją stanowiskową",
        correct: true,
      },
      { label: "C.", text: "Pominięcie odprawy BHP" },
      { label: "D.", text: "Rozpoczęcie pracy bez sprawdzenia oświetlenia" },
    ],
  },
  {
    kind: "open",
    text: "Opisz procedurę postępowania w przypadku pożaru w miejscu pracy.",
  },
];
