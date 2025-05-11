import * as path from "node:path";
import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { defineConfig } from "vite";

export default defineConfig({
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      "~": path.resolve(import.meta.dirname, "./src"),
    },
  },
  plugins: [
    // [@tailwindcss/vite:generate:build] Cannot create proxy with a non-object as target or handler
    // tailwindcss(),
    tanstackStart(),
  ],
});
