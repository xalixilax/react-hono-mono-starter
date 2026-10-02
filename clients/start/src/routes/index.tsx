import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  const { t } = useTranslation("start");

  return (
    <div className="p-2">
      <h3>{t(($) => $.HOME_WELCOME_TITLE)}</h3>
    </div>
  );
}
