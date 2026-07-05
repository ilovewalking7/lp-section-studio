import { useRef, useState } from "react";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "画像ホバー出現",
  category: "Awwwards",
  description: "リストにホバーするとカーソル位置にグラデ画像が浮かび上がるリスト。",
  align: "full",
  isNew: true,
  tags: ["awwwards", "interaction", "animation"],
};

const rows = [
  { ja: "オーロラ", en: "Aurora", g: "from-fuchsia-500 via-purple-500 to-indigo-600" },
  { ja: "サンセット", en: "Sunset", g: "from-amber-400 via-orange-500 to-rose-600" },
  { ja: "ディープシー", en: "Deep Sea", g: "from-cyan-400 via-sky-500 to-blue-700" },
  { ja: "フォレスト", en: "Forest", g: "from-lime-400 via-emerald-500 to-teal-700" },
];

export default function ImageHoverReveal() {
  const en = typeof document !== "undefined" && document.documentElement.lang === "en";
  const frameRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [active, setActive] = useState<number | null>(null);

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
        className="relative mx-auto max-w-[1000px]"
      >
        <ul className="divide-y divide-neutral-800 border-y border-neutral-800">
          {rows.map((r, i) => (
            <li key={r.en}>
              <button
                type="button"
                onMouseEnter={() => setActive(i)}
                onMouseLeave={() => setActive(null)}
                className="flex w-full items-center justify-between py-7 text-left transition-colors"
              >
                <span
                  className={
                    "text-3xl font-semibold tracking-tight transition-colors duration-300 sm:text-5xl " +
                    (active === i ? "text-amber-300" : "text-neutral-200")
                  }
                >
                  {en ? r.en : r.ja}
                </span>
                <span className="text-xs uppercase tracking-[0.3em] text-neutral-500">
                  0{i + 1}
                </span>
              </button>
            </li>
          ))}
        </ul>

        {rows.map((r, i) => (
          <div
            key={r.en}
            aria-hidden
            className={
              "pointer-events-none absolute -ml-28 -mt-20 h-40 w-56 rounded-xl bg-gradient-to-br shadow-2xl transition-opacity duration-300 " +
              r.g +
              (active === i ? " opacity-100" : " opacity-0")
            }
            style={{
              transform: `translate(${pos.x}px, ${pos.y}px) rotate(-4deg)`,
            }}
          />
        ))}
      </div>
    </section>
  );
}
