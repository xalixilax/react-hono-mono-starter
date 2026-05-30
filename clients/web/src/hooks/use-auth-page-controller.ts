import { languageStorageKey, resolveLanguage, type SupportedLanguage } from "i18n";
import { startTransition, useState } from "react";
import { useTranslation } from "react-i18next";

export type AuthMode = "signin" | "signup";
export type AuthProvider = "github" | "google";

type SuccessKey = "AUTH_SUCCESS_SIGN_IN" | "AUTH_SUCCESS_SIGN_UP";

function wait(durationMs: number) {
  return new Promise<void>((resolve) => {
    window.setTimeout(resolve, durationMs);
  });
}

export function useAuthPageController() {
  const { t, i18n } = useTranslation("auth");
  const [mode, setMode] = useState<AuthMode>("signin");
  const [error, setError] = useState<string>();
  const [status, setStatus] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);
  const currentLanguage = resolveLanguage(i18n.resolvedLanguage ?? i18n.language);

  const resetFeedback = () => {
    startTransition(() => {
      setError(undefined);
      setStatus(undefined);
    });
  };

  const handleModeChange = (nextMode: AuthMode) => {
    resetFeedback();
    setMode(nextMode);
  };

  const simulateAuth = async (successKey: SuccessKey, email: string) => {
    resetFeedback();
    setIsLoading(true);
    await wait(650);

    if (email.endsWith("@example.com")) {
      startTransition(() => {
        setError(t(($) => $.AUTH_ERROR_DEMO_ACCOUNT));
        setIsLoading(false);
      });
      return;
    }

    startTransition(() => {
      setStatus(
        t(successKey === "AUTH_SUCCESS_SIGN_IN" ? ($) => $.AUTH_SUCCESS_SIGN_IN : ($) => $.AUTH_SUCCESS_SIGN_UP, {
          email,
        }),
      );
      setIsLoading(false);
    });
  };

  const handleProviderClick = async (provider: AuthProvider) => {
    resetFeedback();
    setIsLoading(true);
    await wait(450);
    startTransition(() => {
      setStatus(
        t(($) => $.AUTH_PROVIDER_SUCCESS, {
          provider: t(provider === "google" ? ($) => $.AUTH_PROVIDER_GOOGLE : ($) => $.AUTH_PROVIDER_GITHUB),
        }),
      );
      setIsLoading(false);
    });
  };

  const handleSignInSubmit = async (email: string, _password: string) => {
    await simulateAuth("AUTH_SUCCESS_SIGN_IN", email);
  };

  const handleSignUpSubmit = async (email: string, _password: string, _name: string) => {
    await simulateAuth("AUTH_SUCCESS_SIGN_UP", email);
  };

  const handleForgotPasswordClick = () => {
    setStatus(t(($) => $.AUTH_FORGOT_PASSWORD_STATUS));
  };

  const handleLanguageChange = (nextLanguage: SupportedLanguage) => {
    if (nextLanguage === currentLanguage) {
      return;
    }

    window.localStorage.setItem(languageStorageKey, nextLanguage);
    void i18n.changeLanguage(nextLanguage);
  };

  return {
    currentLanguage,
    error,
    isLoading,
    mode,
    status,
    handleForgotPasswordClick,
    handleLanguageChange,
    handleModeChange,
    handleProviderClick,
    handleSignInSubmit,
    handleSignUpSubmit,
  };
}