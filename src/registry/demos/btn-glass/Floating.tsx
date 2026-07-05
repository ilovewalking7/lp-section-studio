import type { DemoMeta } from "@/registry";
import { Feather } from "lucide-react";

export const meta: DemoMeta = {
  name: "フローティング",
  category: "ボタン",
  description: "影とともに常時ふわふわと浮遊する、フローティング・ボタン。",
  align: "center",
  isNew: true,
  tags: ["button", "glass"],
};

export default function Floating() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <div className="flex items-center justify-center rounded-2xl bg-gradient-to-br from-violet-200 to-sky-200 p-12">
      <style>{`
        @keyframes bg-float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-7px)} }
        @keyframes bg-shadow { 0%,100%{transform:scaleX(1);opacity:.35} 50%{transform:scaleX(.82);opacity:.2} }
      `}</style>
      <div className="flex flex-col items-center">
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-2xl bg-white px-7 py-3.5 text-sm font-semibold text-violet-600 shadow-lg ring-1 ring-violet-900/5 transition-transform duration-300 hover:scale-105 active:scale-100"
          style={{ animation: "bg-float 3s ease-in-out infinite" }}
        >
          <Feather className="size-4" />
          {en ? "Floating" : "浮遊ボタン"}
        </button>
        <span
          className="mt-3 h-2 w-24 rounded-[50%] bg-violet-900/40 blur-md"
          style={{ animation: "bg-shadow 3s ease-in-out infinite" }}
        />
      </div>
    </div>
  );
}
