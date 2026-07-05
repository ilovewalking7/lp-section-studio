import { Droplets, Flower2, Leaf, Sprout, Sun } from "lucide-react";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "成分リスト",
  category: "ボタニカル",
  description: "アイコン付きの自然由来成分リストカード。",
  align: "center",
  isNew: true,
  tags: ["botanical", "organic", "wellness"],
};

const items = [
  {
    icon: Flower2,
    name: "カモミール",
    nameEn: "Chamomile",
    note: "肌を穏やかに鎮める",
    noteEn: "Gently soothes the skin",
    pct: "22%",
  },
  {
    icon: Droplets,
    name: "ホホバオイル",
    nameEn: "Jojoba Oil",
    note: "うるおいを長時間キープ",
    noteEn: "Locks in moisture for hours",
    pct: "18%",
  },
  {
    icon: Sprout,
    name: "ローズヒップ",
    nameEn: "Rosehip",
    note: "ビタミンCでキメを整える",
    noteEn: "Refines texture with vitamin C",
    pct: "15%",
  },
  {
    icon: Sun,
    name: "カレンデュラ",
    nameEn: "Calendula",
    note: "敏感な肌を保護",
    noteEn: "Protects sensitive skin",
    pct: "9%",
  },
];

export default function IngredientList() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <div className="w-full max-w-sm rounded-3xl border border-[#5e6b4f]/20 bg-[#f3f1e7] p-7 text-[#3f4a35] shadow-[0_12px_40px_-20px_rgba(63,74,53,0.5)]">
      <div className="flex items-center gap-2">
        <span className="flex size-9 items-center justify-center rounded-full bg-[#5e6b4f]/15 text-[#5e6b4f]">
          <Leaf className="size-4" />
        </span>
        <div>
          <h3 className="font-serif text-lg font-medium leading-tight">
            {en ? "Key Ingredients" : "主要成分"}
          </h3>
          <p className="text-xs text-[#5e6b4f]/80">
            {en
              ? "100% naturally derived · Full disclosure"
              : "100% 自然由来 · 全成分開示"}
          </p>
        </div>
      </div>

      <ul className="mt-6 space-y-1">
        {items.map(({ icon: Icon, name, nameEn, note, noteEn, pct }) => (
          <li
            key={nameEn}
            className="flex items-center gap-3 rounded-2xl px-3 py-3 transition-colors hover:bg-[#5e6b4f]/8"
          >
            <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-white/60 text-[#86a06d]">
              <Icon className="size-5" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium">{en ? nameEn : name}</p>
              <p className="truncate text-xs text-[#5e6b4f]/80">
                {en ? noteEn : note}
              </p>
            </div>
            <span className="shrink-0 rounded-full bg-[#86a06d]/20 px-2.5 py-1 font-serif text-xs text-[#5e6b4f]">
              {pct}
            </span>
          </li>
        ))}
      </ul>

      <p className="mt-5 border-t border-[#5e6b4f]/10 pt-4 text-center text-[10px] tracking-wide text-[#5e6b4f]/60">
        {en
          ? "Free from synthetic fragrance, dyes & parabens"
          : "合成香料・着色料・パラベン不使用"}
      </p>
    </div>
  );
}
