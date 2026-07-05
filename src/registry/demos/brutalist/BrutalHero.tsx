import { ArrowRight, Star, Zap } from "lucide-react";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "ブルータル・ヒーロー",
  category: "ブルータリスト",
  description: "極太の見出しとハードシャドウのCTAで殴りに来るヒーロー。",
  align: "full",
  isNew: true,
  tags: ["brutalist", "bold", "hero"],
};

const BADGES = [
  { key: "github", ja: "12K★ GitHub", en: "12K★ GitHub" },
  { key: "deps", ja: "0 依存", en: "0 dependencies" },
  { key: "typesafe", ja: "100% 型安全", en: "100% type-safe" },
];

export default function BrutalHero() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <section className="w-full bg-yellow-300 px-5 py-12 font-sans text-black sm:px-10 sm:py-16">
      <div className="mx-auto max-w-5xl">
        <div className="mb-6 inline-flex items-center gap-2 border-2 border-black bg-white px-3 py-1 font-mono text-xs font-bold uppercase shadow-[4px_4px_0_0_#000]">
          <Zap className="h-4 w-4" fill="black" />
          {en ? "v2.0 shipped" : "v2.0 出荷済み"}
        </div>

        <h1 className="text-5xl font-black uppercase leading-[0.9] tracking-tight sm:text-7xl">
          {en ? (
            <>
              Build.
              <br />
              <span className="bg-black px-2 text-yellow-300">Don't break.</span>
              <br />
              Ship.
            </>
          ) : (
            <>
              作れ。
              <br />
              <span className="bg-black px-2 text-yellow-300">壊すな。</span>
              <br />
              出荷しろ。
            </>
          )}
        </h1>

        <p className="mt-6 max-w-xl border-l-4 border-black pl-4 text-lg font-bold sm:text-xl">
          {en
            ? "No frills. Raw, bold, unapologetic UI — right now."
            : "飾りはいらない。生で、太くて、容赦のないUIを、いますぐ。"}
        </p>

        <div className="mt-8 flex flex-wrap gap-4">
          <button className="group inline-flex items-center gap-2 border-4 border-black bg-fuchsia-400 px-6 py-3 text-base font-black uppercase shadow-[6px_6px_0_0_#000] transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0_0_#000] active:translate-x-1.5 active:translate-y-1.5 active:shadow-none">
            {en ? "Get started" : "今すぐ始める"}
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </button>
          <button className="inline-flex items-center gap-2 border-4 border-black bg-white px-6 py-3 text-base font-black uppercase shadow-[6px_6px_0_0_#000] transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0_0_#000]">
            <Star className="h-5 w-5" />
            {en ? "Watch demo" : "デモを見る"}
          </button>
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-3 font-mono text-sm font-bold">
          {BADGES.map((t) => (
            <span
              key={t.key}
              className="border-2 border-black bg-cyan-300 px-3 py-1"
            >
              {en ? t.en : t.ja}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
