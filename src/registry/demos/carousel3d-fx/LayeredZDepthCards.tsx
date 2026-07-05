import { useState } from "react";
import { Layers3, Shield, Zap, Globe } from "lucide-react";
import type { DemoMeta } from "@/registry";
import { cn } from "@/lib/utils";

export const meta: DemoMeta = {
  name: "レイヤードZデプス・機能カード",
  category: "3Dカルーセル",
  description: "アイコンとラベルが別レイヤーで浮き上がる、Z深度を重ねた機能紹介3Dカード。",
  align: "full",
  isNew: true,
  tags: ["carousel", "3d", "effect"],
};

type Feature = {
  titleJa: string;
  titleEn: string;
  descJa: string;
  descEn: string;
  icon: typeof Shield;
  from: string;
  to: string;
};

const FEATURES: Feature[] = [
  { titleJa: "高速配信", titleEn: "Fast delivery", descJa: "世界中のエッジから配信。", descEn: "Served from edges worldwide.", icon: Zap, from: "#f59e0b", to: "#ef4444" },
  { titleJa: "堅牢な保護", titleEn: "Strong protection", descJa: "標準で暗号化と監査。", descEn: "Encryption and auditing by default.", icon: Shield, from: "#3b82f6", to: "#06b6d4" },
  { titleJa: "グローバル", titleEn: "Global", descJa: "30拠点のリージョン。", descEn: "Across 30 regions.", icon: Globe, from: "#10b981", to: "#84cc16" },
];

export default function LayeredZDepthCards() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const [hover, setHover] = useState<number | null>(null);

  return (
    <div className="w-full bg-background py-12">
      <div
        className="mx-auto flex max-w-3xl flex-wrap items-center justify-center gap-6 px-4"
        style={{ perspective: "1000px" }}
      >
        {FEATURES.map((f, i) => {
          const lifted = hover === i;
          const Icon = f.icon;
          return (
            <div
              key={f.titleEn}
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover(null)}
              className="relative h-52 w-48 rounded-2xl text-white shadow-2xl transition-transform duration-300 ease-out"
              style={{
                background: `linear-gradient(135deg, ${f.from}, ${f.to})`,
                transform: lifted
                  ? "rotateX(8deg) rotateY(-8deg)"
                  : "rotateX(0deg) rotateY(0deg)",
                transformStyle: "preserve-3d",
              }}
            >
              <div
                className="absolute left-5 top-5 transition-transform duration-300"
                style={{ transform: `translateZ(${lifted ? 60 : 20}px)` }}
              >
                <Icon className="h-9 w-9" />
              </div>
              <div
                className="absolute bottom-5 left-5 right-5 transition-transform duration-300"
                style={{ transform: `translateZ(${lifted ? 35 : 10}px)` }}
              >
                <p className="text-lg font-bold">{en ? f.titleEn : f.titleJa}</p>
                <p className="text-xs opacity-85">{en ? f.descEn : f.descJa}</p>
              </div>
            </div>
          );
        })}
      </div>
      <p
        className={cn(
          "mt-7 flex items-center justify-center gap-2 text-sm text-muted-foreground"
        )}
      >
        <Layers3 className="h-4 w-4" /> {en ? "Hover to lift each layer" : "ホバーで各レイヤーが浮上"}
      </p>
    </div>
  );
}
