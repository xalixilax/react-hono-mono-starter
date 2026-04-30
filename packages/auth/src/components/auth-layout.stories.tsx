import type { Meta, StoryObj } from "@storybook/react-vite";

import webEn from "../../../i18n/src/locales/en/web";
import { AuthLayout } from "./auth-layout";

const copy = {
  title: "A production-minded shell for auth flows",
  description:
    "Use the shared auth layout to present product context, supporting actions, and a focused entry form without rebuilding the page frame.",
  featureOneTitle: "Shared foundation",
  featureOneDescription: "The layout keeps marketing context and auth actions visually separated.",
  featureTwoTitle: "Responsive frame",
  featureTwoDescription: "The right column stays constrained while the supporting panel can scale wider.",
  featureThreeTitle: "Readable contrast",
  featureThreeDescription: "The shell is designed to carry dense copy without losing legibility.",
  previewEyebrow: "Preview",
  previewTitle: "Welcome back",
  previewDescription: "This slot renders the active auth surface, such as sign-in, sign-up, or recovery actions.",
} as const;

const meta = {
  component: AuthLayout,
  title: "Components/AuthLayout",
  parameters: {
    layout: "fullscreen",
  },
  args: {
    eyebrow: webEn.AUTH_EYEBROW,
    title: copy.title,
    description: copy.description,
    aside: (
      <div className="grid gap-3 text-sm text-black/70 sm:grid-cols-3">
        <div className="rounded-[1.35rem] border border-black/10 bg-white/70 p-4">
          <p className="mb-2 font-semibold text-black">{copy.featureOneTitle}</p>
          <p>{copy.featureOneDescription}</p>
        </div>
        <div className="rounded-[1.35rem] border border-black/10 bg-white/70 p-4">
          <p className="mb-2 font-semibold text-black">{copy.featureTwoTitle}</p>
          <p>{copy.featureTwoDescription}</p>
        </div>
        <div className="rounded-[1.35rem] border border-black/10 bg-white/70 p-4">
          <p className="mb-2 font-semibold text-black">{copy.featureThreeTitle}</p>
          <p>{copy.featureThreeDescription}</p>
        </div>
      </div>
    ),
    children: (
      <div className="rounded-[1.5rem] border border-black/10 bg-white p-6 shadow-[0_18px_55px_rgba(44,33,19,0.08)]">
        <p className="text-[0.78rem] font-semibold tracking-[0.18em] text-black/55 uppercase">{copy.previewEyebrow}</p>
        <h2 className="mt-3 text-3xl leading-none tracking-[-0.04em] text-black">{copy.previewTitle}</h2>
        <p className="mt-3 max-w-sm text-sm leading-6 text-black/65">{copy.previewDescription}</p>
      </div>
    ),
  },
} satisfies Meta<typeof AuthLayout>;

// oxlint-disable-next-line import/no-default-export
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithoutAside: Story = {
  args: {
    aside: undefined,
  },
};
