import { useState } from "react";
import { ChevronDown, Music } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "エクスパンダブル",
  category: "カード演出",
  description: "クリックでなめらかに高さが展開して詳細を表示するカード。",
  align: "center",
  isNew: true,
  tags: ["card", "animation"],
};

export default function ExpandableCard() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const [open, setOpen] = useState(false);

  return (
    <div className="w-full max-w-sm">
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0b0d17] shadow-2xl shadow-black/40">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex w-full items-center gap-4 p-5 text-left"
        >
          <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-violet-500/15 text-violet-300">
            <Music className="size-6" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-white">
              {en ? "Night Drive" : "ナイトドライブ"}
            </p>
            <p className="truncate text-xs text-slate-500">
              {en ? "Ambient Mix" : "アンビエント・ミックス"}
            </p>
          </div>
          <ChevronDown
            className={cn(
              "size-5 shrink-0 text-slate-400 transition-transform duration-300",
              open && "rotate-180"
            )}
          />
        </button>
        <div
          className={cn(
            "grid transition-all duration-500 ease-out",
            open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
          )}
        >
          <div className="overflow-hidden">
            <div className="border-t border-white/10 p-5">
              <p className="text-sm leading-relaxed text-slate-400">
                {en
                  ? "A 40-minute set of gently swaying synths and deep bass, perfect for a late-night drive. Click to smoothly toggle between collapsed and expanded accordion states."
                  : "深夜のドライブにぴったりな、緩やかに揺れるシンセと低音の40分セット。クリックで折りたたみとアコーディオン展開が滑らかに切り替わります。"}
              </p>
              <div className="mt-4 flex gap-2">
                {["#chill", "#synth", "#night"].map((t) => (
                  <span
                    key={t}
                    className="rounded-full bg-white/5 px-3 py-1 text-xs text-slate-300"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
