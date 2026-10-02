import { Link, Outlet, createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

export const Route = createFileRoute("/_pathlessLayout/_nested-layout")({
  component: PathlessLayoutComponent,
});

function PathlessLayoutComponent() {
  const { t } = useTranslation("start");

  return (
    <div>
      <div>{t(($) => $.NESTED_PATHLESS_LAYOUT_LABEL)}</div>
      <div className="flex gap-2">
        <Link
          to="/route-a"
          activeProps={{
            className: "font-bold",
          }}
        >
          {t(($) => $.NESTED_PATHLESS_LAYOUT_GO_TO_A)}
        </Link>
        <Link
          to="/route-b"
          activeProps={{
            className: "font-bold",
          }}
        >
          {t(($) => $.NESTED_PATHLESS_LAYOUT_GO_TO_B)}
        </Link>
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
}
