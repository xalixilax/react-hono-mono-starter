import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

export const Route = createFileRoute("/posts/")({
  component: PostsIndexComponent,
});

function PostsIndexComponent() {
  const { t } = useTranslation("start");

  return <div>{t(($) => $.POSTS_SELECT_PROMPT)}</div>;
}
