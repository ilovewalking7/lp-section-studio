import { ArrowRight, BookOpen } from "lucide-react";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "リビールオンホバー",
  category: "カード演出",
  description: "ホバーで下から詳細が滑り上がって現れるカード。",
  align: "center",
  isNew: true,
  tags: ["card", "animation"],
};

export default function RevealOnHover() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <div className="w-full max-w-sm">
      <div className="group relative h-72 overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#1a1f3a] to-[#0b0d17] shadow-2xl shadow-black/40">
        <div className="absolute inset-0 flex flex-col justify-end p-7 transition-transform duration-500 ease-out group-hover:-translate-y-24">
          <div className="flex size-12 items-center justify-center rounded-xl bg-sky-500/15 text-sky-300">
            <BookOpen className="size-6" />
          </div>
          <h3 className="mt-5 text-lg font-semibold text-white">
            {en ? "Design Principles" : "デザインの原則"}
          </h3>
        </div>
        <div className="absolute inset-x-0 bottom-0 translate-y-full p-7 transition-transform duration-500 ease-out group-hover:translate-y-0">
          <p className="text-sm leading-relaxed text-slate-400">
            {en
              ? "Whitespace and rhythm create readability. Read on to learn more."
              : "余白とリズムが読みやすさを生み出します。続きを読んで詳しく学びましょう。"}
          </p>
          <button className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-sky-300">
            {en ? "Read more" : "続きを読む"} <ArrowRight className="size-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
