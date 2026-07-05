import type { DemoMeta } from "@/registry";
import { Rocket } from "lucide-react";

export const meta: DemoMeta = {
  name: "左アイコン",
  category: "ボタン",
  description: "ラベルの左にアイコンを置いた基本のアイコンボタン。ホバーでアイコンが浮く。",
  align: "center",
  isNew: true,
  tags: ["button", "icon"],
};

export default function IconLeft() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <div className="flex items-center justify-center rounded-2xl bg-slate-100 p-8">
      <button
        type="button"
        className="group inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-600/30 transition-all duration-300 hover:bg-indigo-700 active:scale-[0.97]"
      >
        <Rocket className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:rotate-12" />
        {en ? "Launch" : "打ち上げる"}
      </button>
    </div>
  );
}
