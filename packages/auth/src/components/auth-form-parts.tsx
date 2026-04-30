import type * as React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@design-system/components/ui/card";
import { Input } from "@design-system/components/ui/input";
import { Label } from "@design-system/components/ui/label";

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
    <Card className="w-full max-w-none gap-0 border-black/10 bg-white/94 shadow-[0_24px_70px_rgba(44,33,19,0.08)]">
      <CardHeader className="gap-2 border-b border-black/8 pb-5">
        <CardTitle className="text-[1.75rem] leading-none tracking-[-0.04em] text-black">{title}</CardTitle>
        <CardDescription className="max-w-sm text-[0.98rem] leading-6 text-black/60">{description}</CardDescription>
      </CardHeader>
      <form onSubmit={onSubmit}>
        <CardContent className="space-y-4 pt-6">
          {error ? <FormError message={error} /> : null}
          {children}
        </CardContent>
        <CardFooter className="flex flex-col gap-4 pt-6">{footer}</CardFooter>
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
      {label ? (
        <Label htmlFor={id} className="text-[0.78rem] font-semibold tracking-[0.18em] text-black/55 uppercase">
          {label}
        </Label>
      ) : null}
      <Input
        aria-invalid={ariaInvalid}
        autoComplete={autoComplete}
        className="h-12 rounded-2xl border-black/10 bg-stone-50/85 px-4 text-[0.98rem] text-black shadow-none placeholder:text-black/35 focus-visible:border-black focus-visible:ring-black/10"
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
    <div className="rounded-2xl border border-destructive/20 bg-destructive/10 p-3 text-sm text-destructive">
      {message}
    </div>
  );
}
