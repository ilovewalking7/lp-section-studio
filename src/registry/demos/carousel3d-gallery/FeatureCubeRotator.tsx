import { useState } from "react";
import { Zap, Shield, Rocket, Gem } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "機能キューブ",
  category: "3Dカルーセル",
  description: "4つの特徴を面に持つ立方体を回して紹介する。",
  align: "full",
  isNew: true,
  tags: ["carousel", "3d", "gallery"],
};

const FEATURES: {
  Icon: LucideIcon;
  titleJa: string;
  titleEn: string;
  descJa: string;
  descEn: string;
  grad: string;
}[] = [
  { Icon: Zap, titleJa: "高速", titleEn: "Fast", descJa: "瞬時に応答。", descEn: "Instant response.", grad: "from-amber-500 to-orange-600" },
  { Icon: Shield, titleJa: "安全", titleEn: "Secure", descJa: "暗号化で保護。", descEn: "Encrypted by default.", grad: "from-emerald-500 to-teal-600" },
  { Icon: Rocket, titleJa: "拡張", titleEn: "Scalable", descJa: "無限にスケール。", descEn: "Scales without limits.", grad: "from-sky-500 to-blue-600" },
  { Icon: Gem, titleJa: "上質", titleEn: "Refined", descJa: "細部まで美しい。", descEn: "Beautiful to the detail.", grad: "from-violet-500 to-purple-600" },
];

export default function FeatureCubeRotator() {
  const en =
    typeof document !== "undefined" && document.documentElement.lang === "en";
  const [index, setIndex] = useState(0);

  return (
    <div className="flex w-full flex-col items-center gap-6 py-8">
      <div
        className="relative"
        style={{ width: 220, height: 220, perspective: "1000px" }}
      >
        <div
          className="relative h-full w-full transition-transform duration-700 ease-out"
          style={{
            transformStyle: "preserve-3d",
            transform: `translateZ(-110px) rotateY(${-index * 90}deg)`,
          }}
        >
          {FEATURES.map((f, i) => {
            const { Icon } = f;
            return (
              <div
                key={f.titleEn}
                className={cn(
                  "absolute inset-0 flex flex-col items-center justify-center gap-2 rounded-2xl bg-gradient-to-br p-5 text-center text-white shadow-xl",
                  f.grad
                )}
                style={{
                  transform: `rotateY(${i * 90}deg) translateZ(110px)`,
                  backfaceVisibility: "hidden",
                }}
              >
                <Icon className="h-8 w-8" />
                <span className="text-lg font-bold">{en ? f.titleEn : f.titleJa}</span>
                <span className="text-xs text-white/85">{en ? f.descEn : f.descJa}</span>
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex gap-2">
        {FEATURES.map((f, i) => (
          <button
            type="button"
            key={f.titleEn}
            onClick={() => setIndex(i)}
            aria-label={en ? f.titleEn : f.titleJa}
            className={cn(
              "h-2.5 w-2.5 rounded-full transition-colors",
              ((index % 4) + 4) % 4 === i ? "bg-primary" : "bg-muted-foreground/30"
            )}
          />
        ))}
      </div>
    </div>
  );
}
