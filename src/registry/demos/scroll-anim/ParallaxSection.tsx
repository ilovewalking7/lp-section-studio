import { useState } from "react";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "パララックス",
  category: "スクロール演出",
  description: "背景と前景が異なる速度で動く視差スクロール演出。",
  align: "full",
  isNew: true,
  tags: ["scroll", "animation", "parallax"],
};

export default function ParallaxSection() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const [y, setY] = useState(0);

  function onScroll(e: React.UIEvent<HTMLDivElement>) {
    setY(e.currentTarget.scrollTop);
  }

  return (
    <div className="w-full">
      <div
        onScroll={onScroll}
        className="relative h-[420px] w-full overflow-y-auto rounded-2xl border bg-background"
      >
        <div className="relative h-[260px] overflow-hidden">
          {/* far background */}
          <div
            className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,#6366f1,transparent_55%),radial-gradient(circle_at_70%_60%,#ec4899,transparent_55%)] opacity-70"
            style={{ transform: `translateY(${y * 0.5}px)` }}
          />
          {/* mid layer dots */}
          <div
            className="absolute inset-0 bg-[radial-gradient(#ffffff55_1px,transparent_1.5px)] [background-size:22px_22px]"
            style={{ transform: `translateY(${y * 0.25}px)` }}
          />
          {/* foreground title */}
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ transform: `translateY(${y * -0.15}px)` }}
          >
            <h2 className="text-3xl font-black tracking-tight text-white drop-shadow-lg sm:text-5xl">
              PARALLAX
            </h2>
          </div>
        </div>

        <div className="space-y-4 bg-background p-8">
          <p className="text-sm text-muted-foreground">
            {en
              ? "As you scroll, the background layer moves faster and the foreground moves slower. Each layer uses a different factor to create the parallax effect."
              : "スクロールすると背景レイヤーが速く、前景がゆっくり動きます。各層に異なる係数を掛けて視差を表現しています。"}
          </p>
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="rounded-lg border bg-muted/40 p-5 text-sm text-foreground">
              {en ? `Content block #${i + 1}` : `コンテンツブロック #${i + 1}`}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
