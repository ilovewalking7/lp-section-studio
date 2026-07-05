import { useState } from "react";
import { Gift, Ticket, Sparkles } from "lucide-react";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "ギフトボックス・オープン 3D",
  category: "3Dアニメ",
  description:
    "クリックで蓋がpreserve-3dで持ち上がり傾いて開き、中からクーポンが浮かび上がる3Dギフトボックス。",
  align: "center",
  isNew: true,
  level: "advanced",
  tags: ["3d", "psychology", "conversion", "animation"],
  principle:
    "互恵性 — 先に「贈り物」を受け取ると、人はお返しをしたくなる。開封体験が行動の動機になる。",
};

export default function GiftBoxOpen3D() {
  const en =
    typeof document !== "undefined" && document.documentElement.lang === "en";
  const [open, setOpen] = useState(false);

  const toggle = () => setOpen((v) => !v);

  return (
    <div className="flex w-full flex-col items-center justify-center gap-7 rounded-3xl bg-[radial-gradient(120%_120%_at_50%_0%,#1a1024_0%,#0a0710_72%)] py-16 text-white">
      <style>{`
        @keyframes gbo-float {
          0%,100% { transform: translateY(0); }
          50% { transform: translateY(-7px); }
        }
        @media (prefers-reduced-motion: reduce) {
          .gbo-float { animation: none !important; }
        }
      `}</style>

      <p className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.32em] text-rose-200/70">
        <Sparkles className="h-3.5 w-3.5" />
        {en ? "A gift for you" : "あなたへの贈り物"}
      </p>

      <div
        className="relative"
        style={{ perspective: "900px", width: 260, height: 280 }}
      >
        {/* glow */}
        <div
          className="absolute left-1/2 top-[120px] h-24 w-48 -translate-x-1/2 rounded-[50%] blur-3xl transition-opacity duration-700"
          style={{
            background: "rgba(244,114,182,0.45)",
            opacity: open ? 0.9 : 0.4,
          }}
          aria-hidden="true"
        />

        {/* floating coupon — rises from inside the box */}
        <div
          className="pointer-events-none absolute left-1/2 z-20 -translate-x-1/2"
          style={{
            top: 60,
            transition: "transform 0.7s cubic-bezier(.2,.9,.25,1), opacity 0.6s",
            transform: open
              ? "translateX(-50%) translateY(-58px) scale(1)"
              : "translateX(-50%) translateY(28px) scale(0.7)",
            opacity: open ? 1 : 0,
          }}
        >
          <div className="gbo-float" style={{ animation: "gbo-float 3.2s ease-in-out infinite" }}>
            <div
              className="relative flex w-[200px] flex-col items-center gap-1 rounded-2xl border border-white/25 px-5 py-4 text-center shadow-2xl"
              style={{
                background:
                  "linear-gradient(150deg, #fef3c7 0%, #fde68a 55%, #fbbf24 100%)",
                boxShadow:
                  "0 24px 50px -18px rgba(251,191,36,0.6), inset 0 1px 0 rgba(255,255,255,0.6)",
              }}
            >
              <Ticket className="h-5 w-5 text-amber-700" />
              <span className="text-2xl font-black tracking-tight text-amber-900">
                -20%
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-amber-800/80">
                {en ? "Welcome coupon" : "ウェルカム クーポン"}
              </span>
              {/* perforation dots */}
              <span className="absolute -left-1.5 top-1/2 h-3 w-3 -translate-y-1/2 rounded-full bg-[#0a0710]" />
              <span className="absolute -right-1.5 top-1/2 h-3 w-3 -translate-y-1/2 rounded-full bg-[#0a0710]" />
            </div>
          </div>
        </div>

        {/* box (button so click/hover toggles) */}
        <button
          type="button"
          onClick={toggle}
          onMouseEnter={() => setOpen(true)}
          className="group absolute left-1/2 top-[120px] -translate-x-1/2 cursor-pointer outline-none"
          style={{ transformStyle: "preserve-3d", width: 140, height: 140 }}
          aria-pressed={open}
          aria-label={en ? "Open the gift box" : "ギフトボックスを開ける"}
        >
          <div
            className="relative"
            style={{
              transformStyle: "preserve-3d",
              transform: "rotateX(58deg) rotateZ(-32deg)",
              width: 140,
              height: 140,
            }}
          >
            {/* box body — 4 walls + base via stacked faces */}
            <div
              className="absolute inset-0 rounded-[6px]"
              style={{
                background:
                  "linear-gradient(145deg, #db2777 0%, #be185d 55%, #9d174d 100%)",
                boxShadow: "inset 0 0 0 2px rgba(255,255,255,0.12)",
                transform: "translateZ(-2px)",
              }}
            />
            {/* ribbon cross on body */}
            <div className="absolute left-1/2 top-0 h-full w-5 -translate-x-1/2 bg-amber-300/90" />
            <div className="absolute left-0 top-1/2 h-5 w-full -translate-y-1/2 bg-amber-300/90" />

            {/* lid — lifts & tilts on open via preserve-3d */}
            <div
              className="absolute -inset-x-1.5 -top-1.5"
              style={{
                height: 44,
                transformStyle: "preserve-3d",
                transformOrigin: "top center",
                transition: "transform 0.6s cubic-bezier(.34,1.4,.5,1)",
                transform: open
                  ? "translateZ(64px) rotateX(-46deg)"
                  : "translateZ(0px) rotateX(0deg)",
              }}
            >
              <div
                className="absolute inset-0 rounded-[6px]"
                style={{
                  background:
                    "linear-gradient(145deg, #ec4899 0%, #db2777 60%, #be185d 100%)",
                  boxShadow:
                    "inset 0 1px 0 rgba(255,255,255,0.35), 0 8px 20px rgba(0,0,0,0.35)",
                }}
              />
              {/* lid ribbon */}
              <div className="absolute left-1/2 top-0 h-full w-5 -translate-x-1/2 bg-amber-300" />
              <div className="absolute left-0 top-1/2 h-5 w-full -translate-y-1/2 bg-amber-300" />
              {/* bow */}
              <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2">
                <div className="flex">
                  <span className="block h-5 w-5 -rotate-12 rounded-[60%_60%_60%_10%] bg-amber-200 shadow" />
                  <span className="block h-5 w-5 rotate-12 -scale-x-100 rounded-[60%_60%_60%_10%] bg-amber-200 shadow" />
                </div>
              </div>
            </div>
          </div>
        </button>

        {/* contact shadow */}
        <div
          className="absolute left-1/2 top-[244px] h-5 w-32 -translate-x-1/2 rounded-[50%] blur-md"
          style={{ background: "rgba(0,0,0,0.55)" }}
          aria-hidden="true"
        />
      </div>

      <div className="flex flex-col items-center gap-3">
        <p className="max-w-xs text-pretty text-center text-sm text-white/55">
          {open
            ? en
              ? "It's yours — claim it before it expires."
              : "受け取ったクーポンは、あなたのもの。"
            : en
              ? "Tap the box. A welcome gift is waiting inside."
              : "ボックスをタップ。中にウェルカムギフトが。"}
        </p>
        <button
          type="button"
          onClick={toggle}
          className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-bold text-rose-700 shadow-lg transition hover:bg-white/90"
        >
          <Gift className="h-4 w-4" />
          {open
            ? en
              ? "Use my coupon"
              : "クーポンを使う"
            : en
              ? "Open gift"
              : "ギフトを開ける"}
        </button>
      </div>
    </div>
  );
}
