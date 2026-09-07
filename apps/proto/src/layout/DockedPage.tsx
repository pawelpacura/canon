import { type CSSProperties, type ReactNode } from "react";

export const DOCK_MIN = 320;
export const STAGE_MIN = 280;

export function DockedPage({
  open,
  resizing,
  width,
  children,
  panel,
}: {
  open: boolean;
  resizing: boolean;
  width: number;
  children: ReactNode;
  panel: ReactNode;
}) {
  return (
    <div
      className={[
        "proto-dock",
        open ? "proto-dock--open" : "",
        resizing ? "proto-dock--resizing" : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="proto-dock__stage">{children}</div>
      <div
        className="proto-dock__slot"
        style={{ "--proto-dock-width": `${width}px` } as CSSProperties}
        inert={!open || undefined}
        aria-hidden={!open}
      >
        {panel}
      </div>
    </div>
  );
}

export function DockResizeHandle({
  width,
  onWidth,
  onResizing,
  label,
}: {
  width: number;
  onWidth: (width: number) => void;
  onResizing: (resizing: boolean) => void;
  label: string;
}) {
  function clampWidth(next: number, max: number) {
    return Math.round(Math.min(max, Math.max(DOCK_MIN, next)));
  }

  function maxWidthFrom(target: EventTarget | null) {
    const page =
      target instanceof Element
        ? target.closest(".proto-dock")
        : document.querySelector(".proto-dock");
    return Math.max(DOCK_MIN, (page?.clientWidth ?? 800) - STAGE_MIN);
  }

  function onResizePointerDown(event: React.PointerEvent<HTMLDivElement>) {
    event.preventDefault();
    const start = {
      x: event.clientX,
      w: width,
      max: maxWidthFrom(event.currentTarget),
    };
    onResizing(true);

    function move(next: PointerEvent) {
      onWidth(clampWidth(start.w + start.x - next.clientX, start.max));
    }

    function up() {
      onResizing(false);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    }

    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
  }

  return (
    <div
      className="proto-dock__resize"
      role="separator"
      aria-orientation="vertical"
      aria-label={label}
      aria-valuenow={width}
      aria-valuemin={DOCK_MIN}
      tabIndex={0}
      onPointerDown={onResizePointerDown}
      onKeyDown={(event) => {
        const max = maxWidthFrom(event.currentTarget);
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          onWidth(clampWidth(width + 16, max));
        }
        if (event.key === "ArrowRight") {
          event.preventDefault();
          onWidth(clampWidth(width - 16, max));
        }
      }}
    />
  );
}
