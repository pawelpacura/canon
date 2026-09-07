import { useState } from "react";
import {
  Accordion,
  Avatar,
  Banner,
  Button,
  Card,
  InputText,
  Label,
  PageHeader,
  Select,
  Switcher,
} from "@pacurap/design-system";

export function SettingsPage({
  section,
}: {
  section: "profile" | "account";
}) {
  const [prefsOpen, setPrefsOpen] = useState(true);
  const [notesOpen, setNotesOpen] = useState(false);
  const [securityOpen, setSecurityOpen] = useState(false);
  const [orgOpen, setOrgOpen] = useState(false);

  if (section === "profile") {
    return (
      <>
        <PageHeader
          title="Mój profil"
          subtitle="Edytuj dane widoczne dla współpracowników w organizacji."
          actions={<Button variant="primary">Zapisz zmiany</Button>}
        />
        <Card className="proto-edit__stack">
          <Banner>
            Te informacje są widoczne dla innych użytkowników Testonaut w
            Twojej organizacji.
          </Banner>
          <Accordion title="Zdjęcie profilowe" expanded>
            <div className="proto-avatar-settings">
              <Avatar />
              <div className="proto-avatar-settings__copy">
                <p className="proto-avatar-settings__hint">
                  Zdjęcie pojawia się przy Twoim imieniu w nagłówku i na listach
                  w organizacji.
                </p>
                <div className="proto-avatar-settings__actions">
                  <Button variant="secondary">Zmień zdjęcie</Button>
                  <Button variant="destructive">Usuń zdjęcie</Button>
                </div>
              </div>
            </div>
          </Accordion>
          <Accordion title="Dane osobowe" expanded>
            <div className="proto-edit__fields">
              <InputText label="Imię i nazwisko" defaultValue="Jan Kowalski" />
              <InputText
                label="Email służbowy"
                defaultValue="jan.kowalski@firma.pl"
                disabled
              />
              <InputText
                label="Stanowisko"
                defaultValue="Koordynator szkoleń"
              />
            </div>
          </Accordion>
        </Card>
      </>
    );
  }

  return (
    <>
      <PageHeader
        title="Ustawienia konta"
        subtitle="Preferencje aplikacji, powiadomienia i bezpieczeństwo."
        actions={<Button variant="primary">Zapisz zmiany</Button>}
      />
      <Card className="proto-edit__stack">
        <Banner>
          Zmiany w ustawieniach bezpieczeństwa mogą wymagać ponownego logowania.
        </Banner>
        <div className="proto-settings__fields">
          <Accordion
            title="Preferencje aplikacji"
            expanded={prefsOpen}
            onToggle={setPrefsOpen}
          >
            <div className="proto-edit__fields">
              <InputText label="Język interfejsu" defaultValue="Polski" />
              <div className="proto-edit__field">
                <Label htmlFor="settings-template">Powiązany szablon</Label>
                <Select
                  id="settings-template"
                  disabled
                  defaultValue=""
                  aria-label="Powiązany szablon"
                >
                  <option value="">Wybierz szablon</option>
                </Select>
              </div>
              <InputText
                label="Strefa czasowa"
                defaultValue="Europe/Warsaw (UTC+1)"
              />
              <InputText label="Motyw" defaultValue="Jasny" />
            </div>
          </Accordion>
          <Accordion
            title="Powiadomienia"
            expanded={notesOpen}
            onToggle={setNotesOpen}
          >
            <div className="proto-settings__fields">
              <Switcher label="Nowe wyniki testów" defaultChecked />
              <Switcher label="Przypomnienia o terminach" defaultChecked />
              <Switcher label="Cotygodniowe podsumowanie aktywności" />
            </div>
          </Accordion>
          <Accordion
            title="Bezpieczeństwo konta"
            expanded={securityOpen}
            onToggle={setSecurityOpen}
          >
            <div className="proto-settings__fields">
              <InputText
                label="Ostatnia zmiana hasła"
                defaultValue="14.01.2026"
                disabled
              />
              <Button variant="secondary">Zmień hasło</Button>
              <Switcher label="Weryfikacja dwuetapowa (2FA)" />
              <Switcher label="Automatyczne wylogowanie po 30 min" />
            </div>
          </Accordion>
          <Accordion
            title="Organizacja i uprawnienia"
            expanded={orgOpen}
            onToggle={setOrgOpen}
          >
            <div className="proto-settings__fields">
              <InputText
                label="Nazwa organizacji"
                defaultValue="Acme Sp. z o.o."
                disabled
              />
              <InputText label="Twoja rola" defaultValue="Administrator" disabled />
              <InputText label="Domyślny dział" defaultValue="HR / Szkolenia" />
            </div>
          </Accordion>
        </div>
      </Card>
    </>
  );
}
