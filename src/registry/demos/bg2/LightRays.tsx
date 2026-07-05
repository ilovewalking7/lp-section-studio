import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "光芒（ライトレイ）",
  category: "背景アニメ",
  description: "放射状に伸びる光芒がゆっくり回転する、ゴールドの神々しい背景。",
  align: "full",
  isNew: true,
  tags: ["background", "animation", "rays"],
};

export default function LightRays() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <section className="relative w-full overflow-hidden bg-[#100c02] py-28 text-white">
      <style>{`
        @keyframes bg2-rays-spin {
          to { transform: translate(-50%,-60%) rotate(360deg); }
        }
        @keyframes bg2-rays-pulse {
          0%,100% { opacity: 0.3; }
          50% { opacity: 0.55; }
        }
        @media (prefers-reduced-motion: reduce) {
          .bg2-rays { animation: none !important; }
        }
      `}</style>
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="bg2-rays absolute left-1/2 top-0 h-[180vw] w-[180vw]"
          style={{
            background:
              "repeating-conic-gradient(from 0deg, rgba(251,191,36,0.22) 0deg, rgba(251,191,36,0.22) 3deg, transparent 3deg, transparent 11deg)",
            transform: "translate(-50%,-60%)",
            animation:
              "bg2-rays-spin 60s linear infinite, bg2-rays-pulse 6s ease-in-out infinite",
          }}
        />
        <div
          className="absolute left-1/2 top-0 h-[60vw] w-[60vw] -translate-x-1/2 -translate-y-1/3 rounded-full blur-3xl"
          style={{ background: "radial-gradient(circle, rgba(253,224,71,0.4), transparent 70%)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#100c02]/30 to-[#100c02]" />
      </div>
      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <span className="inline-block rounded-full border border-amber-400/20 bg-amber-400/5 px-4 py-1 text-xs font-medium tracking-wide text-amber-200/80">
          Light Rays
        </span>
        <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-6xl">
          {en ? "Golden rays from above" : "天から差す、黄金の光芒"}
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-lg text-amber-50/70">
          {en
            ? "Radiating light turns quietly, casting a divine, halo-like glow."
            : "放射状の光が静かに旋回し、神々しい後光のような明るさを生み出します。"}
        </p>
      </div>
    </section>
  );
}
