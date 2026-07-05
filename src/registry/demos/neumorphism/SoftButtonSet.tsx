import { useState } from "react";
import { Bell, Download, Heart, Plus, Settings, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "ソフトボタンセット",
  category: "ニューモーフィズム",
  description: "押し出し・押し込み・アイコン・トグルを揃えた柔らかなボタン集。",
  align: "center",
  isNew: true,
  tags: ["neumorphism", "soft-ui", "button"],
};

const RAISED = "shadow-[6px_6px_12px_#a3b1c6,-6px_-6px_12px_#ffffff]";
const INSET = "shadow-[inset_6px_6px_12px_#a3b1c6,inset_-6px_-6px_12px_#ffffff]";

const SEGMENTS = [
  { id: "day", ja: "日", en: "Day" },
  { id: "week", ja: "週", en: "Week" },
  { id: "month", ja: "月", en: "Month" },
];

export default function SoftButtonSet() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const [on, setOn] = useState(true);
  const [seg, setSeg] = useState(1);
  const icons = [Heart, Star, Bell, Settings];

  return (
    <div className={cn("w-full max-w-md rounded-3xl bg-[#e0e5ec] p-7 text-slate-600", RAISED)}>
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
        {en ? "Buttons" : "ボタン"}
      </p>
      <div className="mt-3 flex flex-wrap items-center gap-4">
        <button className={cn("rounded-2xl bg-[#e0e5ec] px-5 py-2.5 text-sm font-semibold text-indigo-600 transition active:scale-95", RAISED)}>
          {en ? "＋ Create" : "＋ 作成"}
        </button>
        <button className={cn("inline-flex items-center gap-2 rounded-2xl bg-[#e0e5ec] px-5 py-2.5 text-sm font-medium text-slate-600 transition active:scale-95", RAISED)}>
          <Download className="size-4" />
          {en ? "Export" : "書き出し"}
        </button>
        <button className={cn("rounded-2xl bg-[#e0e5ec] px-5 py-2.5 text-sm font-medium text-slate-600", INSET)}>
          {en ? "Pressed" : "押し込み"}
        </button>
      </div>

      <p className="mt-7 text-xs font-semibold uppercase tracking-wide text-slate-500">
        {en ? "Icons" : "アイコン"}
      </p>
      <div className="mt-3 flex items-center gap-4">
        {icons.map((Icon, i) => (
          <button
            key={i}
            aria-label={`icon-${i}`}
            className={cn(
              "grid size-12 place-items-center rounded-2xl bg-[#e0e5ec] text-slate-500 transition active:scale-95",
              i === 0 ? cn(INSET, "text-indigo-500") : RAISED,
            )}
          >
            <Icon className="size-5" />
          </button>
        ))}
        <button
          aria-label={en ? "Add" : "追加"}
          className={cn("grid size-12 place-items-center rounded-full bg-[#e0e5ec] text-indigo-500 transition active:scale-95", RAISED)}
        >
          <Plus className="size-5" />
        </button>
      </div>

      <p className="mt-7 text-xs font-semibold uppercase tracking-wide text-slate-500">
        {en ? "Toggle & Segments" : "トグル & セグメント"}
      </p>
      <div className="mt-3 flex items-center justify-between gap-4">
        <button
          role="switch"
          aria-checked={on}
          aria-label={en ? "Toggle" : "トグル"}
          onClick={() => setOn((v) => !v)}
          className={cn("relative h-9 w-16 shrink-0 rounded-full bg-[#e0e5ec] transition", INSET)}
        >
          <span
            className={cn(
              "absolute top-1 size-7 rounded-full bg-[#e0e5ec] shadow-[3px_3px_6px_#a3b1c6,-3px_-3px_6px_#ffffff] transition-all",
              on ? "left-8 bg-indigo-500" : "left-1",
            )}
          />
        </button>

        <div className={cn("flex flex-1 gap-1 rounded-2xl bg-[#e0e5ec] p-1.5", INSET)}>
          {SEGMENTS.map((s, i) => (
            <button
              key={s.id}
              onClick={() => setSeg(i)}
              aria-pressed={seg === i}
              className={cn(
                "flex-1 rounded-xl py-2 text-sm font-medium transition",
                seg === i
                  ? "bg-[#e0e5ec] text-indigo-600 shadow-[3px_3px_6px_#a3b1c6,-3px_-3px_6px_#ffffff]"
                  : "text-slate-500",
              )}
            >
              {en ? s.en : s.ja}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
