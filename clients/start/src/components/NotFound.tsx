import type { ReactNode } from "react";

import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

export function NotFound({ children }: { children?: ReactNode }) {
  const { t } = useTranslation("start");

  return (
    <div className="space-y-2 p-2">
      <div className="text-gray-600 dark:text-gray-400">{children || <p>{t(($) => $.NOT_FOUND_MESSAGE)}</p>}</div>
      <p className="flex flex-wrap items-center gap-2">
        <button
          onClick={() => window.history.back()}
          className="rounded-sm bg-emerald-500 px-2 py-1 text-sm font-black text-white uppercase"
        >
          {t(($) => $.NOT_FOUND_GO_BACK)}
        </button>
        <Link to="/" className="rounded-sm bg-cyan-600 px-2 py-1 text-sm font-black text-white uppercase">
          {t(($) => $.NOT_FOUND_START_OVER)}
        </Link>
      </p>
    </div>
  );
}
