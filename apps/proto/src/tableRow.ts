import type { KeyboardEvent, MouseEvent } from "react";

export function interactiveRow(onOpen: () => void) {
  return {
    className: "proto-table-row",
    tabIndex: 0 as const,
    onClick: onOpen,
    onKeyDown: (event: KeyboardEvent<HTMLDivElement>) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        onOpen();
      }
    },
  };
}

export function stopRowClick(onClick?: () => void) {
  return (event: MouseEvent) => {
    event.stopPropagation();
    onClick?.();
  };
}
