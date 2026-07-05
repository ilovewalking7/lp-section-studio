import type { DemoMeta } from "@/registry";
import { Rocket } from "lucide-react";

export const meta: DemoMeta = {
  name: "バウンス",
  category: "ボタン",
  description: "ホバーで浮き、クリックすると弾けて戻るバウンス・アニメのプレイフルボタン。",
  align: "center",
  isNew: true,
  tags: ["button", "fun"],
};

export default function PlayfulBounce() {
  const en = typeof document !== "undefined" && document.documentElement.lang === "en";
  return (
    <div className="flex items-center justify-center rounded-2xl bg-gradient-to-br from-orange-100 to-rose-100 p-8">
      <button
        type="button"
        className="inline-flex animate-none items-center gap-2 rounded-2xl bg-rose-500 px-7 py-3.5 text-sm font-bold text-white shadow-[0_10px_0_0_#9f1239] transition-all duration-150 ease-out hover:-translate-y-1 hover:shadow-[0_14px_0_0_#9f1239] active:translate-y-2 active:shadow-[0_2px_0_0_#9f1239] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-rose-300"
      >
        <Rocket className="size-4" />
        {en ? "Launch" : "飛ばす"}
      </button>
    </div>
  );
}
