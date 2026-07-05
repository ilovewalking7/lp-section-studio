import type { DemoMeta } from "@/registry";
import { CreditCard, ChevronRight } from "lucide-react";

export const meta: DemoMeta = {
  name: "カードボタン",
  category: "ボタン",
  description: "アイコン・見出し・補足を内包したカード型の大きな立体ボタン。",
  align: "center",
  isNew: true,
  tags: ["button", "glass"],
};

export default function CardButton() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <div className="flex items-center justify-center rounded-2xl bg-slate-100 p-10">
      <button
        type="button"
        className="group flex w-64 items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 text-left shadow-[0_8px_24px_-10px_rgba(15,23,42,0.2)] transition-all duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-[0_18px_38px_-12px_rgba(79,70,229,0.35)] active:translate-y-0"
      >
        <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-500 text-white shadow-inner">
          <CreditCard className="size-5" />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-sm font-semibold text-slate-800">{en ? "Payment method" : "支払い方法"}</span>
          <span className="block truncate text-xs text-slate-500">{en ? "Add a card" : "カードを追加する"}</span>
        </span>
        <ChevronRight className="size-4 shrink-0 text-slate-400 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:text-indigo-500" />
      </button>
    </div>
  );
}
