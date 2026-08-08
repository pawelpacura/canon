# Prompty do Make AI — Dashboard + Raporty

Folder z kodem: `.cursor/make-patches/reports/`

**Zasada:** każda tabela musi być w `<Card style={{ padding: 0, overflow: 'hidden' }}>…</Card>`.  
Komponenty tylko z `@pacurap/design-system` (+ `recharts`, `lucide-react` Edit, lokalny `UserMenu`).

Wklejaj **po kolei** (1 → 2 → 3 → 4). Do każdego promptu **załącz odpowiedni plik `.tsx`**.

---

## Prompt 1 — Dashboard

```
Utwórz plik src/app/components/Dashboard.tsx dokładnie według załączonego Dashboard.tsx.

Wymagania:
- Shell: Header + SideNav + PageHeader (jak TestsDashboard)
- SideNav: Pulpit active; Testy / Bank pytań / Raporty z onClick props
- Banner information: "Nowość: eksport wyników testów do PDF — dostępny w planie Pro."
- 4× Stat Card (Aktywne testy 18, Uczestnicy 847, Średni postęp 68%, Wersje robocze 4)
- Card z wykresem LineChart (recharts): "Aktywność uczestników", legenda Ten rok / Zeszły rok, 2× Select
- 2 Card z tabelami: "Ostatnie testy" i "Bank pytań" — tabele WEWNĄTRZ Card (padding 0)
- Link "Zobacz wszystkie" z DS Link
- props: onCreateTest, onNavigateToTests, onNavigateToQuestionBank, onNavigateToReports
Nie dodawaj backendu ani głębokich interakcji.
```

Załącz: `Dashboard.tsx`

---

## Prompt 2 — Raporty (listing)

```
Utwórz / nadpisz src/app/components/Reports.tsx dokładnie według załączonego Reports.tsx.

WAŻNE: tabela MUSI być owinięta w <Card style={{ padding: 0, overflow: 'hidden' }}> — nie goła tabela.

- PageHeader tabs: Raporty testów | Niestandardowe
- Subtitle: "Każdy test ma domyślny raport. Zaawansowane raporty tworzysz w kreatorze."
- CTA "Generuj raport" tylko na tabie Niestandardowe (console.log)
- Filtry: InputText + Select
- Tab tests: kolumny Nazwa, Typ (Badge), Uczestnicy, Zdawalność, Akcje
- Tab custom: Nazwa, Zakres (Badge), Okres, Format, Akcje
- Ikona oka → onOpenReport(name)
- props: onNavigateToDashboard, onNavigateToTests, onNavigateToQuestionBank, onOpenReport
```

Załącz: `Reports.tsx`

---

## Prompt 3 — Pojedynczy raport

```
Utwórz plik src/app/components/ReportDetail.tsx dokładnie według załączonego ReportDetail.tsx.

- PageHeader: tytuł raportu (np. BHP — onboarding), subtitle z metadanymi
- Actions: Wróć (secondary) + Eksportuj PDF (primary)
- 4× Stat Card: Uczestnicy, Zdawalność, Śr. wynik, Śr. czas
- Card wykres "Zdawalność w czasie" (recharts)
- Card z tabelą Uczestnicy (status Badge, wynik, czas, akcje) — tabela W Card
- Card "Najtrudniejsze pytania"
- props: reportName, onBack, onNavigateTo*
Bez kreatora / modali.
```

Załącz: `ReportDetail.tsx`

---

## Prompt 4 — Podpięcie w App.tsx

```
Zaktualizuj App.tsx (NIE kasuj istniejących widoków Testy / Bank / Wizard).

1) Import Dashboard, Reports, ReportDetail
2) Rozszerz view o: 'dashboardHome' | 'reports' | 'reportDetail'
   (albo zamień obecny start na Dashboard zamiast TestsDashboard — jak wolisz;
    jeśli zostawiasz TestsDashboard jako listę testów, dodaj osobny 'dashboardHome')

Rekomendacja (prosta):
- view: 'home' | 'tests' | 'create' | 'edit' | 'questionBank' | 'reports' | 'reportDetail'
- start: 'home' → <Dashboard ... />
- SideNav Pulpit → home
- SideNav Testy → tests (obecny TestsDashboard)
- SideNav Raporty → reports
- Reports onOpenReport → reportDetail z nazwą
- ReportDetail onBack → reports

Przekaż nawigację do wszystkich SideNav.
Patrz przykład scalania: App.wiring.example.tsx
```

Załącz: `App.wiring.example.tsx` (jako referencja, nie nadpisuj całego App)

---

## Szybki checklist po Make

- [ ] Każda tabela w `Card`
- [ ] Dashboard: banner + 4 KPI + chart + 2 tabele
- [ ] Raporty: 2 taby, Card wokół tabeli
- [ ] ReportDetail: KPI + chart + uczestnicy + trudne pytania
- [ ] Nawigacja SideNav działa między widokami
