export type ParticipantStatus = "done" | "progress" | "idle";

export type Participant = {
  name: string;
  email: string;
  meta: string;
  score?: number;
  status: ParticipantStatus;
};

export const PARTICIPANTS: Participant[] = [
  {
    name: "Jan Kowalski",
    email: "jan.kowalski@firma.pl",
    meta: "2026-04-23 14:32 • 25 min",
    score: 100,
    status: "done",
  },
  {
    name: "Anna Nowak",
    email: "anna.nowak@firma.pl",
    meta: "2026-04-23 09:15 • 32 min",
    score: 75,
    status: "done",
  },
  {
    name: "Piotr Wiśniewski",
    email: "piotr.wisniewski@firma.pl",
    meta: "2026-04-23 16:20 • 28 min",
    score: 75,
    status: "done",
  },
  {
    name: "Maria Dąbrowska",
    email: "maria.dabrowska@firma.pl",
    meta: "2026-04-24 10:15 • 35 min",
    score: 50,
    status: "done",
  },
  {
    name: "Tomasz Lewandowski",
    email: "tomasz.lewandowski@firma.pl",
    meta: "2026-04-24 13:20 • 22 min",
    score: 100,
    status: "done",
  },
  {
    name: "Katarzyna Zielińska",
    email: "katarzyna.zielinska@firma.pl",
    meta: "2026-04-24 11:45 • 30 min",
    score: 75,
    status: "done",
  },
  {
    name: "Michał Szymański",
    email: "michal.szymanski@firma.pl",
    meta: "W trakcie",
    status: "progress",
  },
  {
    name: "Ewa Wojciechowska",
    email: "ewa.wojciechowska@firma.pl",
    meta: "W trakcie",
    status: "progress",
  },
  {
    name: "Paweł Kamiński",
    email: "pawel.kaminski@firma.pl",
    meta: "Nie rozpoczęto",
    status: "idle",
  },
  {
    name: "Agnieszka Wójcik",
    email: "agnieszka.wojcik@firma.pl",
    meta: "W trakcie",
    status: "progress",
  },
];

export const RESULT_STATS = {
  done: { count: 6, percent: 60 },
  progress: { count: 3, percent: 30 },
  idle: { count: 1, percent: 10 },
};
