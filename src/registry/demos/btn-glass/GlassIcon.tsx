import type { DemoMeta } from "@/registry";
import { Bell } from "lucide-react";

export const meta: DemoMeta = {
  name: "グラス・アイコン",
  category: "ボタン",
  description: "正方形に近いガラスのアイコン専用ボタン。ホバーで内側がほのかに光る。",
  align: "center",
  isNew: true,
  tags: ["button", "glass"],
};

export default function GlassIcon() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <div className="flex items-center justify-center rounded-2xl bg-gradient-to-br from-rose-500 to-orange-400 p-10">
      <button
        type="button"
        aria-label={en ? "Notifications" : "通知"}
        className="group grid size-14 place-items-center rounded-2xl border border-white/40 bg-white/20 text-white shadow-[0_8px_24px_-8px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.6)] backdrop-blur-md transition-all duration-300 hover:bg-white/30 hover:shadow-[0_12px_28px_-8px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.8)] active:scale-95"
      >
        <Bell className="size-5 transition-transform duration-300 group-hover:-rotate-12" />
      </button>
    </div>
  );
}
