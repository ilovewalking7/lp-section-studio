import type { DemoMeta } from "@/registry";
import { useState } from "react";
import { Play, Pause } from "lucide-react";
import { cn } from "@/lib/utils";

export const meta: DemoMeta = {
  name: "再生トグル",
  category: "ボタン",
  description: "▶と⏸を切り替え、再生中はリングが脈動する再生ボタン。",
  align: "center",
  isNew: true,
  tags: ["button", "icon"],
};

export default function PlayButton() {
  const [playing, setPlaying] = useState(false);
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";

  return (
    <div className="flex items-center justify-center rounded-2xl bg-slate-900 p-8">
      <button
        type="button"
        onClick={() => setPlaying((p) => !p)}
        aria-label={playing ? (en ? "Pause" : "一時停止") : en ? "Play" : "再生"}
        aria-pressed={playing}
        className="relative grid size-16 place-items-center rounded-full bg-white text-slate-900 shadow-lg transition-all duration-200 hover:scale-105 active:scale-[0.96]"
      >
        {playing && (
          <span className="absolute inset-0 animate-ping rounded-full bg-white/40" />
        )}
        {playing ? (
          <Pause className="size-6 fill-current" />
        ) : (
          <Play className={cn("size-6 translate-x-0.5 fill-current")} />
        )}
      </button>
    </div>
  );
}
