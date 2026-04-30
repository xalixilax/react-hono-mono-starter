import type { Meta, StoryObj } from "@storybook/react-vite";

import authEn from "../../../i18n/src/locales/en/auth";
import { SignUpForm } from "./sign-up-form";

const signUpCopy = {
  title: authEn.AUTH_FORM_SIGN_UP_TITLE,
  description: authEn.AUTH_FORM_SIGN_UP_DESCRIPTION,
  nameLabel: authEn.AUTH_NAME_LABEL,
  namePlaceholder: authEn.AUTH_NAME_PLACEHOLDER,
  emailLabel: authEn.AUTH_EMAIL_LABEL,
  emailPlaceholder: authEn.AUTH_EMAIL_PLACEHOLDER,
  passwordLabel: authEn.AUTH_PASSWORD_LABEL,
  passwordPlaceholder: authEn.AUTH_PASSWORD_PLACEHOLDER,
  confirmPasswordLabel: authEn.AUTH_CONFIRM_PASSWORD_LABEL,
  confirmPasswordPlaceholder: authEn.AUTH_PASSWORD_PLACEHOLDER,
  validationPasswordMismatch: authEn.AUTH_PASSWORD_MISMATCH,
  validationPasswordLength: authEn.AUTH_PASSWORD_LENGTH,
  submitIdleLabel: authEn.AUTH_SUBMIT_SIGN_UP_IDLE,
  submitLoadingLabel: authEn.AUTH_SUBMIT_SIGN_UP_LOADING,
  switchPrompt: authEn.AUTH_SIGN_UP_SWITCH_PROMPT,
  switchActionLabel: authEn.AUTH_SIGN_UP_SWITCH_ACTION,
};

const meta = {
  component: SignUpForm,
  title: "Components/SignUpForm",
  parameters: {
    layout: "centered",
  },
  args: {
    copy: signUpCopy,
    onSubmit: async () => {},
    onSignInClick: () => {},
    isLoading: false,
  },
} satisfies Meta<typeof SignUpForm>;

// oxlint-disable-next-line import/no-default-export
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Loading: Story = {
  args: {
    isLoading: true,
  },
};

export const WithServerError: Story = {
  args: {
    error: authEn.AUTH_ERROR_DEMO_ACCOUNT,
  },
};
