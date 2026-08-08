import { useEffect } from "react";
import type { Decorator, Preview } from "@storybook/react";
import "../src/tokens.css";
import "../src/components.css";

const canvasDecorator: Decorator = (Story, { globals }) => {
  const theme = (globals.theme as string) ?? "light";

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    document.body.style.margin = "0";
    document.body.style.minHeight = "100vh";
    document.body.style.background = "var(--color-background-secondary)";
  }, [theme]);

  return (
    <div
      style={{
        minHeight: "100dvh",
        width: "100%",
        boxSizing: "border-box",
        padding: "var(--spacing-2xl)",
        background: "var(--color-background-secondary)",
        fontFamily: "var(--font-family-primary)",
      }}
    >
      <Story />
    </div>
  );
};

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    layout: "centered",
    options: {
      storySort: {
        order: ["Screens", "Components"],
        method: "alphabetical",
      },
    },
  },
  globalTypes: {
    theme: {
      description: "Light / Dark theme (Figma Semantic collection)",
      toolbar: {
        title: "Theme",
        icon: "circlehollow",
        items: [
          { value: "light", title: "Light" },
          { value: "dark", title: "Dark" },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    theme: "light",
  },
  decorators: [canvasDecorator],
};

export default preview;
