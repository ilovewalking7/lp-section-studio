import { useRef, useState } from "react";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "カーソル追従ラベル",
  category: "Awwwards",
  description: "ホバー対象ごとにラベルがカーソルに張り付いて追従する、案内型カーソル。",
  align: "full",
  isNew: true,
  tags: ["awwwards", "interaction", "animation"],
};

const tiles = [
  { ja: "プロジェクト・オリオン", en: "Project Orion", labelJa: "見る", labelEn: "View" },
  { ja: "ノース・キャンペーン", en: "North Campaign", labelJa: "再生", labelEn: "Play" },
  { ja: "スタジオ・リール", en: "Studio Reel", labelJa: "開く", labelEn: "Open" },
];

export default function StickyCursorLabel() {
  const en = typeof document !== "undefined" && document.documentElement.lang === "en";
  const frameRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [label, setLabel] = useState<string | null>(null);

  function move(e: React.MouseEvent<HTMLDivElement>) {
    const rect = frameRef.current?.getBoundingClientRect();
    if (!rect) return;
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }

  return (
    <section className="relative w-full bg-neutral-950 px-6 py-24 text-neutral-50 sm:px-16">
      <div
        ref={frameRef}
        onMouseMove={move}
        onMouseLeave={() => setLabel(null)}
        className="relative mx-auto max-w-[1000px]"
      >
        <ul className="grid gap-px overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-800 sm:grid-cols-3">
          {tiles.map((t) => (
            <li key={t.en}>
              <button
                type="button"
                onMouseEnter={() => setLabel(en ? t.labelEn : t.labelJa)}
                onMouseLeave={() => setLabel(null)}
                className="flex aspect-[4/3] w-full cursor-none flex-col justify-end bg-neutral-900 p-6 text-left transition-colors hover:bg-neutral-800/70"
              >
                <span className="text-lg font-medium tracking-tight">{en ? t.en : t.ja}</span>
              </button>
            </li>
          ))}
        </ul>

        <div
          aria-hidden
          className={
            "pointer-events-none absolute -ml-9 -mt-9 flex h-[72px] w-[72px] items-center justify-center rounded-full bg-amber-300 text-[11px] font-semibold uppercase tracking-wider text-neutral-900 transition-[opacity,transform] duration-200 ease-out " +
            (label ? "scale-100 opacity-100" : "scale-50 opacity-0")
          }
          style={{ transform: `translate(${pos.x}px, ${pos.y}px)` }}
        >
          {label}
        </div>
      </div>
    </section>
  );
}
