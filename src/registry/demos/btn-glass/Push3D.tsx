import type { DemoMeta } from "@/registry";
import { Power } from "lucide-react";

export const meta: DemoMeta = {
  name: "プッシュ3D",
  category: "ボタン",
  description: "押すと立体的な土台に沈み込む、物理的な手応えのある3Dプッシュボタン。",
  align: "center",
  isNew: true,
  tags: ["button", "glass"],
};

export default function Push3D() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <div className="flex items-center justify-center rounded-2xl bg-[#10131c] p-10">
      <button
        type="button"
        className="group relative inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-8 py-3.5 text-sm font-bold text-white shadow-[0_7px_0_0_#047857] transition-all duration-100 hover:bg-emerald-400 active:translate-y-[6px] active:shadow-[0_1px_0_0_#047857]"
      >
        <Power className="size-4" />
        {en ? "Power on" : "起動する"}
      </button>
    </div>
  );
}
