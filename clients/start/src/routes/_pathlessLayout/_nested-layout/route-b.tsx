import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

export const Route = createFileRoute("/_pathlessLayout/_nested-layout/route-b")({
  component: LayoutBComponent,
});

function LayoutBComponent() {
  const { t } = useTranslation("start");

  return <div>{t(($) => $.ROUTE_B_LABEL)}</div>;
}
