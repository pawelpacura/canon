import { Button, Modal } from "@pacurap/design-system";
import type { TestItem } from "../types";

export function ArchiveModal({
  test,
  onClose,
  onConfirm,
}: {
  test: TestItem;
  onClose: () => void;
  onConfirm: () => void;
}) {
  return (
    <div className="ds-modal-scrim" style={{ zIndex: 30 }}>
      <Modal
        title="Archiwizować test?"
        onClose={onClose}
        style={{ width: 400 }}
        footer={
          <>
            <Button variant="secondary" onClick={onClose}>
              Anuluj
            </Button>
            <Button variant="destructive" onClick={onConfirm}>
              Archiwizuj
            </Button>
          </>
        }
      >
        <p style={{ margin: 0 }}>
          {test.title} trafi do archiwum. Uczestnicy nie będą mogli go już
          wypełniać.
        </p>
      </Modal>
    </div>
  );
}
