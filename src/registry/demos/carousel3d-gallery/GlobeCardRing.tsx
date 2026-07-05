import { useState } from "react";
import { Globe } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "グローブカードリング",
  category: "3Dカルーセル",
  description: "傾いた地球儀風の輪にカードを並べた立体カルーセル。",
  align: "full",
  isNew: true,
  tags: ["carousel", "3d", "gallery"],
};

const CITIES = [
  { ja: "東京", en: "Tokyo" },
  { ja: "ロンドン", en: "London" },
  { ja: "NY", en: "NY" },
  { ja: "パリ", en: "Paris" },
  { ja: "シドニー", en: "Sydney" },
  { ja: "ベルリン", en: "Berlin" },
  { ja: "ソウル", en: "Seoul" },
  { ja: "ドバイ", en: "Dubai" },
];

export default function GlobeCardRing() {
  const en =
    typeof document !== "undefined" && document.documentElement.lang === "en";
  const [rot, setRot] = useState(0);
  const count = CITIES.length;
  const step = 360 / count;

  return (
    <div className="flex w-full flex-col items-center gap-6 py-8">
      <div
        className="relative"
        style={{ width: 300, height: 220, perspective: "1100px" }}
      >
        <div
          className="relative h-full w-full transition-transform duration-500 ease-out"
          style={{
            transformStyle: "preserve-3d",
            transform: `rotateX(-12deg) rotateY(${rot}deg)`,
          }}
        >
          {CITIES.map((city, i) => (
            <div
              key={city.en}
              className={cn(
                "absolute left-1/2 top-1/2 -ml-14 -mt-9 flex h-18 w-28 flex-col items-center justify-center gap-1 rounded-xl border border-border bg-card/90 py-3 text-sm font-semibold text-foreground shadow-lg backdrop-blur"
              )}
              style={{ transform: `rotateY(${i * step}deg) translateZ(180px)` }}
            >
              <Globe className="h-4 w-4 text-primary" />
              {en ? city.en : city.ja}
            </div>
          ))}
        </div>
      </div>
      <input
        type="range"
        min={0}
        max={360}
        value={rot}
        onChange={(e) => setRot(Number(e.target.value))}
        className="w-64 accent-primary"
        aria-label={en ? "Rotate" : "回転"}
      />
    </div>
  );
}
