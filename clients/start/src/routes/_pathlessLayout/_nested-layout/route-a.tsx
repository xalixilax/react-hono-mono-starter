import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

export const Route = createFileRoute("/_pathlessLayout/_nested-layout/route-a")({
  component: LayoutAComponent,
});

function LayoutAComponent() {
  const { t } = useTranslation("start");

  return <div>{t(($) => $.ROUTE_A_LABEL)}</div>;
}
