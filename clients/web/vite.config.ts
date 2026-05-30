import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import { defineConfig } from "vite";

const apiServerUrl = process.env.VITE_API_URL;

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@design-system": path.resolve(__dirname, "../../packages/design-system/src"),
      "@shared": path.resolve(__dirname, "../../packages/shared/src"),
    },
  },
  server: {
    proxy: {
      "/healthz": {
        changeOrigin: true,
        target: apiServerUrl,
      },
      "/rpc": {
        changeOrigin: true,
        target: apiServerUrl,
      },
    },
  },
});
