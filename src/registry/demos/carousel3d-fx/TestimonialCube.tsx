import { useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import type { DemoMeta } from "@/registry";
import { cn } from "@/lib/utils";

export const meta: DemoMeta = {
  name: "パースペクティブ証言キューブ",
  category: "3Dカルーセル",
  description: "4面の立方体が回転して次の証言を見せる、パースペクティブ証言キューブ。",
  align: "full",
  isNew: true,
  tags: ["carousel", "3d", "effect"],
};

type Face = {
  id: string;
  nameJa: string;
  nameEn: string;
  textJa: string;
  textEn: string;
  from: string;
  to: string;
};

const FACES: Face[] = [
  {
    id: "yamada",
    nameJa: "山田",
    nameEn: "Yamada",
    textJa: "導入後、問い合わせが半分に減った。",
    textEn: "Support tickets dropped by half after we adopted it.",
    from: "#6366f1",
    to: "#06b6d4",
  },
  {
    id: "nakamura",
    nameJa: "中村",
    nameEn: "Nakamura",
    textJa: "チームの足並みが驚くほど揃った。",
    textEn: "Our team got aligned to a remarkable degree.",
    from: "#f97316",
    to: "#db2777",
  },
  {
    id: "kobayashi",
    nameJa: "小林",
    nameEn: "Kobayashi",
    textJa: "三日かかった作業が一時間に。",
    textEn: "Work that took three days now takes an hour.",
    from: "#10b981",
    to: "#0ea5e9",
  },
  {
    id: "mori",
    nameJa: "森",
    nameEn: "Mori",
    textJa: "もう手放せないツールになった。",
    textEn: "It's become a tool we can't work without.",
    from: "#a855f7",
    to: "#f43f5e",
  },
];

export default function TestimonialCube() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const [face, setFace] = useState(0);
  const rotate = (d: number) => setFace((f) => (f + d + FACES.length) % FACES.length);

  return (
    <div className="w-full bg-background py-12">
      <div
        className="mx-auto flex h-64 max-w-md items-center justify-center"
        style={{ perspective: "1200px" }}
      >
        <div
          className="relative h-52 w-72 transition-transform duration-700 ease-out"
          style={{
            transformStyle: "preserve-3d",
            transform: `translateZ(-150px) rotateY(${-face * 90}deg)`,
          }}
        >
          {FACES.map((f, i) => (
            <div
              key={f.id}
              className="absolute inset-0 flex flex-col justify-between rounded-2xl p-6 text-white shadow-2xl"
              style={{
                background: `linear-gradient(135deg, ${f.from}, ${f.to})`,
                transform: `rotateY(${i * 90}deg) translateZ(150px)`,
                backfaceVisibility: "hidden",
              }}
            >
              <Quote className="h-7 w-7 opacity-80" />
              <p className="text-lg font-semibold leading-snug">
                {en ? f.textEn : f.textJa}
              </p>
              <p className="text-xs opacity-80">— {en ? f.nameEn : f.nameJa}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 flex items-center justify-center gap-4">
        <button
          onClick={() => rotate(-1)}
          className="rounded-full border border-border bg-card p-2 text-foreground transition hover:bg-muted"
          aria-label={en ? "Previous" : "前へ"}
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <div className="flex gap-1.5">
          {FACES.map((f, i) => (
            <span
              key={f.id}
              className={cn(
                "h-2 w-2 rounded-full transition",
                i === face ? "bg-primary" : "bg-muted-foreground/30"
              )}
            />
          ))}
        </div>
        <button
          onClick={() => rotate(1)}
          className="rounded-full border border-border bg-card p-2 text-foreground transition hover:bg-muted"
          aria-label={en ? "Next" : "次へ"}
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
