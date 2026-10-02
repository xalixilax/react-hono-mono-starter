import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { Suspense, useState } from "react";
import { useTranslation } from "react-i18next";

const deferredQueryOptions = () =>
  queryOptions({
    queryKey: ["deferred"],
    queryFn: async () => {
      await new Promise((r) => setTimeout(r, 3000));
      return {
        // Simulated server payload, rendered verbatim below. It is data rather than
        // interface copy, so it is intentionally not routed through i18n.
        message: "Hello deferred from the server!",
        status: "success",
        time: new Date(),
      };
    },
  });

export const Route = createFileRoute("/deferred")({
  loader: ({ context }) => {
    // Kick off loading as early as possible! Not awaited on purpose: the route renders
    // immediately and the Suspense boundary below resolves the query.
    void context.queryClient.prefetchQuery(deferredQueryOptions());
  },
  component: Deferred,
});

function Deferred() {
  const { t } = useTranslation("start");
  const [count, setCount] = useState(0);

  return (
    <div className="p-2">
      <Suspense fallback={t(($) => $.DEFERRED_LOADING)}>
        <DeferredQuery />
      </Suspense>
      <div>
        {t(($) => $.DEFERRED_COUNT_LABEL)} {count}
      </div>
      <div>
        <button onClick={() => setCount(count + 1)}>{t(($) => $.DEFERRED_INCREMENT)}</button>
      </div>
    </div>
  );
}

function DeferredQuery() {
  const { t } = useTranslation("start");
  const deferredQuery = useSuspenseQuery(deferredQueryOptions());

  return (
    <div>
      <h1>{t(($) => $.DEFERRED_QUERY_TITLE)}</h1>
      <div>
        {t(($) => $.DEFERRED_STATUS_LABEL)} {deferredQuery.data.status}
      </div>
      <div>
        {t(($) => $.DEFERRED_MESSAGE_LABEL)} {deferredQuery.data.message}
      </div>
      <div>
        {t(($) => $.DEFERRED_TIME_LABEL)} {deferredQuery.data.time.toISOString()}
      </div>
    </div>
  );
}
