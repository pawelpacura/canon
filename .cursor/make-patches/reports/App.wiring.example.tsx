/**
 * Przykład podpięcia w App.tsx — NIE kopiuj całego pliku.
 * Scal z istniejącym App.tsx w Make.
 */
import { useState } from 'react';
import { Dashboard } from './components/Dashboard';
import { Reports } from './components/Reports';
import { ReportDetail } from './components/ReportDetail';
import { TestsDashboard } from './components/TestsDashboard';
import { QuestionBank } from './components/QuestionBank';
import { TestCreationWizard } from './components/TestCreationWizard';
import { TestEditor } from './components/TestEditor';

type View = 'dashboard' | 'create' | 'edit' | 'questionBank' | 'reports' | 'reportDetail';

export default function AppWiringExample() {
  const [view, setView] = useState<View>('dashboard');
  const [editingTestId, setEditingTestId] = useState<number | null>(null);
  const [openReportName, setOpenReportName] = useState('BHP — onboarding');

  const goDashboard = () => { setView('dashboard'); setEditingTestId(null); };
  const goTests = () => { setView('dashboard'); /* lub osobny 'tests' jeśli macie */ };
  const goReports = () => { setView('reports'); setEditingTestId(null); };
  const goQuestionBank = () => { setView('questionBank'); setEditingTestId(null); };
  const openReport = (name: string) => { setOpenReportName(name); setView('reportDetail'); };

  if (view === 'reportDetail') {
    return (
      <ReportDetail
        reportName={openReportName}
        onBack={goReports}
        onNavigateToDashboard={goDashboard}
        onNavigateToTests={goTests}
        onNavigateToQuestionBank={goQuestionBank}
        onNavigateToReports={goReports}
      />
    );
  }

  if (view === 'reports') {
    return (
      <Reports
        onNavigateToDashboard={goDashboard}
        onNavigateToTests={goTests}
        onNavigateToQuestionBank={goQuestionBank}
        onOpenReport={openReport}
      />
    );
  }

  if (view === 'dashboard') {
    return (
      <Dashboard
        onCreateTest={() => setView('create')}
        onNavigateToTests={() => setView('dashboard')}
        onNavigateToQuestionBank={goQuestionBank}
        onNavigateToReports={goReports}
      />
    );
  }

  // …reszta jak dziś: edit / questionBank / create
  return null;
}
