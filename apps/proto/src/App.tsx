import { useMemo, useState } from "react";
import { AppShell } from "./layout/AppShell";
import { DockedPage, DockResizeHandle } from "./layout/DockedPage";
import { TESTS } from "./mocks/tests";
import { ArchiveModal } from "./overlays/ArchiveModal";
import { MorePanel } from "./overlays/MorePanel";
import { PreviewModal } from "./overlays/PreviewModal";
import { ResultsPanel } from "./overlays/ResultsPanel";
import { QuestionOverlay } from "./overlays/QuestionOverlay";
import { CreateTypePage } from "./pages/CreateTypePage";
import { DashboardPage } from "./pages/DashboardPage";
import { EditTestPage } from "./pages/EditTestPage";
import { QuestionBankPage } from "./pages/QuestionBankPage";
import { ReportDetailPage } from "./pages/ReportDetailPage";
import { ReportsPage } from "./pages/ReportsPage";
import { SettingsPage } from "./pages/SettingsPage";
import { TestsPage } from "./pages/TestsPage";
import type { Overlay, Route, TestItem, TestStatus, TestsView } from "./types";

export function App() {
  const [route, setRoute] = useState<Route>("tests");
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState<TestStatus>("active");
  const [view, setView] = useState<TestsView>("detailed");
  const [page, setPage] = useState(1);
  const [overlay, setOverlay] = useState<Overlay>(null);
  const [editId, setEditId] = useState<string | null>(null);
  const [items, setItems] = useState<TestItem[]>(TESTS);
  const [resultsWidth, setResultsWidth] = useState(480);
  const [resultsResizing, setResultsResizing] = useState(false);
  const [resultsTest, setResultsTest] = useState<TestItem | null>(null);

  const visible = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return items;
    return items.filter((item) => item.title.toLowerCase().includes(query));
  }, [items, search]);

  const overlayTest =
    overlay && overlay.kind !== "question"
      ? items.find((item) => item.id === overlay.testId)
      : undefined;
  const editTest = editId
    ? items.find((item) => item.id === editId)
    : undefined;

  function navigate(next: Route) {
    setRoute(next);
    setOverlay(null);
    if (next !== "edit") setEditId(null);
  }

  function toggleTheme() {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    document.documentElement.dataset.theme = next;
  }

  function openEdit(id: string) {
    setEditId(id);
    setOverlay(null);
    setRoute("edit");
  }

  function openResults(id: string) {
    const test = items.find((item) => item.id === id);
    if (test) setResultsTest(test);
    setOverlay({ kind: "results", testId: id });
  }

  function closeResults() {
    setOverlay(null);
    setResultsResizing(false);
  }

  function archive(id: string) {
    setItems((current) =>
      current.map((item) =>
        item.id === id
          ? { ...item, status: "archive", statusLabel: "archiwum" }
          : item
      )
    );
    setOverlay(null);
  }

  return (
    <AppShell
      route={route}
      theme={theme}
      search={search}
      onSearch={(value) => {
        setSearch(value);
        setPage(1);
        if (route !== "tests") setRoute("tests");
        setEditId(null);
      }}
      onNavigate={navigate}
      onToggleTheme={toggleTheme}
    >
      {route === "dashboard" ? (
        <DashboardPage
          onCreate={() => navigate("create")}
          onOpenTests={() => navigate("tests")}
          onOpenBank={() => navigate("bank")}
          onOpenQuestion={() => setOverlay({ kind: "question", mode: "preview" })}
          onSettings={() => navigate("settings")}
        />
      ) : null}
      {route === "tests" ? (
        <DockedPage
          open={overlay?.kind === "results"}
          resizing={resultsResizing}
          width={resultsWidth}
          panel={
            resultsTest ? (
              <>
                <DockResizeHandle
                  width={resultsWidth}
                  onWidth={setResultsWidth}
                  onResizing={setResultsResizing}
                  label="Szerokość wyników testu"
                />
                <ResultsPanel test={resultsTest} onClose={closeResults} />
              </>
            ) : null
          }
        >
          <TestsPage
            tests={visible}
            tab={tab}
            view={view}
            page={page}
            onTab={(next) => {
              setTab(next);
              setPage(1);
            }}
            onView={(next) => {
              setView(next);
              setPage(1);
            }}
            onPage={setPage}
            onCreate={() => navigate("create")}
            onOpen={openEdit}
            onPreview={(id) => setOverlay({ kind: "preview", testId: id })}
            onMore={(id) => setOverlay({ kind: "more", testId: id })}
            onResults={openResults}
          />
        </DockedPage>
      ) : null}
      {route === "bank" ? (
        <QuestionBankPage
          onPreview={() => setOverlay({ kind: "question", mode: "preview" })}
          onEdit={() => setOverlay({ kind: "question", mode: "edit" })}
        />
      ) : null}
      {route === "reports" ? (
        <ReportsPage onOpenDetail={() => navigate("report")} />
      ) : null}
      {route === "report" ? (
        <ReportDetailPage onBack={() => navigate("reports")} />
      ) : null}
      {route === "profile" ? <SettingsPage section="profile" /> : null}
      {route === "settings" ? <SettingsPage section="account" /> : null}
      {route === "create" ? (
        <CreateTypePage onCancel={() => navigate("tests")} />
      ) : null}
      {route === "edit" && editTest ? (
        <EditTestPage test={editTest} onBack={() => navigate("tests")} />
      ) : null}

      {overlay?.kind === "preview" && overlayTest ? (
        <PreviewModal test={overlayTest} onClose={() => setOverlay(null)} />
      ) : null}
      {overlay?.kind === "more" && overlayTest ? (
        <MorePanel
          test={overlayTest}
          onClose={() => setOverlay(null)}
          onPreview={() =>
            setOverlay({ kind: "preview", testId: overlayTest.id })
          }
          onResults={() => openResults(overlayTest.id)}
          onArchive={() =>
            setOverlay({ kind: "archive", testId: overlayTest.id })
          }
        />
      ) : null}
      {overlay?.kind === "archive" && overlayTest ? (
        <ArchiveModal
          test={overlayTest}
          onClose={() => setOverlay(null)}
          onConfirm={() => archive(overlayTest.id)}
        />
      ) : null}
      {overlay?.kind === "question" ? (
        <QuestionOverlay
          mode={overlay.mode}
          onMode={(mode) => setOverlay({ kind: "question", mode })}
          onClose={() => setOverlay(null)}
        />
      ) : null}
    </AppShell>
  );
}
