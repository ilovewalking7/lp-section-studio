import type { DemoMeta } from "@/registry";
import { Search } from "lucide-react";

export const meta: DemoMeta = {
  name: "インセット",
  category: "ボタン",
  description: "面に彫り込まれたように内側へ落ち込む、インセット（埋め込み）ボタン。",
  align: "center",
  isNew: true,
  tags: ["button", "glass"],
};

export default function Inset() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <div className="flex items-center justify-center rounded-2xl bg-[#1b1f2a] p-10">
      <button
        type="button"
        className="inline-flex items-center gap-2 rounded-xl bg-[#1b1f2a] px-7 py-3.5 text-sm font-semibold text-slate-200 shadow-[inset_0_2px_6px_rgba(0,0,0,0.7),inset_0_-1px_0_rgba(255,255,255,0.08)] ring-1 ring-white/5 transition-all duration-200 hover:text-white hover:ring-white/10 active:shadow-[inset_0_4px_10px_rgba(0,0,0,0.85)]"
      >
        <Search className="size-4 text-sky-400" />
        {en ? "Search" : "検索する"}
      </button>
    </div>
  );
}
