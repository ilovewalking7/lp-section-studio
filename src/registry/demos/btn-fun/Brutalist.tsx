import type { DemoMeta } from "@/registry";
import { Zap } from "lucide-react";

export const meta: DemoMeta = {
  name: "ブルータリスト",
  category: "ボタン",
  description: "極太の黒枠とベタ塗りの硬いドロップシャドウ。押すと影に沈むブルータリスト・ボタン。",
  align: "center",
  isNew: true,
  tags: ["button", "fun"],
};

export default function Brutalist() {
  return (
    <div className="flex items-center justify-center rounded-2xl bg-[#fde047] p-8">
      <button
        type="button"
        className="group inline-flex translate-x-[-3px] translate-y-[-3px] items-center gap-2 border-4 border-black bg-white px-7 py-3.5 text-base font-extrabold uppercase tracking-wide text-black shadow-[6px_6px_0_0_#000] transition-all duration-150 hover:translate-x-0 hover:translate-y-0 hover:bg-[#f472b6] hover:shadow-[3px_3px_0_0_#000] active:translate-x-[3px] active:translate-y-[3px] active:shadow-[0px_0px_0_0_#000] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-black/30"
      >
        <Zap className="size-5" />
        CLICK ME
      </button>
    </div>
  );
}
