// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import rollupNodePolyFill from "rollup-plugin-node-polyfills";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Polyfills for `global`, `process`, `buffer`, etc.
      process: "process/browser",
      buffer: "buffer",
    },
  },
  define: {
    global: "globalThis", // This fixes the "global is not defined" error
  },
  build: {
    rollupOptions: {
      plugins: [rollupNodePolyFill()],
    },
  },
  optimizeDeps: {
    include: ["process", "buffer"],
  },
});
