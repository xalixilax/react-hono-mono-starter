import type { Meta, StoryObj } from "@storybook/react-vite";

import authEn from "../../../i18n/src/locales/en/auth";
import { SignInForm } from "./sign-in-form";

const signInCopy = {
  title: authEn.AUTH_FORM_SIGN_IN_TITLE,
  description: authEn.AUTH_FORM_SIGN_IN_DESCRIPTION,
  emailLabel: authEn.AUTH_EMAIL_LABEL,
  emailPlaceholder: authEn.AUTH_EMAIL_PLACEHOLDER,
  passwordLabel: authEn.AUTH_PASSWORD_LABEL,
  passwordPlaceholder: authEn.AUTH_PASSWORD_PLACEHOLDER,
  forgotPasswordLabel: authEn.AUTH_FORGOT_PASSWORD_ACTION,
  submitIdleLabel: authEn.AUTH_SUBMIT_SIGN_IN_IDLE,
  submitLoadingLabel: authEn.AUTH_SUBMIT_SIGN_IN_LOADING,
  switchPrompt: authEn.AUTH_SIGN_IN_SWITCH_PROMPT,
  switchActionLabel: authEn.AUTH_SIGN_IN_SWITCH_ACTION,
};

const meta = {
  component: SignInForm,
  title: "Components/SignInForm",
  parameters: {
    layout: "centered",
  },
  args: {
    copy: signInCopy,
    onSubmit: async () => {},
    onForgotPasswordClick: () => {},
    onSignUpClick: () => {},
    isLoading: false,
  },
} satisfies Meta<typeof SignInForm>;

// oxlint-disable-next-line import/no-default-export
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Loading: Story = {
  args: {
    isLoading: true,
  },
};

export const WithError: Story = {
  args: {
    error: authEn.AUTH_ERROR_DEMO_ACCOUNT,
  },
};
