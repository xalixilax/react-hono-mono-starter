import type { ErrorComponentProps } from "@tanstack/react-router";

import { useSuspenseQuery } from "@tanstack/react-query";
import { ErrorComponent, Link, createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

import { NotFound } from "~/components/NotFound";

import { postQueryOptions } from "../utils/posts";

export const Route = createFileRoute("/posts/$postId")({
  loader: async ({ params: { postId }, context }) => {
    const data = await context.queryClient.ensureQueryData(postQueryOptions(postId));

    return {
      title: data.title,
    };
  },
  head: ({ loaderData }) => ({
    meta: loaderData ? [{ title: loaderData.title }] : undefined,
  }),
  errorComponent: PostErrorComponent,
  notFoundComponent: PostNotFoundComponent,
  component: PostComponent,
});

function PostNotFoundComponent() {
  const { t } = useTranslation("start");

  return <NotFound>{t(($) => $.NOT_FOUND_POST)}</NotFound>;
}

export function PostErrorComponent({ error }: ErrorComponentProps) {
  return <ErrorComponent error={error} />;
}

function PostComponent() {
  const { t } = useTranslation("start");
  const { postId } = Route.useParams();
  const postQuery = useSuspenseQuery(postQueryOptions(postId));

  return (
    <div className="space-y-2">
      <h4 className="text-xl font-bold underline">{postQuery.data.title}</h4>
      <div className="text-sm">{postQuery.data.body}</div>
      <Link
        to="/posts/$postId/deep"
        params={{
          postId: postQuery.data.id,
        }}
        activeProps={{ className: "text-black font-bold" }}
        className="inline-block py-1 text-blue-800 hover:text-blue-600"
      >
        {t(($) => $.POSTS_DEEP_VIEW)}
      </Link>
    </div>
  );
}
