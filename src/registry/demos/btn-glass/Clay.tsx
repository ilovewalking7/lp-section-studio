import type { DemoMeta } from "@/registry";
import { Sparkles } from "lucide-react";

export const meta: DemoMeta = {
  name: "クレイ",
  category: "ボタン",
  description: "ぷっくりした粘土のような厚みを持つ、クレイモーフィズム・ボタン。",
  align: "center",
  isNew: true,
  tags: ["button", "glass"],
};

export default function Clay() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <div className="flex items-center justify-center rounded-2xl bg-[#eef1f8] p-10">
      <button
        type="button"
        className="inline-flex items-center gap-2 rounded-[1.75rem] bg-violet-400 px-8 py-4 text-sm font-bold text-white shadow-[0_10px_24px_-6px_rgba(124,58,237,0.5),inset_0_-6px_10px_rgba(91,33,182,0.5),inset_0_6px_10px_rgba(255,255,255,0.55)] transition-all duration-200 hover:bg-violet-500 hover:-translate-y-0.5 active:translate-y-0 active:shadow-[0_4px_12px_-4px_rgba(124,58,237,0.5),inset_0_-4px_8px_rgba(91,33,182,0.5),inset_0_4px_8px_rgba(255,255,255,0.45)]"
      >
        <Sparkles className="size-4" />
        {en ? "Clay button" : "クレイボタン"}
      </button>
    </div>
  );
}
