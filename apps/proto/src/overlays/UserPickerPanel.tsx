import { useMemo, useState } from "react";
import {
  Button,
  Checkbox,
  DragIndicatorIcon,
  InputText,
  Panel,
} from "@pacurap/design-system";
import { PARTICIPANTS } from "../mocks/results";

export type DirectoryUser = {
  name: string;
  email: string;
};

export const DIRECTORY_USERS: DirectoryUser[] = PARTICIPANTS.map((person) => ({
  name: person.name,
  email: person.email,
}));

export function UserPickerPanel({
  picked,
  onPicked,
  onClose,
  onConfirm,
}: {
  picked: string[];
  onPicked: (picked: string[]) => void;
  onClose: () => void;
  onConfirm: (emails: string[]) => void;
}) {
  const [query, setQuery] = useState("");
  const [draggingId, setDraggingId] = useState<string | null>(null);

  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return DIRECTORY_USERS;
    return DIRECTORY_USERS.filter(
      (user) =>
        user.name.toLowerCase().includes(needle) ||
        user.email.toLowerCase().includes(needle)
    );
  }, [query]);

  return (
    <Panel
      className="proto-dock__surface proto-wizard__bank"
      title="Lista użytkowników"
      onClose={onClose}
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>
            Anuluj
          </Button>
          <Button
            variant="primary"
            disabled={picked.length === 0}
            onClick={() => onConfirm(picked)}
          >
            Dodaj wybranych
          </Button>
        </>
      }
    >
      <div className="proto-settings__fields">
        <InputText
          label="Szukaj użytkowników"
          placeholder="Wpisz imię, nazwisko lub email..."
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <div>
          <p className="proto-wizard__bank-count">
            Dostępni użytkownicy ({visible.length})
          </p>
          <p className="proto-wizard__bank-hint">
            Zaznacz osoby albo przeciągnij je do listy odbiorców
          </p>
        </div>
        {visible.map((user) => (
          <div
            key={user.email}
            className={
              draggingId === user.email
                ? "proto-wizard__bank-row proto-wizard__bank-row--dragging"
                : "proto-wizard__bank-row"
            }
            draggable
            onDragStart={(event) => {
              if ((event.target as HTMLElement).closest("input")) {
                event.preventDefault();
                return;
              }
              event.dataTransfer.setData(
                "application/x-directory-user",
                user.email
              );
              event.dataTransfer.effectAllowed = "copy";
              event.dataTransfer.setDragImage(event.currentTarget, 24, 24);
              setDraggingId(user.email);
            }}
            onDragEnd={() => setDraggingId(null)}
          >
            <span
              className="proto-drag"
              role="button"
              tabIndex={0}
              aria-label={`Przeciągnij ${user.name}`}
            >
              <DragIndicatorIcon aria-hidden />
            </span>
            <Checkbox
              checked={picked.includes(user.email)}
              onChange={(event) => {
                const on = event.currentTarget.checked;
                onPicked(
                  on
                    ? [...picked, user.email]
                    : picked.filter((email) => email !== user.email)
                );
              }}
              label={
                <span className="proto-wizard__bank-copy">
                  <strong>{user.name}</strong>
                  <small>{user.email}</small>
                </span>
              }
            />
          </div>
        ))}
      </div>
    </Panel>
  );
}
