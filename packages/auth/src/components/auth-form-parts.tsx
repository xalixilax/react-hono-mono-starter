import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@ui/components/ui/card";
import { Input } from "@ui/components/ui/input";
import { Label } from "@ui/components/ui/label";
import type * as React from "react";

interface AuthFormCardProps {
  children: React.ReactNode;
  description: string;
  error?: string;
  footer: React.ReactNode;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void | Promise<void>;
  title: string;
}

interface AuthTextFieldProps {
  ariaInvalid?: boolean;
  autoComplete?: string;
  disabled?: boolean;
  id: string;
  label?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  required?: boolean;
  type: React.HTMLInputTypeAttribute;
  value: string;
}

export function AuthFormCard({ children, description, error, footer, onSubmit, title }: AuthFormCardProps) {
  return (
    <Card className="w-full max-w-md border-black/10 bg-white shadow-[0_24px_80px_rgba(15,23,42,0.08)]">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <form onSubmit={onSubmit}>
        <CardContent className="space-y-4">
          {error ? <FormError message={error} /> : null}
          {children}
        </CardContent>
        <CardFooter className="flex flex-col gap-4">{footer}</CardFooter>
      </form>
    </Card>
  );
}

export function AuthTextField({
  ariaInvalid,
  autoComplete,
  disabled,
  id,
  label,
  onChange,
  placeholder,
  required = true,
  type,
  value,
}: AuthTextFieldProps) {
  return (
    <div className="space-y-2">
      {label ? <Label htmlFor={id}>{label}</Label> : null}
      <Input
        aria-invalid={ariaInvalid}
        autoComplete={autoComplete}
        disabled={disabled}
        id={id}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        type={type}
        value={value}
      />
    </div>
  );
}

function FormError({ message }: { message: string }) {
  return (
    <div className="rounded-md border border-destructive/20 bg-destructive/10 p-3 text-sm text-destructive">
      {message}
    </div>
  );
}
