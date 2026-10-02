import { onError } from "@orpc/server";
import { RPCHandler } from "@orpc/server/fetch";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { appRouter } from "shared/orpc/router";

const app = new Hono();
app.use("/*", cors());

const handler = new RPCHandler(appRouter, {
  interceptors: [
    onError((error) => {
      console.error(error);
    }),
  ],
});

app.use("/rpc/*", async (c, next) => {
  const { matched, response } = await handler.handle(c.req.raw, {
    context: {},
    prefix: "/rpc",
  });

  if (matched) {
    return response;
  }

  await next();
});

app.get("/healthz", (c) => {
  return c.json({ status: "ok" });
});

// oxlint-disable-next-line import/no-default-export
export default {
  fetch: app.fetch,
  port: 3000,
};
