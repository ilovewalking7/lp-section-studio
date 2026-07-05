import { Gauge, Lock, Palette, Workflow } from "lucide-react";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "グラス・機能セクション",
  category: "グラスモーフィズム",
  description: "アクア〜パープルの背景にフロステッドガラスの機能カードを並べたセクション。",
  align: "full",
  isNew: true,
  tags: ["glass", "frosted", "feature"],
};

const features = [
  {
    icon: Gauge,
    titleJa: "圧倒的な高速性",
    titleEn: "Blazing fast",
    bodyJa: "エッジ最適化により、世界中どこからでもミリ秒単位の応答を実現します。",
    bodyEn: "Edge optimization delivers millisecond responses from anywhere in the world.",
  },
  {
    icon: Lock,
    titleJa: "堅牢なセキュリティ",
    titleEn: "Rock-solid security",
    bodyJa: "エンドツーエンド暗号化と細やかな権限制御で、データを守ります。",
    bodyEn: "End-to-end encryption and granular permissions keep your data safe.",
  },
  {
    icon: Palette,
    titleJa: "美しいデザイン",
    titleEn: "Beautiful design",
    bodyJa: "細部までこだわったコンポーネントで、洗練された体験を構築できます。",
    bodyEn: "Meticulously crafted components let you build a refined experience.",
  },
  {
    icon: Workflow,
    titleJa: "柔軟なワークフロー",
    titleEn: "Flexible workflow",
    bodyJa: "あらゆるツールと連携し、チームの生産性を最大化します。",
    bodyEn: "Integrates with any tool to maximize your team's productivity.",
  },
];

export default function GlassFeature() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <section className="relative isolate w-full overflow-hidden bg-gradient-to-br from-cyan-500 via-blue-600 to-purple-700 px-6 py-24">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 top-10 size-96 rounded-full bg-teal-300/40 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-20 bottom-0 size-96 rounded-full bg-fuchsia-400/40 blur-3xl"
      />

      <div className="relative mx-auto max-w-5xl">
        <div className="mx-auto mb-14 max-w-xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            {en ? "One platform, everything you need" : "すべてが揃った、ひとつの基盤"}
          </h2>
          <p className="mt-3 text-white/75">
            {en
              ? "From development to deploy to operations — every feature, in a frosted experience."
              : "開発からデプロイ、運用まで。必要な機能をフロステッドな体験で。"}
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {features.map((f) => (
            <div
              key={f.titleEn}
              className="flex gap-5 rounded-2xl border border-white/20 bg-white/10 p-7 shadow-2xl backdrop-blur-xl"
            >
              <div className="flex size-12 shrink-0 items-center justify-center rounded-xl border border-white/25 bg-white/15 text-white backdrop-blur">
                <f.icon className="size-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">{en ? f.titleEn : f.titleJa}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-white/80">
                  {en ? f.bodyEn : f.bodyJa}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
