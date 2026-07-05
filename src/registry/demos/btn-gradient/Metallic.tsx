import type { DemoMeta } from "@/registry";
import { Shield } from "lucide-react";

export const meta: DemoMeta = {
  name: "メタリック",
  category: "ボタン",
  description: "磨かれた金属のような陰影とハイライトを持つ立体メタルボタン。",
  align: "center",
  isNew: true,
  tags: ["button", "gradient"],
};

export default function Metallic() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <div className="flex items-center justify-center rounded-2xl bg-[#0b0b12] p-8">
      <button
        type="button"
        className="group relative inline-flex items-center gap-2 rounded-xl px-7 py-3.5 text-sm font-semibold text-slate-900 transition-transform duration-200 hover:-translate-y-0.5 active:translate-y-0"
        style={{
          backgroundImage:
            "linear-gradient(180deg,#fafafa 0%,#cbd5e1 45%,#94a3b8 55%,#e2e8f0 100%)",
          boxShadow:
            "inset 0 1px 0 rgba(255,255,255,0.9), inset 0 -2px 4px rgba(0,0,0,0.25), 0 6px 16px -6px rgba(0,0,0,0.7)",
        }}
      >
        <Shield className="size-4" />
        {en ? "Metallic" : "メタリック"}
      </button>
    </div>
  );
}
