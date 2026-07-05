import type { DemoMeta } from "@/registry";
import { Heart } from "lucide-react";

export const meta: DemoMeta = {
  name: "グロー・パルス",
  category: "ボタン",
  description: "鼓動のようにグローが脈打つボタン。注意を引きたいCTAに最適。",
  align: "center",
  isNew: true,
  tags: ["button", "gradient"],
};

export default function GlowPulse() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <div className="flex items-center justify-center rounded-2xl bg-[#0b0b12] p-8">
      <style>{`
        @keyframes gp-pulse {
          0%,100% { box-shadow: 0 0 0 0 rgba(244,63,94,0.55), 0 8px 24px -8px rgba(244,63,94,0.6) }
          50% { box-shadow: 0 0 0 10px rgba(244,63,94,0), 0 8px 28px -6px rgba(244,63,94,0.8) }
        }
      `}</style>
      <button
        type="button"
        className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-rose-500 to-pink-600 px-7 py-3.5 text-sm font-semibold text-white transition-transform duration-300 hover:scale-[1.04] active:scale-[0.98]"
        style={{ animation: "gp-pulse 1.8s ease-in-out infinite" }}
      >
        <Heart className="size-4 transition-transform duration-300 group-hover:scale-110" />
        {en ? "Like" : "いいね"}
      </button>
    </div>
  );
}
