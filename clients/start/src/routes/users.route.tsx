import { useSuspenseQuery } from "@tanstack/react-query";
import { Link, Outlet, createFileRoute } from "@tanstack/react-router";
import i18next from "i18next";
import { useTranslation } from "react-i18next";

import { usersQueryOptions } from "../utils/users";

export const Route = createFileRoute("/users")({
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData(usersQueryOptions());
  },
  head: () => ({
    meta: [{ title: i18next.t(($) => $.USERS_TITLE, { ns: "start" }) }],
  }),
  component: UsersComponent,
});

function UsersComponent() {
  const { t } = useTranslation("start");
  const usersQuery = useSuspenseQuery(usersQueryOptions());

  return (
    <div className="flex gap-2 p-2">
      <ul className="list-disc pl-4">
        {[...usersQuery.data, { id: "i-do-not-exist", name: t(($) => $.USERS_NON_EXISTENT_ITEM), email: "" }].map(
          (user) => {
            return (
              <li key={user.id} className="whitespace-nowrap">
                <Link
                  to="/users/$userId"
                  params={{
                    userId: String(user.id),
                  }}
                  className="block py-1 text-blue-800 hover:text-blue-600"
                  activeProps={{ className: "text-black font-bold" }}
                >
                  <div>{user.name}</div>
                </Link>
              </li>
            );
          },
        )}
      </ul>
      <hr />
      <Outlet />
    </div>
  );
}
