import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // 104+ のコンポーネントを内包するカタログのため、警告閾値を緩める
    chunkSizeWarningLimit: 1500,
  },
});
