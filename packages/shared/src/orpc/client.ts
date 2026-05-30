import type { RouterClient } from "@orpc/server";

import { createORPCClient } from "@orpc/client";
import { RPCLink } from "@orpc/client/fetch";

import type { appRouter } from "./router";

export function createAppClient(baseUrl: string): RouterClient<typeof appRouter> {
    return createORPCClient(
        new RPCLink({
            url: new URL("/rpc", baseUrl).toString(),
        }),
    );
}
