import { useState } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";
import type { DemoMeta } from "@/registry";
import { Gem } from "lucide-react";

export const meta: DemoMeta = {
  name: "パール ボタン＆バッジ",
  category: "3Dアニメ",
  description:
    "真珠光沢のボタンとバッジ。虹色のコニックグラデの艶がポインタの角度で滑らかに移ろう。",
  align: "center",
  isNew: true,
  level: "advanced",
  tags: ["3d", "gloss", "materials", "animation"],
  principle:
    "見る角度で色が変わる玉虫色は希少性と上質さの記号。微細な反応が“高品質に触れている”感覚を生む。",
};

export default function PearlButtonBadge() {
  const en =
    typeof document !== "undefined" && document.documentElement.lang === "en";

  // 角度はマウント時に計算しない（初期値のみ）。更新はハンドラ内のみ。
  const [angle, setAngle] = useState(135);

  const handleMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const deg = (Math.atan2(e.clientY - cy, e.clientX - cx) * 180) / Math.PI;
    setAngle(deg + 180);
  };

  const sheen = (a: number) =>
    `conic-gradient(from ${a}deg at 50% 40%, ` +
    "#fef6ff 0deg, #d9ecff 50deg, #ffe6f4 110deg, #e6fff2 170deg, " +
    "#fff4dc 230deg, #efe6ff 300deg, #fef6ff 360deg)";

  return (
    <div
      onPointerMove={handleMove}
      className="flex w-full flex-col items-center gap-7 rounded-3xl py-12"
      style={{
        background:
          "radial-gradient(120% 100% at 50% 0%, #f3eefb 0%, #e7e0f0 60%, #ddd5ea 100%)",
      }}
    >
      <div
        className="relative grid place-items-center"
        style={{ perspective: "600px" }}
      >
        {/* iridescent badge */}
        <div
          className="relative grid h-28 w-28 place-items-center rounded-full"
          style={{
            background: sheen(angle),
            boxShadow:
              "inset 0 2px 8px rgba(255,255,255,0.9), inset 0 -8px 18px rgba(120,90,160,0.25), 0 14px 30px rgba(140,120,170,0.4)",
            transition: "background 120ms linear",
          }}
        >
          <div
            className="grid h-20 w-20 place-items-center rounded-full text-violet-700/80"
            style={{
              background:
                "radial-gradient(circle at 38% 30%, #ffffff 0%, #f0eafa 55%, #e2d8f2 100%)",
              boxShadow: "inset 0 1px 4px rgba(255,255,255,0.9)",
            }}
          >
            <Gem className="h-8 w-8" strokeWidth={1.8} />
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-4">
        {/* primary pearl button */}
        <button
          type="button"
          className="relative overflow-hidden rounded-full px-8 py-3 text-sm font-bold text-violet-900/80"
          style={{
            background: sheen(angle + 40),
            boxShadow:
              "inset 0 1px 3px rgba(255,255,255,0.9), inset 0 -4px 10px rgba(120,90,160,0.25), 0 8px 20px rgba(150,120,180,0.35)",
            transition: "background 120ms linear",
          }}
        >
          <span
            className="pointer-events-none absolute inset-x-0 top-0 h-1/2 rounded-t-full"
            style={{
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0) 100%)",
            }}
          />
          {en ? "Add to bag" : "カートに入れる"}
        </button>

        {/* pill badge */}
        <span
          className="rounded-full px-5 py-2 text-xs font-semibold text-violet-900/70"
          style={{
            background: sheen(angle - 60),
            boxShadow:
              "inset 0 1px 2px rgba(255,255,255,0.9), 0 6px 14px rgba(150,120,180,0.3)",
            transition: "background 120ms linear",
          }}
        >
          {en ? "Limited" : "数量限定"}
        </span>
      </div>

      <p className="text-[11px] uppercase tracking-[0.28em] text-violet-500/60">
        {en ? "Move pointer to shift the sheen" : "ポインタを動かすと艶が移ろう"}
      </p>
    </div>
  );
}
