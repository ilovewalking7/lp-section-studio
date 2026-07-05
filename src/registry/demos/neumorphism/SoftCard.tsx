import { useState } from "react";
import { Bookmark, Heart, Share2 } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "ソフトコンテンツカード",
  category: "ニューモーフィズム",
  description: "柔らかな押し出し陰影でまとめた、上品なコンテンツカード。",
  align: "center",
  isNew: true,
  tags: ["neumorphism", "soft-ui", "card"],
};

const RAISED = "shadow-[6px_6px_12px_#a3b1c6,-6px_-6px_12px_#ffffff]";
const INSET = "shadow-[inset_6px_6px_12px_#a3b1c6,inset_-6px_-6px_12px_#ffffff]";

export default function SoftCard() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const [liked, setLiked] = useState(true);
  const [saved, setSaved] = useState(false);

  return (
    <div className={cn("w-full max-w-sm rounded-3xl bg-[#e0e5ec] p-6 text-slate-600", RAISED)}>
      <div
        className={cn(
          "grid h-40 place-items-center rounded-2xl bg-[#e0e5ec] text-5xl",
          INSET,
        )}
      >
        <span aria-hidden>🏔️</span>
      </div>

      <div className="mt-5 flex items-center gap-2">
        <span className="rounded-full bg-[#e0e5ec] px-3 py-1 text-xs font-medium text-indigo-500 shadow-[2px_2px_4px_#a3b1c6,-2px_-2px_4px_#ffffff]">
          {en ? "Travel" : "旅行"}
        </span>
        <span className="text-xs text-slate-500">{en ? "5 min read" : "5分で読める"}</span>
      </div>

      <h3 className="mt-3 text-lg font-semibold text-slate-700">
        {en ? "Walking the silent highlands" : "静寂の高地を歩く"}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-slate-500">
        {en
          ? "A small travelogue of chasing the misty morning light along a 2,000m ridgeline."
          : "標高2,000mの稜線を辿りながら、霧に包まれた朝の光を追いかける小さな旅の記録。"}
      </p>

      <div className="mt-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={cn("grid size-9 place-items-center rounded-full bg-[#e0e5ec] text-sm font-semibold text-slate-600", RAISED)}>
            A
          </div>
          <div className="text-xs">
            <p className="font-medium text-slate-700">{en ? "Aoi" : "あおい"}</p>
            <p className="text-slate-500">2026/06/14</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            aria-label={en ? "Like" : "いいね"}
            aria-pressed={liked}
            onClick={() => setLiked((v) => !v)}
            className={cn(
              "grid size-9 place-items-center rounded-full bg-[#e0e5ec] transition active:scale-95",
              liked ? INSET : RAISED,
            )}
          >
            <Heart className={cn("size-4", liked ? "fill-rose-500 text-rose-500" : "text-slate-500")} />
          </button>
          <button
            aria-label={en ? "Save" : "保存"}
            aria-pressed={saved}
            onClick={() => setSaved((v) => !v)}
            className={cn(
              "grid size-9 place-items-center rounded-full bg-[#e0e5ec] transition active:scale-95",
              saved ? INSET : RAISED,
            )}
          >
            <Bookmark className={cn("size-4", saved ? "fill-indigo-500 text-indigo-500" : "text-slate-500")} />
          </button>
          <button
            aria-label={en ? "Share" : "共有"}
            className={cn("grid size-9 place-items-center rounded-full bg-[#e0e5ec] text-slate-500 transition active:scale-95", RAISED)}
          >
            <Share2 className="size-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
