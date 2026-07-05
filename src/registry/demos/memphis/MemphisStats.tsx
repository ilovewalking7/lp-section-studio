import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "メンフィス・統計",
  category: "メンフィス",
  description: "シェイプ装飾されたブロックに並ぶ統計値。",
  align: "full",
  isNew: true,
  tags: ["memphis", "geometric", "80s"],
};

type Stat = { value: string; label: string; labelEn: string; color: string };

const stats: Stat[] = [
  { value: "12K+", label: "アクティブユーザー", labelEn: "Active users", color: "#ff5c8a" },
  { value: "98%", label: "満足度", labelEn: "Satisfaction", color: "#ffd23f" },
  { value: "240", label: "シェイプパーツ", labelEn: "Shape parts", color: "#1fb6c1" },
  { value: "4.9", label: "平均評価", labelEn: "Avg. rating", color: "#7b5cff" },
];

export default function MemphisStats() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <section className="relative w-full overflow-hidden bg-[#fdf6e3] px-6 py-20">
      <div className="pointer-events-none absolute inset-0 opacity-70">
        <svg viewBox="0 0 120 30" className="absolute left-[8%] top-[10%] w-28" fill="none" aria-hidden>
          <path d="M2 24L22 6l20 18L62 6l20 18L102 6l16 14" stroke="#ff8c42" strokeWidth={5} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <div className="absolute bottom-[10%] right-[6%] h-12 w-12 rotate-12 border-[4px] border-black bg-[#1fb6c1]" />
      </div>

      <div className="relative mx-auto max-w-5xl">
        <h2 className="text-center text-4xl font-black tracking-tight text-black sm:text-5xl">
          {en ? (
            <>
              The <span className="inline-block -rotate-1 bg-[#7b5cff] px-3 text-white">numbers</span> speak.
            </>
          ) : (
            <>
              <span className="inline-block -rotate-1 bg-[#7b5cff] px-3 text-white">数字</span>
              が語る実力。
            </>
          )}
        </h2>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => (
            <div
              key={s.labelEn}
              className="relative overflow-hidden rounded-2xl border-[3px] border-black bg-white p-6 text-center shadow-[5px_5px_0_0_#000] transition-transform hover:-translate-y-1"
            >
              {/* 上部カラーバンド */}
              <div
                className="absolute inset-x-0 top-0 h-2.5 border-b-[3px] border-black"
                style={{ backgroundColor: s.color }}
              />
              {/* 角の小シェイプ */}
              {i % 2 === 0 ? (
                <span
                  className="absolute right-3 top-5 h-4 w-4 rounded-full border-2 border-black"
                  style={{ backgroundColor: s.color }}
                />
              ) : (
                <span
                  className="absolute right-3 top-5 h-4 w-4 rotate-12 border-2 border-black"
                  style={{ backgroundColor: s.color }}
                />
              )}
              <div className="mt-3 text-4xl font-black tracking-tight text-black sm:text-5xl">
                {s.value}
              </div>
              <div className="mt-2 text-sm font-bold text-black/60">{en ? s.labelEn : s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
