import { ArrowUpRight, Heart, MessageCircle } from "lucide-react";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "ブルータル・カード",
  category: "ブルータリスト",
  description: "ハードシャドウとホバーで沈むコンテンツカード。",
  align: "center",
  isNew: true,
  tags: ["brutalist", "bold", "card"],
};

export default function BrutalCard() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <div className="bg-lime-300 p-8 font-sans text-black">
      <article className="group w-80 max-w-full border-4 border-black bg-white shadow-[8px_8px_0_0_#000] transition-all hover:translate-x-1.5 hover:translate-y-1.5 hover:shadow-[2px_2px_0_0_#000]">
        <div className="flex h-40 items-center justify-center border-b-4 border-black bg-fuchsia-400">
          <span className="font-mono text-6xl font-black">B</span>
        </div>

        <div className="p-5">
          <div className="mb-3 inline-block border-2 border-black bg-yellow-300 px-2 py-0.5 font-mono text-xs font-black uppercase">
            {en ? "Design" : "設計"}
          </div>
          <h3 className="text-2xl font-black uppercase leading-tight">
            {en ? "Raw, undressed design" : "生のままのデザイン"}
          </h3>
          <p className="mt-2 font-medium leading-relaxed">
            {en
              ? "Strip away the decoration and speak with structure and contrast alone. That's brutalism."
              : "余計な装飾を削ぎ落とし、構造とコントラストだけで語る。それがブルータリズム。"}
          </p>

          <div className="mt-5 flex items-center justify-between border-t-2 border-black pt-4">
            <div className="flex gap-3 font-mono text-sm font-bold">
              <span className="inline-flex items-center gap-1">
                <Heart className="h-4 w-4" fill="black" /> 248
              </span>
              <span className="inline-flex items-center gap-1">
                <MessageCircle className="h-4 w-4" /> 32
              </span>
            </div>
            <button className="inline-flex items-center gap-1 border-2 border-black bg-cyan-300 px-3 py-1.5 font-black uppercase shadow-[3px_3px_0_0_#000] transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[1px_1px_0_0_#000]">
              {en ? "Read" : "読む"}
              <ArrowUpRight className="h-4 w-4" strokeWidth={3} />
            </button>
          </div>
        </div>
      </article>
    </div>
  );
}
