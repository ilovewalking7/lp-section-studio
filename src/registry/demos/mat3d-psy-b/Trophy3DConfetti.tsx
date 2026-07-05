import { useEffect, useMemo, useState } from "react";
import { Trophy, RotateCcw, Star } from "lucide-react";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "トロフィー 3D + 紙吹雪",
  category: "3Dアニメ",
  description:
    "3Dトロフィーが回転しながらポップインし、CSS紙吹雪が舞う達成演出。リプレイボタン付き。",
  align: "center",
  isNew: true,
  level: "advanced",
  tags: ["3d", "psychology", "conversion", "animation"],
  principle:
    "達成報酬（ドーパミン） — 進捗を派手に祝うと快感が記憶され、次の行動を繰り返したくなる。",
};

type Piece = {
  id: number;
  left: number;
  delay: number;
  dur: number;
  hue: number;
  size: number;
  rot: number;
  drift: number;
};

function makePieces(seed: number): Piece[] {
  // deterministic-ish per run; new seed = new burst
  const out: Piece[] = [];
  for (let i = 0; i < 40; i++) {
    const r = (n: number) => {
      const x = Math.sin((seed + 1) * 9301 + i * 233 + n * 49297) * 43758.5453;
      return x - Math.floor(x);
    };
    out.push({
      id: seed * 100 + i,
      left: r(1) * 100,
      delay: r(2) * 0.4,
      dur: 1.6 + r(3) * 1.4,
      hue: Math.floor(r(4) * 360),
      size: 6 + r(5) * 7,
      rot: r(6) * 360,
      drift: (r(7) - 0.5) * 120,
    });
  }
  return out;
}

export default function Trophy3DConfetti() {
  const en =
    typeof document !== "undefined" && document.documentElement.lang === "en";
  const [run, setRun] = useState(0);
  const [popped, setPopped] = useState(false);
  const pieces = useMemo(() => makePieces(run), [run]);

  useEffect(() => {
    setPopped(false);
    const t = setTimeout(() => setPopped(true), 30);
    return () => clearTimeout(t);
  }, [run]);

  const replay = () => setRun((r) => r + 1);

  return (
    <div className="relative flex w-full flex-col items-center justify-center gap-7 overflow-hidden rounded-3xl bg-[radial-gradient(120%_120%_at_50%_0%,#1a1606_0%,#0a0904_72%)] py-16 text-white">
      <style>{`
        @keyframes tcf-fall {
          0% { transform: translateY(-30px) translateX(0) rotateZ(0deg); opacity: 0; }
          10% { opacity: 1; }
          100% { transform: translateY(360px) translateX(var(--tcf-drift)) rotateZ(720deg); opacity: 0; }
        }
        @keyframes tcf-spin { to { transform: rotateY(360deg); } }
        @media (prefers-reduced-motion: reduce) {
          .tcf-confetti { display: none !important; }
          .tcf-spin { animation: none !important; }
        }
      `}</style>

      {/* confetti layer */}
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden="true"
      >
        {pieces.map((p) => (
          <span
            key={p.id}
            className="tcf-confetti absolute top-0 block"
            style={{
              left: `${p.left}%`,
              width: p.size,
              height: p.size * 0.5,
              background: `hsl(${p.hue} 90% 62%)`,
              borderRadius: 2,
              ["--tcf-drift" as string]: `${p.drift}px`,
              transform: `rotateZ(${p.rot}deg)`,
              animation: `tcf-fall ${p.dur}s cubic-bezier(.3,.5,.5,1) ${p.delay}s forwards`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center gap-7">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-300/40 bg-amber-400/15 px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.22em] text-amber-200">
          <Star className="h-3.5 w-3.5 fill-amber-300 text-amber-300" />
          {en ? "Achieved!" : "達成！"}
        </span>

        {/* trophy stage */}
        <div
          className="relative"
          style={{ perspective: "900px", width: 200, height: 220 }}
        >
          <div
            className="absolute left-1/2 top-[130px] h-16 w-32 -translate-x-1/2 rounded-[50%] blur-2xl"
            style={{ background: "rgba(251,191,36,0.5)" }}
            aria-hidden="true"
          />
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{
              transition: "transform 0.6s cubic-bezier(.34,1.56,.5,1), opacity 0.5s",
              transform: popped
                ? "translate(-50%,-50%) scale(1)"
                : "translate(-50%,-50%) scale(0.3)",
              opacity: popped ? 1 : 0,
            }}
          >
            <div
              className="tcf-spin"
              style={{
                transformStyle: "preserve-3d",
                animation: "tcf-spin 6s linear infinite",
              }}
            >
              <TrophyShape />
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center gap-1 text-center">
          <p className="text-2xl font-black tracking-tight">
            {en ? "Level cleared" : "レベルクリア"}
          </p>
          <p className="max-w-xs text-pretty text-sm text-white/55">
            {en
              ? "You're on a streak — keep the momentum going."
              : "好調キープ中。この勢いで次へ進もう。"}
          </p>
        </div>

        <button
          type="button"
          onClick={replay}
          className="inline-flex items-center gap-2 rounded-full bg-amber-400 px-5 py-2.5 text-sm font-bold text-amber-950 shadow-lg transition hover:bg-amber-300"
        >
          <RotateCcw className="h-4 w-4" />
          {en ? "Celebrate again" : "もう一度祝う"}
        </button>
      </div>
    </div>
  );
}

function TrophyShape() {
  return (
    <div className="relative h-[150px] w-[120px]" aria-hidden="true">
      {/* cup */}
      <div
        className="absolute left-1/2 top-0 h-[78px] w-[84px] -translate-x-1/2 rounded-b-[42px] rounded-t-lg"
        style={{
          background:
            "linear-gradient(150deg,#fde68a 0%,#fbbf24 45%,#d97706 100%)",
          boxShadow:
            "inset 0 2px 0 rgba(255,255,255,0.6), inset -6px 0 12px rgba(120,53,15,0.35), 0 12px 24px -10px rgba(217,119,6,0.7)",
        }}
      >
        <Trophy className="absolute left-1/2 top-6 h-9 w-9 -translate-x-1/2 text-amber-700/70" />
        {/* shine */}
        <div className="absolute left-3 top-2 h-10 w-3 rounded-full bg-white/55 blur-[1px]" />
      </div>
      {/* handles */}
      <div className="absolute left-[6px] top-3 h-9 w-9 rounded-full border-[6px] border-amber-400" />
      <div className="absolute right-[6px] top-3 h-9 w-9 rounded-full border-[6px] border-amber-400" />
      {/* stem */}
      <div className="absolute left-1/2 top-[76px] h-6 w-4 -translate-x-1/2 bg-amber-600" />
      {/* base */}
      <div className="absolute left-1/2 top-[100px] h-3 w-16 -translate-x-1/2 rounded-sm bg-amber-700" />
      <div className="absolute left-1/2 top-[112px] h-4 w-24 -translate-x-1/2 rounded-md bg-amber-800 shadow-lg" />
    </div>
  );
}
