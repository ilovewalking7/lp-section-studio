import type { DemoMeta } from "@/registry";
import { Disc3 } from "lucide-react";

export const meta: DemoMeta = {
  name: "ホログラフィック",
  category: "ボタン",
  description: "見る角度で色が変わるホロ箔のようなボタン。虹色のシマーが流れ続ける。",
  align: "center",
  isNew: true,
  tags: ["button", "gradient"],
};

export default function Holographic() {
  return (
    <div className="flex items-center justify-center rounded-2xl bg-[#0b0b12] p-8">
      <style>{`
        @keyframes holo-shift { 0%{background-position:0% 50%} 100%{background-position:200% 50%} }
      `}</style>
      <button
        type="button"
        className="group inline-flex items-center gap-2 rounded-xl px-7 py-3.5 text-sm font-semibold text-white/90 shadow-[0_8px_26px_-8px_rgba(168,85,247,0.5)] transition-transform duration-300 hover:scale-[1.03] active:scale-[0.98]"
        style={{
          backgroundImage:
            "linear-gradient(110deg,#a78bfa,#22d3ee,#f0abfc,#fde68a,#86efac,#a78bfa)",
          backgroundSize: "200% 100%",
          animation: "holo-shift 4s linear infinite",
          mixBlendMode: "normal",
        }}
      >
        <Disc3 className="size-4" />
        Holographic
      </button>
    </div>
  );
}
