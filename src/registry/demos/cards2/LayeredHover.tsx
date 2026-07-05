import { Boxes } from "lucide-react";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "レイヤードホバー",
  category: "カード演出",
  description: "ホバーで前後のレイヤーがずれて奥行きが生まれるカード。",
  align: "center",
  isNew: true,
  tags: ["card", "animation"],
};

export default function LayeredHover() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <div className="w-full max-w-sm py-6">
      <div className="group relative">
        <div className="absolute inset-0 rounded-2xl bg-indigo-500/30 transition-transform duration-500 ease-out group-hover:-translate-x-3 group-hover:-translate-y-3" />
        <div className="absolute inset-0 rounded-2xl bg-fuchsia-500/30 transition-transform duration-500 ease-out group-hover:translate-x-3 group-hover:translate-y-3" />
        <div className="relative rounded-2xl border border-white/10 bg-[#0b0d17] p-7 shadow-2xl shadow-black/40">
          <div className="flex size-12 items-center justify-center rounded-xl bg-white/5 text-white">
            <Boxes className="size-6" />
          </div>
          <h3 className="mt-5 text-lg font-semibold text-white">
            {en ? "Layered Depth" : "レイヤード奥行き"}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-400">
            {en
              ? "On hover, the two back panels shift in opposite directions, creating a stacked, three-dimensional feel."
              : "ホバーで背面の2枚が反対方向へずれ、積層パネルのような立体感が生まれます。"}
          </p>
        </div>
      </div>
    </div>
  );
}
