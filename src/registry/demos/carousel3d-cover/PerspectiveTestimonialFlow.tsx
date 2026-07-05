import { useState } from "react";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "パース・お客様の声フロー",
  category: "3Dカルーセル",
  description: "奥行きを付けた証言カードをカバーフローで送る3Dカルーセル。",
  align: "full",
  isNew: true,
  tags: ["carousel", "3d", "coverflow"],
};

const VOICES = [
  { id: "misaki", nameJa: "佐藤 美咲", nameEn: "Misaki Sato", roleJa: "デザイナー", roleEn: "Designer", textJa: "導入してからレビュー時間が半分になりました。", textEn: "Our review time was cut in half after we adopted it.", hue: 250 },
  { id: "ken", nameJa: "田中 健", nameEn: "Ken Tanaka", roleJa: "PM", roleEn: "PM", textJa: "チーム全員がすぐ使いこなせる直感的なUIです。", textEn: "An intuitive UI the whole team picked up instantly.", hue: 190 },
  { id: "aoi", nameJa: "鈴木 葵", nameEn: "Aoi Suzuki", roleJa: "エンジニア", roleEn: "Engineer", textJa: "拡張性が高く、毎日の開発が楽しくなりました。", textEn: "Highly extensible — it made daily development fun again.", hue: 330 },
  { id: "ren", nameJa: "高橋 蓮", nameEn: "Ren Takahashi", roleJa: "CEO", roleEn: "CEO", textJa: "意思決定のスピードが目に見えて上がりました。", textEn: "Our decision-making got noticeably faster.", hue: 30 },
];

export default function PerspectiveTestimonialFlow() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const [active, setActive] = useState(0);

  return (
    <div className="w-full overflow-hidden bg-background py-14">
      <div
        className="relative mx-auto flex h-64 max-w-3xl items-center justify-center"
        style={{ perspective: "1400px" }}
      >
        <div className="relative h-52 w-72" style={{ transformStyle: "preserve-3d" }}>
          {VOICES.map((v, i) => {
            const offset = i - active;
            const abs = Math.abs(offset);
            return (
              <div
                key={v.id}
                className="absolute inset-0 flex flex-col justify-between rounded-2xl border border-border bg-card p-6 shadow-xl transition-all duration-500"
                style={{
                  transform: `translateX(${offset * 150}px) translateZ(${-abs * 130}px) rotateY(${offset < 0 ? 38 : offset > 0 ? -38 : 0}deg)`,
                  zIndex: 10 - abs,
                  opacity: abs > 2 ? 0 : 1,
                }}
              >
                <Quote
                  className="h-7 w-7"
                  style={{ color: `hsl(${v.hue} 70% 55%)` }}
                />
                <p className="text-sm leading-relaxed text-foreground">{en ? v.textEn : v.textJa}</p>
                <div className="flex items-center gap-3">
                  <span
                    className="flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold text-white"
                    style={{ background: `hsl(${v.hue} 70% 50%)` }}
                  >
                    {(en ? v.nameEn : v.nameJa).charAt(0)}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{en ? v.nameEn : v.nameJa}</p>
                    <p className="text-xs text-muted-foreground">{en ? v.roleEn : v.roleJa}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-6 flex items-center justify-center gap-4">
        <button
          onClick={() => setActive((a) => Math.max(0, a - 1))}
          disabled={active === 0}
          className="rounded-full border border-border bg-card p-2 text-foreground transition hover:bg-muted disabled:opacity-30"
          aria-label={en ? "Previous" : "前へ"}
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          onClick={() => setActive((a) => Math.min(VOICES.length - 1, a + 1))}
          disabled={active === VOICES.length - 1}
          className="rounded-full border border-border bg-card p-2 text-foreground transition hover:bg-muted disabled:opacity-30"
          aria-label={en ? "Next" : "次へ"}
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
