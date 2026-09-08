import { useState, type FormEvent } from "react";
import {
  Banner,
  Button,
  Card,
  Checkbox,
  InputText,
  Link,
  Logo,
} from "@pacurap/design-system";
import type { AuthRoute } from "../types";

const MOCK_EMAIL = "jan.kowalski@firma.pl";

export function AuthPage({
  screen,
  onScreen,
  onEnter,
}: {
  screen: AuthRoute;
  onScreen: (screen: AuthRoute) => void;
  onEnter: () => void;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [terms, setTerms] = useState(false);

  const displayEmail = email.trim() || MOCK_EMAIL;

  function go(next: AuthRoute) {
    return (event: { preventDefault(): void }) => {
      event.preventDefault();
      onScreen(next);
    };
  }

  function submitLogin(event: FormEvent) {
    event.preventDefault();
    onEnter();
  }

  function submitRegister(event: FormEvent) {
    event.preventDefault();
    onScreen("verify");
  }

  function submitReset(event: FormEvent) {
    event.preventDefault();
    onScreen("reset-sent");
  }

  return (
    <div className="proto-auth">
      <div className="proto-auth__glow" aria-hidden />
      {screen === "login" ? (
        <Card className="proto-auth__card">
          <Logo />
          <div className="proto-auth__heading proto-auth__heading--ruled">
            <h1 className="proto-auth__title">Zaloguj się</h1>
            <p className="proto-auth__lead">Witaj ponownie w Testonaut.</p>
          </div>
          <form className="proto-auth__form" onSubmit={submitLogin}>
            <InputText
              label="Email służbowy"
              type="email"
              placeholder="Email służbowy"
              autoComplete="username"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <InputText
              label="Hasło"
              type="password"
              placeholder="Hasło"
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <Link href="#reset" onClick={go("reset")}>
              Zapomniałeś hasła?
            </Link>
            <Button type="submit" variant="primary" className="proto-auth__submit">
              Zaloguj się
            </Button>
          </form>
          <p className="proto-auth__footer">
            Nie masz konta?{" "}
            <Link href="#register" onClick={go("register")}>
              Zarejestruj się
            </Link>
          </p>
        </Card>
      ) : null}

      {screen === "register" ? (
        <Card className="proto-auth__card">
          <Logo />
          <div className="proto-auth__heading">
            <h1 className="proto-auth__title">Utwórz konto</h1>
            <p className="proto-auth__lead">Dołącz do organizacji w Testonaut.</p>
          </div>
          <form className="proto-auth__form" onSubmit={submitRegister}>
            <InputText
              label="Imię i nazwisko"
              placeholder="Imię i nazwisko"
              autoComplete="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
            <InputText
              label="Email służbowy"
              type="email"
              placeholder="Email służbowy"
              autoComplete="username"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <InputText
              label="Hasło"
              type="password"
              placeholder="Hasło"
              autoComplete="new-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <InputText
              label="Potwierdź hasło"
              type="password"
              placeholder="Potwierdź hasło"
              autoComplete="new-password"
              value={confirm}
              onChange={(event) => setConfirm(event.target.value)}
            />
            <Checkbox
              checked={terms}
              onChange={(event) => setTerms(event.target.checked)}
              label="Akceptuję regulamin i politykę prywatności"
            />
            <Button type="submit" variant="primary" className="proto-auth__submit">
              Zarejestruj się
            </Button>
          </form>
          <p className="proto-auth__footer">
            Masz już konto?{" "}
            <Link href="#login" onClick={go("login")}>
              Zaloguj się
            </Link>
          </p>
        </Card>
      ) : null}

      {screen === "reset" ? (
        <Card className="proto-auth__card">
          <Logo />
          <div className="proto-auth__heading">
            <h1 className="proto-auth__title">Reset hasła</h1>
            <p className="proto-auth__lead">
              Podaj email powiązany z kontem. Wyślemy link do ustawienia nowego
              hasła.
            </p>
          </div>
          <form className="proto-auth__form" onSubmit={submitReset}>
            <InputText
              label="Email służbowy"
              type="email"
              placeholder="Email służbowy"
              autoComplete="username"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <Button type="submit" variant="primary" className="proto-auth__submit">
              Wyślij link resetujący
            </Button>
          </form>
          <p className="proto-auth__footer">
            Pamiętasz hasło?{" "}
            <Link href="#login" onClick={go("login")}>
              Zaloguj się
            </Link>
          </p>
        </Card>
      ) : null}

      {screen === "reset-sent" ? (
        <Card className="proto-auth__card">
          <Logo />
          <div className="proto-auth__heading">
            <h1 className="proto-auth__title">Sprawdź skrzynkę</h1>
            <p className="proto-auth__lead">
              Jeśli konto istnieje, wysłaliśmy instrukcję resetu hasła.
            </p>
          </div>
          <Banner>
            Link jest ważny 60 minut. Sprawdź też folder spam.
          </Banner>
          <Button
            variant="primary"
            className="proto-auth__submit"
            onClick={() => onScreen("login")}
          >
            Wróć do logowania
          </Button>
          <p className="proto-auth__footer">
            Nie dotarł email?{" "}
            <Link href="#reset" onClick={go("reset")}>
              Wyślij ponownie
            </Link>
          </p>
        </Card>
      ) : null}

      {screen === "verify" ? (
        <Card className="proto-auth__card">
          <Logo />
          <div className="proto-auth__heading">
            <h1 className="proto-auth__title">Potwierdź adres email</h1>
            <p className="proto-auth__lead">
              Wysłaliśmy link aktywacyjny na {displayEmail}
            </p>
          </div>
          <Banner>
            Konto będzie aktywne po kliknięciu linku w wiadomości.
          </Banner>
          <Button
            variant="primary"
            className="proto-auth__submit"
            onClick={() => onScreen("login")}
          >
            Otwórz skrzynkę
          </Button>
          <p className="proto-auth__footer">
            Zły adres?{" "}
            <Link href="#register" onClick={go("register")}>
              Zmień email
            </Link>
          </p>
        </Card>
      ) : null}
    </div>
  );
}
