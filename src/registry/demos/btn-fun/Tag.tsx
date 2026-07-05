import type { DemoMeta } from "@/registry";
import { Tag as TagIcon } from "lucide-react";

export const meta: DemoMeta = {
  name: "タグ",
  category: "ボタン",
  description: "値札を模した切り欠きと穴。価格ラベルのようなタグ風ボタン。",
  align: "center",
  isNew: true,
  tags: ["button", "fun"],
};

export default function Tag() {
  return (
    <div className="flex items-center justify-center rounded-2xl bg-rose-50 p-8">
      <button
        type="button"
        className="group relative inline-flex items-center gap-2 bg-rose-500 py-3 pl-9 pr-6 text-sm font-bold text-white shadow-[0_8px_18px_-6px_rgba(244,63,94,0.6)] [clip-path:polygon(18px_0,100%_0,100%_100%,18px_100%,0_50%)] transition-all duration-200 hover:bg-rose-400 active:scale-95 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-rose-300"
      >
        <span className="pointer-events-none absolute left-3 top-1/2 size-2 -translate-y-1/2 rounded-full bg-rose-50" />
        <TagIcon className="size-4" />
        SALE 50%
      </button>
    </div>
  );
}
