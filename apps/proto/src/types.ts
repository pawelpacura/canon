export type TestStatus = "active" | "drafts" | "done" | "archive";
export type TestType = "Egzamin" | "Ankieta" | "Szybki sprawdzian";
export type TestsView = "detailed" | "grid" | "list";
export type AuthRoute =
  | "login"
  | "register"
  | "reset"
  | "reset-sent"
  | "verify";

export const AUTH_ROUTES: readonly AuthRoute[] = [
  "login",
  "register",
  "reset",
  "reset-sent",
  "verify",
];

export function isAuthRoute(route: Route): route is AuthRoute {
  return (AUTH_ROUTES as readonly string[]).includes(route);
}

export type Route =
  | "tests"
  | "dashboard"
  | "bank"
  | "reports"
  | "report"
  | "create"
  | "edit"
  | "profile"
  | "settings"
  | AuthRoute;

export type EditTab = "settings" | "questions" | "send";
export type ResultsTab = "status" | "scores";

export type TestItem = {
  id: string;
  title: string;
  status: TestStatus;
  statusLabel: string;
  type: TestType;
  questionCount: number;
  finishedCount: number;
  totalCount: number;
  completionPercent: number;
  publishedDate: string;
};

export type Overlay =
  | { kind: "preview"; testId: string }
  | { kind: "more"; testId: string }
  | { kind: "archive"; testId: string }
  | { kind: "results"; testId: string }
  | { kind: "question"; mode: "preview" | "edit"; index: number }
  | null;
