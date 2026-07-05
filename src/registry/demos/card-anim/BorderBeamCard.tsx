import { Zap } from "lucide-react";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "ボーダービームカード",
  category: "カード演出",
  description: "一筋の光のビームがカードの縁を offset-path で周回する。",
  align: "center",
  isNew: true,
  tags: ["card", "hover", "animation", "border", "beam"],
};

export default function BorderBeamCard() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <div className="relative w-full max-w-sm overflow-hidden rounded-2xl border border-white/10 bg-[#0b0d17] p-7 text-slate-200 shadow-2xl shadow-black/40">
      <style>{`
        @keyframes bbc-travel {
          to { offset-distance: 100%; }
        }
        .bbc-beam {
          offset-path: rect(0 100% 100% 0 round 16px);
          offset-distance: 0%;
          animation: bbc-travel 4s linear infinite;
        }
      `}</style>
      {/* traveling beam */}
      <span className="bbc-beam pointer-events-none absolute left-0 top-0 size-16 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(56,189,248,0.9),transparent_70%)] blur-[2px]" />
      <div className="relative">
        <span className="inline-flex size-11 items-center justify-center rounded-xl border border-white/10 bg-white/5">
          <Zap className="size-5 text-sky-300" />
        </span>
        <h3 className="mt-5 text-lg font-semibold text-white">{en ? "Border Beam" : "ボーダー・ビーム"}</h3>
        <p className="mt-2 text-sm leading-relaxed text-slate-400">
          {en
            ? "A single point of light traces the border continuously — a perpetual animation that loops smoothly along an offset-path."
            : "一点の光が枠線をなぞり続けます。offset-path で滑らかに周回する常時アニメーション。"}
        </p>
        <div className="mt-6 flex items-center justify-between border-t border-white/5 pt-4">
          <span className="font-mono text-xs text-slate-500">live</span>
          <span className="text-sm font-medium text-sky-300">{en ? "Connect →" : "接続 →"}</span>
        </div>
      </div>
    </div>
  );
}
