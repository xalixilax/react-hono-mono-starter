import type { QueryClient } from "@tanstack/react-query";

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
/// <reference types="vite/client" />
import { HeadContent, Link, Outlet, Scripts, createRootRouteWithContext } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import i18next from "i18next";
import * as React from "react";
import { useTranslation } from "react-i18next";

import { DefaultCatchBoundary } from "~/components/DefaultCatchBoundary";
import { NotFound } from "~/components/NotFound";
import appCss from "~/styles/app.css?url";
import { seo } from "~/utils/seo";

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
}>()({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      ...seo({
        title: i18next.t(($) => $.SEO_TITLE, { ns: "start" }),
        description: i18next.t(($) => $.SEO_DESCRIPTION, { ns: "start" }),
      }),
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      {
        rel: "apple-touch-icon",
        sizes: "180x180",
        href: "/apple-touch-icon.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        href: "/favicon-32x32.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        href: "/favicon-16x16.png",
      },
      { rel: "manifest", href: "/site.webmanifest", color: "#fffff" },
      { rel: "icon", href: "/favicon.ico" },
    ],
  }),
  errorComponent: (props) => {
    return (
      <RootDocument>
        <DefaultCatchBoundary {...props} />
      </RootDocument>
    );
  },
  notFoundComponent: () => <NotFound />,
  component: RootComponent,
});

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  );
}

function RootDocument({ children }: { children: React.ReactNode }) {
  const { t } = useTranslation("start");

  return (
    <html>
      <head>
        <HeadContent />
      </head>
      <body>
        <div className="flex gap-2 p-2 text-lg">
          <Link
            to="/"
            activeProps={{
              className: "font-bold",
            }}
            activeOptions={{ exact: true }}
          >
            {t(($) => $.NAV_HOME)}
          </Link>{" "}
          <Link
            to="/posts"
            activeProps={{
              className: "font-bold",
            }}
          >
            {t(($) => $.NAV_POSTS)}
          </Link>{" "}
          <Link
            to="/users"
            activeProps={{
              className: "font-bold",
            }}
          >
            {t(($) => $.NAV_USERS)}
          </Link>{" "}
          <Link
            to="/route-a"
            activeProps={{
              className: "font-bold",
            }}
          >
            {t(($) => $.NAV_PATHLESS_LAYOUT)}
          </Link>{" "}
          <Link
            to="/deferred"
            activeProps={{
              className: "font-bold",
            }}
          >
            {t(($) => $.NAV_DEFERRED)}
          </Link>{" "}
          {/*
            This path is intentionally absent from the route tree to exercise the
            not-found boundary. `Link` only accepts typed, registered paths, so a plain
            anchor is used here instead of suppressing the type error.
          */}
          <a href="/this-route-does-not-exist">{t(($) => $.NAV_ROUTE_NOT_EXIST)}</a>
        </div>
        <hr />
        {children}
        <TanStackRouterDevtools position="bottom-right" />
        <ReactQueryDevtools buttonPosition="bottom-left" />
        <Scripts />
      </body>
    </html>
  );
}
