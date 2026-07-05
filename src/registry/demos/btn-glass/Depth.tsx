import type { DemoMeta } from "@/registry";
import { Box } from "lucide-react";

export const meta: DemoMeta = {
  name: "デプス",
  category: "ボタン",
  description: "多段の影で奥行きを強調した、深い立体感のあるデプス・ボタン。",
  align: "center",
  isNew: true,
  tags: ["button", "glass"],
};

export default function Depth() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <div className="flex items-center justify-center rounded-2xl bg-[#eceff5] p-12">
      <button
        type="button"
        className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-b from-white to-slate-100 px-8 py-4 text-sm font-bold text-slate-700 shadow-[0_1px_1px_rgba(0,0,0,0.05),0_2px_4px_rgba(0,0,0,0.06),0_8px_16px_rgba(0,0,0,0.08),0_16px_32px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.9)] ring-1 ring-slate-900/5 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 active:shadow-[0_1px_2px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.9)]"
      >
        <Box className="size-4 text-indigo-500" />
        {en ? "Depth button" : "奥行きボタン"}
      </button>
    </div>
  );
}
