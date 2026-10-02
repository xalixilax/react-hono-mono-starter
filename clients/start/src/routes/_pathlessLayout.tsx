import { Outlet, createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

export const Route = createFileRoute("/_pathlessLayout")({
  component: PathlessLayoutComponent,
});

function PathlessLayoutComponent() {
  const { t } = useTranslation("start");

  return (
    <div className="p-2">
      <div>{t(($) => $.PATHLESS_LAYOUT_LABEL)}</div>
      <div>
        <Outlet />
      </div>
    </div>
  );
}
