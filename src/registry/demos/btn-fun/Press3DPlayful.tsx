import type { DemoMeta } from "@/registry";
import { ThumbsUp } from "lucide-react";

export const meta: DemoMeta = {
  name: "プレイフル3Dプレス",
  category: "ボタン",
  description: "ぶ厚い土台にのった3Dキー。押すとカチッと底まで沈むプレイフルボタン。",
  align: "center",
  isNew: true,
  tags: ["button", "fun"],
};

export default function Press3DPlayful() {
  const en = typeof document !== "undefined" && document.documentElement.lang === "en";
  return (
    <div className="flex items-center justify-center rounded-2xl bg-lime-100 p-8">
      <button
        type="button"
        className="group relative inline-block rounded-2xl border-none bg-lime-800 p-0 outline-offset-2 transition-[filter] duration-200 hover:brightness-110 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-lime-400"
      >
        <span className="block translate-y-[-6px] rounded-2xl bg-lime-400 px-8 py-3.5 text-sm font-extrabold text-lime-950 transition-transform duration-150 ease-out group-hover:translate-y-[-8px] group-active:translate-y-[-2px]">
          <span className="inline-flex items-center gap-2">
            <ThumbsUp className="size-4" />
            {en ? "Like!" : "いいね！"}
          </span>
        </span>
      </button>
    </div>
  );
}
