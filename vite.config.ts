import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      {
        find: "@components",
        replacement: resolve(__dirname, "./src/components"),
      },
      {
        find: "@type",
        replacement: resolve(__dirname, "./src/type"),
      },
      {
        find: "@hooks",
        replacement: resolve(__dirname, "./src/hooks"),
      },
      {
        find: "@layouts",
        replacement: resolve(__dirname, "./src/layouts"),
      },
      {
        find: "@pages",
        replacement: resolve(__dirname, "./src/pages"),
      },
    ],
  },
});
