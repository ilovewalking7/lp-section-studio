import { useState } from "react";
import { ArrowRight, Quote } from "lucide-react";
import type { DemoMeta } from "@/registry";
import { cn } from "@/lib/utils";

export const meta: DemoMeta = {
  name: "スタック・ポップカード",
  category: "3Dカルーセル",
  description: "重なったカードの先頭が手前に飛び出して入れ替わるスタック型3Dカルーセル。",
  align: "full",
  isNew: true,
  tags: ["carousel", "3d", "effect"],
};

type Card = {
  nameJa: string;
  nameEn: string;
  roleJa: string;
  roleEn: string;
  quoteJa: string;
  quoteEn: string;
  from: string;
  to: string;
};

const CARDS: Card[] = [
  { nameJa: "高橋", nameEn: "Takahashi", roleJa: "デザイナー", roleEn: "Designer", quoteJa: "余白こそが主役だ。", quoteEn: "White space is the real star.", from: "#6366f1", to: "#06b6d4" },
  { nameJa: "佐藤", nameEn: "Sato", roleJa: "エンジニア", roleEn: "Engineer", quoteJa: "小さく速く出荷する。", quoteEn: "Ship small, ship fast.", from: "#f97316", to: "#db2777" },
  { nameJa: "鈴木", nameEn: "Suzuki", roleJa: "PM", roleEn: "PM", quoteJa: "迷ったら削る。", quoteEn: "When in doubt, cut it.", from: "#10b981", to: "#0ea5e9" },
  { nameJa: "田中", nameEn: "Tanaka", roleJa: "ライター", roleEn: "Writer", quoteJa: "言葉は最後の手触り。", quoteEn: "Words are the final texture.", from: "#a855f7", to: "#f43f5e" },
];

export default function StackPopCards() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const [order, setOrder] = useState(CARDS.map((_, i) => i));

  const pop = () => setOrder((o) => [...o.slice(1), o[0]]);

  return (
    <div className="w-full bg-background py-12">
      <div
        className="mx-auto flex h-72 max-w-md items-center justify-center"
        style={{ perspective: "1300px" }}
      >
        <div className="relative h-56 w-72" style={{ transformStyle: "preserve-3d" }}>
          {order.map((cardIdx, pos) => {
            const c = CARDS[cardIdx];
            return (
              <div
                key={c.nameEn}
                className="absolute inset-0 flex flex-col justify-between rounded-2xl p-6 text-white shadow-2xl transition-all duration-500 ease-out"
                style={{
                  background: `linear-gradient(135deg, ${c.from}, ${c.to})`,
                  transform: `translateY(${pos * 14}px) translateZ(${-pos * 60}px) scale(${1 - pos * 0.05})`,
                  zIndex: CARDS.length - pos,
                  opacity: pos > 3 ? 0 : 1,
                }}
              >
                <Quote className="h-7 w-7 opacity-80" />
                <p className="text-lg font-semibold">{en ? c.quoteEn : c.quoteJa}</p>
                <p className="text-xs opacity-80">
                  {en ? `${c.nameEn} · ${c.roleEn}` : `${c.nameJa}・${c.roleJa}`}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-6 flex justify-center">
        <button
          onClick={pop}
          className={cn(
            "flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition hover:opacity-90"
          )}
        >
          {en ? "Next card" : "次のカード"} <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
