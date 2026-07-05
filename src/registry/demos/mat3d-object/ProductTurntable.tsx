import type { DemoMeta } from "@/registry";
import { Wifi, Signal, BatteryFull } from "lucide-react";

export const meta: DemoMeta = {
  name: "プロダクト ターンテーブル",
  category: "3Dアニメ",
  description:
    "スマホ風モックアップが3Dターンテーブルでゆっくり回転。床の反射と影付き。",
  align: "center",
  isNew: true,
  level: "advanced",
  tags: ["3d", "object", "materials", "animation"],
};

function Phone({ en }: { en: boolean }) {
  return (
    <div
      className="relative h-[230px] w-[120px] overflow-hidden rounded-[26px]"
      style={{
        background: "linear-gradient(150deg, #2b2f3a 0%, #14161d 60%, #0a0b10 100%)",
        boxShadow:
          "inset 0 0 0 2px rgba(255,255,255,0.08), inset 0 0 0 6px #05060a, 0 20px 40px rgba(0,0,0,0.5)",
      }}
    >
      {/* screen */}
      <div
        className="absolute inset-[7px] overflow-hidden rounded-[20px]"
        style={{
          background:
            "linear-gradient(165deg, #6d28d9 0%, #4f46e5 40%, #0ea5e9 100%)",
        }}
      >
        {/* glass glare */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(125deg, rgba(255,255,255,0.45) 0%, rgba(255,255,255,0) 36%)",
          }}
        />
        {/* status bar */}
        <div className="absolute left-0 right-0 top-0 flex items-center justify-between px-3 pt-2 text-[8px] font-semibold text-white/90">
          <span>9:41</span>
          <div className="flex items-center gap-1">
            <Signal className="h-2.5 w-2.5" />
            <Wifi className="h-2.5 w-2.5" />
            <BatteryFull className="h-2.5 w-2.5" />
          </div>
        </div>
        {/* notch */}
        <div className="absolute left-1/2 top-1 h-3 w-12 -translate-x-1/2 rounded-full bg-black/70" />
        {/* content */}
        <div className="absolute inset-x-3 bottom-4 top-9 flex flex-col gap-2">
          <div className="h-16 rounded-xl bg-white/15 backdrop-blur-sm" />
          <div className="h-2.5 w-3/4 rounded-full bg-white/40" />
          <div className="h-2.5 w-1/2 rounded-full bg-white/25" />
          <div className="mt-auto h-8 rounded-full bg-white/90 text-center text-[9px] font-bold leading-8 text-indigo-700">
            {en ? "Get the app" : "アプリを入手"}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProductTurntable() {
  const en =
    typeof document !== "undefined" && document.documentElement.lang === "en";

  return (
    <div className="flex w-full flex-col items-center justify-center gap-4 rounded-3xl bg-[radial-gradient(120%_120%_at_50%_0%,#11131c_0%,#070810_72%)] py-12">
      <style>{`
        @keyframes ptt-turn { to { transform: rotateY(360deg); } }
        @media (prefers-reduced-motion: reduce) {
          .ptt-stage { animation: none !important; transform: rotateY(-24deg); }
        }
      `}</style>

      <div
        className="relative"
        style={{ perspective: "1100px", width: 240, height: 340 }}
      >
        {/* glow under product */}
        <div
          className="absolute left-1/2 top-[210px] h-16 w-44 -translate-x-1/2 rounded-[50%] blur-2xl"
          style={{ background: "rgba(99,102,241,0.45)" }}
        />

        <div
          className="absolute left-1/2 top-6"
          style={{ transformStyle: "preserve-3d", transform: "translateX(-60px)" }}
        >
          <div
            className="ptt-stage"
            style={{
              transformStyle: "preserve-3d",
              animation: "ptt-turn 12s linear infinite",
              willChange: "transform",
            }}
          >
            <Phone en={en} />
            {/* floor reflection */}
            <div
              className="absolute left-0 top-[234px] origin-top"
              style={{
                transform: "scaleY(-1)",
                opacity: 0.28,
                maskImage:
                  "linear-gradient(to bottom, rgba(0,0,0,0.9), transparent 62%)",
                WebkitMaskImage:
                  "linear-gradient(to bottom, rgba(0,0,0,0.9), transparent 62%)",
              }}
              aria-hidden="true"
            >
              <Phone en={en} />
            </div>
          </div>
        </div>

        {/* contact shadow */}
        <div
          className="absolute left-1/2 top-[238px] h-5 w-36 -translate-x-1/2 rounded-[50%] blur-md"
          style={{ background: "rgba(0,0,0,0.55)" }}
        />
      </div>

      <p className="text-xs font-medium tracking-wide text-slate-400">
        {en ? "Aurora — flagship in motion" : "Aurora — 回転するフラッグシップ"}
      </p>
    </div>
  );
}
