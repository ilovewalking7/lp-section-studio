import type { DemoMeta } from "@/registry";
import { Zap, Palette, Shapes, Wand2, Layers, Rocket } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export const meta: DemoMeta = {
  name: "メンフィス・特徴グリッド",
  category: "メンフィス",
  description: "カラフルな幾何学シェイプで構成する特徴グリッド。",
  align: "full",
  isNew: true,
  tags: ["memphis", "geometric", "80s"],
};

type Feature = {
  icon: LucideIcon;
  title: string;
  titleEn: string;
  desc: string;
  descEn: string;
  color: string;
};

const features: Feature[] = [
  { icon: Zap, title: "高速", titleEn: "Fast", desc: "ゼロ依存で軽快に動く描画エンジン。", descEn: "A zero-dependency engine that runs light and snappy.", color: "#ffd23f" },
  { icon: Palette, title: "鮮やか", titleEn: "Vivid", desc: "プライマリーとパステルの大胆な配色。", descEn: "Bold palettes of primaries and pastels.", color: "#ff5c8a" },
  { icon: Shapes, title: "幾何学", titleEn: "Geometric", desc: "ジグザグ・円・三角の自由な組み合わせ。", descEn: "Mix zigzags, circles, and triangles freely.", color: "#1fb6c1" },
  { icon: Wand2, title: "簡単", titleEn: "Easy", desc: "コピペで即動く自己完結コンポーネント。", descEn: "Self-contained components that work on paste.", color: "#7b5cff" },
  { icon: Layers, title: "重ね自在", titleEn: "Layered", desc: "レイヤーを重ねて奥行きを演出。", descEn: "Stack layers to build real depth.", color: "#ff8c42" },
  { icon: Rocket, title: "拡張可能", titleEn: "Scalable", desc: "プロダクトの規模に合わせて成長。", descEn: "Grows with your product at any size.", color: "#ff5c8a" },
];

export default function MemphisFeatureGrid() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <section className="relative w-full overflow-hidden bg-[#fdf6e3] px-6 py-20">
      <div className="pointer-events-none absolute inset-0 opacity-70">
        <svg viewBox="0 0 120 40" className="absolute right-[8%] top-[8%] w-32" fill="none" aria-hidden>
          <path d="M2 20c10-22 24 22 34 0s24-22 34 0 24 22 34 0" stroke="#7b5cff" strokeWidth={5} strokeLinecap="round" />
        </svg>
        <div className="absolute bottom-[8%] left-[6%] h-12 w-12 rounded-full border-[4px] border-black bg-[#ffd23f]" />
      </div>

      <div className="relative mx-auto max-w-5xl">
        <div className="text-center">
          <span className="inline-block -rotate-2 rounded-full border-[3px] border-black bg-[#1fb6c1] px-4 py-1 text-sm font-black uppercase tracking-wide text-white shadow-[3px_3px_0_0_#000]">
            {en ? "Features" : "特徴"}
          </span>
          <h2 className="mt-5 text-4xl font-black tracking-tight text-black sm:text-5xl">
            {en ? "Play and function, all of it." : "遊びと機能を、ぜんぶ。"}
          </h2>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <div
              key={f.titleEn}
              className="group relative rounded-2xl border-[3px] border-black bg-white p-6 shadow-[5px_5px_0_0_#000] transition-transform hover:-translate-y-1.5"
            >
              <div
                className="mb-4 flex size-14 items-center justify-center rounded-2xl border-[3px] border-black shadow-[3px_3px_0_0_#000] transition-transform group-hover:rotate-6"
                style={{ backgroundColor: f.color }}
              >
                <f.icon className="size-7 text-black" strokeWidth={2.5} />
              </div>
              <h3 className="text-lg font-black text-black">{en ? f.titleEn : f.title}</h3>
              <p className="mt-1.5 text-sm font-semibold leading-relaxed text-black/65">
                {en ? f.descEn : f.desc}
              </p>
              <span
                className="absolute right-4 top-4 h-3 w-3 rounded-full border-2 border-black"
                style={{ backgroundColor: f.color }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
