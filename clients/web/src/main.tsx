import { assertIsDefined } from "@shared/lib/utils";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";

import { App } from "./app";
import "./i18n/config";
import "@ui/styles/global.css";

const rootElement = document.getElementById("root");
assertIsDefined(rootElement);

/**
 * react-query client for the app. Used to interact with the cache
 * @see https://tanstack.com/query/latest/docs/reference/QueryClient
 */
const queryClient = new QueryClient();

/**
 * react-router router for all the app
 * @see https://reactrouter.com/start/data/installation
 */
const router = createBrowserRouter([
  {
    path: "/",
    children: [{ index: true, element: <App /> }],
  },
]);

createRoot(rootElement).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>,
);
