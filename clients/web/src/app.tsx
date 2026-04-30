import { Button } from "@design-system/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@design-system/components/ui/card";
import { AuthLayout, AuthProviderButton, SignInForm, SignUpForm } from "auth/components";
import { languageStorageKey, resolveLanguage, type SupportedLanguage, supportedLanguages } from "i18n";
import { startTransition, useState } from "react";
import { useTranslation } from "react-i18next";

type AuthMode = "signin" | "signup";
type Provider = "github" | "google";
type SuccessKey = "AUTH_SUCCESS_SIGN_IN" | "AUTH_SUCCESS_SIGN_UP";

function wait(durationMs: number) {
  return new Promise<void>((resolve) => {
    window.setTimeout(resolve, durationMs);
  });
}

export function App() {
  const { t, i18n } = useTranslation("web");
  const { t: tAuth } = useTranslation("auth");
  const [mode, setMode] = useState<AuthMode>("signin");
  const [error, setError] = useState<string>();
  const [status, setStatus] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);
  const currentLanguage = resolveLanguage(i18n.resolvedLanguage ?? i18n.language);

  const title = mode === "signin" ? t(($) => $.AUTH_TITLE_SIGN_IN) : t(($) => $.AUTH_TITLE_SIGN_UP);
  const description = mode === "signin" ? t(($) => $.AUTH_DESCRIPTION_SIGN_IN) : t(($) => $.AUTH_DESCRIPTION_SIGN_UP);
  const authActionLabel = mode === "signin" ? tAuth(($) => $.AUTH_ACTION_SIGN_IN) : tAuth(($) => $.AUTH_ACTION_SIGN_UP);
  const googleProviderLabel = tAuth(($) => $.AUTH_PROVIDER_GOOGLE);
  const githubProviderLabel = tAuth(($) => $.AUTH_PROVIDER_GITHUB);
  const sharedAuthFieldCopy = {
    emailLabel: tAuth(($) => $.AUTH_EMAIL_LABEL),
    emailPlaceholder: tAuth(($) => $.AUTH_EMAIL_PLACEHOLDER),
    passwordLabel: tAuth(($) => $.AUTH_PASSWORD_LABEL),
    passwordPlaceholder: tAuth(($) => $.AUTH_PASSWORD_PLACEHOLDER),
  };
  const signInCopy = {
    title: tAuth(($) => $.AUTH_FORM_SIGN_IN_TITLE),
    description: tAuth(($) => $.AUTH_FORM_SIGN_IN_DESCRIPTION),
    ...sharedAuthFieldCopy,
    forgotPasswordLabel: tAuth(($) => $.AUTH_FORGOT_PASSWORD_ACTION),
    submitIdleLabel: tAuth(($) => $.AUTH_SUBMIT_SIGN_IN_IDLE),
    submitLoadingLabel: tAuth(($) => $.AUTH_SUBMIT_SIGN_IN_LOADING),
    switchPrompt: tAuth(($) => $.AUTH_SIGN_IN_SWITCH_PROMPT),
    switchActionLabel: tAuth(($) => $.AUTH_SIGN_IN_SWITCH_ACTION),
  };
  const signUpCopy = {
    title: tAuth(($) => $.AUTH_FORM_SIGN_UP_TITLE),
    description: tAuth(($) => $.AUTH_FORM_SIGN_UP_DESCRIPTION),
    nameLabel: tAuth(($) => $.AUTH_NAME_LABEL),
    namePlaceholder: tAuth(($) => $.AUTH_NAME_PLACEHOLDER),
    ...sharedAuthFieldCopy,
    confirmPasswordLabel: tAuth(($) => $.AUTH_CONFIRM_PASSWORD_LABEL),
    confirmPasswordPlaceholder: tAuth(($) => $.AUTH_PASSWORD_PLACEHOLDER),
    validationPasswordMismatch: tAuth(($) => $.AUTH_PASSWORD_MISMATCH),
    validationPasswordLength: tAuth(($) => $.AUTH_PASSWORD_LENGTH),
    submitIdleLabel: tAuth(($) => $.AUTH_SUBMIT_SIGN_UP_IDLE),
    submitLoadingLabel: tAuth(($) => $.AUTH_SUBMIT_SIGN_UP_LOADING),
    switchPrompt: tAuth(($) => $.AUTH_SIGN_UP_SWITCH_PROMPT),
    switchActionLabel: tAuth(($) => $.AUTH_SIGN_UP_SWITCH_ACTION),
  };

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
      setError(tAuth(($) => $.AUTH_ERROR_DEMO_ACCOUNT));
      setIsLoading(false);
      return;
    }

    startTransition(() => {
      setStatus(
        tAuth(successKey === "AUTH_SUCCESS_SIGN_IN" ? ($) => $.AUTH_SUCCESS_SIGN_IN : ($) => $.AUTH_SUCCESS_SIGN_UP, {
          email,
        }),
      );
      setIsLoading(false);
    });
  };

  const handleProviderClick = async (provider: Provider) => {
    resetFeedback();
    setIsLoading(true);
    await wait(450);
    startTransition(() => {
      setStatus(
        tAuth(($) => $.AUTH_PROVIDER_SUCCESS, {
          provider: tAuth(provider === "google" ? ($) => $.AUTH_PROVIDER_GOOGLE : ($) => $.AUTH_PROVIDER_GITHUB),
        }),
      );
      setIsLoading(false);
    });
  };

  const handleLanguageChange = (nextLanguage: SupportedLanguage) => {
    if (nextLanguage === currentLanguage) {
      return;
    }

    window.localStorage.setItem(languageStorageKey, nextLanguage);
    void i18n.changeLanguage(nextLanguage);
  };

  const getLanguageLabel = (language: SupportedLanguage) => {
    return language === "en" ? t(($) => $.LANGUAGE_ENGLISH) : t(($) => $.LANGUAGE_FRENCH);
  };

  return (
    <AuthLayout
      eyebrow={t(($) => $.AUTH_EYEBROW)}
      title={title}
      description={description}
      aside={
        <div className="space-y-4 sm:space-y-5">
          <div className="flex flex-col gap-3 rounded-[1.5rem] border border-black/10 bg-white/78 p-4 shadow-[0_16px_50px_rgba(33,24,14,0.05)] backdrop-blur sm:flex-row sm:items-center sm:justify-between">
            <span className="text-xs font-semibold tracking-[0.24em] text-black/55 uppercase">
              {t(($) => $.LANGUAGE_LABEL)}
            </span>
            <div className="flex flex-wrap items-center gap-2">
              {supportedLanguages.map((language) => (
                <Button
                  key={language}
                  type="button"
                  size="sm"
                  variant={language === currentLanguage ? "default" : "outline"}
                  onClick={() => handleLanguageChange(language)}
                  aria-pressed={language === currentLanguage}
                  className="min-w-24 rounded-full border-black/10 bg-white px-4 text-black shadow-none hover:border-black hover:bg-black hover:text-white"
                >
                  {getLanguageLabel(language)}
                </Button>
              ))}
            </div>
          </div>

          <Card className="overflow-hidden border-black/10 bg-[#171717] text-white shadow-[0_28px_90px_rgba(17,17,17,0.18)]">
            <CardHeader className="gap-3 border-b border-white/10 pb-5">
              <CardTitle className="text-3xl leading-none tracking-[-0.04em] text-white">
                {t(($) => $.AUTH_PANEL_TITLE)}
              </CardTitle>
              <CardDescription className="max-w-2xl text-base leading-7 text-white/68">
                {t(($) => $.AUTH_PANEL_DESCRIPTION)}
              </CardDescription>
              <CardAction>
                <span className="rounded-full border border-white/12 bg-white/10 px-3 py-1 text-[10px] font-semibold tracking-[0.24em] text-white uppercase backdrop-blur">
                  {t(($) => $.AUTH_PANEL_BADGE)}
                </span>
              </CardAction>
            </CardHeader>
            <CardContent className="grid gap-3 pb-1 text-sm text-white/68 sm:grid-cols-3">
              <div className="rounded-[1.35rem] border border-white/10 bg-white/6 p-4">
                <p className="mb-2 text-base font-semibold text-white">{t(($) => $.AUTH_PANEL_FEATURE_ONE_TITLE)}</p>
                <p className="leading-6">{t(($) => $.AUTH_PANEL_FEATURE_ONE_DESCRIPTION)}</p>
              </div>
              <div className="rounded-[1.35rem] border border-white/10 bg-white/6 p-4">
                <p className="mb-2 text-base font-semibold text-white">{t(($) => $.AUTH_PANEL_FEATURE_TWO_TITLE)}</p>
                <p className="leading-6">{t(($) => $.AUTH_PANEL_FEATURE_TWO_DESCRIPTION)}</p>
              </div>
              <div className="rounded-[1.35rem] border border-white/10 bg-white/6 p-4">
                <p className="mb-2 text-base font-semibold text-white">{t(($) => $.AUTH_PANEL_FEATURE_THREE_TITLE)}</p>
                <p className="leading-6">{t(($) => $.AUTH_PANEL_FEATURE_THREE_DESCRIPTION)}</p>
              </div>
            </CardContent>
          </Card>

          <div className="rounded-[1.5rem] border border-black/10 bg-white/78 p-4 shadow-[0_16px_50px_rgba(33,24,14,0.05)] backdrop-blur">
            <div className="grid gap-3 sm:grid-cols-2">
              <AuthProviderButton
                provider="google"
                label={tAuth(($) => $.AUTH_PROVIDER_BUTTON, {
                  action: authActionLabel,
                  provider: googleProviderLabel,
                })}
                onSignIn={() => handleProviderClick("google")}
                isLoading={isLoading}
              />
              <AuthProviderButton
                provider="github"
                label={tAuth(($) => $.AUTH_PROVIDER_BUTTON, {
                  action: authActionLabel,
                  provider: githubProviderLabel,
                })}
                onSignIn={() => handleProviderClick("github")}
                isLoading={isLoading}
              />
            </div>

            {status ? (
              <p className="mt-3 rounded-[1.2rem] border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm leading-6 text-emerald-700">
                {status}
              </p>
            ) : null}
          </div>
        </div>
      }
    >
      {mode === "signin" ? (
        <SignInForm
          onSubmit={(email) => simulateAuth("AUTH_SUCCESS_SIGN_IN", email)}
          isLoading={isLoading}
          error={error}
          onSignUpClick={() => handleModeChange("signup")}
          onForgotPasswordClick={() => setStatus(tAuth(($) => $.AUTH_FORGOT_PASSWORD_STATUS))}
          copy={signInCopy}
        />
      ) : (
        <SignUpForm
          onSubmit={(email) => simulateAuth("AUTH_SUCCESS_SIGN_UP", email)}
          isLoading={isLoading}
          error={error}
          onSignInClick={() => handleModeChange("signin")}
          copy={signUpCopy}
        />
      )}
    </AuthLayout>
  );
}
