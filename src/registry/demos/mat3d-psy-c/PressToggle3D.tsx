import { useEffect, useRef, useState } from "react";
import { Bell, Heart, Star } from "lucide-react";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "プレストグル3D",
  category: "3Dアニメ",
  description:
    "本物の奥行きを持つ3D押しボタン群。押すとZ軸へ沈み、影が縮み、クリック波紋が広がる。触れて気持ちいいトグル。",
  align: "center",
  isNew: true,
  level: "advanced",
  tags: ["3d", "psychology", "conversion", "animation"],
  principle:
    "押下の沈み込み・影・波紋という即時の触覚的フィードバックが小さな達成感（マイクロ・プレジャー）を生み、操作そのものを繰り返したくさせる。",
};

type Ripple = { id: number; x: number; y: number };

type Toggle = {
  id: string;
  labelJa: string;
  labelEn: string;
  Icon: typeof Heart;
  hue: string;
  glow: string;
};

const TOGGLES: Toggle[] = [
  {
    id: "like",
    labelJa: "いいね",
    labelEn: "Like",
    Icon: Heart,
    hue: "linear-gradient(165deg, #fb7185 0%, #e11d48 100%)",
    glow: "244,63,94",
  },
  {
    id: "fav",
    labelJa: "お気に入り",
    labelEn: "Favorite",
    Icon: Star,
    hue: "linear-gradient(165deg, #fcd34d 0%, #f59e0b 100%)",
    glow: "245,158,11",
  },
  {
    id: "notify",
    labelJa: "通知",
    labelEn: "Notify",
    Icon: Bell,
    hue: "linear-gradient(165deg, #818cf8 0%, #4f46e5 100%)",
    glow: "99,102,241",
  },
];

function PressButton({ toggle, en }: { toggle: Toggle; en: boolean }) {
  const [on, setOn] = useState(false);
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const seq = useRef(0);
  const timers = useRef<number[]>([]);

  useEffect(() => {
    const t = timers.current;
    return () => {
      t.forEach((id) => window.clearTimeout(id));
    };
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setOn((v) => !v);
    const r = e.currentTarget.getBoundingClientRect();
    const id = seq.current++;
    const ripple: Ripple = {
      id,
      x: e.clientX - r.left,
      y: e.clientY - r.top,
    };
    setRipples((prev) => [...prev, ripple]);
    const tid = window.setTimeout(() => {
      setRipples((prev) => prev.filter((rp) => rp.id !== id));
    }, 620);
    timers.current.push(tid);
  };

  const { Icon } = toggle;

  return (
    <div className="flex flex-col items-center gap-3">
      <button
        type="button"
        onClick={handleClick}
        aria-pressed={on}
        aria-label={en ? "Toggle" : "オン・オフ"}
        className="press-btn relative grid h-20 w-20 place-items-center overflow-hidden rounded-[26px] outline-none focus-visible:ring-2 focus-visible:ring-white/50"
        style={{
          background: on ? toggle.hue : "linear-gradient(165deg, #232b42 0%, #161c2e 100%)",
          color: on ? "#fff" : `rgba(${toggle.glow},0.9)`,
          transform: on ? "translateZ(-8px) translateY(3px)" : "translateZ(0) translateY(0)",
          boxShadow: on
            ? `0 3px 0 rgba(0,0,0,0.35), 0 6px 12px -4px rgba(${toggle.glow},0.5), inset 0 2px 6px rgba(0,0,0,0.4)`
            : `0 9px 0 rgba(0,0,0,0.4), 0 16px 24px -8px rgba(${toggle.glow},0.35), inset 0 1px 2px rgba(255,255,255,0.18)`,
          transition:
            "transform 140ms cubic-bezier(0.34,1.56,0.64,1), box-shadow 140ms ease, background 220ms ease",
        }}
      >
        <Icon
          className="press-icon h-7 w-7"
          fill={on ? "currentColor" : "none"}
        />
        {ripples.map((rp) => (
          <span
            key={rp.id}
            className="press-ripple pointer-events-none absolute rounded-full"
            style={{
              left: rp.x,
              top: rp.y,
              background: "rgba(255,255,255,0.55)",
            }}
            aria-hidden="true"
          />
        ))}
      </button>
      <span className="text-xs font-medium text-white/70">
        {en ? toggle.labelEn : toggle.labelJa}
      </span>
    </div>
  );
}

export default function PressToggle3D() {
  const en =
    typeof document !== "undefined" && document.documentElement.lang === "en";

  return (
    <div className="flex w-full items-center justify-center px-4 py-14">
      <style>{`
        @keyframes pt-ripple { from { width:0; height:0; opacity:.55; transform:translate(-50%,-50%); } to { width:140px; height:140px; opacity:0; transform:translate(-50%,-50%); } }
        @keyframes pt-pop { 0% { transform:scale(1);} 40% { transform:scale(1.28);} 100% { transform:scale(1);} }
        .press-ripple { animation: pt-ripple 600ms ease-out forwards; }
        .press-btn:active .press-icon { animation: pt-pop 320ms ease-out; }
        @media (prefers-reduced-motion: reduce) {
          .press-ripple { animation: none !important; opacity: 0 !important; }
          .press-btn { transition: none !important; }
          .press-btn:active .press-icon { animation: none !important; }
        }
      `}</style>

      <div
        className="rounded-[32px] bg-[radial-gradient(120%_120%_at_50%_0%,#11182c_0%,#070a14_72%)] px-10 py-12 ring-1 ring-white/10"
        style={{ perspective: "700px" }}
      >
        <p className="mb-8 text-center text-xs font-semibold uppercase tracking-[0.3em] text-white/50">
          {en ? "Press me" : "押してみて"}
        </p>
        <div className="flex items-start justify-center gap-7">
          {TOGGLES.map((t) => (
            <PressButton key={t.id} toggle={t} en={en} />
          ))}
        </div>
      </div>
    </div>
  );
}
