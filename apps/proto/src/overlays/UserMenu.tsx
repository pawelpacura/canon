import { useEffect } from "react";

export function UserMenu({
  onProfile,
  onSettings,
  onLogout,
  onClose,
}: {
  onProfile: () => void;
  onSettings: () => void;
  onLogout: () => void;
  onClose: () => void;
}) {
  useEffect(() => {
    function onPointerDown(event: PointerEvent) {
      const target = event.target;
      if (!(target instanceof Element)) return;
      if (target.closest(".ds-header__user") || target.closest(".proto-user-menu")) {
        return;
      }
      onClose();
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose]);

  return (
    <ul className="ds-multiselect__menu proto-user-menu" role="menu" aria-label="Konto">
      <li
        role="menuitem"
        className="ds-multiselect__option"
        onClick={onProfile}
      >
        Mój profil
      </li>
      <li
        role="menuitem"
        className="ds-multiselect__option"
        onClick={onSettings}
      >
        Ustawienia konta
      </li>
      <li
        role="menuitem"
        className="ds-multiselect__option proto-user-menu__logout"
        onClick={onLogout}
      >
        Wyloguj
      </li>
    </ul>
  );
}
