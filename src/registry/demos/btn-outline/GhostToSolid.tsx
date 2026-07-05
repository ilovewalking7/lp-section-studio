import type { DemoMeta } from "@/registry";
import { Check } from "lucide-react";

export const meta: DemoMeta = {
  name: "ゴースト→ソリッド",
  category: "ボタン",
  description: "枠だけのゴースト状態からホバーで影付きソリッドに変わるボタン。",
  align: "center",
  isNew: true,
  tags: ["button", "outline"],
};

export default function GhostToSolid() {
  const en = typeof document !== "undefined" && document.documentElement.lang === "en";
  return (
    <div className="flex items-center justify-center rounded-2xl bg-[#0c0d11] p-8">
      <button
        type="button"
        className="group inline-flex items-center gap-2 rounded-xl border border-indigo-400/70 bg-transparent px-7 py-3.5 text-sm font-semibold text-indigo-300 shadow-none transition-all duration-300 hover:border-indigo-500 hover:bg-indigo-500 hover:text-white hover:shadow-[0_10px_30px_-8px_rgba(99,102,241,0.6)] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/50"
      >
        <Check className="size-4" />
        {en ? "Confirm" : "確定する"}
      </button>
    </div>
  );
}
