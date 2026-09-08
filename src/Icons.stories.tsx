import type { Meta, StoryObj } from "@storybook/react";
import { IconButton } from "./IconButton";
import { PageHeader } from "./PageHeader";
import { Button } from "./Button";
import {
  Add2Icon,
  AddIcon,
  ArticleIcon,
  BorderAllIcon,
  CalendarMonthIcon,
  ChevronBackIcon,
  ChevronForwardIcon,
  ClockLoader40Icon,
  CloseIcon,
  CheckIcon,
  DeleteIcon,
  ContentPasteSearchIcon,
  DarkModeIcon,
  DataTableIcon,
  DragIndicatorIcon,
  EditIcon,
  ElectricBoltIcon,
  GridOnIcon,
  GridViewIcon,
  GroupIcon,
  HomeIcon,
  KeyboardArrowDownIcon,
  LeftPanelCloseIcon,
  LibraryAddCheckIcon,
  ListIcon,
  MoreVertIcon,
  NewsstandIcon,
  PercentIcon,
  PersonIcon,
  ScheduleIcon,
  SearchIcon,
  SelectIcon,
  SettingsIcon,
  VisibilityIcon,
} from "./icons";

const ICONS = [
  { name: "HomeIcon", node: <HomeIcon />, use: "Pulpit" },
  { name: "SearchIcon", node: <SearchIcon />, use: "Szukaj testów…" },
  { name: "PersonIcon", node: <PersonIcon />, use: "Jan Kowalski" },
  { name: "AddIcon", node: <AddIcon />, use: "Dodaj pytanie" },
  { name: "Add2Icon", node: <Add2Icon />, use: "Utwórz test" },
  { name: "ArticleIcon", node: <ArticleIcon />, use: "Utwórz z pliku" },
  { name: "LibraryAddCheckIcon", node: <LibraryAddCheckIcon />, use: "Egzamin" },
  { name: "ListIcon", node: <ListIcon />, use: "Ankieta" },
  { name: "ElectricBoltIcon", node: <ElectricBoltIcon />, use: "Szybki sprawdzian" },
  { name: "VisibilityIcon", node: <VisibilityIcon />, use: "Podgląd" },
  { name: "EditIcon", node: <EditIcon />, use: "Edytuj" },
  { name: "SettingsIcon", node: <SettingsIcon />, use: "Ustawienia" },
  { name: "NewsstandIcon", node: <NewsstandIcon />, use: "Bank pytań" },
  { name: "ClockLoader40Icon", node: <ClockLoader40Icon />, use: "Raporty" },
  { name: "ContentPasteSearchIcon", node: <ContentPasteSearchIcon />, use: "Testy" },
  { name: "GroupIcon", node: <GroupIcon />, use: "Odbiorcy" },
  { name: "ScheduleIcon", node: <ScheduleIcon />, use: "Godzina" },
  { name: "CalendarMonthIcon", node: <CalendarMonthIcon />, use: "Data" },
  { name: "KeyboardArrowDownIcon", node: <KeyboardArrowDownIcon />, use: "Select" },
  { name: "ChevronForwardIcon", node: <ChevronForwardIcon />, use: "Dalej" },
  { name: "ChevronBackIcon", node: <ChevronBackIcon />, use: "Wstecz" },
  { name: "CloseIcon", node: <CloseIcon />, use: "Zamknij" },
  { name: "CheckIcon", node: <CheckIcon />, use: "Zapisz pytanie" },
  { name: "DeleteIcon", node: <DeleteIcon />, use: "Usuń pytanie" },
  { name: "DragIndicatorIcon", node: <DragIndicatorIcon />, use: "Przeciągnij" },
  { name: "MoreVertIcon", node: <MoreVertIcon />, use: "Więcej" },
  { name: "SelectIcon", node: <SelectIcon />, use: "Wybierz z listy" },
  { name: "GridViewIcon", node: <GridViewIcon />, use: "Widok siatki" },
  { name: "GridOnIcon", node: <GridOnIcon />, use: "Widok kafelków" },
  { name: "DataTableIcon", node: <DataTableIcon />, use: "Widok tabeli" },
  { name: "BorderAllIcon", node: <BorderAllIcon />, use: "Widok listy" },
  { name: "PercentIcon", node: <PercentIcon />, use: "Zdawalność" },
  { name: "DarkModeIcon", node: <DarkModeIcon />, use: "Tryb ciemny" },
  { name: "LeftPanelCloseIcon", node: <LeftPanelCloseIcon />, use: "Zwiń menu" },
] as const;

const meta = {
  title: "Components/Icons",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Material Symbols Outlined, weight 300. Import `{Name}Icon` z `@pacurap/design-system`.",
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Gallery: Story = {
  render: () => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
        gap: "var(--spacing-l)",
      }}
    >
      {ICONS.map((icon) => (
        <div
          key={icon.name}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "var(--spacing-s)",
            color: "var(--color-foreground-primary)",
          }}
        >
          <div
            style={{
              width: 40,
              height: 40,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "var(--color-background-secondary)",
              borderRadius: "var(--radius-m)",
            }}
          >
            {icon.node}
          </div>
          <strong style={{ fontSize: "var(--font-size-xs)" }}>{icon.name}</strong>
          <span
            style={{
              fontSize: "var(--font-size-xs)",
              color: "var(--color-foreground-secondary)",
            }}
          >
            {icon.use}
          </span>
        </div>
      ))}
    </div>
  ),
};

export const InProduct: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "var(--spacing-xl)",
      }}
    >
      <PageHeader
        title="Pulpit"
        subtitle="Przegląd aktywności, statystyk i ostatnich testów"
        actions={
          <div style={{ display: "flex", gap: "var(--spacing-s)" }}>
            <Button variant="primary" icon>
              Utwórz test
            </Button>
            <IconButton variant="tertiary" aria-label="Ustawienia">
              <SettingsIcon />
            </IconButton>
          </div>
        }
      />
      <div style={{ display: "flex", gap: "var(--spacing-s)" }}>
        <IconButton variant="tertiary" aria-label="Edytuj pytanie">
          <EditIcon />
        </IconButton>
        <IconButton variant="tertiary" aria-label="Podgląd pytania">
          <VisibilityIcon />
        </IconButton>
      </div>
    </div>
  ),
};
