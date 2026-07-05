import { ArrowRight, Download, Heart, Sparkles, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "ブルータル・ボタン集",
  category: "ブルータリスト",
  description: "色違いのバリアントとホバーで沈むブルータルなボタンとバッジ。",
  align: "center",
  isNew: true,
  tags: ["brutalist", "bold", "buttons"],
};

const baseBtn =
  "inline-flex items-center gap-2 border-4 border-black px-5 py-2.5 font-black uppercase shadow-[5px_5px_0_0_#000] transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-[1px_1px_0_0_#000] active:translate-x-1.5 active:translate-y-1.5 active:shadow-none";

export default function BrutalButtonSet() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <div className="bg-yellow-300 p-8 font-sans text-black">
      <div className="space-y-8">
        <div>
          <div className="mb-3 font-mono text-xs font-black uppercase">
            {en ? "Buttons" : "ボタン"}
          </div>
          <div className="flex flex-wrap gap-4">
            <button className={cn(baseBtn, "bg-fuchsia-400")}>
              {en ? "Continue" : "続ける"}{" "}
              <ArrowRight className="h-4 w-4" strokeWidth={3} />
            </button>
            <button className={cn(baseBtn, "bg-cyan-300")}>
              <Download className="h-4 w-4" strokeWidth={3} />{" "}
              {en ? "Get" : "取得"}
            </button>
            <button className={cn(baseBtn, "bg-lime-300")}>
              <Sparkles className="h-4 w-4" strokeWidth={3} />{" "}
              {en ? "Magic" : "魔法"}
            </button>
            <button className={cn(baseBtn, "bg-black text-white shadow-[5px_5px_0_0_#000] ring-2 ring-black")}>
              <Trash2 className="h-4 w-4" strokeWidth={3} />{" "}
              {en ? "Delete" : "削除"}
            </button>
          </div>
        </div>

        <div>
          <div className="mb-3 font-mono text-xs font-black uppercase">
            {en ? "Sizes" : "サイズ"}
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <button className="border-2 border-black bg-orange-400 px-3 py-1 text-sm font-black uppercase shadow-[3px_3px_0_0_#000] transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[1px_1px_0_0_#000]">
              {en ? "SM" : "小"}
            </button>
            <button className={cn(baseBtn, "bg-orange-400")}>
              {en ? "MD" : "中"}
            </button>
            <button className="inline-flex items-center gap-2 border-4 border-black bg-orange-400 px-7 py-3.5 text-lg font-black uppercase shadow-[7px_7px_0_0_#000] transition-all hover:translate-x-1.5 hover:translate-y-1.5 hover:shadow-[1px_1px_0_0_#000]">
              {en ? "LG" : "大"}
            </button>
          </div>
        </div>

        <div>
          <div className="mb-3 font-mono text-xs font-black uppercase">
            {en ? "Badges" : "バッジ"}
          </div>
          <div className="flex flex-wrap gap-3 font-mono text-sm font-black uppercase">
            <span className="border-2 border-black bg-lime-300 px-3 py-1">
              NEW
            </span>
            <span className="border-2 border-black bg-fuchsia-400 px-3 py-1">
              SALE -50%
            </span>
            <span className="inline-flex items-center gap-1 border-2 border-black bg-cyan-300 px-3 py-1">
              <Heart className="h-3.5 w-3.5" fill="black" />{" "}
              {en ? "Popular" : "人気"}
            </span>
            <span className="border-2 border-black bg-black px-3 py-1 text-yellow-300">
              {en ? "Limited" : "限定"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
