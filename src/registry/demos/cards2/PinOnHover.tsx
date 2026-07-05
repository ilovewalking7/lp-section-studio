import { MapPin } from "lucide-react";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "ピンオンホバー",
  category: "カード演出",
  description: "ホバーで影が伸びてカードが宙に浮き上がるピンエフェクト。",
  align: "center",
  isNew: true,
  tags: ["card", "animation"],
};

export default function PinOnHover() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <div className="w-full max-w-sm py-6" style={{ perspective: "1000px" }}>
      <div className="group relative transition-transform duration-500 ease-out hover:-translate-y-3">
        <div
          className="pointer-events-none absolute inset-x-6 bottom-0 h-8 rounded-[50%] bg-black/60 blur-xl opacity-40 transition-all duration-500 group-hover:translate-y-6 group-hover:opacity-70"
        />
        <div className="relative rounded-2xl border border-white/10 bg-gradient-to-br from-[#171b2e] to-[#0b0d17] p-7 shadow-xl shadow-black/40 transition-shadow duration-500 group-hover:shadow-2xl group-hover:shadow-emerald-900/40">
          <div className="flex size-12 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-300">
            <MapPin className="size-6" />
          </div>
          <h3 className="mt-5 text-lg font-semibold text-white">
            {en ? "Floating Pin" : "浮き上がるピン"}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-400">
            {en
              ? "On hover the card lifts off the ground and its shadow stretches, making it look like it is truly floating."
              : "ホバーするとカードが地面から離れ、影が伸びて実際に浮いているように見えます。"}
          </p>
        </div>
      </div>
    </div>
  );
}
