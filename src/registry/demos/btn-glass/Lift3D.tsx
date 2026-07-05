import type { DemoMeta } from "@/registry";
import { Rocket } from "lucide-react";

export const meta: DemoMeta = {
  name: "リフト3D",
  category: "ボタン",
  description: "ホバーで土台ごとふわりと浮き上がる、立体リフト・ボタン。",
  align: "center",
  isNew: true,
  tags: ["button", "glass"],
};

export default function Lift3D() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <div className="flex items-center justify-center rounded-2xl bg-[#0c1322] p-10">
      <button
        type="button"
        className="group inline-flex items-center gap-2 rounded-xl bg-indigo-500 px-8 py-3.5 text-sm font-bold text-white shadow-[0_3px_0_0_#3730a3] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_10px_18px_-4px_rgba(79,70,229,0.6),0_6px_0_0_#3730a3] active:translate-y-0 active:shadow-[0_2px_0_0_#3730a3]"
      >
        <Rocket className="size-4 transition-transform duration-200 group-hover:-translate-y-0.5" />
        {en ? "Launch" : "打ち上げ"}
      </button>
    </div>
  );
}
