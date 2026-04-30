import type { Meta, StoryObj } from "@storybook/react-vite";
import type { ChangeEvent } from "react";

import { Button } from "@design-system/components/ui/button";

import authEn from "../../../i18n/src/locales/en/auth";
import { AuthFormCard, AuthTextField } from "./auth-form-parts";

const noopChange = (_event: ChangeEvent<HTMLInputElement>) => {};

const copy = {
  cardTitle: "Reset password",
  cardDescription: "Use the shared card wrapper to keep auth forms visually consistent across flows.",
  cardSubmit: "Send recovery link",
  errorTitle: "Check your details",
  errorDescription: "The shared error surface is rendered above the fields and below the header.",
  errorMessage: "This email is not allowed in the preview environment.",
  retryLabel: "Try again",
} as const;

const meta = {
  component: AuthFormCard,
  title: "Components/AuthFormParts",
  subcomponents: { AuthTextField },
  parameters: {
    layout: "centered",
  },
  args: {
    title: "",
    description: "",
    footer: <></>,
    children: null,
    onSubmit: async () => {},
  },
} satisfies Meta<typeof AuthFormCard>;

// oxlint-disable-next-line import/no-default-export
export default meta;

type Story = StoryObj<typeof meta>;

export const Card: Story = {
  render: () => (
    <div className="w-104 max-w-full">
      <AuthFormCard
        title={copy.cardTitle}
        description={copy.cardDescription}
        onSubmit={async (event) => event.preventDefault()}
        footer={
          <Button type="submit" className="w-full">
            {copy.cardSubmit}
          </Button>
        }
      >
        <AuthTextField
          id="recovery-email"
          label={authEn.AUTH_EMAIL_LABEL}
          placeholder={authEn.AUTH_EMAIL_PLACEHOLDER}
          type="email"
          value=""
          onChange={noopChange}
        />
      </AuthFormCard>
    </div>
  ),
};

export const TextField: Story = {
  render: () => (
    <div className="w-88 max-w-full rounded-3xl border border-black/10 bg-white p-5">
      <AuthTextField
        id="storybook-email"
        label={authEn.AUTH_EMAIL_LABEL}
        placeholder={authEn.AUTH_EMAIL_PLACEHOLDER}
        type="email"
        value="designer@studio.dev"
        onChange={noopChange}
      />
    </div>
  ),
};

export const ErrorCard: Story = {
  render: () => (
    <div className="w-104 max-w-full">
      <AuthFormCard
        title={copy.errorTitle}
        description={copy.errorDescription}
        error={copy.errorMessage}
        onSubmit={async (event) => event.preventDefault()}
        footer={
          <Button type="submit" className="w-full">
            {copy.retryLabel}
          </Button>
        }
      >
        <AuthTextField
          id="error-email"
          label={authEn.AUTH_EMAIL_LABEL}
          placeholder={authEn.AUTH_EMAIL_PLACEHOLDER}
          type="email"
          value="blocked@example.com"
          ariaInvalid
          onChange={noopChange}
        />
      </AuthFormCard>
    </div>
  ),
};
