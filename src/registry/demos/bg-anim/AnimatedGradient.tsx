import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "アニメグラデ背景",
  category: "背景アニメ",
  description: "複数色のグラデーションが滑らかに移ろい続けるヒーロー背景。",
  align: "full",
  isNew: true,
  tags: ["background", "animation", "gradient"],
};

export default function AnimatedGradient() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <section className="relative w-full overflow-hidden bg-slate-950 py-28 text-white">
      <style>{`
        @keyframes anim-grad-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .anim-grad-bg {
          background: linear-gradient(120deg, #0f172a, #4c1d95, #1e3a8a, #0e7490, #581c87, #0f172a);
          background-size: 300% 300%;
          animation: anim-grad-shift 18s ease infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .anim-grad-bg { animation: none; }
        }
      `}</style>
      <div className="anim-grad-bg absolute inset-0 opacity-90" />
      <div className="absolute inset-0 bg-slate-950/40" />
      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <span className="inline-block rounded-full border border-white/15 bg-white/5 px-4 py-1 text-xs font-medium tracking-wide text-white/70">
          Animated Gradient
        </span>
        <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-6xl">
          {en
            ? "A smooth gradient that breathes with color"
            : "色が呼吸する、滑らかなグラデーション"}
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-lg text-white/70">
          {en
            ? "Keyframed background-position shifts the hue seamlessly, with no visible seams."
            : "background-position をキーフレームで動かし、継ぎ目なく色相が移ろいます。"}
        </p>
      </div>
    </section>
  );
}
