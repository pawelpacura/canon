import { Button, Panel } from "@pacurap/design-system";
import type { TestItem } from "../types";

export function MorePanel({
  test,
  onClose,
  onPreview,
  onResults,
  onArchive,
}: {
  test: TestItem;
  onClose: () => void;
  onPreview: () => void;
  onResults: () => void;
  onArchive: () => void;
}) {
  return (
    <div
      className="ds-modal-scrim"
      style={{ zIndex: 20, justifyContent: "flex-end", alignItems: "stretch" }}
      onClick={onClose}
    >
      <Panel
        title={test.title}
        onClose={onClose}
        showFooter={false}
        onClick={(event) => event.stopPropagation()}
        style={{ height: "100%" }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "var(--spacing-s)",
          }}
        >
          <Button variant="secondary" onClick={onPreview}>
            Podgląd
          </Button>
          <Button variant="secondary" onClick={onResults}>
            Wyniki
          </Button>
          {test.status !== "archive" ? (
            <Button variant="destructive" onClick={onArchive}>
              Archiwizuj
            </Button>
          ) : null}
        </div>
      </Panel>
    </div>
  );
}
