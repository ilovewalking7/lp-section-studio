import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "node:path";

// 全 260 コンポーネントを jsdom 上で実レンダリングし、例外が出ないか検査するための設定。
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./src/test/setup.ts"],
    testTimeout: 30000,
    // Vitest はデフォルトで .css の中身を空文字に差し替える（高速化のため）。
    // ミセテLP書き出し（src/lp/export.ts）が `./lp.css?raw` で実CSSをインライン埋め込み
    // するため、lp.css だけは実内容を透過させる。
    css: { include: [/lp\.css/] },
  },
});
