import { useState } from "react";
import { Heart, Pause, Play, Repeat, Shuffle, SkipBack, SkipForward } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "ソフトミュージックプレイヤー",
  category: "ニューモーフィズム",
  description: "円形の柔らかなコントロールと押し込み式の進捗バーを備えたプレイヤー。",
  align: "center",
  isNew: true,
  tags: ["neumorphism", "soft-ui", "music", "player"],
};

const RAISED = "shadow-[6px_6px_12px_#a3b1c6,-6px_-6px_12px_#ffffff]";
const INSET = "shadow-[inset_6px_6px_12px_#a3b1c6,inset_-6px_-6px_12px_#ffffff]";

export default function SoftPlayer() {
  const [playing, setPlaying] = useState(true);
  const [liked, setLiked] = useState(false);
  const progress = 42;
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";

  return (
    <div className={cn("w-full max-w-sm rounded-3xl bg-[#e0e5ec] p-7 text-slate-600", RAISED)}>
      <div className={cn("mx-auto grid size-40 place-items-center rounded-full bg-[#e0e5ec] text-6xl", INSET)}>
        <span aria-hidden>🎵</span>
      </div>

      <div className="mt-6 text-center">
        <h3 className="text-lg font-semibold text-slate-700">Midnight City</h3>
        <p className="text-sm text-slate-500">Aurora Waves</p>
      </div>

      <div className="mt-6">
        <div className={cn("h-3 w-full rounded-full bg-[#e0e5ec]", INSET)}>
          <div
            className="h-full rounded-full bg-indigo-400 shadow-[2px_0_4px_#7c83d6]"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="mt-2 flex justify-between text-xs text-slate-500">
          <span>1:34</span>
          <span>3:42</span>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between">
        <button aria-label={en ? "Shuffle" : "シャッフル"} className={cn("grid size-10 place-items-center rounded-full bg-[#e0e5ec] text-slate-500 transition active:scale-95", RAISED)}>
          <Shuffle className="size-4" />
        </button>
        <button aria-label={en ? "Previous" : "前へ"} className={cn("grid size-11 place-items-center rounded-full bg-[#e0e5ec] text-slate-600 transition active:scale-95", RAISED)}>
          <SkipBack className="size-5" />
        </button>
        <button
          onClick={() => setPlaying((v) => !v)}
          aria-label={playing ? (en ? "Pause" : "一時停止") : en ? "Play" : "再生"}
          className={cn("grid size-16 place-items-center rounded-full bg-[#e0e5ec] text-indigo-500 transition active:scale-95", RAISED)}
        >
          {playing ? <Pause className="size-6" /> : <Play className="size-6 translate-x-0.5" />}
        </button>
        <button aria-label={en ? "Next" : "次へ"} className={cn("grid size-11 place-items-center rounded-full bg-[#e0e5ec] text-slate-600 transition active:scale-95", RAISED)}>
          <SkipForward className="size-5" />
        </button>
        <button
          aria-label={en ? "Favorite" : "お気に入り"}
          aria-pressed={liked}
          onClick={() => setLiked((v) => !v)}
          className={cn("grid size-10 place-items-center rounded-full bg-[#e0e5ec] transition active:scale-95", liked ? INSET : RAISED)}
        >
          <Heart className={cn("size-4", liked ? "fill-rose-500 text-rose-500" : "text-slate-500")} />
        </button>
      </div>

      <div className="mt-5 flex justify-center">
        <button aria-label={en ? "Repeat" : "リピート"} className={cn("grid size-9 place-items-center rounded-full bg-[#e0e5ec] text-slate-500", INSET)}>
          <Repeat className="size-4" />
        </button>
      </div>
    </div>
  );
}
