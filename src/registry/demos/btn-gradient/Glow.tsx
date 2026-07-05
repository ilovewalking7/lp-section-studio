import type { DemoMeta } from "@/registry";
import { Rocket } from "lucide-react";

export const meta: DemoMeta = {
  name: "グロー",
  category: "ボタン",
  description: "柔らかな box-shadow グローを纏ったボタン。ホバーで光が広がる。",
  align: "center",
  isNew: true,
  tags: ["button", "gradient"],
};

export default function Glow() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <div className="flex items-center justify-center rounded-2xl bg-[#0b0b12] p-8">
      <button
        type="button"
        className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-500 px-7 py-3.5 text-sm font-semibold text-white shadow-[0_0_18px_-2px_rgba(56,189,248,0.6),0_0_40px_-8px_rgba(99,102,241,0.6)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_28px_0px_rgba(56,189,248,0.8),0_0_70px_-6px_rgba(99,102,241,0.85)] active:translate-y-0"
      >
        <Rocket className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        {en ? "Launch" : "打ち上げる"}
      </button>
    </div>
  );
}
