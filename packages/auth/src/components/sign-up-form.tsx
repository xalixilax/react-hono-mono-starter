import { Button } from "@ui/components/ui/button";
import * as React from "react";
import { AuthFormCard, AuthTextField } from "./auth-form-parts";

interface SignUpFormCopy {
  confirmPasswordLabel: string;
  confirmPasswordPlaceholder: string;
  description: string;
  emailLabel: string;
  emailPlaceholder: string;
  nameLabel: string;
  namePlaceholder: string;
  passwordLabel: string;
  passwordPlaceholder: string;
  submitIdleLabel: string;
  submitLoadingLabel: string;
  switchActionLabel: string;
  switchPrompt: string;
  title: string;
  validationPasswordLength: string;
  validationPasswordMismatch: string;
}

interface SignUpFormProps {
  copy: SignUpFormCopy;
  onSubmit: (email: string, password: string, name: string) => void | Promise<void>;
  isLoading?: boolean;
  error?: string;
  onSignInClick?: () => void;
}

export function SignUpForm({ copy, onSubmit, isLoading = false, error, onSignInClick }: SignUpFormProps) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [name, setName] = React.useState("");
  const [passwordError, setPasswordError] = React.useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError("");

    if (password !== confirmPassword) {
      setPasswordError(copy.validationPasswordMismatch);
      return;
    }

    if (password.length < 8) {
      setPasswordError(copy.validationPasswordLength);
      return;
    }

    await onSubmit(email, password, name);
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
          {onSignInClick ? (
            <p className="text-center text-sm text-muted-foreground">
              {copy.switchPrompt}{" "}
              <button
                type="button"
                onClick={onSignInClick}
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
        disabled={isLoading}
        id="name"
        label={copy.nameLabel}
        onChange={(event) => setName(event.target.value)}
        placeholder={copy.namePlaceholder}
        type="text"
        value={name}
      />
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
      <AuthTextField
        ariaInvalid={!!passwordError}
        autoComplete="new-password"
        disabled={isLoading}
        id="password"
        label={copy.passwordLabel}
        onChange={(event) => setPassword(event.target.value)}
        placeholder={copy.passwordPlaceholder}
        type="password"
        value={password}
      />
      <div className="space-y-2">
        <AuthTextField
          ariaInvalid={!!passwordError}
          autoComplete="new-password"
          disabled={isLoading}
          id="confirm-password"
          label={copy.confirmPasswordLabel}
          onChange={(event) => setConfirmPassword(event.target.value)}
          placeholder={copy.confirmPasswordPlaceholder}
          type="password"
          value={confirmPassword}
        />
        {passwordError ? <p className="text-sm text-destructive">{passwordError}</p> : null}
      </div>
    </AuthFormCard>
  );
}
