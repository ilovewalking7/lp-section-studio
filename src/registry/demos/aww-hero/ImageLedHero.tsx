import type { DemoMeta } from "@/registry";
import { ArrowUpRight } from "lucide-react";

export const meta: DemoMeta = {
  name: "グラデ画像主役ヒーロー",
  category: "Awwwards",
  description:
    "CSSグラデーションで描いた巨大ビジュアルを主役に据えた、フルブリードのイメージ先導ヒーロー。",
  align: "full",
  isNew: true,
  tags: ["awwwards", "hero", "animation"],
};

export default function ImageLedHero() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <section className="aww-ilh relative w-full overflow-hidden bg-[#0a0a0f] px-5 py-20 text-white sm:px-10 sm:py-28">
      <style>{`
        @keyframes aww-ilh-float {
          0%,100% { transform: translate3d(0,0,0) scale(1); }
          50% { transform: translate3d(2%,-3%,0) scale(1.05); }
        }
        @keyframes aww-ilh-rise {
          from { opacity: 0; transform: translateY(28px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .aww-ilh-blob { animation: aww-ilh-float 14s ease-in-out infinite; }
        .aww-ilh-rise { animation: aww-ilh-rise .9s cubic-bezier(.16,1,.3,1) both; }
        @media (prefers-reduced-motion: reduce) {
          .aww-ilh-blob, .aww-ilh-rise { animation: none !important; }
        }
      `}</style>

      <div className="relative mx-auto grid max-w-[1500px] gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div className="relative z-10">
          <p className="aww-ilh-rise mb-6 text-[11px] font-semibold uppercase tracking-[0.5em] text-white/50">
            Atelier — 2026
          </p>
          <h1
            className="aww-ilh-rise font-black leading-[0.92] tracking-[-0.04em]"
            style={{ fontSize: "clamp(2.6rem,7vw,6rem)", animationDelay: ".08s" }}
          >
            {en ? (
              <>
                New landscapes
                <br />
                told in{" "}
                <span className="bg-gradient-to-r from-fuchsia-400 via-rose-400 to-amber-300 bg-clip-text text-transparent">
                  pure color
                </span>
              </>
            ) : (
              <>
                色彩で
                <br />
                語る、
                <span className="bg-gradient-to-r from-fuchsia-400 via-rose-400 to-amber-300 bg-clip-text text-transparent">
                  新しい風景
                </span>
              </>
            )}
          </h1>
          <p
            className="aww-ilh-rise mt-7 max-w-md text-base leading-relaxed text-white/60"
            style={{ animationDelay: ".16s" }}
          >
            {en
              ? "No photos — depth and light drawn from the density of gradients alone. A visual experiment that makes light itself the subject."
              : "写真を使わず、グラデーションの厚みだけで奥行きと光を描く。これは光そのものを主役にしたビジュアル実験です。"}
          </p>
          <div
            className="aww-ilh-rise mt-9 flex flex-wrap items-center gap-4"
            style={{ animationDelay: ".24s" }}
          >
            <button className="group inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-black transition-transform hover:-translate-y-0.5">
              {en ? "View the works" : "作品を見る"}
              <ArrowUpRight className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
            <span className="text-sm text-white/40">
              {en ? "12-part series / Free to share" : "12の連作 / 自由配布"}
            </span>
          </div>
        </div>

        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2rem] ring-1 ring-white/10 sm:aspect-[5/4]">
          <div className="aww-ilh-blob absolute -left-1/4 -top-1/4 h-[120%] w-[120%] bg-[radial-gradient(circle_at_30%_30%,#ff4d8d,transparent_55%),radial-gradient(circle_at_70%_60%,#7c3aed,transparent_55%),radial-gradient(circle_at_50%_90%,#fbbf24,transparent_50%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(120deg,transparent,rgba(0,0,0,0.4))]" />
          <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
            <p className="text-sm font-medium tracking-wide text-white/80">
              No. 07 — “Aurora Field”
            </p>
            <span className="rounded-full bg-white/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest backdrop-blur">
              CSS only
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
