import { useState } from "react";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "テキスト・リビール",
  category: "スクロール演出",
  description: "スクロールに合わせて段落の単語が暗→明へ点灯する。",
  align: "full",
  isNew: true,
  tags: ["scroll", "animation", "text", "reveal"],
};

const TEXT_JA =
  "私たちは スクロール体験を 通じて 物語を 語ります。 一語ずつ 光が 灯り、 読み手の 視線を 自然に 導きながら、 重要な メッセージを 印象的に 伝えます。";
const TEXT_EN =
  "We tell stories through the scroll experience. Word by word the light turns on, gently guiding the reader's gaze while delivering the key message with impact.";

export default function TextRevealOnScroll() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const [progress, setProgress] = useState(0);
  const words = (en ? TEXT_EN : TEXT_JA).trim().split(/\s+/);

  function onScroll(e: React.UIEvent<HTMLDivElement>) {
    const el = e.currentTarget;
    const max = el.scrollHeight - el.clientHeight;
    setProgress(max > 0 ? el.scrollTop / max : 0);
  }

  const litCount = Math.round(progress * words.length);

  return (
    <div className="w-full">
      <div onScroll={onScroll} className="h-[420px] w-full overflow-y-auto rounded-2xl border bg-neutral-950 px-8">
        <div className="flex h-[260px] items-center justify-center text-sm text-neutral-500">
          {en ? "↓ Scroll slowly" : "↓ ゆっくりスクロール"}
        </div>
        <div className="sticky top-1/2 flex min-h-[200px] -translate-y-1/2 items-center">
          <p className="text-2xl font-bold leading-relaxed sm:text-3xl">
            {words.map((w, i) => (
              <span
                key={i}
                className={cn(
                  "transition-colors duration-300",
                  i < litCount ? "text-white" : "text-neutral-700",
                )}
              >
                {w}{" "}
              </span>
            ))}
          </p>
        </div>
        <div className="h-[400px]" aria-hidden />
      </div>
    </div>
  );
}
