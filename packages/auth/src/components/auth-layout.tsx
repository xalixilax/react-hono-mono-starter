interface AuthLayoutProps {
  aside?: React.ReactNode;
  children: React.ReactNode;
  eyebrow?: string;
  title?: string;
  description?: string;
}

export function AuthLayout({ aside, children, eyebrow, title, description }: AuthLayoutProps) {
  return (
    <div className="relative isolate min-h-screen overflow-hidden bg-[linear-gradient(180deg,#f8f5ef_0%,#f4efe6_48%,#f9f7f2_100%)] px-4 py-6 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 top-10 size-72 rounded-full bg-amber-200/40 blur-3xl" />
        <div className="absolute -right-24 bottom-0 size-80 rounded-full bg-sky-200/40 blur-3xl" />
      </div>

      <div className="relative mx-auto grid min-h-[calc(100vh-3rem)] w-full max-w-6xl gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div className="flex flex-col justify-between gap-8">
          <div className="max-w-2xl space-y-4">
            {eyebrow ? (
              <p className="inline-flex rounded-full border border-black/10 bg-white/70 px-4 py-1 text-xs font-semibold uppercase tracking-[0.28em] text-black/70 backdrop-blur">
                {eyebrow}
              </p>
            ) : null}
            {title ? (
              <h1 className="max-w-xl text-5xl font-semibold tracking-[-0.04em] text-balance text-black">{title}</h1>
            ) : null}
            {description ? <p className="max-w-lg text-base leading-7 text-black/65">{description}</p> : null}
          </div>

          {aside ? <div className="max-w-3xl">{aside}</div> : null}
        </div>

        <div className="flex items-center justify-center">
          <div className="w-full max-w-xl rounded-4xl border border-white/60 bg-white/60 p-3 shadow-[0_40px_120px_rgba(15,23,42,0.08)] backdrop-blur-xl">
            <div className="rounded-3xl border border-black/5 bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(255,255,255,0.86))] p-4 sm:p-6">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
