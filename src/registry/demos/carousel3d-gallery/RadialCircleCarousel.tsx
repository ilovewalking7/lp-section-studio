import { useState } from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "放射状サークル",
  category: "3Dカルーセル",
  description: "円周上に配置したカードを中心軸で回す放射カルーセル。",
  align: "full",
  isNew: true,
  tags: ["carousel", "3d", "gallery"],
};

const ITEMS = [
  { ja: "北", en: "N" },
  { ja: "東", en: "E" },
  { ja: "南", en: "S" },
  { ja: "西", en: "W" },
  { ja: "北東", en: "NE" },
  { ja: "南東", en: "SE" },
  { ja: "南西", en: "SW" },
  { ja: "北西", en: "NW" },
];

export default function RadialCircleCarousel() {
  const en =
    typeof document !== "undefined" && document.documentElement.lang === "en";
  const [active, setActive] = useState(0);
  const count = ITEMS.length;
  const step = 360 / count;

  return (
    <div className="flex w-full flex-col items-center gap-6 py-8">
      <div
        className="relative"
        style={{ width: 280, height: 280, perspective: "1100px" }}
      >
        <div
          className="relative h-full w-full transition-transform duration-700 ease-out"
          style={{
            transformStyle: "preserve-3d",
            transform: `rotateY(${-active * step}deg)`,
          }}
        >
          {ITEMS.map((item, i) => {
            const isOn = i === active;
            return (
              <button
                type="button"
                key={item.en}
                onClick={() => setActive(i)}
                className={cn(
                  "absolute left-1/2 top-1/2 -ml-12 -mt-12 flex h-24 w-24 flex-col items-center justify-center gap-1 rounded-full border text-sm font-semibold transition-colors",
                  isOn
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-card text-foreground"
                )}
                style={{
                  transform: `rotateY(${i * step}deg) translateZ(150px)`,
                }}
              >
                <Star className="h-4 w-4" />
                {en ? item.en : item.ja}
              </button>
            );
          })}
        </div>
      </div>
      <p className="text-sm text-muted-foreground">
        {en ? "Selected: " : "選択中: "}
        <span className="font-semibold text-foreground">
          {en ? ITEMS[active].en : ITEMS[active].ja}
        </span>
      </p>
    </div>
  );
}
