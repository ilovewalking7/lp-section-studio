import type { DemoMeta } from "@/registry";
import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils";

export const meta: DemoMeta = {
  name: "コピー完了",
  category: "ボタン",
  description: "クリックでコピーアイコンがチェックに切り替わるコピー・ボタン。",
  align: "center",
  isNew: true,
  tags: ["button", "icon"],
};

export default function CopyWithCheck() {
  const [copied, setCopied] = useState(false);
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";

  const handleClick = () => {
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };

  return (
    <div className="flex items-center justify-center rounded-2xl bg-slate-100 p-8">
      <button
        type="button"
        onClick={handleClick}
        className={cn(
          "inline-flex min-w-[8rem] items-center justify-center gap-2 rounded-xl border px-5 py-2.5 text-sm font-semibold transition-all duration-300 active:scale-[0.97]",
          copied
            ? "border-emerald-300 bg-emerald-50 text-emerald-700"
            : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
        )}
      >
        {copied ? (
          <>
            <Check className="size-4" />
            {en ? "Copied!" : "コピー済み"}
          </>
        ) : (
          <>
            <Copy className="size-4" />
            {en ? "Copy" : "コピー"}
          </>
        )}
      </button>
    </div>
  );
}
