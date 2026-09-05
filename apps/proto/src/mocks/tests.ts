import type { TestItem, TestStatus } from "../types";

const titles = [
  "Szkolenie BHP — grudzień 2026",
  "Quiz integracyjny — team building",
  "Quiz — nowe produkty 2026",
  "Ankieta satysfakcji Q2",
  "Test wiedzy IT",
  "RODO — pracownicy",
  "Compliance 2026",
  "Onboarding menedżerski",
  "Feedback po wdrożeniu",
  "Ankieta NPS",
  "Szkolenie pierwszej pomocy",
  "Bezpieczeństwo informacji",
  "Quiz produktowy — sprzedaż",
  "Egzamin okresowy BHP",
  "Ankieta klimatu zespołu",
  "Test wiedzy RODO",
  "Szkolenie przeciwpożarowe",
  "Quiz — nowe procedury",
  "Szkic: onboarding Q3",
  "Szkic: ankieta benefitów",
  "Szkic: quiz IT — luty",
  "Szkic: compliance mini",
  "Zakończone: BHP wiosna 2026",
  "Zakończone: NPS Q1",
  "Zakończone: RODO — nowi",
  "Zakończone: quiz sprzedażowy",
  "Archiwum: BHP 2025",
  "Archiwum: ankieta Q4 2025",
];

const types = [
  "Egzamin",
  "Szybki sprawdzian",
  "Ankieta",
] as const;

function statusForIndex(index: number): { status: TestStatus; label: string } {
  if (index < 18) return { status: "active", label: "aktywne" };
  if (index < 22) return { status: "drafts", label: "szkic" };
  if (index < 26) return { status: "done", label: "zakończone" };
  return { status: "archive", label: "archiwum" };
}

export const TESTS: TestItem[] = titles.map((title, index) => {
  const { status, label } = statusForIndex(index);
  const finished = status === "active" ? 6 + (index % 5) : status === "done" ? 10 : 0;
  const total = 10;
  return {
    id: `test-${index + 1}`,
    title,
    status,
    statusLabel: label,
    type: types[index % types.length],
    questionCount: 4 + (index % 9),
    finishedCount: finished,
    totalCount: total,
    completionPercent: Math.round((finished / total) * 100),
    publishedDate: status === "drafts" ? "—" : `${10 + (index % 18)}.0${1 + (index % 4)}.2026`,
  };
});

export function countByStatus(items: TestItem[]) {
  return {
    active: items.filter((item) => item.status === "active").length,
    drafts: items.filter((item) => item.status === "drafts").length,
    done: items.filter((item) => item.status === "done").length,
    archive: items.filter((item) => item.status === "archive").length,
  };
}
