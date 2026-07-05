import type { DemoMeta } from "@/registry";
import { useState } from "react";
import { Bookmark as BookmarkIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export const meta: DemoMeta = {
  name: "ブックマーク",
  category: "ボタン",
  description: "クリックで栞が塗りつぶされ、保存状態を切り替えるブックマークボタン。",
  align: "center",
  isNew: true,
  tags: ["button", "icon"],
};

export default function Bookmark() {
  const [saved, setSaved] = useState(false);
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";

  return (
    <div className="flex items-center justify-center rounded-2xl bg-amber-50 p-8">
      <button
        type="button"
        onClick={() => setSaved((s) => !s)}
        aria-pressed={saved}
        className={cn(
          "inline-flex items-center gap-2 rounded-xl border px-5 py-2.5 text-sm font-semibold transition-all duration-200 active:scale-[0.97]",
          saved
            ? "border-amber-300 bg-amber-100 text-amber-700"
            : "border-slate-200 bg-white text-slate-600 hover:border-amber-200"
        )}
      >
        <BookmarkIcon
          className={cn(
            "size-4 transition-all duration-200",
            saved ? "-translate-y-0.5 fill-amber-500 text-amber-500" : ""
          )}
        />
        {saved ? (en ? "Saved" : "保存済み") : en ? "Read later" : "あとで読む"}
      </button>
    </div>
  );
}
