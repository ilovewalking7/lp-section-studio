import { useState } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "イリディセントCTA",
  category: "3Dアニメ",
  description:
    "虹色のオーロラが動くマテリアル背景と、3Dプレス＆ホバーでシーンが走る奥行きのあるプレミアムボタンの大型CTA。",
  align: "full",
  isNew: true,
  level: "advanced",
  tags: ["3d", "material", "card", "animation"],
  principle:
    "玉虫色の光は視線を引き寄せ、立体的に沈むボタンは『押せる』アフォーダンスを強め、クリック率を高める。",
};

const CSS = `
@keyframes irid-aurora {
  0%   { transform: translate3d(-6%, -4%, 0) rotate(0deg); }
  50%  { transform: translate3d(6%, 4%, 0) rotate(12deg); }
  100% { transform: translate3d(-6%, -4%, 0) rotate(0deg); }
}
@keyframes irid-hue {
  0%   { filter: hue-rotate(0deg) saturate(1.2); }
  100% { filter: hue-rotate(360deg) saturate(1.2); }
}
.irid-layer {
  background:
    radial-gradient(40% 50% at 20% 30%, rgba(255,46,139,0.55), transparent 70%),
    radial-gradient(45% 55% at 80% 25%, rgba(45,155,255,0.55), transparent 70%),
    radial-gradient(50% 60% at 50% 85%, rgba(45,255,179,0.5), transparent 70%),
    radial-gradient(40% 50% at 75% 75%, rgba(179,45,255,0.5), transparent 70%);
  animation: irid-aurora 16s ease-in-out infinite, irid-hue 22s linear infinite;
  filter: blur(20px);
}
.irid-sheen-btn::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: linear-gradient(115deg,
    rgba(255,255,255,0) 35%, rgba(255,255,255,0.75) 50%, rgba(255,255,255,0) 65%);
  background-size: 250% 100%;
  background-position: 150% 0;
  transition: background-position 700ms ease;
  pointer-events: none;
}
.irid-sheen-btn:hover::after { background-position: -50% 0; }
@media (prefers-reduced-motion: reduce) {
  .irid-layer { animation: none !important; }
  .irid-sheen-btn::after { transition: none !important; }
}
`;

export default function IridescentCTA() {
  const en =
    typeof document !== "undefined" && document.documentElement.lang === "en";
  const [pressed, setPressed] = useState(false);

  return (
    <section className="relative w-full overflow-hidden rounded-3xl bg-[#070810] ring-1 ring-white/10">
      <style>{CSS}</style>
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="irid-layer absolute inset-[-20%]" />
        <div className="absolute inset-0 bg-[#070810]/40" />
        <div
          className="absolute inset-0 opacity-20 mix-blend-overlay"
          style={{
            backgroundImage:
              "repeating-linear-gradient(120deg, rgba(255,255,255,0.5) 0 1px, transparent 1px 4px)",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-3xl px-6 py-20 text-center">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium text-white/90 backdrop-blur">
          <Sparkles className="h-3.5 w-3.5" />
          {en ? "Limited launch" : "数量限定リリース"}
        </span>
        <h2 className="mt-6 text-balance text-4xl font-semibold leading-[1.1] tracking-tight text-white sm:text-6xl">
          {en ? (
            <>
              Ship something that
              <br />
              <span className="bg-gradient-to-r from-fuchsia-300 via-sky-300 to-emerald-300 bg-clip-text text-transparent">
                shimmers
              </span>
            </>
          ) : (
            <>
              玉虫色に
              <br />
              <span className="bg-gradient-to-r from-fuchsia-300 via-sky-300 to-emerald-300 bg-clip-text text-transparent">
                きらめく
              </span>
              プロダクトを
            </>
          )}
        </h2>
        <p className="mx-auto mt-5 max-w-md text-pretty text-white/70">
          {en
            ? "An iridescent material that never stops moving, with a button you can feel."
            : "止まらない玉虫色のマテリアルと、押し心地まで伝わるボタン。"}
        </p>

        <div className="mt-10 flex items-center justify-center">
          <button
            type="button"
            onPointerDown={() => setPressed(true)}
            onPointerUp={() => setPressed(false)}
            onPointerLeave={() => setPressed(false)}
            className="irid-sheen-btn group relative inline-flex items-center gap-2 overflow-hidden rounded-2xl px-8 py-4 text-base font-semibold text-[#0b0c14]"
            style={{
              background:
                "linear-gradient(180deg, #ffffff 0%, #d7dbe6 100%)",
              boxShadow: pressed
                ? "0 2px 0 0 #9aa1b2, 0 4px 10px -4px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.8)"
                : "0 8px 0 0 #9aa1b2, 0 18px 30px -10px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.9)",
              transform: pressed ? "translateY(6px)" : "translateY(0)",
              transition:
                "transform 120ms cubic-bezier(0.2,0.8,0.2,1), box-shadow 120ms ease",
            }}
          >
            <span className="relative z-10">
              {en ? "Claim your seat" : "枠を確保する"}
            </span>
            <ArrowRight className="relative z-10 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>
        <p className="mt-4 text-xs text-white/50">
          {en ? "No card required · Cancel anytime" : "カード不要・いつでも解約可"}
        </p>
      </div>
    </section>
  );
}
