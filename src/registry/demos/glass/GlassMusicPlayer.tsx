import { useState } from "react";
import { Heart, Pause, Play, Repeat, Shuffle, SkipBack, SkipForward } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "グラス・ミュージックプレイヤー",
  category: "グラスモーフィズム",
  description: "進捗バーと再生コントロールを備えた、フロステッドな音楽プレイヤー。",
  align: "center",
  isNew: true,
  tags: ["glass", "frosted", "music", "player"],
};

export default function GlassMusicPlayer() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const [playing, setPlaying] = useState(true);
  const [liked, setLiked] = useState(false);
  const progress = 38;

  return (
    <div className="relative isolate flex w-full max-w-xl items-center justify-center overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-700 via-purple-700 to-pink-600 p-10">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-16 top-0 size-72 rounded-full bg-blue-400/40 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-16 -right-10 size-80 rounded-full bg-rose-400/40 blur-3xl"
      />

      <div className="relative w-full max-w-sm rounded-2xl border border-white/20 bg-white/10 p-6 shadow-2xl backdrop-blur-xl">
        <div className="flex items-center gap-4">
          <div className="flex size-16 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-pink-400 to-violet-500 text-2xl shadow-lg">
            🎧
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-base font-semibold text-white">Midnight City</p>
            <p className="truncate text-sm text-white/70">Aurora Waves</p>
          </div>
          <button
            onClick={() => setLiked((v) => !v)}
            aria-label={en ? "Favorite" : "お気に入り"}
            className="inline-flex size-9 items-center justify-center rounded-full text-white/80 transition hover:bg-white/10"
          >
            <Heart className={cn("size-5", liked && "fill-rose-400 text-rose-400")} />
          </button>
        </div>

        {/* progress */}
        <div className="mt-6">
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/20">
            <div
              className="h-full rounded-full bg-white"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="mt-1.5 flex justify-between text-xs text-white/70">
            <span>1:24</span>
            <span>3:42</span>
          </div>
        </div>

        {/* controls */}
        <div className="mt-5 flex items-center justify-between">
          <button aria-label={en ? "Shuffle" : "シャッフル"} className="text-white/70 transition hover:text-white">
            <Shuffle className="size-4" />
          </button>
          <button aria-label={en ? "Previous" : "前へ"} className="text-white transition hover:text-white/80">
            <SkipBack className="size-5" />
          </button>
          <button
            onClick={() => setPlaying((v) => !v)}
            aria-label={playing ? (en ? "Pause" : "一時停止") : en ? "Play" : "再生"}
            className="inline-flex size-12 items-center justify-center rounded-full bg-white text-indigo-700 shadow-lg transition hover:scale-105"
          >
            {playing ? <Pause className="size-5" /> : <Play className="size-5 translate-x-0.5" />}
          </button>
          <button aria-label={en ? "Next" : "次へ"} className="text-white transition hover:text-white/80">
            <SkipForward className="size-5" />
          </button>
          <button aria-label={en ? "Repeat" : "リピート"} className="text-white/70 transition hover:text-white">
            <Repeat className="size-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
