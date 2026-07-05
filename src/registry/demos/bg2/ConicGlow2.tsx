import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "コニック・グロウ2",
  category: "背景アニメ",
  description: "円錐グラデーションが回転し続ける、サンセット調の放射状グロウ。",
  align: "full",
  isNew: true,
  tags: ["background", "animation", "conic"],
};

export default function ConicGlow2() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <section className="relative w-full overflow-hidden bg-[#120606] py-28 text-white">
      <style>{`
        @keyframes bg2-conic-spin {
          to { transform: translate(-50%,-50%) rotate(360deg); }
        }
        @media (prefers-reduced-motion: reduce) {
          .bg2-conic { animation: none !important; }
        }
      `}</style>
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="bg2-conic absolute left-1/2 top-1/2 h-[140vw] w-[140vw] opacity-40 blur-3xl"
          style={{
            background:
              "conic-gradient(from 0deg, #f97316, #f59e0b, #ef4444, #db2777, #f97316)",
            transform: "translate(-50%,-50%)",
            animation: "bg2-conic-spin 24s linear infinite",
          }}
        />
        <div
          className="absolute left-1/2 top-1/2 h-[70vw] w-[70vw] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(18,6,6,0) 35%, rgba(18,6,6,0.85) 75%)",
          }}
        />
      </div>
      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <span className="inline-block rounded-full border border-orange-400/20 bg-orange-400/5 px-4 py-1 text-xs font-medium tracking-wide text-orange-200/80">
          Conic Glow
        </span>
        <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-6xl">
          {en ? "An ever-turning sunset spectrum" : "回り続ける、夕陽のスペクトル"}
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-lg text-orange-50/70">
          {en
            ? "A conic gradient slowly revolves, generating a radial glow of warm color."
            : "円錐グラデーションがゆっくり旋回し、放射状の暖色グロウを生み出します。"}
        </p>
      </div>
    </section>
  );
}
