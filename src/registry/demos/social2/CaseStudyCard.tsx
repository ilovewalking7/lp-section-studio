import { ArrowUpRight, TrendingUp } from "lucide-react";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "導入事例カード",
  category: "マーケティング",
  description: "成果指標を添えた導入事例カード。ホバーで矢印が動き、成果バッジが光る。",
  align: "full",
  isNew: true,
  tags: ["social-proof", "testimonial", "animation"],
};

const CASES = [
  {
    company: "Nova Inc.",
    grad: "from-rose-500 to-orange-500",
    quote: "立ち上げ3ヶ月でリード獲得が3倍に。チーム全員が手放せない存在になりました。",
    quoteEn: "Leads tripled within three months of launch. The whole team can't work without it now.",
    person: "佐藤 美咲 / CMO",
    personEn: "Misaki Sato / CMO",
    metric: "+212%",
    metricLabel: "リード獲得数",
    metricLabelEn: "Leads generated",
  },
  {
    company: "Globe Co.",
    grad: "from-sky-500 to-indigo-500",
    quote: "オンボーディングの離脱が劇的に減り、定着率が大きく改善しました。",
    quoteEn: "Onboarding drop-off fell dramatically and retention improved significantly.",
    person: "Liam Carter / Head of Product",
    personEn: "Liam Carter / Head of Product",
    metric: "-47%",
    metricLabel: "解約率",
    metricLabelEn: "Churn rate",
  },
  {
    company: "Quartz Ltd.",
    grad: "from-emerald-500 to-teal-500",
    quote: "意思決定が速くなり、施策のサイクルが二倍の速度で回るように。",
    quoteEn: "Decisions got faster and our campaign cycle now runs at twice the speed.",
    person: "Aria Novak / CEO",
    personEn: "Aria Novak / CEO",
    metric: "2.1x",
    metricLabel: "施策スピード",
    metricLabelEn: "Campaign speed",
  },
];

export default function CaseStudyCard() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <section className="w-full px-6 py-12">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-center text-3xl font-semibold tracking-tight">{en ? "Case studies that drive results" : "成果につながる導入事例"}</h2>
        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {CASES.map((c) => (
            <article
              key={c.company}
              className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-transform duration-200 hover:-translate-y-1 hover:shadow-md"
            >
              <div className={`flex items-center justify-between bg-gradient-to-r ${c.grad} px-5 py-4 text-white`}>
                <span className="font-semibold">{c.company}</span>
                <ArrowUpRight className="size-5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
              <div className="flex flex-1 flex-col p-5">
                <div className="inline-flex w-fit items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 text-sm font-bold text-emerald-600 dark:text-emerald-400">
                  <TrendingUp className="size-4" />
                  {c.metric}
                  <span className="font-medium text-muted-foreground">{en ? c.metricLabelEn : c.metricLabel}</span>
                </div>
                <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-foreground">“{en ? c.quoteEn : c.quote}”</blockquote>
                <figcaption className="mt-4 text-xs font-medium text-muted-foreground">{en ? c.personEn : c.person}</figcaption>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
