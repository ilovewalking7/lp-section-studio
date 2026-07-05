import { ArrowRight, Rocket } from "lucide-react";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "ネオンCTA",
  category: "レトロ・Y2K",
  description: "グリッド背景と発光する縁取りで誘導する、ネオンのCTAバンド。",
  align: "full",
  isNew: true,
  tags: ["retro", "y2k", "neon", "cta"],
};

export default function NeonCTA() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <section className="w-full bg-[#0d0221] px-6 py-16">
      <div
        className="relative mx-auto max-w-4xl overflow-hidden rounded-3xl border-2 border-[#05d9e8] px-8 py-14 text-center"
        style={{
          background: "linear-gradient(135deg, #1a0b2e 0%, #2a0b4e 100%)",
          boxShadow: "0 0 40px rgba(5,217,232,0.4), inset 0 0 60px rgba(255,46,151,0.15)",
        }}
      >
        {/* grid */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-25"
          style={{
            backgroundImage:
              "linear-gradient(rgba(5,217,232,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(5,217,232,0.4) 1px, transparent 1px)",
            backgroundSize: "36px 36px",
            maskImage: "radial-gradient(ellipse at center, black, transparent 75%)",
            WebkitMaskImage: "radial-gradient(ellipse at center, black, transparent 75%)",
          }}
        />
        {/* corner glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute -left-20 -top-20 size-60 rounded-full bg-[radial-gradient(circle,rgba(255,46,151,0.5),transparent_60%)] blur-2xl"
        />

        <div className="relative">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#ff2e97]/60 bg-[#ff2e97]/10 px-4 py-1 font-mono text-xs uppercase tracking-[0.3em] text-[#ff2e97] shadow-[0_0_16px_rgba(255,46,151,0.5)]">
            <Rocket className="size-3.5" />
            launch ready
          </span>

          <h2
            className="mt-6 text-balance text-4xl font-black uppercase italic text-white sm:text-5xl"
            style={{ textShadow: "0 0 18px rgba(5,217,232,0.8), 3px 3px 0 #ff2e97" }}
          >
            {en ? "Level up your game" : "次のレベルへ、いこう"}
          </h2>
          <p className="mx-auto mt-4 max-w-md text-pretty text-[#d8b4fe]">
            {en
              ? "Neon-charged components to take your product to the next stage."
              : "ネオンに輝くコンポーネントで、あなたのプロダクトを一段上の体験に。"}
          </p>

          <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <button className="group inline-flex items-center gap-2 rounded-md bg-[#05d9e8] px-7 py-3 font-mono text-sm font-bold uppercase tracking-wider text-[#0d0221] shadow-[0_0_25px_rgba(5,217,232,0.7)] transition-all hover:shadow-[0_0_40px_rgba(5,217,232,0.95)]">
              {en ? "Start free" : "無料で始める"}
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </button>
            <button className="inline-flex items-center rounded-md border border-[#ff2e97] px-7 py-3 font-mono text-sm font-bold uppercase tracking-wider text-[#ff2e97] shadow-[0_0_15px_rgba(255,46,151,0.4)] transition-all hover:bg-[#ff2e97]/10">
              {en ? "See pricing" : "料金を見る"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
