import { useEffect, useRef, useState } from "react";
import { Flag, Play, Pause, Zap } from "lucide-react";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "ゴール・トンネル進捗 3D",
  category: "3Dアニメ",
  description:
    "パースの効いた3Dトンネルがゴールへ向かって進む進捗ビジュアル。自動再生＋手動操作＋マイルストーン。",
  align: "full",
  isNew: true,
  level: "advanced",
  tags: ["3d", "psychology", "conversion", "animation"],
  principle:
    "目標勾配 — ゴールが近づくほど人は加速する。残り距離を可視化し最後のひと押しを生む。",
};

const RINGS = 9;
const MILESTONES = [
  { at: 0.0, label: "開始", labelEn: "Start" },
  { at: 0.4, label: "中間", labelEn: "Halfway" },
  { at: 0.75, label: "あと少し", labelEn: "Almost" },
  { at: 1.0, label: "ゴール", labelEn: "Goal" },
];

const ease = (x: number) =>
  1 - Math.pow(1 - Math.min(1, Math.max(0, x)), 2);

export default function GoalTunnelProgress() {
  const en =
    typeof document !== "undefined" && document.documentElement.lang === "en";
  const [progress, setProgress] = useState(0.12);
  const [playing, setPlaying] = useState(true);
  const progressRef = useRef(0.12);
  progressRef.current = progress;

  useEffect(() => {
    if (!playing) return;
    const reduce =
      typeof window !== "undefined" &&
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setProgress(1);
      setPlaying(false);
      return;
    }
    let raf = 0;
    let last = 0;
    const loop = (now: number) => {
      if (!last) last = now;
      const dt = (now - last) / 1000;
      last = now;
      // goal-gradient: accelerate as we near the goal
      const remaining = 1 - progressRef.current;
      const speed = 0.06 + (1 - remaining) * 0.12;
      let next = progressRef.current + dt * speed;
      if (next >= 1) {
        next = 1;
        setProgress(1);
        setPlaying(false);
        return;
      }
      setProgress(next);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      if (raf) cancelAnimationFrame(raf);
    };
  }, [playing]);

  const p = Math.min(1, Math.max(0, progress));
  const pct = Math.round(p * 100);
  const reached = p >= 0.999;

  return (
    <section
      className="relative w-full overflow-hidden bg-[#05060c] py-16 text-white"
      style={{ perspective: "720px" }}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(56,189,248,0.12),transparent_60%)]" />

      <div className="relative mx-auto flex max-w-3xl flex-col items-center px-6">
        <p className="mb-3 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.32em] text-sky-200/70">
          <Zap className="h-3.5 w-3.5" />
          {en ? "Goal in sight" : "ゴールが見えてきた"}
        </p>
        <h2 className="mb-8 text-balance text-center text-4xl font-semibold tracking-tight sm:text-5xl">
          {reached ? (
            en ? (
              "You made it"
            ) : (
              "ゴール到達"
            )
          ) : en ? (
            <>
              <span className="bg-gradient-to-r from-sky-200 to-indigo-200 bg-clip-text text-transparent">
                {pct}%
              </span>{" "}
              there — keep going
            </>
          ) : (
            <>
              残り
              <span className="bg-gradient-to-r from-sky-200 to-indigo-200 bg-clip-text text-transparent">
                {" "}
                {100 - pct}%
              </span>
            </>
          )}
        </h2>

        {/* 3D tunnel */}
        <div
          className="relative h-[260px] w-full max-w-xl"
          style={{ perspective: "720px" }}
          role="img"
          aria-label={
            en ? `Progress ${pct} percent` : `進捗 ${pct} パーセント`
          }
        >
          <div
            className="absolute inset-0"
            style={{ transformStyle: "preserve-3d" }}
          >
            {Array.from({ length: RINGS }).map((_, i) => {
              // each ring sits at increasing depth; the whole tunnel scrolls with progress
              const base = i / RINGS;
              const depth = ((base - p) % 1 + 1) % 1; // 0=near, 1=far, wraps
              const z = -depth * 1100;
              const scale = 0.2 + (1 - depth) * 1.05;
              const filled = base <= p + 0.001;
              const hue = 190 + base * 70;
              return (
                <div
                  key={`ring-${i}`}
                  className="absolute left-1/2 top-1/2 rounded-2xl border-2"
                  style={{
                    width: 360,
                    height: 220,
                    marginLeft: -180,
                    marginTop: -110,
                    transform: `translateZ(${z}px) scale(${scale})`,
                    borderColor: filled
                      ? `hsla(${hue},90%,65%,${0.25 + (1 - depth) * 0.6})`
                      : `hsla(${hue},20%,55%,${0.12 + (1 - depth) * 0.18})`,
                    boxShadow: filled
                      ? `0 0 26px hsla(${hue},90%,60%,${(1 - depth) * 0.5})`
                      : "none",
                    opacity: 0.25 + (1 - depth) * 0.75,
                  }}
                />
              );
            })}

            {/* goal flag at the far end */}
            <div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{
                transform: `translate(-50%,-50%) translateZ(${-1100 + p * 1100}px)`,
                transition: "opacity 0.4s",
                opacity: 0.3 + p * 0.7,
              }}
            >
              <div className="flex flex-col items-center">
                <Flag
                  className="h-10 w-10 text-emerald-300"
                  style={{
                    filter: `drop-shadow(0 0 ${6 + p * 14}px rgba(52,211,153,0.8))`,
                  }}
                />
              </div>
            </div>
          </div>

          {/* runner marker (you) at the near edge */}
          <div className="pointer-events-none absolute bottom-5 left-1/2 z-10 -translate-x-1/2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-[10px] font-black text-sky-700 shadow-[0_0_20px_rgba(56,189,248,0.7)]">
              {en ? "YOU" : "現在"}
            </div>
          </div>
        </div>

        {/* milestone bar */}
        <div className="relative mt-8 h-2 w-full max-w-xl rounded-full bg-white/10">
          <div
            className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-sky-400 to-emerald-400 transition-[width] duration-150"
            style={{ width: `${ease(p) * 100}%` }}
          />
          {MILESTONES.map((m) => {
            const done = p >= m.at - 0.001;
            return (
              <div
                key={m.label}
                className="absolute top-1/2 -translate-y-1/2"
                style={{ left: `${m.at * 100}%` }}
              >
                <div
                  className="h-3.5 w-3.5 -translate-x-1/2 rounded-full border-2 transition-colors"
                  style={{
                    background: done ? "#34d399" : "#0f172a",
                    borderColor: done ? "#6ee7b7" : "rgba(255,255,255,0.3)",
                  }}
                />
                <span
                  className="absolute left-1/2 mt-1.5 -translate-x-1/2 whitespace-nowrap text-[10px] font-medium"
                  style={{ color: done ? "#a7f3d0" : "rgba(255,255,255,0.4)" }}
                >
                  {en ? m.labelEn : m.label}
                </span>
              </div>
            );
          })}
        </div>

        {/* controls */}
        <div className="mt-10 flex w-full max-w-xl items-center gap-3">
          <button
            type="button"
            onClick={() => {
              if (reached) {
                setProgress(0.05);
                setPlaying(true);
              } else {
                setPlaying((v) => !v);
              }
            }}
            className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white/80 transition hover:bg-white/10"
            aria-label={
              reached
                ? en
                  ? "Restart"
                  : "やり直す"
                : playing
                  ? en
                    ? "Pause"
                    : "一時停止"
                  : en
                    ? "Play"
                    : "再生"
            }
          >
            {playing && !reached ? (
              <Pause className="h-4 w-4" />
            ) : (
              <Play className="h-4 w-4" />
            )}
          </button>
          <input
            type="range"
            min={0}
            max={100}
            value={pct}
            onChange={(e) => {
              setPlaying(false);
              setProgress(Number(e.target.value) / 100);
            }}
            className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-white/15 accent-sky-400"
            aria-label={en ? "Goal progress" : "ゴールの進捗"}
          />
          <span className="w-10 shrink-0 text-right text-sm tabular-nums text-white/60">
            {pct}%
          </span>
        </div>
      </div>
    </section>
  );
}
