import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "スタット・ストリップ",
  category: "ミニマル",
  description: "大きな数字を並べ、極小キャプションとヘアラインで支える。",
  align: "full",
  isNew: true,
  tags: ["minimal", "swiss", "stats"],
  principle: "巨大な数字が瞬時に成果を伝え、小さな注釈が信頼を補う。",
};

const stats = [
  { id: "uptime", value: "99.9", unit: "%", unitEn: "%", ja: "稼働率", en: "Uptime" },
  { id: "components", value: "12", unit: "k", unitEn: "k", ja: "コンポーネント", en: "Components" },
  { id: "latency", value: "48", unit: "ms", unitEn: "ms", ja: "平均応答", en: "Avg. latency" },
  { id: "setup", value: "0", unit: "円", unitEn: "¥", ja: "初期費用", en: "Setup cost" },
];

export default function StatStrip() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <section className="w-full bg-white font-sans text-neutral-900">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <div className="mb-12 flex items-baseline justify-between border-b border-neutral-200 pb-4">
          <span className="text-[11px] uppercase tracking-[0.25em] text-neutral-500">
            By the numbers
          </span>
          <span className="text-[11px] uppercase tracking-[0.25em] text-neutral-400">
            2026
          </span>
        </div>

        <dl className="grid grid-cols-2 gap-px border border-neutral-200 bg-neutral-200 md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.id} className="bg-white p-8">
              <dd className="flex items-baseline gap-1">
                <span className="text-5xl font-medium tabular-nums tracking-tight md:text-6xl">
                  {s.value}
                </span>
                <span className="text-lg text-neutral-400">
                  {en ? s.unitEn : s.unit}
                </span>
              </dd>
              <dt className="mt-3 text-[11px] uppercase tracking-[0.2em] text-neutral-500">
                {en ? s.en : s.ja}
              </dt>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
