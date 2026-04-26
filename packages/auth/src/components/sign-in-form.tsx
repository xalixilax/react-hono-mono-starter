import { Button } from "@ui/components/ui/button";
import { Label } from "@ui/components/ui/label";
import * as React from "react";
import { AuthFormCard, AuthTextField } from "./auth-form-parts";

interface SignInFormCopy {
  description: string;
  emailLabel: string;
  emailPlaceholder: string;
  forgotPasswordLabel?: string;
  passwordLabel: string;
  passwordPlaceholder: string;
  submitIdleLabel: string;
  submitLoadingLabel: string;
  switchActionLabel: string;
  switchPrompt: string;
  title: string;
}

interface SignInFormProps {
  copy: SignInFormCopy;
  onSubmit: (email: string, password: string) => void | Promise<void>;
  isLoading?: boolean;
  error?: string;
  onSignUpClick?: () => void;
  onForgotPasswordClick?: () => void;
}

export function SignInForm({
  copy,
  onSubmit,
  isLoading = false,
  error,
  onSignUpClick,
  onForgotPasswordClick,
}: SignInFormProps) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(email, password);
  };

  return (
    <AuthFormCard
      description={copy.description}
      error={error}
      footer={
        <>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? copy.submitLoadingLabel : copy.submitIdleLabel}
          </Button>
          {onSignUpClick ? (
            <p className="text-center text-sm text-muted-foreground">
              {copy.switchPrompt}{" "}
              <button
                type="button"
                onClick={onSignUpClick}
                className="font-medium text-primary hover:underline"
                disabled={isLoading}
              >
                {copy.switchActionLabel}
              </button>
            </p>
          ) : null}
        </>
      }
      onSubmit={handleSubmit}
      title={copy.title}
    >
      <AuthTextField
        ariaInvalid={!!error}
        autoComplete="email"
        disabled={isLoading}
        id="email"
        label={copy.emailLabel}
        onChange={(event) => setEmail(event.target.value)}
        placeholder={copy.emailPlaceholder}
        type="email"
        value={email}
      />
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="password">{copy.passwordLabel}</Label>
          {onForgotPasswordClick && copy.forgotPasswordLabel ? (
            <button
              type="button"
              onClick={onForgotPasswordClick}
              className="text-sm text-primary hover:underline"
              disabled={isLoading}
            >
              {copy.forgotPasswordLabel}
            </button>
          ) : null}
        </div>
        <AuthTextField
          ariaInvalid={!!error}
          autoComplete="current-password"
          disabled={isLoading}
          id="password"
          label=""
          onChange={(event) => setPassword(event.target.value)}
          placeholder={copy.passwordPlaceholder}
          type="password"
          value={password}
        />
      </div>
    </AuthFormCard>
  );
}
