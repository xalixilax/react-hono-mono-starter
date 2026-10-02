import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

export const Route = createFileRoute("/users/")({
  component: UsersIndexComponent,
});

function UsersIndexComponent() {
  const { t } = useTranslation("start");

  return <div>{t(($) => $.USERS_SELECT_PROMPT)}</div>;
}
