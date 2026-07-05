import { CreditCard, Wifi } from "lucide-react";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "フリップカード",
  category: "カード演出",
  description: "ホバーで表裏が3D回転して切り替わるカード（backface-hidden）。",
  align: "center",
  isNew: true,
  tags: ["card", "hover", "animation", "flip", "3d"],
};

export default function FlipCard() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <div className="group h-56 w-full max-w-sm [perspective:1200px]">
      <div className="relative h-full w-full transition-transform duration-700 ease-out [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
        {/* Front */}
        <div className="absolute inset-0 flex flex-col justify-between rounded-2xl border border-white/10 bg-gradient-to-br from-indigo-600 to-violet-800 p-6 text-white shadow-2xl shadow-black/40 [backface-visibility:hidden]">
          <div className="flex items-center justify-between">
            <CreditCard className="size-7" />
            <Wifi className="size-5 rotate-90 opacity-80" />
          </div>
          <div>
            <p className="font-mono text-lg tracking-[0.2em]">•••• •••• •••• 4921</p>
            <p className="mt-2 text-xs uppercase tracking-wider text-white/70">Aurora Bank</p>
          </div>
        </div>
        {/* Back */}
        <div className="absolute inset-0 flex flex-col justify-between rounded-2xl border border-white/10 bg-[#0b0d17] p-6 text-slate-200 shadow-2xl shadow-black/40 [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <div className="-mx-6 mt-2 h-10 bg-black/60" />
          <div>
            <div className="flex items-center justify-between rounded bg-white/5 px-3 py-2">
              <span className="text-xs text-slate-400">CVV</span>
              <span className="font-mono text-sm text-white">•••</span>
            </div>
            <p className="mt-3 text-xs leading-relaxed text-slate-500">
              {en
                ? "Hover to reveal the back. A 3D rotation with hidden backface makes the flip feel natural."
                : "ホバーで裏面が表示されます。3D回転と裏面非表示で自然な反転を実現。"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
