import type { DemoMeta } from "@/registry";
import { Sparkle } from "lucide-react";

export const meta: DemoMeta = {
  name: "メタルコイン フリップ",
  category: "3Dアニメ",
  description:
    "金属メダルが3Dで回転し、スペキュラのハイライトが流れる磨き上げられた質感。",
  align: "center",
  isNew: true,
  level: "advanced",
  tags: ["3d", "object", "materials", "animation"],
};

export default function MetalCoinFlip() {
  const en =
    typeof document !== "undefined" && document.documentElement.lang === "en";

  return (
    <div className="flex w-full flex-col items-center justify-center gap-7 rounded-3xl bg-[radial-gradient(120%_120%_at_50%_10%,#1a1407_0%,#0a0803_72%)] py-14">
      <style>{`
        @keyframes mcf-spin { to { transform: rotateY(360deg); } }
        @keyframes mcf-sweep { 0% { transform: translateX(-130%) rotate(8deg);} 100% { transform: translateX(130%) rotate(8deg);} }
        @media (prefers-reduced-motion: reduce) {
          .mcf-coin { animation: none !important; transform: rotateY(18deg); }
          .mcf-shine { animation: none !important; }
        }
      `}</style>

      <div
        className="relative"
        style={{ perspective: "800px", width: 180, height: 180 }}
      >
        <div
          className="mcf-coin relative h-full w-full"
          style={{
            transformStyle: "preserve-3d",
            animation: "mcf-spin 3.4s linear infinite",
            willChange: "transform",
          }}
        >
          {/* front */}
          <CoinFace facing="front" en={en} />
          {/* back */}
          <CoinFace facing="back" en={en} />
        </div>
      </div>

      <p className="text-xs font-medium uppercase tracking-[0.3em] text-amber-200/70">
        {en ? "24K · Polished" : "純金 · 鏡面仕上げ"}
      </p>
    </div>
  );
}

function CoinFace({
  facing,
  en,
}: {
  facing: "front" | "back";
  en: boolean;
}) {
  const back = facing === "back";
  return (
    <div
      className="absolute inset-0 overflow-hidden rounded-full"
      style={{
        transform: back ? "rotateY(180deg) translateZ(6px)" : "translateZ(6px)",
        backfaceVisibility: "hidden",
        background:
          "radial-gradient(circle at 32% 28%, #fff5d6 0%, #f3cf6b 28%, #c8922f 58%, #7c5713 100%)",
        boxShadow:
          "inset 0 0 0 6px rgba(124,87,19,0.55), inset 0 0 0 9px rgba(255,239,179,0.5), 0 18px 40px rgba(0,0,0,0.55)",
      }}
    >
      {/* engraved ring */}
      <div
        className="absolute inset-[14px] rounded-full"
        style={{
          boxShadow:
            "inset 0 2px 4px rgba(255,255,255,0.55), inset 0 -3px 6px rgba(80,52,8,0.6)",
        }}
      />
      {/* emblem */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 text-amber-900">
        {back ? (
          <span
            className="text-2xl font-black tracking-tight"
            style={{ textShadow: "0 1px 0 rgba(255,245,200,0.7)" }}
          >
            {en ? "100" : "壱"}
          </span>
        ) : (
          <>
            <Sparkle className="h-7 w-7" strokeWidth={2.4} />
            <span
              className="text-[10px] font-bold uppercase tracking-[0.2em]"
              style={{ textShadow: "0 1px 0 rgba(255,245,200,0.7)" }}
            >
              {en ? "Prime" : "純正"}
            </span>
          </>
        )}
      </div>
      {/* moving specular sweep */}
      <div
        className="mcf-shine pointer-events-none absolute -inset-y-2 left-0 w-1/2"
        style={{
          background:
            "linear-gradient(105deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.85) 50%, rgba(255,255,255,0) 100%)",
          mixBlendMode: "screen",
          animation: "mcf-sweep 2.6s ease-in-out infinite",
        }}
      />
    </div>
  );
}
