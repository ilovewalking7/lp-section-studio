import type { DemoMeta } from "@/registry";
import { Layers } from "lucide-react";

export const meta: DemoMeta = {
  name: "レイヤード",
  category: "ボタン",
  description: "背後に重なるガラスの層がホバーでずれて見える、レイヤード・ボタン。",
  align: "center",
  isNew: true,
  tags: ["button", "glass"],
};

export default function Layered() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <div className="flex items-center justify-center rounded-2xl bg-[#0e1117] p-12">
      <div className="group relative">
        <span className="pointer-events-none absolute inset-0 rounded-xl bg-cyan-500/30 blur-[2px] transition-transform duration-300 group-hover:translate-x-1.5 group-hover:translate-y-1.5" />
        <span className="pointer-events-none absolute inset-0 rounded-xl bg-fuchsia-500/30 blur-[2px] transition-transform duration-300 group-hover:-translate-x-1.5 group-hover:-translate-y-1.5" />
        <button
          type="button"
          className="relative inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-md transition-colors duration-300 hover:bg-white/15"
        >
          <Layers className="size-4" />
          {en ? "Layers" : "重なるレイヤー"}
        </button>
      </div>
    </div>
  );
}
