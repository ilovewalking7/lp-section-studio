import { useEffect, useRef, useState } from "react";
import { Package, Sparkles, Play, Pause } from "lucide-react";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "スクロール・アンボックス 3D",
  category: "3Dアニメ",
  description:
    "進行に合わせてレイヤーがtranslateZで定位置へ組み上がり、製品が3Dで開封・完成する。",
  align: "full",
  isNew: true,
  level: "advanced",
  tags: ["3d", "psychology", "conversion", "animation"],
  principle:
    "ピーク・エンドの法則 — 段階的な開封の山場と完成の到達点が、記憶に残る強い印象を作る。",
};

type Layer = {
  label: string;
  labelEn: string;
  z: number; // 完成時の奥行き
  from: number; // 飛んでくる方向(x)
  fromY: number;
  hue: number;
  at: number; // この層が組み上がり始める進行度
};

const LAYERS: Layer[] = [
  { label: "ベース", labelEn: "Base", z: -60, from: 0, fromY: 220, hue: 220, at: 0.05 },
  { label: "コア", labelEn: "Core", z: -20, from: -260, fromY: -40, hue: 265, at: 0.28 },
  { label: "レンズ", labelEn: "Lens", z: 20, from: 260, fromY: 60, hue: 190, at: 0.5 },
  { label: "シェル", labelEn: "Shell", z: 60, from: 0, fromY: -240, hue: 320, at: 0.72 },
];

// easeOutCubic
const ease = (x: number) => 1 - Math.pow(1 - Math.min(1, Math.max(0, x)), 3);

export default function ScrollUnbox3D() {
  const en =
    typeof document !== "undefined" && document.documentElement.lang === "en";
  const [progress, setProgress] = useState(0);
  const [playing, setPlaying] = useState(true);
  const sectionRef = useRef<HTMLElement>(null);
  const progressRef = useRef(0);
  progressRef.current = progress;

  // 自動再生タイムライン（rAF）。レイアウトに依存せず常に動く＝jsdomでも安全。
  useEffect(() => {
    if (!playing) return;
    const reduce =
      typeof window !== "undefined" &&
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setProgress(1);
      return;
    }
    let raf = 0;
    let last = 0;
    const loop = (now: number) => {
      if (!last) last = now;
      const dt = (now - last) / 1000;
      last = now;
      let next = progressRef.current + dt * 0.16; // 約6秒で一周
      if (next > 1.18) next = 0; // 完成を少し保持してからループ
      setProgress(next);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      if (raf) cancelAnimationFrame(raf);
    };
  }, [playing]);

  // IntersectionObserver は画面外で自動再生を止めるためだけに使用（テストではモック=no-op）。
  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof IntersectionObserver !== "function") return;
    let io: IntersectionObserver | null = null;
    try {
      io = new IntersectionObserver(
        (entries) => {
          const e = entries[0];
          if (e) setPlaying(e.isIntersecting);
        },
        { threshold: 0.2 }
      );
      io.observe(el);
    } catch {
      io = null;
    }
    return () => {
      if (io) io.disconnect();
    };
  }, []);

  const p = Math.min(1, progress); // 表示用にクランプ
  const done = p > 0.985;

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-[#06070f] py-20 text-white"
      style={{ perspective: "1200px" }}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(120,90,255,0.16),transparent_55%)]" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-6 lg:grid-cols-[1fr_1.05fr]">
        {/* copy + controls */}
        <div className="text-center lg:text-left">
          <p className="mb-5 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.3em] text-indigo-200/70">
            <Package className="h-3.5 w-3.5" />
            {en ? "Watch it come together" : "組み上がる瞬間を"}
          </p>
          <h2 className="text-balance text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl">
            {en ? (
              <>
                Every layer,
                <br />
                <span className="bg-gradient-to-r from-teal-200 via-indigo-200 to-fuchsia-200 bg-clip-text text-transparent">
                  into place
                </span>
              </>
            ) : (
              <>
                すべての層が、
                <br />
                <span className="bg-gradient-to-r from-teal-200 via-indigo-200 to-fuchsia-200 bg-clip-text text-transparent">
                  定位置へ
                </span>
              </>
            )}
          </h2>
          <p className="mx-auto mt-6 max-w-md text-pretty text-base text-white/55 lg:mx-0 sm:text-lg">
            {en
              ? "Scrub the timeline and watch the product assemble — a reveal you remember."
              : "タイムラインを動かすと製品が組み上がる。記憶に残る、開封のクライマックス。"}
          </p>

          {/* manual scrub — works with zero layout/scroll */}
          <div className="mt-8 flex items-center gap-3 lg:max-w-sm">
            <button
              type="button"
              onClick={() => setPlaying((v) => !v)}
              className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white/80 transition hover:bg-white/10"
              aria-label={
                playing ? (en ? "Pause" : "一時停止") : en ? "Play" : "再生"
              }
            >
              {playing ? (
                <Pause className="h-4 w-4" />
              ) : (
                <Play className="h-4 w-4" />
              )}
            </button>
            <input
              type="range"
              min={0}
              max={100}
              value={Math.round(p * 100)}
              onChange={(e) => {
                setPlaying(false);
                setProgress(Number(e.target.value) / 100);
              }}
              className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-white/15 accent-indigo-400"
              aria-label={en ? "Assembly progress" : "組み立ての進行"}
            />
            <span className="w-10 shrink-0 text-right text-sm tabular-nums text-white/60">
              {Math.round(p * 100)}%
            </span>
          </div>
        </div>

        {/* 3D assembly stage */}
        <div
          className="relative mx-auto h-[400px] w-full max-w-[420px]"
          style={{ perspective: "1200px" }}
          role="img"
          aria-label={
            en ? "Product assembling in 3D" : "3Dで組み上がる製品"
          }
        >
          <div
            className="absolute left-1/2 top-1/2"
            style={{
              transformStyle: "preserve-3d",
              transform: `translate(-50%,-50%) rotateX(${18 - p * 6}deg) rotateY(${-26 + p * 14}deg)`,
            }}
          >
            {LAYERS.map((layer, i) => {
              // 各層の局所進行: at から 0.22 の間で 0→1
              const local = ease((p - layer.at) / 0.22);
              const tx = layer.from * (1 - local);
              const ty = layer.fromY * (1 - local);
              const tz = layer.z * local + (1 - local) * 140;
              const rot = (1 - local) * 28 * (i % 2 ? 1 : -1);
              return (
                <div
                  key={`layer-${i}`}
                  className="absolute left-0 top-0 flex h-[150px] w-[200px] -ml-[100px] -mt-[75px] items-center justify-center rounded-2xl border border-white/15"
                  style={{
                    transform: `translate3d(${tx}px, ${ty}px, ${tz}px) rotateZ(${rot}deg)`,
                    opacity: 0.25 + local * 0.75,
                    background: `linear-gradient(150deg, hsla(${layer.hue},85%,70%,0.28), hsla(${layer.hue},80%,50%,0.08))`,
                    backdropFilter: "blur(4px)",
                    WebkitBackdropFilter: "blur(4px)",
                    boxShadow: `inset 0 1px 0 rgba(255,255,255,0.35), 0 26px 50px -20px hsla(${layer.hue},80%,42%,0.6)`,
                  }}
                >
                  <span className="text-xs font-semibold uppercase tracking-[0.22em] text-white/80">
                    {en ? layer.labelEn : layer.label}
                  </span>
                  {/* specular */}
                  <div
                    className="pointer-events-none absolute inset-0 rounded-2xl"
                    style={{
                      background:
                        "linear-gradient(120deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 40%)",
                      opacity: 0.4,
                    }}
                  />
                </div>
              );
            })}
          </div>

          {/* "complete" badge appears at the end (peak-end) */}
          <div
            className="pointer-events-none absolute bottom-2 left-1/2 -translate-x-1/2 transition-all duration-500"
            style={{
              opacity: done ? 1 : 0,
              transform: `translateX(-50%) translateY(${done ? 0 : 12}px)`,
            }}
          >
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-300/30 bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-200">
              <Sparkles className="h-3.5 w-3.5" />
              {en ? "Assembled" : "完成"}
            </span>
          </div>

          <div className="pointer-events-none absolute left-1/2 top-1/2 h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/15 blur-3xl" />
        </div>
      </div>
    </section>
  );
}
