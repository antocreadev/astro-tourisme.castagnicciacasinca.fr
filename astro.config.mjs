// @ts-check
import { defineConfig, envField } from "astro/config";

import tailwindcss from "@tailwindcss/vite";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  site: "https://tourisme.castagnicciacasinca.fr",
  trailingSlash: "ignore",
  build: {
    format: "directory",
    assets: "_astro",
  },
  compressHTML: true,
  experimental: {
    clientPrerender: true,
  },
  env: {
    schema: {
      PUBLIC_API_URL: envField.string({
        context: "client",
        access: "public",
        optional: true,
      }),
    },
  },
  vite: {
    plugins: [tailwindcss()],
    server: {
      allowedHosts: ["cms.castagnicciacasinca.fr"],
    },
    build: {
      cssCodeSplit: true,
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ["react", "react-dom"],
          },
        },
      },
    },
  },
  integrations: [react()],
});
