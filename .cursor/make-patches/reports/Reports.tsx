/**
 * Flat Reports view for Figma Make (Testy).
 * Mirrors Designs frames: Raporty + Raporty — Niestandardowe.
 * Copy to: src/app/components/Reports.tsx
 */
import { useState, useEffect } from 'react';
import { Edit } from 'lucide-react';
import { UserMenu, PersonIcon, PercentIcon as SettingsMenuIcon, ChevronForwardIcon } from './UserMenu';
import {
  Button,
  IconButton,
  InputText,
  Select,
  Card,
  Badge,
  Header,
  SideNav,
  SideNavItem,
  PageHeader,
  HomeIcon,
  ContentPasteSearchIcon,
  LibraryAddCheckIcon,
  PercentIcon,
  VisibilityIcon,
  createDsIcon,
} from '@pacurap/design-system';

const DarkModeIcon = createDsIcon('DarkModeIcon', [
  { d: 'M480-120q-150 0-255-105T120-480q0-150 105-255t255-105q14 0 27.5 1t26.5 3q-41 29-65.5 75.5T444-660q0 90 63 153t153 63q55 0 101-24.5t75-65.5q2 13 3 26.5t1 27.5q0 150-105 255T480-120Zm0-80q88 0 158-48.5T740-375q-20 6-40 9t-44 3q-123 0-209.5-86.5T360-660q0-24 3-44t9-40q-78 32-126.5 102T197-480q0 119 82 199.5T480-200Zm-10-270Z' },
]);

const LightModeIcon = createDsIcon('LightModeIcon', [
  { d: 'M480-360q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35Zm0 80q-83 0-141.5-58.5T280-480q0-83 58.5-141.5T480-680q83 0 141.5 58.5T680-480q0 83-58.5 141.5T480-280ZM200-440H80v-80h120v80Zm760 0H840v-80h120v80ZM440-760v-120h80v120h-80Zm0 760v-120h80v120h-80ZM256-650l-85-84 57-57 84 85-56 56Zm492 492-85-84 56-56 85 84-56 56Zm-85-556 84-85 57 57-84 85-57-57Zm-563 492 84-85 57 57-85 84-56-56Zm171-284Z' },
]);

type ReportsTab = 'tests' | 'custom';
type TestType = 'exam' | 'survey' | 'quiz';

interface TestReportRow {
  id: number;
  name: string;
  type: TestType;
  participants: number;
  passRate: number | null;
}

interface CustomReportRow {
  id: number;
  name: string;
  scope: string;
  period: string;
  format: string;
}

interface ReportsProps {
  onNavigateToTests?: () => void;
  onNavigateToQuestionBank?: () => void;
  onNavigateToDashboard?: () => void;
  /** Open in-app report detail (not PDF). */
  onOpenReport?: (reportName: string) => void;
}

const TEST_REPORTS: TestReportRow[] = [
  { id: 1, name: 'BHP — onboarding', type: 'exam', participants: 124, passRate: 94 },
  { id: 2, name: 'Ankieta satysfakcji Q2', type: 'survey', participants: 89, passRate: null },
  { id: 3, name: 'Quiz produktowy', type: 'quiz', participants: 56, passRate: 81 },
  { id: 4, name: 'Compliance 2026', type: 'exam', participants: 203, passRate: 76 },
  { id: 5, name: 'Szkolenie menedżerskie', type: 'exam', participants: 41, passRate: 88 },
  { id: 6, name: 'Feedback po wdrożeniu', type: 'survey', participants: 67, passRate: null },
  { id: 7, name: 'Test wiedzy IT', type: 'quiz', participants: 38, passRate: 72 },
  { id: 8, name: 'RODO — pracownicy', type: 'exam', participants: 156, passRate: 91 },
  { id: 9, name: 'Ankieta NPS', type: 'survey', participants: 112, passRate: null },
];

const CUSTOM_REPORTS: CustomReportRow[] = [
  { id: 1, name: 'BHP + Compliance — Q2', scope: 'Wiele testów', period: 'Ten miesiąc', format: 'PDF' },
  { id: 2, name: 'Trend zdawalności — sprzedaż', scope: 'Porównanie', period: 'Ostatnie 90 dni', format: 'PDF' },
  { id: 3, name: 'Onboarding — trudne pytania', scope: 'Jeden test', period: 'Ten miesiąc', format: 'PDF' },
  { id: 4, name: 'Ankiety satysfakcji — półrocze', scope: 'Wiele testów', period: 'Q2 2026', format: 'PDF' },
  { id: 5, name: 'RODO vs BHP — YoY', scope: 'Porównanie', period: '12 miesięcy', format: 'PDF' },
];

const TYPE_LABEL: Record<TestType, string> = {
  exam: 'Egzamin',
  survey: 'Ankieta',
  quiz: 'Quiz',
};

const TYPE_BADGE: Record<TestType, 'brand' | 'neutral' | 'success'> = {
  exam: 'brand',
  survey: 'neutral',
  quiz: 'success',
};

export function Reports({
  onNavigateToTests,
  onNavigateToQuestionBank,
  onNavigateToDashboard,
  onOpenReport,
}: ReportsProps) {
  const [tab, setTab] = useState<ReportsTab>('tests');
  const [searchTerm, setSearchTerm] = useState('');
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(() => document.documentElement.dataset.theme === 'dark');

  useEffect(() => {
    document.documentElement.dataset.theme = isDark ? 'dark' : 'light';
  }, [isDark]);

  const filteredTests = TEST_REPORTS.filter((r) =>
    r.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const filteredCustom = CUSTOM_REPORTS.filter((r) =>
    r.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col h-screen" style={{ backgroundColor: 'var(--color-background-secondary)' }}>
      <div style={{ position: 'relative' }}>
        <Header
          searchPlaceholder="Szukaj testów..."
          searchValue={searchTerm}
          onSearchChange={setSearchTerm}
          userName="Jan Kowalski"
          onUserClick={() => setUserMenuOpen((o) => !o)}
        />
        <UserMenu
          open={userMenuOpen}
          onClose={() => setUserMenuOpen(false)}
          items={[
            { id: 'profile', label: 'Mój profil', icon: <PersonIcon size={18} />, onSelect: () => console.log('profil') },
            { id: 'account', label: 'Ustawienia konta', icon: <SettingsMenuIcon size={18} />, onSelect: () => console.log('ustawienia') },
            { id: 'logout', label: 'Wyloguj', icon: <ChevronForwardIcon size={18} />, onSelect: () => console.log('wyloguj'), danger: true },
          ]}
        />
      </div>

      <div className="flex flex-1 overflow-hidden">
        <SideNav>
          <SideNavItem icon={<HomeIcon />} aria-label="Pulpit" onClick={onNavigateToDashboard} />
          <SideNavItem icon={<ContentPasteSearchIcon />} aria-label="Testy" onClick={onNavigateToTests} />
          <SideNavItem icon={<LibraryAddCheckIcon />} aria-label="Bank pytań" onClick={onNavigateToQuestionBank} />
          <SideNavItem icon={<PercentIcon />} aria-label="Raporty" active />
          <SideNavItem
            icon={isDark ? <LightModeIcon size={20} /> : <DarkModeIcon size={20} />}
            aria-label={isDark ? 'Włącz tryb jasny' : 'Włącz tryb ciemny'}
            onClick={() => setIsDark((d) => !d)}
            style={{ marginTop: 'auto' }}
          />
        </SideNav>

        <main className="flex-1 overflow-auto">
          <PageHeader
            title="Raporty"
            subtitle="Każdy test ma domyślny raport. Zaawansowane raporty tworzysz w kreatorze."
            tabs={[
              { id: 'tests', label: 'Raporty testów' },
              { id: 'custom', label: 'Niestandardowe' },
            ]}
            activeTabId={tab}
            onTabChange={(id) => setTab(id as ReportsTab)}
            actionLabel={tab === 'custom' ? 'Generuj raport' : undefined}
            onAction={tab === 'custom' ? () => console.log('open report wizard') : undefined}
            style={{ paddingInline: 'var(--spacing-2xl)', paddingTop: 'var(--spacing-l)' }}
          />

          <div className="px-[32px] py-[24px] flex flex-col gap-[16px]">
            <div className="flex items-center gap-[10px] flex-wrap">
              <div className="relative flex-1 max-w-[360px]">
                <InputText
                  placeholder={tab === 'tests' ? 'Szukaj testu lub grupy...' : 'Szukaj raportu...'}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full"
                />
              </div>
              {tab === 'tests' ? (
                <>
                  <Select defaultValue="all">
                    <option value="all">Wszystkie typy</option>
                    <option value="exam">Egzamin</option>
                    <option value="survey">Ankieta</option>
                    <option value="quiz">Quiz</option>
                  </Select>
                  <Select defaultValue="month">
                    <option value="month">Ten miesiąc</option>
                    <option value="90">Ostatnie 90 dni</option>
                    <option value="year">Ten rok</option>
                  </Select>
                  <div className="ml-auto">
                    <Select defaultValue="participants">
                      <option value="participants">Sortuj: uczestnicy</option>
                      <option value="name">Sortuj: nazwa</option>
                      <option value="pass">Sortuj: zdawalność</option>
                    </Select>
                  </div>
                </>
              ) : (
                <>
                  <Select defaultValue="all">
                    <option value="all">Wszystkie zakresy</option>
                    <option value="multi">Wiele testów</option>
                    <option value="one">Jeden test</option>
                    <option value="compare">Porównanie</option>
                  </Select>
                  <Select defaultValue="month">
                    <option value="month">Ten miesiąc</option>
                    <option value="90">Ostatnie 90 dni</option>
                    <option value="year">12 miesięcy</option>
                  </Select>
                  <div className="ml-auto">
                    <Select defaultValue="date">
                      <option value="date">Sortuj: data</option>
                      <option value="name">Sortuj: nazwa</option>
                    </Select>
                  </div>
                </>
              )}
            </div>

            <Card style={{ padding: 0, overflow: 'hidden' }}>
              {tab === 'tests' ? (
                <table className="w-full">
                  <thead style={{ background: 'var(--color-background-tertiary)' }}>
                    <tr>
                      <Th>Nazwa</Th>
                      <Th>Typ</Th>
                      <Th>Uczestnicy</Th>
                      <Th>Zdawalność</Th>
                      <Th align="right">Akcje</Th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredTests.map((row) => (
                      <tr
                        key={row.id}
                        style={{ borderTop: '1px solid var(--color-stroke-subtle)' }}
                      >
                        <Td>
                          <span style={{ fontWeight: 500, color: 'var(--color-foreground-primary)' }}>
                            {row.name}
                          </span>
                        </Td>
                        <Td>
                          <Badge variant={TYPE_BADGE[row.type]}>{TYPE_LABEL[row.type]}</Badge>
                        </Td>
                        <Td>{row.participants}</Td>
                        <Td>{row.passRate == null ? '—' : `${row.passRate}%`}</Td>
                        <Td align="right">
                          <div className="flex items-center justify-end gap-[4px]">
                            <IconButton
                              variant="secondary"
                              aria-label="Podgląd raportu"
                              onClick={() => onOpenReport?.(row.name)}
                            >
                              <VisibilityIcon size={16} />
                            </IconButton>
                            <IconButton variant="secondary" aria-label="Edytuj">
                              <Edit style={{ width: 16, height: 16 }} />
                            </IconButton>
                          </div>
                        </Td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <table className="w-full">
                  <thead style={{ background: 'var(--color-background-tertiary)' }}>
                    <tr>
                      <Th>Nazwa</Th>
                      <Th>Zakres</Th>
                      <Th>Okres</Th>
                      <Th>Format</Th>
                      <Th align="right">Akcje</Th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredCustom.map((row) => (
                      <tr
                        key={row.id}
                        style={{ borderTop: '1px solid var(--color-stroke-subtle)' }}
                      >
                        <Td>
                          <span style={{ fontWeight: 500, color: 'var(--color-foreground-primary)' }}>
                            {row.name}
                          </span>
                        </Td>
                        <Td>
                          <Badge variant="neutral">{row.scope}</Badge>
                        </Td>
                        <Td>{row.period}</Td>
                        <Td>{row.format}</Td>
                        <Td align="right">
                          <div className="flex items-center justify-end gap-[4px]">
                            <IconButton
                              variant="secondary"
                              aria-label="Podgląd raportu"
                              onClick={() => onOpenReport?.(row.name)}
                            >
                              <VisibilityIcon size={16} />
                            </IconButton>
                            <IconButton variant="secondary" aria-label="Edytuj">
                              <Edit style={{ width: 16, height: 16 }} />
                            </IconButton>
                          </div>
                        </Td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </Card>

            <div className="flex items-center justify-between pt-[8px]">
              <p
                style={{
                  margin: 0,
                  fontFamily: 'var(--font-family-primary)',
                  fontSize: 'var(--font-size-xs)',
                  color: 'var(--color-foreground-secondary)',
                }}
              >
                {tab === 'tests'
                  ? `Wyświetlanie 1–${filteredTests.length} z 25 testów`
                  : `Wyświetlanie 1–${filteredCustom.length} z ${filteredCustom.length} raportów`}
              </p>
              <div className="flex items-center gap-[8px]">
                <Button variant="secondary" disabled>
                  Poprzednia
                </Button>
                <Button variant="primary">1</Button>
                <Button variant="secondary">2</Button>
                <Button variant="secondary">3</Button>
                <Button variant="secondary">Następna</Button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

function Th({
  children,
  align = 'left',
}: {
  children: React.ReactNode;
  align?: 'left' | 'right';
}) {
  return (
    <th
      style={{
        textAlign: align,
        padding: '12px 16px',
        fontFamily: 'var(--font-family-primary)',
        fontSize: 12,
        fontWeight: 600,
        color: 'var(--color-foreground-secondary)',
      }}
    >
      {children}
    </th>
  );
}

function Td({
  children,
  align = 'left',
}: {
  children: React.ReactNode;
  align?: 'left' | 'right';
}) {
  return (
    <td
      style={{
        textAlign: align,
        padding: '14px 16px',
        fontFamily: 'var(--font-family-primary)',
        fontSize: 13,
        color: 'var(--color-foreground-primary)',
      }}
    >
      {children}
    </td>
  );
}
