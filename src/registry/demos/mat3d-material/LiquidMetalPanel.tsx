import { Gauge, Layers, Zap } from "lucide-react";
import type { DemoMeta } from "@/registry";
import { Badge } from "@/components/ui/badge";

export const meta: DemoMeta = {
  name: "リキッドメタルパネル",
  category: "3Dアニメ",
  description:
    "流れる液体金属／オイルのような背景（インラインkeyframesのコニック＆リニアグラデ）の上に、くっきりしたコンテンツを載せた機能パネル。",
  align: "full",
  isNew: true,
  level: "advanced",
  tags: ["3d", "material", "card", "animation"],
  principle:
    "ゆっくり流れる金属光沢は『精密に磨かれた製品』の連想を呼び、信頼性とプレミアム感を底上げする。",
};

const CSS = `
@keyframes lm-flow-a {
  0%   { transform: rotate(0deg) scale(1.4); }
  100% { transform: rotate(360deg) scale(1.4); }
}
@keyframes lm-flow-b {
  0%, 100% { transform: translate(-8%, -6%) scale(1.3); }
  50%      { transform: translate(8%, 6%) scale(1.5); }
}
@keyframes lm-shimmer {
  0%   { background-position: 0% 50%; }
  100% { background-position: 200% 50%; }
}
.lm-conic {
  background: conic-gradient(from 0deg,
    #6b7280, #e5e7eb, #9ca3af, #f8fafc, #4b5563, #cbd5e1, #6b7280);
  animation: lm-flow-a 14s linear infinite;
  filter: blur(14px) contrast(1.15) saturate(0.8);
}
.lm-blob {
  background: radial-gradient(circle at 50% 50%,
    rgba(186,230,253,0.9), rgba(129,140,248,0.5) 40%, rgba(0,0,0,0) 70%);
  animation: lm-flow-b 11s ease-in-out infinite;
  mix-blend-mode: screen;
  filter: blur(8px);
}
.lm-sheen {
  background: linear-gradient(115deg,
    rgba(255,255,255,0) 30%, rgba(255,255,255,0.55) 50%, rgba(255,255,255,0) 70%);
  background-size: 200% 100%;
  animation: lm-shimmer 6s linear infinite;
  mix-blend-mode: overlay;
}
@media (prefers-reduced-motion: reduce) {
  .lm-conic, .lm-blob, .lm-sheen { animation: none !important; }
}
`;

export default function LiquidMetalPanel() {
  const en =
    typeof document !== "undefined" && document.documentElement.lang === "en";

  const features = en
    ? [
        { icon: Zap, t: "Instant", d: "Sub-second cold starts." },
        { icon: Layers, t: "Layered", d: "Composable by design." },
        { icon: Gauge, t: "Tuned", d: "Polished to the metal." },
      ]
    : [
        { icon: Zap, t: "瞬時", d: "1秒未満のコールドスタート。" },
        { icon: Layers, t: "重層", d: "組み合わせ前提の設計。" },
        { icon: Gauge, t: "最適化", d: "金属まで磨き上げた挙動。" },
      ];

  return (
    <section className="relative w-full overflow-hidden rounded-3xl bg-[#0a0b10] p-1 ring-1 ring-white/10">
      <style>{CSS}</style>
      {/* liquid metal background */}
      <div className="absolute inset-0 overflow-hidden rounded-3xl" aria-hidden="true">
        <div className="lm-conic absolute inset-[-30%]" />
        <div className="lm-blob absolute left-[10%] top-[10%] h-[60%] w-[60%]" />
        <div className="lm-blob absolute right-[5%] bottom-[5%] h-[55%] w-[55%]" />
        <div className="lm-sheen absolute inset-0" />
        <div className="absolute inset-0 bg-[#0a0b10]/55" />
      </div>

      {/* crisp content */}
      <div className="relative z-10 px-7 py-12 sm:px-12">
        <Badge className="border-white/20 bg-white/10 text-white backdrop-blur">
          {en ? "Liquid Metal" : "リキッドメタル"}
        </Badge>
        <h2 className="mt-5 max-w-xl text-balance text-3xl font-semibold leading-tight text-white sm:text-4xl">
          {en
            ? "An interface forged from molten chrome."
            : "溶けたクロームから鍛えたインターフェース。"}
        </h2>
        <p className="mt-4 max-w-md text-pretty text-white/70">
          {en
            ? "A continuously flowing metallic surface sits behind perfectly crisp, readable content."
            : "絶えず流れる金属面の上に、くっきり読みやすいコンテンツを重ねています。"}
        </p>

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {features.map((f) => {
            const Icon = f.icon;
            return (
              <div
                key={f.t}
                className="rounded-2xl border border-white/15 bg-white/5 p-5 backdrop-blur-md"
              >
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-white/40 to-white/5 ring-1 ring-white/30">
                  <Icon className="h-5 w-5 text-white" />
                </span>
                <h3 className="mt-4 font-semibold text-white">{f.t}</h3>
                <p className="mt-1 text-sm text-white/65">{f.d}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
