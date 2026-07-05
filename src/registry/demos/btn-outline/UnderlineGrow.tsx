import type { DemoMeta } from "@/registry";
import { ArrowUpRight } from "lucide-react";

export const meta: DemoMeta = {
  name: "下線グロー",
  category: "ボタン",
  description: "ホバーで下線が中央から左右に伸びる、リンク風ミニマルボタン。",
  align: "center",
  isNew: true,
  tags: ["button", "outline"],
};

export default function UnderlineGrow() {
  const en = typeof document !== "undefined" && document.documentElement.lang === "en";
  return (
    <div className="flex items-center justify-center rounded-2xl bg-[#101012] p-8">
      <button
        type="button"
        className="group relative inline-flex items-center gap-1 px-2 py-2 text-sm font-semibold text-zinc-100 focus-visible:outline-none"
      >
        {en ? "Read more" : "もっと読む"}
        <ArrowUpRight className="size-4 text-rose-400 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        <span className="pointer-events-none absolute bottom-0 left-1/2 h-0.5 w-0 -translate-x-1/2 bg-rose-400 transition-all duration-300 group-hover:w-full" />
      </button>
    </div>
  );
}
