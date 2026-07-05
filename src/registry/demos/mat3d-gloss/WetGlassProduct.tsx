import type { DemoMeta } from "@/registry";
import { Droplets } from "lucide-react";

export const meta: DemoMeta = {
  name: "ウェットグラス プロダクト",
  category: "3Dアニメ",
  description:
    "濡れたガラス層の下に置いた製品カード。ぼかしたハイライトが反射のように滑り、水滴がきらめく。",
  align: "center",
  isNew: true,
  level: "advanced",
  tags: ["3d", "gloss", "materials", "animation"],
  principle:
    "水濡れのような艶は鮮度・清潔・上質の連想を呼び、触れたくなる衝動（タッチ欲求）を高める。",
};

export default function WetGlassProduct() {
  const en =
    typeof document !== "undefined" && document.documentElement.lang === "en";

  return (
    <div className="flex w-full flex-col items-center gap-5 py-6">
      <style>{`
        @keyframes wg-glide {
          0%   { transform: translateX(-120%) skewX(-12deg); }
          100% { transform: translateX(220%) skewX(-12deg); }
        }
        @keyframes wg-drop {
          0%,100% { opacity: 0.35; transform: scale(0.85); }
          50%     { opacity: 1;    transform: scale(1.1); }
        }
        @media (prefers-reduced-motion: reduce) {
          .wg-glide { animation: none !important; transform: translateX(60%) skewX(-12deg) !important; }
          .wg-drop  { animation: none !important; opacity: 0.8 !important; }
        }
      `}</style>

      <div
        className="relative w-72 overflow-hidden rounded-[26px]"
        style={{
          background:
            "linear-gradient(160deg, #14313a 0%, #0c1f27 55%, #061318 100%)",
          boxShadow:
            "0 28px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.12)",
        }}
      >
        {/* product surface */}
        <div className="relative px-7 pb-7 pt-10">
          <div
            className="mx-auto mb-6 grid h-36 w-36 place-items-center rounded-3xl"
            style={{
              background:
                "radial-gradient(circle at 34% 26%, #5be0c8 0%, #1ea98f 42%, #0c6b58 100%)",
              boxShadow:
                "inset 0 2px 10px rgba(255,255,255,0.45), inset 0 -10px 20px rgba(0,0,0,0.35), 0 12px 26px rgba(0,0,0,0.4)",
            }}
          >
            <span
              className="text-5xl font-black text-emerald-950/80"
              style={{ textShadow: "0 1px 0 rgba(255,255,255,0.4)" }}
            >
              {en ? "AQ" : "潤"}
            </span>
          </div>

          <h3 className="text-center text-lg font-bold text-cyan-50">
            {en ? "Aqua Serum" : "アクア セラム"}
          </h3>
          <p className="mt-1 text-center text-xs text-cyan-100/55">
            {en ? "Deep hydration · 30ml" : "ディープ保湿 · 30ml"}
          </p>

          {/* clipped reflection of the product */}
          <div
            className="pointer-events-none absolute inset-x-7 bottom-0 h-10 overflow-hidden opacity-25"
            style={{
              transform: "scaleY(-1)",
              maskImage: "linear-gradient(to bottom, #000 0%, transparent 90%)",
              WebkitMaskImage:
                "linear-gradient(to bottom, #000 0%, transparent 90%)",
            }}
          >
            <div
              className="mx-auto h-36 w-36 rounded-3xl"
              style={{
                background:
                  "radial-gradient(circle at 34% 26%, #5be0c8 0%, #1ea98f 60%, #0c6b58 100%)",
              }}
            />
          </div>
        </div>

        {/* droplet sparkles */}
        {DROPS.map((d, i) => (
          <span
            key={`drop-${i}`}
            className="wg-drop pointer-events-none absolute rounded-full"
            style={{
              left: `${d.x}%`,
              top: `${d.y}%`,
              width: d.s,
              height: d.s,
              background:
                "radial-gradient(circle at 35% 30%, rgba(255,255,255,0.95) 0%, rgba(180,230,240,0.5) 45%, rgba(255,255,255,0) 72%)",
              boxShadow:
                "inset 0 -1px 2px rgba(0,0,0,0.2), 0 1px 3px rgba(0,0,0,0.25)",
              animation: `wg-drop ${d.dur}s ease-in-out ${d.delay}s infinite`,
            }}
          />
        ))}

        {/* wet-glass moving highlight */}
        <div
          className="wg-glide pointer-events-none absolute inset-y-0 left-0 w-1/3"
          style={{
            background:
              "linear-gradient(100deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.55) 50%, rgba(255,255,255,0) 100%)",
            filter: "blur(10px)",
            mixBlendMode: "screen",
            animation: "wg-glide 4.5s ease-in-out infinite",
          }}
        />

        {/* top glaze */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0) 30%)",
          }}
        />
      </div>

      <p className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.25em] text-cyan-200/60">
        <Droplets className="h-3.5 w-3.5" strokeWidth={2.2} />
        {en ? "Wet-glass finish" : "ウェットグラス仕上げ"}
      </p>
    </div>
  );
}

const DROPS: { x: number; y: number; s: number; dur: number; delay: number }[] =
  [
    { x: 18, y: 30, s: 8, dur: 2.6, delay: 0 },
    { x: 74, y: 24, s: 6, dur: 3.1, delay: 0.5 },
    { x: 82, y: 58, s: 10, dur: 2.9, delay: 1.0 },
    { x: 30, y: 66, s: 5, dur: 3.4, delay: 0.7 },
    { x: 60, y: 78, s: 7, dur: 2.7, delay: 1.3 },
  ];
