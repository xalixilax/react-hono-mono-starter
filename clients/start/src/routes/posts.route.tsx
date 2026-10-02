import { useSuspenseQuery } from "@tanstack/react-query";
import { Link, Outlet, createFileRoute } from "@tanstack/react-router";
import i18next from "i18next";
import { useTranslation } from "react-i18next";

import { postsQueryOptions } from "../utils/posts";

export const Route = createFileRoute("/posts")({
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData(postsQueryOptions());
  },
  head: () => ({
    meta: [{ title: i18next.t(($) => $.POSTS_TITLE, { ns: "start" }) }],
  }),
  component: PostsComponent,
});

function PostsComponent() {
  const { t } = useTranslation("start");
  const postsQuery = useSuspenseQuery(postsQueryOptions());

  return (
    <div className="flex gap-2 p-2">
      <ul className="list-disc pl-4">
        {[...postsQuery.data, { id: "i-do-not-exist", title: t(($) => $.POSTS_NON_EXISTENT_ITEM) }].map((post) => {
          return (
            <li key={post.id} className="whitespace-nowrap">
              <Link
                to="/posts/$postId"
                params={{
                  postId: post.id,
                }}
                className="block py-1 text-blue-800 hover:text-blue-600"
                activeProps={{ className: "text-black font-bold" }}
              >
                <div>{post.title.substring(0, 20)}</div>
              </Link>
            </li>
          );
        })}
      </ul>
      <hr />
      <Outlet />
    </div>
  );
}
