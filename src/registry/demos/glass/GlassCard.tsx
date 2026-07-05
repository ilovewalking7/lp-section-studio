import { ArrowUpRight, Layers } from "lucide-react";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "グラス・カード",
  category: "グラスモーフィズム",
  description: "サンセット調の背景に映える、上品な単体フロステッドガラスカード。",
  align: "center",
  isNew: true,
  tags: ["glass", "frosted", "card"],
};

export default function GlassCard() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <div className="relative isolate flex w-full max-w-xl items-center justify-center overflow-hidden rounded-3xl bg-gradient-to-br from-orange-400 via-rose-500 to-purple-600 p-10">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-16 -top-16 size-72 rounded-full bg-yellow-300/50 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-20 -right-10 size-80 rounded-full bg-indigo-500/40 blur-3xl"
      />

      <div className="relative w-full max-w-sm rounded-2xl border border-white/20 bg-white/10 p-7 shadow-2xl backdrop-blur-xl">
        <div className="flex size-12 items-center justify-center rounded-xl border border-white/25 bg-white/15 text-white backdrop-blur">
          <Layers className="size-6" />
        </div>

        <h3 className="mt-5 text-xl font-semibold text-white">
          {en ? "Layered design" : "レイヤード・デザイン"}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-white/80">
          {en
            ? "Stacking translucent glass layers lets the background colors shine through while keeping the information hierarchy clear."
            : "半透明のガラス層を重ねることで、背景の色彩を活かしながら情報の階層を明確に表現します。"}
        </p>

        <a
          href="#"
          className="group mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-white"
        >
          {en ? "Learn more" : "もっと知る"}
          <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      </div>
    </div>
  );
}
