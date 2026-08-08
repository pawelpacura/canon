/**
 * Pulpit (Dashboard) — Figma Make
 * Copy to: src/app/components/Dashboard.tsx
 */
import { useState, useEffect } from 'react';
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
  Banner,
  Link,
  Header,
  SideNav,
  SideNavItem,
  PageHeader,
  HomeIcon,
  ContentPasteSearchIcon,
  LibraryAddCheckIcon,
  PercentIcon,
  createDsIcon,
} from '@pacurap/design-system';

const DarkModeIcon = createDsIcon('DarkModeIcon', [
  { d: 'M480-120q-150 0-255-105T120-480q0-150 105-255t255-105q14 0 27.5 1t26.5 3q-41 29-65.5 75.5T444-660q0 90 63 153t153 63q55 0 101-24.5t75-65.5q2 13 3 26.5t1 27.5q0 150-105 255T480-120Zm0-80q88 0 158-48.5T740-375q-20 6-40 9t-44 3q-123 0-209.5-86.5T360-660q0-24 3-44t9-40q-78 32-126.5 102T197-480q0 119 82 199.5T480-200Zm-10-270Z' },
]);

const LightModeIcon = createDsIcon('LightModeIcon', [
  { d: 'M480-360q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35Zm0 80q-83 0-141.5-58.5T280-480q0-83 58.5-141.5T480-680q83 0 141.5 58.5T680-480q0 83-58.5 141.5T480-280ZM200-440H80v-80h120v80Zm760 0H840v-80h120v80ZM440-760v-120h80v120h-80Zm0 760v-120h80v120h-80ZM256-650l-85-84 57-57 84 85-56 56Zm492 492-85-84 56-56 85 84-56 56Zm-85-556 84-85 57 57-84 85-57-57Zm-563 492 84-85 57 57-85 84-56-56Zm171-284Z' },
]);

const SettingsIcon = createDsIcon('SettingsIcon', [
  { d: 'M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-160q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47Z' },
]);

interface DashboardProps {
  onCreateTest?: () => void;
  onNavigateToTests?: () => void;
  onNavigateToQuestionBank?: () => void;
  onNavigateToReports?: () => void;
}

const CHART_DATA = [
  { day: '1', thisYear: 42, lastYear: 38 },
  { day: '5', thisYear: 48, lastYear: 40 },
  { day: '9', thisYear: 55, lastYear: 44 },
  { day: '13', thisYear: 62, lastYear: 50 },
  { day: '17', thisYear: 70, lastYear: 54 },
  { day: '21', thisYear: 78, lastYear: 60 },
  { day: '25', thisYear: 86, lastYear: 66 },
  { day: '28', thisYear: 94, lastYear: 72 },
];

const RECENT_TESTS = [
  { name: 'Szkolenie BHP — grudzień 2026', type: 'Egzamin', status: 'Aktywny' },
  { name: 'Quiz integracyjny - team building', type: 'Szybki sprawdzian', status: 'Aktywny' },
  { name: 'Quiz - nowe produkty 2026', type: 'Ankieta', status: 'Aktywny' },
  { name: 'Ankieta satysfakcji Q2', type: 'Ankieta', status: 'Aktywny' },
];

const RECENT_QUESTIONS = [
  { text: 'Jakie kanały marketingowe są priorytetowe w 2026?', category: 'Marketing' },
  { text: 'Jak zabezpieczyć hasła w systemach firmowych?', category: 'IT' },
  { text: 'Jakie są główne cele biznesowe na pierwszy kwartał?', category: 'Biznes' },
  { text: 'Które narzędzia są używane w dziale IT?', category: 'IT' },
];

export function Dashboard({
  onCreateTest,
  onNavigateToTests,
  onNavigateToQuestionBank,
  onNavigateToReports,
}: DashboardProps) {
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
          <SideNavItem icon={<HomeIcon />} aria-label="Pulpit" active />
          <SideNavItem icon={<ContentPasteSearchIcon />} aria-label="Testy" onClick={onNavigateToTests} />
          <SideNavItem icon={<LibraryAddCheckIcon />} aria-label="Bank pytań" onClick={onNavigateToQuestionBank} />
          <SideNavItem icon={<PercentIcon />} aria-label="Raporty" onClick={onNavigateToReports} />
          <SideNavItem
            icon={isDark ? <LightModeIcon size={20} /> : <DarkModeIcon size={20} />}
            aria-label={isDark ? 'Włącz tryb jasny' : 'Włącz tryb ciemny'}
            onClick={() => setIsDark((d) => !d)}
            style={{ marginTop: 'auto' }}
          />
        </SideNav>

        <main className="flex-1 overflow-auto">
          <PageHeader
            title="Pulpit"
            subtitle="Przegląd aktywności, statystyk i ostatnich testów"
            actions={
              <div className="flex items-center gap-[8px]">
                <Button variant="primary" onClick={onCreateTest}>
                  Utwórz test
                </Button>
                <IconButton variant="secondary" aria-label="Ustawienia">
                  <SettingsIcon size={20} />
                </IconButton>
              </div>
            }
            style={{ paddingInline: 'var(--spacing-2xl)', paddingTop: 'var(--spacing-l)' }}
          />

          <div className="px-[32px] pb-[32px] flex flex-col gap-[16px]">
            <Banner variant="information">
              Nowość: eksport wyników testów do PDF — dostępny w planie Pro.
            </Banner>

            <div className="grid grid-cols-4 gap-[16px]">
              <StatCard label="Aktywne testy" value="18" />
              <StatCard label="Uczestnicy" value="847" />
              <StatCard label="Średni postęp" value="68%" />
              <StatCard label="Wersje robocze" value="4" />
            </div>

            <Card style={{ padding: 'var(--spacing-l)' }}>
              <div className="flex items-center justify-between mb-[16px] flex-wrap gap-[12px]">
                <h2 style={sectionTitleStyle}>Aktywność uczestników</h2>
                <div className="flex items-center gap-[12px] flex-wrap">
                  <Legend color="var(--color-interactive-primary-default)" label="Ten rok" />
                  <Legend color="var(--color-foreground-tertiary)" label="Zeszły rok" dashed />
                  <Select defaultValue="month">
                    <option value="month">Ten miesiąc</option>
                    <option value="quarter">Ten kwartał</option>
                    <option value="year">Ten rok</option>
                  </Select>
                  <Select defaultValue="active">
                    <option value="active">Aktywni uczestnicy</option>
                    <option value="all">Wszyscy</option>
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
                    <YAxis hide domain={[0, 100]} />
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

            <div className="grid grid-cols-2 gap-[16px]">
              <Card style={{ padding: 0, overflow: 'hidden' }}>
                <div className="flex items-center justify-between px-[16px] py-[14px]">
                  <h2 style={sectionTitleStyle}>Ostatnie testy</h2>
                  <Link href="#" onClick={(e) => { e.preventDefault(); onNavigateToTests?.(); }}>
                    Zobacz wszystkie
                  </Link>
                </div>
                <table className="w-full">
                  <thead style={{ background: 'var(--color-background-tertiary)' }}>
                    <tr>
                      <Th>Nazwa</Th>
                      <Th>Typ</Th>
                      <Th>Status</Th>
                    </tr>
                  </thead>
                  <tbody>
                    {RECENT_TESTS.map((row) => (
                      <tr key={row.name} style={{ borderTop: '1px solid var(--color-stroke-subtle)' }}>
                        <Td>
                          <span style={{ fontWeight: 500 }}>{row.name}</span>
                        </Td>
                        <Td>
                          <Badge variant="neutral">{row.type}</Badge>
                        </Td>
                        <Td>
                          <Badge variant="success">{row.status}</Badge>
                        </Td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Card>

              <Card style={{ padding: 0, overflow: 'hidden' }}>
                <div className="flex items-center justify-between px-[16px] py-[14px]">
                  <h2 style={sectionTitleStyle}>Bank pytań</h2>
                  <Link href="#" onClick={(e) => { e.preventDefault(); onNavigateToQuestionBank?.(); }}>
                    Zobacz wszystkie
                  </Link>
                </div>
                <table className="w-full">
                  <thead style={{ background: 'var(--color-background-tertiary)' }}>
                    <tr>
                      <Th>Pytanie</Th>
                      <Th>Kategoria</Th>
                    </tr>
                  </thead>
                  <tbody>
                    {RECENT_QUESTIONS.map((row) => (
                      <tr key={row.text} style={{ borderTop: '1px solid var(--color-stroke-subtle)' }}>
                        <Td>
                          <span style={{ fontWeight: 500 }}>{row.text}</span>
                        </Td>
                        <Td>
                          <Badge variant="neutral">{row.category}</Badge>
                        </Td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <Card style={{ padding: 'var(--spacing-l)' }}>
      <p
        style={{
          margin: 0,
          fontFamily: 'var(--font-family-primary)',
          fontSize: 13,
          color: 'var(--color-foreground-secondary)',
        }}
      >
        {label}
      </p>
      <p
        style={{
          margin: '8px 0 0',
          fontFamily: 'var(--font-family-primary)',
          fontSize: 28,
          fontWeight: 600,
          color: 'var(--color-foreground-primary)',
        }}
      >
        {value}
      </p>
    </Card>
  );
}

function Legend({ color, label, dashed }: { color: string; label: string; dashed?: boolean }) {
  return (
    <span className="flex items-center gap-[6px]" style={{ fontSize: 12, color: 'var(--color-foreground-secondary)' }}>
      <span
        style={{
          width: 18,
          height: 0,
          borderTop: dashed ? `2px dashed ${color}` : `2.5px solid ${color}`,
        }}
      />
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

function Th({ children }: { children: React.ReactNode }) {
  return (
    <th
      style={{
        textAlign: 'left',
        padding: '10px 16px',
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

function Td({ children }: { children: React.ReactNode }) {
  return (
    <td
      style={{
        padding: '12px 16px',
        fontFamily: 'var(--font-family-primary)',
        fontSize: 13,
        color: 'var(--color-foreground-primary)',
      }}
    >
      {children}
    </td>
  );
}
