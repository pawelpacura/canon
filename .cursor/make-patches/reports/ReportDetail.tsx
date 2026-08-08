/**
 * Pojedynczy raport (widok w aplikacji, nie PDF) — Figma Make
 * Copy to: src/app/components/ReportDetail.tsx
 */
import { useState, useEffect } from 'react';
import { Edit } from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { UserMenu, PersonIcon, PercentIcon as SettingsMenuIcon, ChevronForwardIcon } from './UserMenu';
import {
  Button,
  IconButton,
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

interface ReportDetailProps {
  reportName?: string;
  onBack?: () => void;
  onNavigateToTests?: () => void;
  onNavigateToQuestionBank?: () => void;
  onNavigateToReports?: () => void;
  onNavigateToDashboard?: () => void;
}

const CHART_DATA = [
  { day: '1', thisYear: 72, lastYear: 64 },
  { day: '5', thisYear: 76, lastYear: 66 },
  { day: '9', thisYear: 80, lastYear: 70 },
  { day: '13', thisYear: 84, lastYear: 72 },
  { day: '17', thisYear: 88, lastYear: 74 },
  { day: '21', thisYear: 90, lastYear: 78 },
  { day: '25', thisYear: 92, lastYear: 80 },
  { day: '28', thisYear: 94, lastYear: 82 },
];

const PARTICIPANTS = [
  { name: 'Anna Kowalska', status: 'Zaliczony', score: '98%', time: '9 min' },
  { name: 'Piotr Nowak', status: 'Zaliczony', score: '91%', time: '11 min' },
  { name: 'Magda Wiśniewska', status: 'Zaliczony', score: '88%', time: '14 min' },
  { name: 'Tomasz Lewandowski', status: 'Niezaliczony', score: '54%', time: '18 min' },
  { name: 'Kasia Wójcik', status: 'Zaliczony', score: '95%', time: '10 min' },
];

const HARD_QUESTIONS = [
  { q: 'Co należy zrobić przy ewakuacji?', pct: '38% poprawnych' },
  { q: 'Który środek ochrony jest obowiązkowy?', pct: '45% poprawnych' },
  { q: 'Jak zgłosić wypadek w pracy?', pct: '52% poprawnych' },
];

export function ReportDetail({
  reportName = 'BHP — onboarding',
  onBack,
  onNavigateToTests,
  onNavigateToQuestionBank,
  onNavigateToReports,
  onNavigateToDashboard,
}: ReportDetailProps) {
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(() => document.documentElement.dataset.theme === 'dark');

  useEffect(() => {
    document.documentElement.dataset.theme = isDark ? 'dark' : 'light';
  }, [isDark]);

  return (
    <div className="flex flex-col h-screen" style={{ backgroundColor: 'var(--color-background-secondary)' }}>
      <div style={{ position: 'relative' }}>
        <Header
          searchPlaceholder="Szukaj testów..."
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
          <SideNavItem icon={<PercentIcon />} aria-label="Raporty" active onClick={onNavigateToReports} />
          <SideNavItem
            icon={isDark ? <LightModeIcon size={20} /> : <DarkModeIcon size={20} />}
            aria-label={isDark ? 'Włącz tryb jasny' : 'Włącz tryb ciemny'}
            onClick={() => setIsDark((d) => !d)}
            style={{ marginTop: 'auto' }}
          />
        </SideNav>

        <main className="flex-1 overflow-auto">
          <PageHeader
            title={reportName}
            subtitle="Raport testu w aplikacji  ·  ten miesiąc  ·  124 uczestników"
            actions={
              <div className="flex items-center gap-[8px]">
                <Button variant="secondary" onClick={onBack}>
                  Wróć
                </Button>
                <Button variant="primary" onClick={() => console.log('export pdf')}>
                  Eksportuj PDF
                </Button>
              </div>
            }
            style={{ paddingInline: 'var(--spacing-2xl)', paddingTop: 'var(--spacing-l)' }}
          />

          <div className="px-[32px] pb-[32px] flex flex-col gap-[16px]">
            <div className="grid grid-cols-4 gap-[16px]">
              <StatCard label="Uczestnicy" value="124" />
              <StatCard label="Zdawalność" value="94%" />
              <StatCard label="Śr. wynik" value="86%" />
              <StatCard label="Śr. czas" value="12 min" />
            </div>

            <Card style={{ padding: 'var(--spacing-l)' }}>
              <div className="flex items-center justify-between mb-[16px] flex-wrap gap-[12px]">
                <h2 style={sectionTitleStyle}>Zdawalność w czasie</h2>
                <div className="flex items-center gap-[12px] flex-wrap">
                  <Legend color="var(--color-interactive-primary-default)" label="Ten rok" />
                  <Legend color="var(--color-foreground-tertiary)" label="Zeszły rok" dashed />
                  <Select defaultValue="month">
                    <option value="month">Ten miesiąc</option>
                    <option value="90">Ostatnie 90 dni</option>
                  </Select>
                  <Select defaultValue="period">
                    <option value="period">Ten okres</option>
                    <option value="yoy">YoY</option>
                  </Select>
                </div>
              </div>
              <div style={{ width: '100%', height: 220 }}>
                <ResponsiveContainer>
                  <LineChart data={CHART_DATA} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                    <CartesianGrid stroke="var(--color-stroke-subtle)" vertical={false} />
                    <XAxis
                      dataKey="day"
                      tick={{ fill: 'var(--color-foreground-secondary)', fontSize: 12 }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis hide domain={[50, 100]} />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="thisYear"
                      stroke="var(--color-interactive-primary-default)"
                      strokeWidth={2.5}
                      dot={{ r: 3 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="lastYear"
                      stroke="var(--color-foreground-tertiary)"
                      strokeWidth={2}
                      strokeDasharray="6 4"
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </Card>

            <Card style={{ padding: 0, overflow: 'hidden' }}>
              <div className="flex items-center justify-between px-[16px] py-[14px]">
                <h2 style={sectionTitleStyle}>Uczestnicy</h2>
                <span style={{ fontSize: 12, color: 'var(--color-foreground-secondary)' }}>
                  Wyniki w aplikacji — bez eksportu PDF
                </span>
              </div>
              <table className="w-full">
                <thead style={{ background: 'var(--color-background-tertiary)' }}>
                  <tr>
                    <Th>Uczestnik</Th>
                    <Th>Status</Th>
                    <Th>Wynik</Th>
                    <Th>Czas</Th>
                    <Th align="right">Akcje</Th>
                  </tr>
                </thead>
                <tbody>
                  {PARTICIPANTS.map((row) => (
                    <tr key={row.name} style={{ borderTop: '1px solid var(--color-stroke-subtle)' }}>
                      <Td>
                        <span style={{ fontWeight: 500 }}>{row.name}</span>
                      </Td>
                      <Td>
                        <Badge variant={row.status === 'Zaliczony' ? 'brand' : 'error'}>
                          {row.status}
                        </Badge>
                      </Td>
                      <Td>{row.score}</Td>
                      <Td>{row.time}</Td>
                      <Td align="right">
                        <div className="flex items-center justify-end gap-[4px]">
                          <IconButton variant="secondary" aria-label="Podgląd">
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
            </Card>

            <Card style={{ padding: 'var(--spacing-l)' }}>
              <h2 style={{ ...sectionTitleStyle, marginBottom: 12 }}>Najtrudniejsze pytania</h2>
              <div className="flex flex-col gap-[10px]">
                {HARD_QUESTIONS.map((item, i) => (
                  <div key={item.q} className="flex items-center justify-between gap-[16px]">
                    <span style={{ fontSize: 13, color: 'var(--color-foreground-primary)' }}>
                      {i + 1}.  {item.q}
                    </span>
                    <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--color-foreground-secondary)', flexShrink: 0 }}>
                      {item.pct}
                    </span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <Card style={{ padding: 'var(--spacing-l)' }}>
      <p style={{ margin: 0, fontSize: 13, color: 'var(--color-foreground-secondary)' }}>{label}</p>
      <p style={{ margin: '8px 0 0', fontSize: 28, fontWeight: 600, color: 'var(--color-foreground-primary)' }}>
        {value}
      </p>
    </Card>
  );
}

function Legend({ color, label, dashed }: { color: string; label: string; dashed?: boolean }) {
  return (
    <span className="flex items-center gap-[6px]" style={{ fontSize: 12, color: 'var(--color-foreground-secondary)' }}>
      <span style={{ width: 18, height: 0, borderTop: dashed ? `2px dashed ${color}` : `2.5px solid ${color}` }} />
      {label}
    </span>
  );
}

const sectionTitleStyle: React.CSSProperties = {
  margin: 0,
  fontFamily: 'var(--font-family-primary)',
  fontSize: 16,
  fontWeight: 500,
  color: 'var(--color-foreground-primary)',
};

function Th({ children, align = 'left' }: { children: React.ReactNode; align?: 'left' | 'right' }) {
  return (
    <th
      style={{
        textAlign: align,
        padding: '10px 16px',
        fontSize: 12,
        fontWeight: 600,
        color: 'var(--color-foreground-secondary)',
      }}
    >
      {children}
    </th>
  );
}

function Td({ children, align = 'left' }: { children: React.ReactNode; align?: 'left' | 'right' }) {
  return (
    <td style={{ textAlign: align, padding: '12px 16px', fontSize: 13, color: 'var(--color-foreground-primary)' }}>
      {children}
    </td>
  );
}
