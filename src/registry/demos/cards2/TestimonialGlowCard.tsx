import { Quote, Star } from "lucide-react";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "証言グロウ",
  category: "カード演出",
  description: "下部から柔らかな光が灯る、お客様の声カード。",
  align: "center",
  isNew: true,
  tags: ["card", "animation"],
};

export default function TestimonialGlowCard() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <div className="w-full max-w-sm">
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0b0d17] p-7 shadow-2xl shadow-black/40">
        <div
          className="pointer-events-none absolute -bottom-16 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full blur-3xl"
          style={{ background: "rgba(99,102,241,0.45)" }}
        />
        <div className="relative">
          <Quote className="size-8 text-indigo-400/70" />
          <p className="mt-4 text-base leading-relaxed text-slate-200">
            {en
              ? "After adopting it, our team's development speed improved dramatically. There's no better experience out there."
              : "導入後、チームの開発速度が見違えるほど上がりました。これ以上の体験は他にありません。"}
          </p>
          <div className="mt-6 flex items-center gap-3">
            <div className="flex size-11 items-center justify-center rounded-full bg-gradient-to-br from-indigo-400 to-fuchsia-500 text-sm font-bold text-white">
              MK
            </div>
            <div>
              <p className="text-sm font-semibold text-white">
                {en ? "Kenta Mizuno" : "水野 健太"}
              </p>
              <p className="text-xs text-slate-500">
                {en ? "Product Lead" : "プロダクトリード"}
              </p>
            </div>
            <div className="ml-auto flex gap-0.5 text-amber-400">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="size-3.5 fill-current" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
