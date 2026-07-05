import { Sparkles } from "lucide-react";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "シマー見出し",
  category: "テキストアニメ",
  description: "メタリックなシマーが流れる見出し＋小さなアニメ・アイブロウ。",
  align: "center",
  isNew: true,
  tags: ["text", "animation", "shimmer"],
};

export default function ShimmerHeading() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <div className="flex min-h-[260px] w-full max-w-2xl flex-col items-center justify-center gap-6 rounded-2xl bg-neutral-950 px-8 py-14 text-center">
      <span className="inline-flex items-center gap-1.5 overflow-hidden rounded-full border border-amber-400/30 bg-amber-400/5 px-3 py-1 text-xs font-medium text-amber-300">
        <Sparkles className="size-3.5 [animation:sh-twinkle_1.6s_ease-in-out_infinite]" />
        <span className="bg-[linear-gradient(110deg,#fcd34d,#fff7ed,#fcd34d)] bg-[length:200%_auto] bg-clip-text text-transparent [animation:sh-flow_3s_linear_infinite]">
          PREMIUM
        </span>
      </span>
      <h2 className="bg-[linear-gradient(110deg,#9ca3af_0%,#f9fafb_45%,#ffffff_50%,#f9fafb_55%,#9ca3af_100%)] bg-[length:200%_100%] bg-clip-text text-4xl font-extrabold tracking-tight text-transparent [animation:sh-sweep_3.5s_linear_infinite] sm:text-6xl">
        {en ? "Metallic shimmer" : "メタリック・シマー"}
      </h2>
      <p className="text-sm text-zinc-500">
        {en ? "A metallic sheen keeps flowing across the heading." : "金属光沢が見出しを流れ続けます。"}
      </p>
      <style>{`
        @keyframes sh-sweep {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        @keyframes sh-flow {
          to { background-position: -200% center; }
        }
        @keyframes sh-twinkle {
          0%, 100% { opacity: 0.5; transform: scale(0.9); }
          50% { opacity: 1; transform: scale(1.15); }
        }
      `}</style>
    </div>
  );
}
