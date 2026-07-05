import type { DemoMeta } from "@/registry";
import { Contrast } from "lucide-react";

export const meta: DemoMeta = {
  name: "デュオトーン",
  category: "ボタン",
  description: "2色がくっきり斜めに分かれるデュオトーン・グラデーションボタン。",
  align: "center",
  isNew: true,
  tags: ["button", "gradient"],
};

export default function Duotone() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <div className="flex items-center justify-center rounded-2xl bg-[#0b0b12] p-8">
      <button
        type="button"
        className="group relative inline-flex items-center gap-2 overflow-hidden rounded-xl px-7 py-3.5 text-sm font-semibold text-white shadow-[0_8px_24px_-8px_rgba(99,102,241,0.6)] transition-transform duration-300 hover:scale-[1.03] active:scale-[0.98]"
        style={{
          backgroundImage:
            "linear-gradient(115deg,#6366f1 0%,#6366f1 48%,#ec4899 52%,#ec4899 100%)",
          backgroundSize: "220% 100%",
          backgroundPosition: "0% 50%",
          transition: "background-position .5s ease, transform .3s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundPosition = "100% 50%";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundPosition = "0% 50%";
        }}
      >
        <Contrast className="size-4" />
        {en ? "Duotone" : "デュオトーン"}
      </button>
    </div>
  );
}
