import { Gift, Sparkle } from "lucide-react";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "フリップカード",
  category: "カード演出",
  description: "ホバーで3D回転して裏面が現れるフリップカード。",
  align: "center",
  isNew: true,
  tags: ["card", "animation"],
};

export default function FlipCard() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <div className="w-full max-w-xs" style={{ perspective: "1200px" }}>
      <div className="group relative h-64">
        <div
          className="relative h-full w-full transition-transform duration-700 ease-out [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]"
        >
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 rounded-2xl border border-white/10 bg-gradient-to-br from-[#1a1f3a] to-[#0b0d17] p-7 [backface-visibility:hidden]">
            <div className="flex size-14 items-center justify-center rounded-full bg-indigo-500/15 text-indigo-300">
              <Gift className="size-7" />
            </div>
            <p className="text-lg font-semibold text-white">{en ? "Open your gift" : "ギフトを開く"}</p>
            <p className="text-xs text-slate-500">{en ? "Hover over the card" : "カードにマウスを乗せて"}</p>
          </div>
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 rounded-2xl border border-white/10 bg-gradient-to-br from-fuchsia-600 to-indigo-700 p-7 text-center [backface-visibility:hidden] [transform:rotateY(180deg)]">
            <Sparkle className="size-9 text-white" />
            <p className="text-xl font-bold text-white">{en ? "Congrats!" : "おめでとう！"}</p>
            <p className="text-sm text-white/85">{en ? "You won a 10% off coupon." : "10% オフのクーポンを獲得しました。"}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
