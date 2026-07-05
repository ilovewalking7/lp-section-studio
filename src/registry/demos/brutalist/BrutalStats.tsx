import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "ブルータル・統計",
  category: "ブルータリスト",
  description: "巨大な数字を飽和カラーブロックに並べた統計セクション。",
  align: "full",
  isNew: true,
  tags: ["brutalist", "bold", "stats"],
};

type Stat = { value: string; label: string; labelEn: string; bg: string };

const stats: Stat[] = [
  { value: "12K+", label: "GitHub スター", labelEn: "GitHub stars", bg: "bg-yellow-300" },
  { value: "98%", label: "満足度", labelEn: "Satisfaction", bg: "bg-lime-300" },
  { value: "0ms", label: "体感遅延", labelEn: "Perceived lag", bg: "bg-cyan-300" },
  { value: "24/7", label: "稼働", labelEn: "Uptime", bg: "bg-fuchsia-400" },
];

export default function BrutalStats() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <section className="w-full bg-orange-400 px-5 py-12 font-sans text-black sm:px-10 sm:py-16">
      <div className="mx-auto max-w-5xl">
        <h2 className="mb-10 text-4xl font-black uppercase tracking-tight sm:text-5xl">
          {en ? "Numbers talk." : "数字が、語る。"}
        </h2>

        <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
          {stats.map((s) => (
            <div
              key={s.labelEn}
              className={cn(
                "border-4 border-black p-6 text-center shadow-[6px_6px_0_0_#000] transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0_0_#000]",
                s.bg
              )}
            >
              <div className="text-5xl font-black leading-none tracking-tight sm:text-6xl">
                {s.value}
              </div>
              <div className="mt-3 border-t-2 border-black pt-3 font-mono text-xs font-black uppercase">
                {en ? s.labelEn : s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
