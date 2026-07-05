import { useCallback, useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "再生スクラバー",
  category: "ドラッグ操作",
  description: "再生位置をドラッグして移動するタイムライン。時間表示つき。",
  align: "center",
  isNew: true,
  tags: ["drag", "pointer", "interaction"],
};

const TOTAL = 214; // 秒

function fmt(s: number) {
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, "0")}`;
}

export default function Scrubber() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const ref = useRef<HTMLDivElement>(null);
  const [pct, setPct] = useState(35);
  const [playing, setPlaying] = useState(false);
  const dragging = useRef(false);

  const update = useCallback((clientX: number) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setPct(Math.min(100, Math.max(0, ((clientX - rect.left) / rect.width) * 100)));
  }, []);

  const onMove = useCallback(
    (e: PointerEvent) => {
      if (dragging.current) update(e.clientX);
    },
    [update]
  );
  const onUp = useCallback(() => {
    dragging.current = false;
  }, []);

  useEffect(() => {
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, [onMove, onUp]);

  function onDown(e: React.PointerEvent) {
    dragging.current = true;
    update(e.clientX);
  }

  return (
    <div className="w-80 select-none rounded-xl border bg-card p-4">
      <div className="mb-3 flex items-center gap-3">
        <button
          type="button"
          onClick={() => setPlaying((p) => !p)}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground"
          aria-label={en ? (playing ? "Pause" : "Play") : playing ? "一時停止" : "再生"}
        >
          {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
        </button>
        <span className="text-sm font-medium text-foreground">{en ? "Sample track" : "サンプル音源"}</span>
      </div>
      <div
        ref={ref}
        onPointerDown={onDown}
        className="relative h-2 cursor-pointer rounded-full bg-muted"
      >
        <div
          className="absolute inset-y-0 left-0 rounded-full bg-primary"
          style={{ width: `${pct}%` }}
        />
        <div
          className="absolute top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary shadow"
          style={{ left: `${pct}%` }}
        />
      </div>
      <div className="mt-2 flex justify-between text-xs tabular-nums text-muted-foreground">
        <span>{fmt((pct / 100) * TOTAL)}</span>
        <span>{fmt(TOTAL)}</span>
      </div>
    </div>
  );
}
