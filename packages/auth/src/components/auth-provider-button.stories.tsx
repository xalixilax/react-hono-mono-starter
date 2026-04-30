import type { Meta, StoryObj } from "@storybook/react-vite";

import authEn from "../../../i18n/src/locales/en/auth";
import { AuthProviderButton } from "./auth-provider-button";

function createProviderLabel(provider: string) {
  return authEn.AUTH_PROVIDER_BUTTON.replace("{{action}}", authEn.AUTH_ACTION_SIGN_IN).replace(
    "{{provider}}",
    provider,
  );
}

const meta = {
  component: AuthProviderButton,
  title: "Components/AuthProviderButton",
  args: {
    provider: "google",
    label: createProviderLabel(authEn.AUTH_PROVIDER_GOOGLE),
    onSignIn: async () => {},
    isLoading: false,
  },
  argTypes: {
    provider: {
      control: "select",
      options: ["google", "github", "microsoft", "apple", "discord", "facebook"],
    },
  },
} satisfies Meta<typeof AuthProviderButton>;

// oxlint-disable-next-line import/no-default-export
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const GitHub: Story = {
  args: {
    provider: "github",
    label: createProviderLabel(authEn.AUTH_PROVIDER_GITHUB),
  },
};

export const Loading: Story = {
  args: {
    isLoading: true,
  },
};
