import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "ヒーロー（実績ストリップ）",
  category: "ヒーロー・LP",
  description:
    "信頼を補強する大きな数字のストリップ（3〜4指標）を備えたヒーロー。",
  align: "full",
  isNew: true,
  tags: ["hero", "landing", "stats"],
  principle:
    "大きな数字は瞬時に規模を伝えるアンカー。見出しで約束し、数字で裏づける二段構えで説得力を高める。",
};

const STATS = [
  { value: "99.99%", ja: "稼働率", en: "Uptime" },
  { value: "2.4億", en: "Monthly requests", ja: "月間リクエスト" },
  { value: "180+", ja: "対応リージョン", en: "Regions" },
  { value: "12,000", ja: "導入チーム", en: "Teams onboard" },
];

export default function HeroStats() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <section className="relative w-full overflow-hidden bg-background px-6 py-20 sm:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border to-transparent"
      />

      <div className="mx-auto max-w-3xl text-center">
        <span className="inline-flex items-center gap-2 rounded-full border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
          {en ? "Infrastructure that scales" : "スケールするインフラ"}
        </span>
        <h1 className="mt-6 text-balance text-4xl font-semibold tracking-tight sm:text-6xl">
          {en ? (
            <>
              Stays up,{" "}
              <span className="text-primary">under any load</span>.
            </>
          ) : (
            <>
              負荷が増えても、
              <span className="text-primary">止まらない</span>。
            </>
          )}
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-pretty text-muted-foreground">
          {en
            ? "A foundation built for fast-growing products — ride traffic spikes without the ops anxiety."
            : "急成長するプロダクトのために設計された基盤。トラフィックの波を、運用の不安なく乗り越えます。"}
        </p>
        <div className="mt-8 flex justify-center">
          <Button size="lg" className="group">
            {en ? "Talk to us" : "導入を相談する"}
            <ArrowRight className="transition-transform group-hover:translate-x-0.5" />
          </Button>
        </div>
      </div>

      {/* stats strip */}
      <div className="mx-auto mt-16 max-w-5xl">
        <dl className="grid grid-cols-2 divide-y divide-border rounded-2xl border bg-card/50 sm:grid-cols-4 sm:divide-x sm:divide-y-0">
          {STATS.map((s) => (
            <div
              key={s.en}
              className="flex flex-col items-center gap-1 px-4 py-8 text-center"
            >
              <dt className="bg-gradient-to-br from-foreground to-foreground/60 bg-clip-text text-4xl font-semibold tracking-tight text-transparent sm:text-5xl">
                {s.value}
              </dt>
              <dd className="text-sm text-muted-foreground">
                {en ? s.en : s.ja}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
