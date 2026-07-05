import { ArrowRight, TrendingUp, Users, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "ヒーロー（分割＋モックアップ）",
  category: "ヒーロー・LP",
  description:
    "左にコピー、右にCSSで組んだダッシュボード風モックアップ（ウィンドウクロム付き）を配置。",
  align: "full",
  isNew: true,
  tags: ["hero", "landing", "mockup"],
  principle:
    "言葉だけでなく実体（製品UI）を見せて信頼を獲得。左→右の視線移動で約束と証拠を順に提示する。",
};

function Bar({ h, active }: { h: number; active?: boolean }) {
  return (
    <div className="flex flex-1 items-end">
      <div
        className={`w-full rounded-t-sm ${active ? "bg-primary" : "bg-primary/25"}`}
        style={{ height: `${h}%` }}
      />
    </div>
  );
}

export default function HeroSplitMockup() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const bars = [38, 52, 44, 66, 58, 80, 72];

  return (
    <section className="w-full overflow-hidden bg-background px-6 py-20 sm:py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
        {/* copy */}
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
            {en ? "Dashboard 2.0" : "ダッシュボード 2.0"}
          </span>
          <h1 className="mt-5 text-balance text-4xl font-semibold tracking-tight sm:text-6xl">
            {en ? (
              <>
                When numbers start to{" "}
                <span className="text-primary">tell a story</span>.
              </>
            ) : (
              <>
                数字が、
                <span className="text-primary">物語</span>
                を語りはじめる。
              </>
            )}
          </h1>
          <p className="mt-5 max-w-md text-pretty text-muted-foreground">
            {en
              ? "Bring scattered data into one view. Just the metrics you need to decide — beautifully and fast."
              : "散らばったデータをひとつのビューに集約。意思決定に必要な指標だけを、美しく、すばやく。"}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button size="lg" className="group">
              {en ? "View dashboard" : "ダッシュボードを見る"}
              <ArrowRight className="transition-transform group-hover:translate-x-0.5" />
            </Button>
            <Button size="lg" variant="outline">
              {en ? "See pricing" : "料金を確認"}
            </Button>
          </div>
        </div>

        {/* mockup */}
        <div className="relative">
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-6 rounded-3xl bg-[radial-gradient(circle_at_70%_30%,theme(colors.indigo.500/0.25),transparent_70%)] blur-2xl"
          />
          <div className="relative overflow-hidden rounded-xl border bg-card shadow-2xl shadow-black/20">
            {/* window chrome */}
            <div className="flex items-center gap-2 border-b bg-muted/40 px-4 py-3">
              <span className="size-3 rounded-full bg-red-400/80" />
              <span className="size-3 rounded-full bg-amber-400/80" />
              <span className="size-3 rounded-full bg-emerald-400/80" />
              <div className="ml-3 h-5 w-40 rounded-md bg-background/70" />
            </div>

            <div className="space-y-4 p-5">
              {/* stat cards */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  { icon: <Wallet />, ja: "売上", en: "Revenue", v: "¥4.2M" },
                  { icon: <Users />, ja: "新規", en: "New", v: "1,284" },
                  { icon: <TrendingUp />, ja: "成長", en: "Growth", v: "+18%" },
                ].map((s) => (
                  <div key={s.en} className="rounded-lg border bg-background/60 p-3">
                    <div className="flex size-7 items-center justify-center rounded-md bg-primary/10 text-primary [&_svg]:size-3.5">
                      {s.icon}
                    </div>
                    <div className="mt-2 text-base font-semibold">{s.v}</div>
                    <div className="text-[10px] text-muted-foreground">
                      {en ? s.en : s.ja}
                    </div>
                  </div>
                ))}
              </div>

              {/* chart */}
              <div className="rounded-lg border bg-background/60 p-4">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-medium">
                    {en ? "Weekly trend" : "週次トレンド"}
                  </div>
                  <div className="text-[10px] text-muted-foreground">
                    {en ? "Last 7 days" : "過去7日"}
                  </div>
                </div>
                <div className="mt-4 flex h-24 items-end gap-2">
                  {bars.map((h, i) => (
                    <Bar key={i} h={h} active={i === bars.length - 1} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
