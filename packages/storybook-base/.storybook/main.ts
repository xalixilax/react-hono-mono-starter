import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  stories: [
    { titlePrefix: "Client Web", directory: "../../../clients/web/src" },
    { titlePrefix: "Auth", directory: "../../../packages/auth/src" },
    { titlePrefix: "Design System", directory: "../../../packages/design-system/src" },
  ],
  addons: [
    "storybook-addon-pseudo-states",
    "storybook-addon-tag-badges",
    "@storybook/addon-themes",
    "@storybook/addon-onboarding",
    "@chromatic-com/storybook",
    "@storybook/addon-docs",
    "@storybook/addon-a11y",
    "@storybook/addon-vitest",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
};

export default config;
