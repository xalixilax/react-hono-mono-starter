interface AuthLayoutProps {
  aside?: React.ReactNode;
  children: React.ReactNode;
  eyebrow?: string;
  title?: string;
  description?: string;
}

export function AuthLayout({ aside, children, eyebrow, title, description }: AuthLayoutProps) {
  return (
    <div className="relative isolate min-h-screen overflow-hidden bg-[linear-gradient(180deg,#f5f0e8_0%,#efe7db_52%,#f7f4ee_100%)] px-4 py-4 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(24,24,24,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(24,24,24,0.035)_1px,transparent_1px)] bg-[size:clamp(3.5rem,7vw,5.5rem)_clamp(3.5rem,7vw,5.5rem)] opacity-45" />
        <div className="absolute top-12 left-[8%] h-56 w-56 rounded-full border border-black/12" />
        <div className="absolute right-[6%] bottom-12 h-72 w-72 rounded-full border border-black/10" />
        <div className="absolute top-0 right-0 hidden h-full w-[42%] bg-[linear-gradient(180deg,rgba(20,20,20,0.06),rgba(20,20,20,0.14))] lg:block" />
        <div className="absolute top-14 left-10 h-40 w-40 rounded-full bg-amber-100/70 blur-3xl" />
        <div className="absolute right-10 bottom-10 h-56 w-56 rounded-full bg-orange-100/70 blur-3xl" />
      </div>

      <div className="relative mx-auto grid min-h-[calc(100vh-2rem)] w-full max-w-7xl gap-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(26rem,0.95fr)] lg:items-stretch">
        <div className="flex flex-col justify-between gap-8 rounded-[2rem] border border-black/10 bg-white/68 p-6 shadow-[0_28px_90px_rgba(28,21,15,0.08)] backdrop-blur-xl sm:p-8 xl:p-10">
          <div className="max-w-2xl space-y-5">
            {eyebrow ? (
              <p className="inline-flex rounded-full border border-black/10 bg-white/88 px-4 py-1 text-[0.69rem] font-semibold tracking-[0.28em] text-black/70 uppercase backdrop-blur">
                {eyebrow}
              </p>
            ) : null}
            {title ? (
              <h1
                data-display="true"
                className="max-w-2xl text-5xl leading-[0.94] font-semibold tracking-[-0.05em] text-balance text-black sm:text-6xl xl:text-7xl"
              >
                {title}
              </h1>
            ) : null}
            {description ? (
              <p className="max-w-xl text-base leading-7 text-black/68 sm:text-lg">{description}</p>
            ) : null}
          </div>

          {aside ? <div className="max-w-4xl">{aside}</div> : null}
        </div>

        <div className="flex items-center justify-center lg:justify-end">
          <div className="w-full max-w-xl rounded-[2rem] border border-black/12 bg-[#111111] p-2 shadow-[0_36px_120px_rgba(17,17,17,0.22)]">
            <div className="rounded-[1.7rem] border border-white/8 bg-[linear-gradient(180deg,#f8f3eb_0%,#f3ede2_100%)] p-4 sm:p-6">
              <div className="mb-5 flex items-center justify-between rounded-full border border-black/10 bg-white/75 px-4 py-2 backdrop-blur">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-black" />
                  <span className="h-2.5 w-2.5 rounded-full bg-black/25" />
                  <span className="h-2.5 w-2.5 rounded-full bg-black/12" />
                </div>
                <div className="h-px w-20 bg-black/10" />
              </div>
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
