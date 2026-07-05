import { useRef, useState } from "react";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "マスコット追従3D",
  category: "3Dアニメ",
  description:
    "CSSだけで作った3Dマスコットの頭と瞳がカーソルを追い、まばたきし、ホバーで笑顔に。外部画像なし。",
  align: "center",
  isNew: true,
  level: "advanced",
  tags: ["3d", "psychology", "conversion", "animation"],
  principle:
    "目が合い視線を追ってくる擬人化キャラは、人の顔認識・社会性の本能を刺激し、無機質なUIに親近感とラポール（信頼の土台）を生む。",
};

type Look = { x: number; y: number };
const REST: Look = { x: 0, y: 0 };

export default function MascotFollow3D() {
  const en =
    typeof document !== "undefined" && document.documentElement.lang === "en";
  const ref = useRef<HTMLDivElement>(null);
  const [look, setLook] = useState<Look>(REST);
  const [hover, setHover] = useState(false);

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
    const y = (e.clientY - (r.top + r.height / 2)) / (r.height / 2);
    setLook({
      x: Math.max(-1, Math.min(1, x)),
      y: Math.max(-1, Math.min(1, y)),
    });
  };

  const onPointerLeave = () => {
    setLook(REST);
    setHover(false);
  };

  const pupil = {
    transform: `translate(${look.x * 6}px, ${look.y * 5}px)`,
  };

  return (
    <div className="flex w-full items-center justify-center px-4 py-14">
      <style>{`
        @keyframes mf-blink { 0%,92%,100% { transform: scaleY(1);} 95% { transform: scaleY(0.08);} }
        @keyframes mf-bob { 0%,100% { transform: translateY(0);} 50% { transform: translateY(-6px);} }
        @keyframes mf-wave { 0%,100% { transform: rotate(8deg);} 50% { transform: rotate(-14deg);} }
        @media (prefers-reduced-motion: reduce) {
          .mf-bob, .mf-eyelid, .mf-arm { animation: none !important; }
        }
      `}</style>

      <div
        ref={ref}
        onPointerMove={onPointerMove}
        onPointerEnter={() => setHover(true)}
        onPointerLeave={onPointerLeave}
        className="relative grid h-[320px] w-[320px] place-items-center rounded-[36px] bg-[radial-gradient(120%_120%_at_50%_20%,#1b2440_0%,#0a0e1c_72%)] ring-1 ring-white/10"
        style={{ perspective: "800px" }}
        role="img"
        aria-label={
          en ? "A friendly mascot following the cursor" : "カーソルを追う親しみやすいマスコット"
        }
      >
        {/* shadow */}
        <div
          className="absolute bottom-10 h-5 w-32 rounded-[50%] bg-black/40 blur-md"
          aria-hidden="true"
        />

        <div
          className="mf-bob relative"
          style={{
            transformStyle: "preserve-3d",
            transform: `rotateY(${look.x * 14}deg) rotateX(${-look.y * 12}deg)`,
            transition: "transform 180ms ease-out",
            animation: "mf-bob 3.6s ease-in-out infinite",
          }}
        >
          {/* waving arm */}
          <span
            className="mf-arm absolute -right-5 top-7 h-4 w-12 rounded-full"
            style={{
              background: "linear-gradient(90deg, #6366f1, #818cf8)",
              transformOrigin: "0% 50%",
              animation: "mf-wave 1.8s ease-in-out infinite",
            }}
            aria-hidden="true"
          />

          {/* body */}
          <div
            className="grid h-44 w-44 place-items-center rounded-[44px]"
            style={{
              background:
                "radial-gradient(120% 120% at 35% 25%, #a5b4fc 0%, #6366f1 55%, #4338ca 100%)",
              boxShadow:
                "inset 0 6px 14px rgba(255,255,255,0.35), inset 0 -10px 18px rgba(49,46,129,0.6), 0 24px 36px -16px rgba(79,70,229,0.6)",
            }}
          >
            {/* face */}
            <div className="relative flex flex-col items-center gap-2">
              {/* eyes */}
              <div className="flex gap-5">
                {[0, 1].map((i) => (
                  <div
                    key={i}
                    className="relative grid h-10 w-10 place-items-center overflow-hidden rounded-full bg-white"
                    style={{ boxShadow: "inset 0 2px 4px rgba(0,0,0,0.12)" }}
                  >
                    {/* eyelid (blink) */}
                    <span
                      className="mf-eyelid absolute inset-x-0 top-0 h-full origin-top rounded-full"
                      style={{
                        background:
                          "radial-gradient(120% 120% at 35% 25%, #a5b4fc 0%, #6366f1 60%)",
                        animation: `mf-blink ${4.2 + i * 0.3}s ease-in-out infinite`,
                      }}
                      aria-hidden="true"
                    />
                    {/* pupil */}
                    <span
                      className="relative grid h-5 w-5 place-items-center rounded-full bg-slate-900"
                      style={pupil}
                    >
                      <span className="absolute right-1 top-1 h-1.5 w-1.5 rounded-full bg-white/90" />
                    </span>
                  </div>
                ))}
              </div>

              {/* cheeks */}
              <div className="flex w-full justify-between px-0.5">
                <span className="h-2.5 w-3.5 rounded-full bg-rose-300/70 blur-[1px]" />
                <span className="h-2.5 w-3.5 rounded-full bg-rose-300/70 blur-[1px]" />
              </div>

              {/* mouth */}
              <span
                className="mt-1 block bg-rose-900/80"
                style={{
                  width: hover ? 30 : 18,
                  height: hover ? 16 : 8,
                  borderBottomLeftRadius: 999,
                  borderBottomRightRadius: 999,
                  borderTopLeftRadius: hover ? 4 : 999,
                  borderTopRightRadius: hover ? 4 : 999,
                  transition: "all 220ms cubic-bezier(0.34,1.56,0.64,1)",
                }}
                aria-hidden="true"
              />
            </div>
          </div>

          {/* antenna */}
          <span
            className="absolute -top-4 left-1/2 h-5 w-0.5 -translate-x-1/2 bg-indigo-300"
            aria-hidden="true"
          >
            <span className="absolute -top-2 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-amber-300 shadow-[0_0_10px_rgba(252,211,77,0.8)]" />
          </span>
        </div>

        <p className="absolute bottom-5 text-xs font-medium tracking-wide text-white/55">
          {hover
            ? en
              ? "Hi there!"
              : "こんにちは！"
            : en
              ? "Move your cursor — I'm watching"
              : "カーソルを動かして — 見てるよ"}
        </p>
      </div>
    </div>
  );
}
