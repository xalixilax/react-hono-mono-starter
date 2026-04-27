import type { Meta } from "@storybook/react-vite";

import { Button } from "./button";

const meta = {
  component: Button,
  title: "Button",
} satisfies Meta<typeof Button>;

// oxlint-disable-next-line import/no-default-export
export default meta;

export const Primary = {
  args: {
    variant: "primary",
    children: "Primary Button",
  },
};
