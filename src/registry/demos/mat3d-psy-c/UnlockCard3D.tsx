import { useState } from "react";
import { Lock, LockOpen, Sparkles, Check } from "lucide-react";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "アンロックカード3D",
  category: "3Dアニメ",
  description:
    "ロックされたProカードをクリックすると3Dの南京錠が開き、カードが手前へ浮上して特典が現れる。FOMOで「逃したくない」を喚起。",
  align: "center",
  isNew: true,
  level: "advanced",
  tags: ["3d", "psychology", "conversion", "animation"],
  principle:
    "鍵をかけて隠した特典を一瞬だけ見せる演出は、損失回避（手に入れ損ねる痛み）を刺激し、『今すぐ解放したい』衝動を生む。",
};

const PERKS_JA = ["無制限の書き出し", "高度な解析", "優先サポート"];
const PERKS_EN = ["Unlimited exports", "Advanced analytics", "Priority support"];

export default function UnlockCard3D() {
  const en =
    typeof document !== "undefined" && document.documentElement.lang === "en";
  const [open, setOpen] = useState(false);
  const perks = en ? PERKS_EN : PERKS_JA;

  return (
    <div className="flex w-full items-center justify-center px-4 py-12">
      <style>{`
        @keyframes uc-shackle { from { transform: translateY(0) rotateZ(0deg); } to { transform: translateY(-7px) rotateZ(34deg); } }
        @keyframes uc-glow { 0%,100% { opacity:.55; } 50% { opacity:1; } }
        @media (prefers-reduced-motion: reduce) {
          .uc-card, .uc-shackle, .uc-glow { transition: none !important; animation: none !important; }
        }
      `}</style>

      <div style={{ perspective: "1100px" }}>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-pressed={open}
          className="uc-card group relative block h-[400px] w-[300px] select-none rounded-[26px] text-left outline-none ring-1 ring-white/10 focus-visible:ring-2 focus-visible:ring-amber-300/70"
          style={{
            transformStyle: "preserve-3d",
            transform: open
              ? "translateZ(60px) translateY(-10px) rotateX(4deg)"
              : "translateZ(0) translateY(0) rotateX(0deg)",
            transition: "transform 700ms cubic-bezier(0.22,1,0.36,1)",
            background:
              "radial-gradient(130%_100%_at_50%_0%, #2a2150 0%, #120c24 62%)",
            boxShadow: open
              ? "0 38px 60px -24px rgba(120,80,255,0.55), 0 0 0 1px rgba(251,191,36,0.25)"
              : "0 16px 34px -20px rgba(0,0,0,0.7)",
          }}
        >
          {/* ambient glow */}
          <div
            className="uc-glow pointer-events-none absolute inset-0 rounded-[26px]"
            style={{
              background:
                "radial-gradient(80% 60% at 50% 18%, rgba(251,191,36,0.18), transparent 70%)",
              animation: "uc-glow 3.4s ease-in-out infinite",
            }}
            aria-hidden="true"
          />

          {/* header / padlock */}
          <div className="relative flex flex-col items-center gap-4 pt-9">
            <div
              className="relative grid h-20 w-20 place-items-center rounded-[22px] bg-white/8 ring-1 ring-white/15 backdrop-blur"
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* shackle */}
              <span
                className="uc-shackle absolute left-1/2 top-[18px] h-7 w-9 -translate-x-1/2 rounded-t-full border-[4px] border-amber-300/90"
                style={{
                  borderBottom: "none",
                  transformOrigin: "100% 100%",
                  transform: open
                    ? "translateY(-7px) rotateZ(34deg)"
                    : "translateY(0) rotateZ(0deg)",
                  transition: "transform 550ms cubic-bezier(0.34,1.56,0.64,1)",
                }}
                aria-hidden="true"
              />
              {/* body */}
              <span
                className="relative mt-3 grid h-10 w-12 place-items-center rounded-md"
                style={{
                  background:
                    "linear-gradient(160deg, #fde68a 0%, #f59e0b 60%, #b45309 100%)",
                  boxShadow: "inset 0 1px 2px rgba(255,255,255,0.6)",
                }}
              >
                {open ? (
                  <LockOpen className="h-5 w-5 text-amber-950" />
                ) : (
                  <Lock className="h-5 w-5 text-amber-950" />
                )}
              </span>
            </div>

            <div className="text-center">
              <span className="inline-flex items-center gap-1 rounded-full bg-amber-300/15 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-amber-200">
                <Sparkles className="h-3.5 w-3.5" />
                Pro
              </span>
            </div>
          </div>

          {/* content */}
          <div className="relative mt-6 px-7">
            <h3 className="text-center text-xl font-semibold text-white">
              {open
                ? en
                  ? "Welcome to Pro"
                  : "Proへようこそ"
                : en
                  ? "Members only"
                  : "メンバー限定"}
            </h3>

            <div
              className="mt-5"
              style={{
                maxHeight: open ? 200 : 0,
                opacity: open ? 1 : 0,
                overflow: "hidden",
                transition:
                  "max-height 650ms cubic-bezier(0.22,1,0.36,1), opacity 500ms ease",
              }}
            >
              <ul className="space-y-3">
                {perks.map((perk) => (
                  <li
                    key={perk}
                    className="flex items-center gap-3 text-sm text-white/85"
                  >
                    <span className="grid h-6 w-6 place-items-center rounded-full bg-emerald-400/20 text-emerald-300">
                      <Check className="h-3.5 w-3.5" />
                    </span>
                    {perk}
                  </li>
                ))}
              </ul>
            </div>

            {!open && (
              <p className="mt-4 text-center text-sm text-white/55">
                {en
                  ? "Tap to unlock what you're missing."
                  : "タップで、逃している特典を解放。"}
              </p>
            )}
          </div>

          {/* footer hint */}
          <span className="absolute inset-x-0 bottom-6 text-center text-xs font-medium tracking-wide text-amber-200/80">
            {open
              ? en
                ? "Unlocked — don't lose it"
                : "解放済み — 逃さないで"
              : en
                ? "Click to unlock"
                : "クリックで解放"}
          </span>
        </button>
      </div>
    </div>
  );
}
