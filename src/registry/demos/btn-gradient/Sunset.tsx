import type { DemoMeta } from "@/registry";
import { Sunset as SunsetIcon } from "lucide-react";

export const meta: DemoMeta = {
  name: "サンセット",
  category: "ボタン",
  description: "夕焼けのように暖色が溶け合うグラデーションボタン。ホバーで陽が沈む。",
  align: "center",
  isNew: true,
  tags: ["button", "gradient"],
};

export default function Sunset() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <div className="flex items-center justify-center rounded-2xl bg-[#120a14] p-8">
      <button
        type="button"
        className="group inline-flex items-center gap-2 rounded-xl bg-[length:100%_200%] bg-top px-7 py-3.5 text-sm font-semibold text-white shadow-[0_8px_26px_-8px_rgba(244,63,94,0.6)] transition-[background-position,transform] duration-500 ease-out hover:bg-bottom hover:-translate-y-0.5 active:translate-y-0"
        style={{
          backgroundImage:
            "linear-gradient(180deg,#fb923c 0%,#f43f5e 40%,#a855f7 100%)",
        }}
      >
        <SunsetIcon className="size-4" />
        {en ? "Sunset" : "サンセット"}
      </button>
    </div>
  );
}
