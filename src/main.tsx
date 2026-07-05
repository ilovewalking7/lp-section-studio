import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { initAnalytics } from "@/lib/analytics";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);

// 本番のみ・ID 設定時のみ（Clarity 等）。初期描画後に async 読み込み。
initAnalytics();
