import type { DemoMeta } from "@/registry";
import { Check } from "lucide-react";

export const meta: DemoMeta = {
  name: "ニューモーフィズム（凹）",
  category: "ボタン",
  description: "面に彫り込まれたように沈んで見える、押し込み型ニューモーフィズム。",
  align: "center",
  isNew: true,
  tags: ["button", "glass"],
};

export default function NeumorphicPressed() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <div className="flex items-center justify-center rounded-2xl bg-[#e6e9ef] p-10">
      <button
        type="button"
        className="inline-flex items-center gap-2 rounded-2xl bg-[#e6e9ef] px-8 py-4 text-sm font-semibold text-indigo-500 shadow-[inset_7px_7px_14px_#c3c6cc,inset_-7px_-7px_14px_#ffffff] transition-all duration-200 hover:text-indigo-600 active:shadow-[inset_10px_10px_20px_#c3c6cc,inset_-10px_-10px_20px_#ffffff]"
      >
        <Check className="size-4" />
        {en ? "Pressed" : "押し込み済み"}
      </button>
    </div>
  );
}
