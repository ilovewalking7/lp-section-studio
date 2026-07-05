import { Bolt, Lock, Palette, Rocket, Ruler, Shield } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "ブルータル・特徴グリッド",
  category: "ブルータリスト",
  description: "飽和カラーブロックと極太ボーダーの機能グリッド。",
  align: "full",
  isNew: true,
  tags: ["brutalist", "bold", "features"],
};

type Feature = {
  icon: LucideIcon;
  title: string;
  titleEn: string;
  body: string;
  bodyEn: string;
  bg: string;
};

const features: Feature[] = [
  { icon: Bolt, title: "爆速", titleEn: "Blazing", body: "サブミリ秒で描画。待たせない。", bodyEn: "Sub-millisecond rendering. No waiting.", bg: "bg-yellow-300" },
  { icon: Shield, title: "頑丈", titleEn: "Tough", body: "壊れにくい設計。安心して使える。", bodyEn: "Built not to break. Use with confidence.", bg: "bg-lime-300" },
  { icon: Palette, title: "大胆", titleEn: "Bold", body: "妥協なき色とコントラスト。", bodyEn: "Uncompromising color and contrast.", bg: "bg-fuchsia-400" },
  { icon: Lock, title: "安全", titleEn: "Secure", body: "デフォルトで型安全・アクセシブル。", bodyEn: "Type-safe and accessible by default.", bg: "bg-cyan-300" },
  { icon: Ruler, title: "正確", titleEn: "Precise", body: "ピクセル単位で意図通り。", bodyEn: "Pixel-perfect, exactly as intended.", bg: "bg-orange-400" },
  { icon: Rocket, title: "即出荷", titleEn: "Ship now", body: "貼って終わり。設定地獄なし。", bodyEn: "Paste and done. No config hell.", bg: "bg-white" },
];

export default function BrutalFeatureGrid() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <section className="w-full bg-black px-5 py-12 font-sans text-black sm:px-10 sm:py-16">
      <div className="mx-auto max-w-5xl">
        <h2 className="mb-10 text-4xl font-black uppercase tracking-tight text-white sm:text-5xl">
          {en ? "Features" : "機能"}<span className="text-lime-300">_</span>{en ? "list" : "一覧"}
        </h2>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => {
            const Icon = f.icon;
            return (
              <div
                key={f.title}
                className={cn(
                  "border-4 border-white p-6 shadow-[6px_6px_0_0_#fff] transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0_0_#fff]",
                  f.bg
                )}
              >
                <span className="mb-4 inline-flex h-12 w-12 items-center justify-center border-2 border-black bg-black text-white">
                  <Icon className="h-6 w-6" strokeWidth={2.5} />
                </span>
                <h3 className="text-2xl font-black uppercase">{en ? f.titleEn : f.title}</h3>
                <p className="mt-2 font-bold leading-relaxed">{en ? f.bodyEn : f.body}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
