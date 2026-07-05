import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "アワード・バッジセット",
  category: "ラグジュアリー",
  description: "月桂樹の SVG をあしらった、金の受賞・認証バッジ群。",
  align: "center",
  isNew: true,
  tags: ["luxury", "premium", "gold", "award"],
  principle: "金の月桂樹と刻印風レイアウトが、第三者からの権威づけと信頼を瞬時に伝える。",
};

const badges = [
  { top: "Best of", year: "2026", label: "Luxury Award" },
  { top: "Master", year: "100", label: "Years Craft" },
  { top: "Certified", year: "AAA", label: "Excellence" },
];

export default function AwardBadgeSet() {
  return (
    <div className="w-full max-w-xl bg-[#0a0a0a] p-10">
      <div className="flex flex-wrap items-center justify-center gap-8">
        {badges.map((b) => (
          <figure
            key={b.label}
            className="group flex flex-col items-center text-center text-stone-100"
          >
            <div className="relative flex h-32 w-32 items-center justify-center">
              <Laurel className="absolute inset-0 h-full w-full text-amber-400/80 transition-transform duration-500 group-hover:scale-105" />
              <div className="flex flex-col items-center px-6">
                <span className="text-[8px] uppercase tracking-[0.25em] text-stone-400">
                  {b.top}
                </span>
                <span className="bg-gradient-to-b from-amber-200 via-yellow-400 to-amber-500 bg-clip-text font-display text-2xl leading-none text-transparent">
                  {b.year}
                </span>
                <span className="mt-1 text-[8px] uppercase tracking-[0.2em] text-amber-200/90">
                  {b.label}
                </span>
              </div>
            </div>
          </figure>
        ))}
      </div>
    </div>
  );
}

function Laurel({ className }: { className?: string }) {
  // 左右対称の月桂冠（片側を定義しミラーで複製）
  const leaves = [0, 1, 2, 3, 4, 5, 6];
  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden="true">
      <g stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round">
        {/* 左枝 */}
        <path d="M40 18 C24 36 22 70 38 100" />
        {leaves.map((i) => {
          const t = i / (leaves.length - 1);
          const x = 40 - t * 18;
          const y = 22 + t * 70;
          return (
            <path
              key={`l${i}`}
              d={`M${x} ${y} q -12 -4 -16 6 q 10 4 16 -6`}
              fill="currentColor"
              opacity="0.85"
            />
          );
        })}
        {/* 右枝 */}
        <path d="M80 18 C96 36 98 70 82 100" />
        {leaves.map((i) => {
          const t = i / (leaves.length - 1);
          const x = 80 + t * 18;
          const y = 22 + t * 70;
          return (
            <path
              key={`r${i}`}
              d={`M${x} ${y} q 12 -4 16 6 q -10 4 -16 -6`}
              fill="currentColor"
              opacity="0.85"
            />
          );
        })}
        {/* 下の結び目 */}
        <path d="M52 104 L60 110 L68 104" />
      </g>
    </svg>
  );
}
