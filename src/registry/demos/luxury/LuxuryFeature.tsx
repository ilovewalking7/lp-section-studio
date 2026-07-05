import { Gem, Hammer, Leaf, ShieldCheck } from "lucide-react";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "ラグジュアリー・フィーチャー",
  category: "ラグジュアリー",
  description: "細罫の仕切りで区切る、上質で端正な特徴セクション。",
  align: "full",
  isNew: true,
  tags: ["luxury", "premium", "gold", "feature"],
  principle: "ヘアラインの仕切りと均等な余白が、整然とした秩序と作り手の誠実さを語る。",
};

const features = [
  {
    icon: Hammer,
    title: "熟練の手仕事",
    titleEn: "Master Craftsmanship",
    body: "一点ごとに数百時間を費やす、マイスターによる完全なハンドメイド。",
    bodyEn: "Entirely handmade by master artisans, with hundreds of hours devoted to every single piece.",
  },
  {
    icon: Gem,
    title: "厳選された素材",
    titleEn: "Curated Materials",
    body: "世界の鉱区から選び抜いた、最高品質の原石と貴金属のみを使用。",
    bodyEn: "Only the finest stones and precious metals, hand-selected from mines around the world.",
  },
  {
    icon: ShieldCheck,
    title: "生涯保証",
    titleEn: "Lifetime Guarantee",
    body: "所有される限り続く、無償のメンテナンスと修復のお約束。",
    bodyEn: "Complimentary maintenance and restoration, promised for as long as the piece is yours.",
  },
  {
    icon: Leaf,
    title: "持続可能性",
    titleEn: "Sustainability",
    body: "倫理的に調達された素材と、責任ある製造へのたゆまぬ取り組み。",
    bodyEn: "An unwavering commitment to ethically sourced materials and responsible craftsmanship.",
  },
];

export default function LuxuryFeature() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <section className="w-full bg-[#0a0a0a] px-6 py-24 text-stone-100">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-[11px] uppercase tracking-[0.4em] text-amber-300/80">
          The Maison
        </p>
        <h2 className="mt-5 font-display text-4xl font-light tracking-tight sm:text-5xl">
          {en ? "Excellence, Promised" : "約束された卓越"}
        </h2>
        <div className="mx-auto mt-6 h-px w-16 bg-gradient-to-r from-transparent via-amber-400/60 to-transparent" />
      </div>

      <div className="mx-auto mt-16 grid max-w-5xl border-t border-stone-800 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((f) => (
          <div
            key={f.title}
            className="group border-b border-stone-800 p-9 transition-colors hover:bg-[#101010] sm:[&:nth-child(odd)]:border-r lg:border-r lg:[&:last-child]:border-r-0"
          >
            <f.icon className="h-6 w-6 text-amber-300 transition-transform duration-300 group-hover:scale-110" />
            <h3 className="mt-6 font-display text-xl tracking-tight text-stone-100">
              {en ? f.titleEn : f.title}
            </h3>
            <div className="mt-4 h-px w-10 bg-amber-400/30 transition-all duration-300 group-hover:w-16" />
            <p className="mt-4 text-sm leading-relaxed text-stone-400">
              {en ? f.bodyEn : f.body}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
