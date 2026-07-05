import type { DemoMeta } from "@/registry";
import { useState } from "react";
import { Check, Plus } from "lucide-react";

export const meta: DemoMeta = {
  name: "チップ",
  category: "ボタン",
  description: "選択でトグルする小さなチップ。状態でアイコンと配色が切り替わる。",
  align: "center",
  isNew: true,
  tags: ["button", "fun"],
};

export default function Chip() {
  const en = typeof document !== "undefined" && document.documentElement.lang === "en";
  const [on, setOn] = useState(false);

  return (
    <div className="flex items-center justify-center rounded-2xl bg-sky-50 p-8">
      <button
        type="button"
        aria-pressed={on}
        onClick={() => setOn((v) => !v)}
        className={cnChip(on)}
      >
        {on ? <Check className="size-4" /> : <Plus className="size-4" />}
        {en ? "Design" : "デザイン"}
      </button>
    </div>
  );
}

function cnChip(on: boolean) {
  const base =
    "inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-semibold transition-all duration-200 active:scale-95 focus-visible:outline-none focus-visible:ring-2";
  return on
    ? `${base} border-sky-600 bg-sky-600 text-white ring-sky-300`
    : `${base} border-sky-200 bg-white text-sky-700 hover:border-sky-400 ring-sky-300`;
}
