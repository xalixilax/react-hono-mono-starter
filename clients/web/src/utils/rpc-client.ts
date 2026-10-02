import { createAppClient } from "@shared/orpc/client";

export const rpc = createAppClient(import.meta.env.VITE_API_URL);
