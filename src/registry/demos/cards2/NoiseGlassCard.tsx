import { Waves } from "lucide-react";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "ノイズグラス",
  category: "カード演出",
  description: "ノイズ質感とぼかしが効いたグラスモーフィズムカード。",
  align: "center",
  isNew: true,
  tags: ["card", "animation"],
};

const NOISE =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>`
  );

export default function NoiseGlassCard() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <div className="w-full max-w-sm">
      <div className="relative overflow-hidden rounded-2xl">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(120% 120% at 10% 0%, #6d28d9 0%, transparent 50%), radial-gradient(120% 120% at 100% 100%, #0ea5e9 0%, transparent 55%), #0b0d17",
          }}
        />
        <div className="relative m-4 overflow-hidden rounded-xl border border-white/15 bg-white/[0.06] p-7 backdrop-blur-xl">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.12] mix-blend-overlay"
            style={{ backgroundImage: `url("${NOISE}")` }}
          />
          <div className="relative">
            <div className="flex size-12 items-center justify-center rounded-xl bg-white/10 text-white">
              <Waves className="size-6" />
            </div>
            <h3 className="mt-5 text-lg font-semibold text-white">
              {en ? "Noise Glass" : "ノイズグラス"}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-white/75">
              {en
                ? "Fine noise layered over a strong blur for a refined, frosted-glass transparency."
                : "微細なノイズと強いぼかしを重ね、すりガラスのような上質な透明感を表現します。"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
