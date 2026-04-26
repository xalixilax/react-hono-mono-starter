import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@ui/components/ui/card";
import {
  AuthLayout,
  AuthProviderButton,
  SignInForm,
  SignUpForm,
} from "auth/components";
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
  const { t } = useTranslation();
  const [mode, setMode] = useState<AuthMode>("signin");
  const [error, setError] = useState<string>();
  const [status, setStatus] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);

  const title =
    mode === "signin"
      ? t(($) => $.AUTH_TITLE_SIGN_IN)
      : t(($) => $.AUTH_TITLE_SIGN_UP);
  const description =
    mode === "signin"
      ? t(($) => $.AUTH_DESCRIPTION_SIGN_IN)
      : t(($) => $.AUTH_DESCRIPTION_SIGN_UP);

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
      setError(t(($) => $.AUTH_ERROR_DEMO_ACCOUNT));
      setIsLoading(false);
      return;
    }

    startTransition(() => {
      setStatus(
        t(
          successKey === "AUTH_SUCCESS_SIGN_IN"
            ? ($) => $.AUTH_SUCCESS_SIGN_IN
            : ($) => $.AUTH_SUCCESS_SIGN_UP,
          {
            email,
          },
        ),
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
        t(($) => $.AUTH_PROVIDER_SUCCESS, {
          provider: t(
            provider === "google"
              ? ($) => $.AUTH_PROVIDER_GOOGLE
              : ($) => $.AUTH_PROVIDER_GITHUB,
          ),
        }),
      );
      setIsLoading(false);
    });
  };

  return (
    <AuthLayout
      eyebrow={t(($) => $.AUTH_EYEBROW)}
      title={title}
      description={description}
      aside={
        <div className="space-y-5">
          <Card className="border-white/50 bg-white/75 shadow-[0_30px_120px_rgba(15,23,42,0.08)] backdrop-blur">
            <CardHeader>
              <CardTitle>{t(($) => $.AUTH_PANEL_TITLE)}</CardTitle>
              <CardDescription>
                {t(($) => $.AUTH_PANEL_DESCRIPTION)}
              </CardDescription>
              <CardAction>
                <span className="rounded-full border border-black/10 bg-black px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-white">
                  {t(($) => $.AUTH_PANEL_BADGE)}
                </span>
              </CardAction>
            </CardHeader>
            <CardContent className="grid gap-3 text-sm text-muted-foreground sm:grid-cols-3">
              <div>
                <p className="font-semibold text-foreground">
                  {t(($) => $.AUTH_PANEL_FEATURE_ONE_TITLE)}
                </p>
                <p>{t(($) => $.AUTH_PANEL_FEATURE_ONE_DESCRIPTION)}</p>
              </div>
              <div>
                <p className="font-semibold text-foreground">
                  {t(($) => $.AUTH_PANEL_FEATURE_TWO_TITLE)}
                </p>
                <p>{t(($) => $.AUTH_PANEL_FEATURE_TWO_DESCRIPTION)}</p>
              </div>
              <div>
                <p className="font-semibold text-foreground">
                  {t(($) => $.AUTH_PANEL_FEATURE_THREE_TITLE)}
                </p>
                <p>{t(($) => $.AUTH_PANEL_FEATURE_THREE_DESCRIPTION)}</p>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-3">
            <div className="grid gap-3 sm:grid-cols-2">
              <AuthProviderButton
                provider="google"
                label={t(($) => $.AUTH_PROVIDER_BUTTON, {
                  action: t(
                    mode === "signin"
                      ? ($) => $.AUTH_ACTION_SIGN_IN
                      : ($) => $.AUTH_ACTION_SIGN_UP,
                  ),
                  provider: t(($) => $.AUTH_PROVIDER_GOOGLE),
                })}
                onSignIn={() => handleProviderClick("google")}
                isLoading={isLoading}
              />
              <AuthProviderButton
                provider="github"
                label={t(($) => $.AUTH_PROVIDER_BUTTON, {
                  action: t(
                    mode === "signin"
                      ? ($) => $.AUTH_ACTION_SIGN_IN
                      : ($) => $.AUTH_ACTION_SIGN_UP,
                  ),
                  provider: t(($) => $.AUTH_PROVIDER_GITHUB),
                })}
                onSignIn={() => handleProviderClick("github")}
                isLoading={isLoading}
              />
            </div>

            {status ? (
              <p className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
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
          onForgotPasswordClick={() =>
            setStatus(t(($) => $.AUTH_FORGOT_PASSWORD_STATUS))
          }
          copy={{
            title: t(($) => $.AUTH_FORM_SIGN_IN_TITLE),
            description: t(($) => $.AUTH_FORM_SIGN_IN_DESCRIPTION),
            emailLabel: t(($) => $.AUTH_EMAIL_LABEL),
            emailPlaceholder: t(($) => $.AUTH_EMAIL_PLACEHOLDER),
            passwordLabel: t(($) => $.AUTH_PASSWORD_LABEL),
            passwordPlaceholder: t(($) => $.AUTH_PASSWORD_PLACEHOLDER),
            forgotPasswordLabel: t(($) => $.AUTH_FORGOT_PASSWORD_ACTION),
            submitIdleLabel: t(($) => $.AUTH_SUBMIT_SIGN_IN_IDLE),
            submitLoadingLabel: t(($) => $.AUTH_SUBMIT_SIGN_IN_LOADING),
            switchPrompt: t(($) => $.AUTH_SIGN_IN_SWITCH_PROMPT),
            switchActionLabel: t(($) => $.AUTH_SIGN_IN_SWITCH_ACTION),
          }}
        />
      ) : (
        <SignUpForm
          onSubmit={(email) => simulateAuth("AUTH_SUCCESS_SIGN_UP", email)}
          isLoading={isLoading}
          error={error}
          onSignInClick={() => handleModeChange("signin")}
          copy={{
            title: t(($) => $.AUTH_FORM_SIGN_UP_TITLE),
            description: t(($) => $.AUTH_FORM_SIGN_UP_DESCRIPTION),
            nameLabel: t(($) => $.AUTH_NAME_LABEL),
            namePlaceholder: t(($) => $.AUTH_NAME_PLACEHOLDER),
            emailLabel: t(($) => $.AUTH_EMAIL_LABEL),
            emailPlaceholder: t(($) => $.AUTH_EMAIL_PLACEHOLDER),
            passwordLabel: t(($) => $.AUTH_PASSWORD_LABEL),
            passwordPlaceholder: t(($) => $.AUTH_PASSWORD_PLACEHOLDER),
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
      )}
    </AuthLayout>
  );
}
