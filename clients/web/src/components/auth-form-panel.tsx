import { SignInForm, SignUpForm } from "auth/components";
import { useTranslation } from "react-i18next";
import type { AuthMode } from "../hooks/use-auth-page-controller";

interface AuthFormPanelProps {
  error?: string;
  isLoading: boolean;
  mode: AuthMode;
  onForgotPasswordClick: () => void;
  onModeChange: (mode: AuthMode) => void;
  onSignInSubmit: (email: string, password: string) => void | Promise<void>;
  onSignUpSubmit: (email: string, password: string, name: string) => void | Promise<void>;
}

export function AuthFormPanel({
  error,
  isLoading,
  mode,
  onForgotPasswordClick,
  onModeChange,
  onSignInSubmit,
  onSignUpSubmit,
}: AuthFormPanelProps) {
  const { t } = useTranslation("auth");

  const sharedAuthFieldCopy = {
    emailLabel: t(($) => $.AUTH_EMAIL_LABEL),
    emailPlaceholder: t(($) => $.AUTH_EMAIL_PLACEHOLDER),
    passwordLabel: t(($) => $.AUTH_PASSWORD_LABEL),
    passwordPlaceholder: t(($) => $.AUTH_PASSWORD_PLACEHOLDER),
  };

  if (mode === "signin") {
    return (
      <SignInForm
        onSubmit={onSignInSubmit}
        isLoading={isLoading}
        error={error}
        onSignUpClick={() => onModeChange("signup")}
        onForgotPasswordClick={onForgotPasswordClick}
        copy={{
          title: t(($) => $.AUTH_FORM_SIGN_IN_TITLE),
          description: t(($) => $.AUTH_FORM_SIGN_IN_DESCRIPTION),
          ...sharedAuthFieldCopy,
          forgotPasswordLabel: t(($) => $.AUTH_FORGOT_PASSWORD_ACTION),
          submitIdleLabel: t(($) => $.AUTH_SUBMIT_SIGN_IN_IDLE),
          submitLoadingLabel: t(($) => $.AUTH_SUBMIT_SIGN_IN_LOADING),
          switchPrompt: t(($) => $.AUTH_SIGN_IN_SWITCH_PROMPT),
          switchActionLabel: t(($) => $.AUTH_SIGN_IN_SWITCH_ACTION),
        }}
      />
    );
  }

  return (
    <SignUpForm
      onSubmit={onSignUpSubmit}
      isLoading={isLoading}
      error={error}
      onSignInClick={() => onModeChange("signin")}
      copy={{
        title: t(($) => $.AUTH_FORM_SIGN_UP_TITLE),
        description: t(($) => $.AUTH_FORM_SIGN_UP_DESCRIPTION),
        nameLabel: t(($) => $.AUTH_NAME_LABEL),
        namePlaceholder: t(($) => $.AUTH_NAME_PLACEHOLDER),
        ...sharedAuthFieldCopy,
        confirmPasswordLabel: t(($) => $.AUTH_CONFIRM_PASSWORD_LABEL),
        confirmPasswordPlaceholder: t(($) => $.AUTH_PASSWORD_PLACEHOLDER),
        validationPasswordMismatch: t(($) => $.AUTH_PASSWORD_MISMATCH),
        validationPasswordLength: t(($) => $.AUTH_PASSWORD_LENGTH),
        submitIdleLabel: t(($) => $.AUTH_SUBMIT_SIGN_UP_IDLE),
        submitLoadingLabel: t(($) => $.AUTH_SUBMIT_SIGN_UP_LOADING),
        switchPrompt: t(($) => $.AUTH_SIGN_UP_SWITCH_PROMPT),
        switchActionLabel: t(($) => $.AUTH_SIGN_UP_SWITCH_ACTION),
      }}
    />
  );
}