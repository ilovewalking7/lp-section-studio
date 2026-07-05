import { Heart, Plus, Check, ArrowRight, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "ポップ・ボタン集",
  category: "プレイフル",
  description: "丸くて弾むボタンとチップのセット。",
  align: "center",
  isNew: true,
  tags: ["playful", "rounded", "button"],
};

function BounceButton({
  children,
  color,
  shadow,
}: {
  children: React.ReactNode;
  color: string;
  shadow: string;
}) {
  return (
    <button
      className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-extrabold text-white transition-all duration-150 hover:-translate-y-0.5 active:translate-y-1"
      style={{ backgroundColor: color, boxShadow: `0 6px 0 ${shadow}` }}
    >
      {children}
    </button>
  );
}

const chips = [
  { t: "デザイン", en: "Design", c: "#ff8fab" },
  { t: "開発", en: "Dev", c: "#4cc9f0" },
  { t: "マーケ", en: "Marketing", c: "#06d6a0" },
  { t: "リサーチ", en: "Research", c: "#ffd166" },
  { t: "AI", en: "AI", c: "#b388ff" },
];

export default function PlayfulButtonSet() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <div className="font-rounded w-full max-w-md rounded-3xl border-2 border-slate-100 bg-white p-8 shadow-[0_12px_0_#eef1f4]">
      <p className="mb-3 text-xs font-extrabold uppercase tracking-wide text-slate-400">
        {en ? "Buttons" : "ボタン"}
      </p>
      <div className="flex flex-wrap gap-3">
        <BounceButton color="#ff8fab" shadow="#e26d8c">
          <Heart className="size-4" /> {en ? "Like" : "いいね"}
        </BounceButton>
        <BounceButton color="#4cc9f0" shadow="#37a8cc">
          {en ? "Continue" : "つづける"} <ArrowRight className="size-4" />
        </BounceButton>
        <BounceButton color="#06d6a0" shadow="#05ab80">
          <Check className="size-4" strokeWidth={3} /> {en ? "Done" : "完了"}
        </BounceButton>
      </div>

      <div className="mt-5 flex flex-wrap gap-3">
        <button className="inline-flex items-center gap-2 rounded-full border-2 border-slate-200 bg-white px-6 py-3 text-sm font-extrabold text-slate-600 shadow-[0_6px_0_#eef1f4] transition-all hover:-translate-y-0.5 active:translate-y-1">
          <Plus className="size-4" /> {en ? "Add" : "追加する"}
        </button>
        <button
          className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-extrabold transition-all hover:-translate-y-0.5 active:translate-y-1"
          style={{ backgroundColor: "#fff0c2", color: "#b8860b", boxShadow: "0 6px 0 #f2dd97" }}
        >
          <Star className="size-4 fill-current" /> {en ? "Featured" : "おすすめ"}
        </button>
      </div>

      <p className="mb-3 mt-7 text-xs font-extrabold uppercase tracking-wide text-slate-400">
        {en ? "Chips" : "チップ"}
      </p>
      <div className="flex flex-wrap gap-2">
        {chips.map((chip, i) => (
          <span
            key={chip.en}
            className={cn(
              "rounded-full px-4 py-1.5 text-sm font-bold text-white transition-transform hover:scale-105",
              i === 0 && "ring-2 ring-offset-2"
            )}
            style={{
              backgroundColor: chip.c,
              ...(i === 0 ? { boxShadow: `0 0 0 2px #fff, 0 0 0 4px ${chip.c}` } : {}),
            }}
          >
            {en ? chip.en : chip.t}
          </span>
        ))}
      </div>
    </div>
  );
}
