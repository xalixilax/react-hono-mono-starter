import { createAppClient } from "@shared/orpc/client";

export const appClient = createAppClient(import.meta.env.VITE_API_URL);
