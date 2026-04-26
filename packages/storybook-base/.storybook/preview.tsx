import type { Preview } from "@storybook/react-vite";
import type { ReactElement } from "react";

import { withThemeByClassName } from "@storybook/addon-themes";
import "@design-system/styles/global.css";

const preview: Preview = {
  parameters: {
    layout: "fullscreen",
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: "todo",
    },
  },
};

export const decorators = [
  withThemeByClassName({
    themes: {
      light: "",
      dark: "dark",
    },
    defaultTheme: "light",
  }),
  (Story: () => ReactElement) => (
    <div className="flex h-full  flex-col items-center justify-center p-8">
      <Story />
    </div>
  ),
];

export default preview;
