import { ArrowRight, Sparkles, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "ヒーロー（グラデーションメッシュ）",
  category: "ヒーロー・LP",
  description:
    "ぼかしたグラデーションブロブを重ねたメッシュ背景に、アイブロウ・大見出し・デュアルCTAを配置。",
  align: "full",
  isNew: true,
  tags: ["hero", "landing", "gradient"],
  principle:
    "低彩度の背景に対し中央へ視線を集約。フォーカルポイントを単一CTAに絞り、メッシュは主張させず奥行きだけを担わせる。",
};

export default function HeroGradientMesh() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <section className="relative w-full overflow-hidden bg-background px-6 py-24 sm:py-32">
      {/* gradient mesh blobs */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-[-10%] size-[36rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,theme(colors.indigo.500/0.35),transparent_60%)] blur-3xl" />
        <div className="absolute -left-24 top-1/3 size-[28rem] rounded-full bg-[radial-gradient(circle_at_center,theme(colors.sky.400/0.28),transparent_60%)] blur-3xl" />
        <div className="absolute -right-20 top-10 size-[30rem] rounded-full bg-[radial-gradient(circle_at_center,theme(colors.fuchsia.500/0.22),transparent_60%)] blur-3xl" />
        <div className="absolute bottom-[-20%] left-1/3 size-[32rem] rounded-full bg-[radial-gradient(circle_at_center,theme(colors.emerald.400/0.18),transparent_60%)] blur-3xl" />
      </div>

      {/* subtle grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)] bg-[linear-gradient(to_right,hsl(var(--border)/0.5)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.5)_1px,transparent_1px)] bg-[size:56px_56px]"
      />

      <div className="relative mx-auto max-w-3xl text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-card/60 px-3.5 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur">
          <Sparkles className="size-3.5 text-indigo-400" />
          {en ? "v2.0 — new engine now live" : "v2.0 — 新しいエンジンを公開しました"}
        </span>

        <h1 className="mt-6 text-balance text-5xl font-semibold tracking-tight sm:text-7xl">
          {en ? (
            <>
              From idea to a{" "}
              <span className="bg-gradient-to-br from-indigo-400 via-sky-400 to-emerald-400 bg-clip-text text-transparent">
                working product
              </span>
              , faster.
            </>
          ) : (
            <>
              アイデアを、最速で
              <span className="bg-gradient-to-br from-indigo-400 via-sky-400 to-emerald-400 bg-clip-text text-transparent">
                動くプロダクト
              </span>
              へ。
            </>
          )}
        </h1>

        <p className="mx-auto mt-6 max-w-xl text-pretty text-lg text-muted-foreground">
          {en
            ? "Design, build, and ship in one workflow. Keep your team's speed and raise only the quality."
            : "設計・実装・公開をひとつのワークフローに。チームの速度を落とさず、品質だけを引き上げます。"}
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button size="lg" className="group w-full sm:w-auto">
            {en ? "Start for free" : "無料ではじめる"}
            <ArrowRight className="transition-transform group-hover:translate-x-0.5" />
          </Button>
          <Button size="lg" variant="outline" className="w-full sm:w-auto">
            <Play className="fill-current" />
            {en ? "Watch demo" : "デモを見る"}
          </Button>
        </div>

        <p className="mt-6 text-xs text-muted-foreground">
          {en
            ? "No credit card required · 14-day free trial"
            : "クレジットカード不要・14日間の無料トライアル"}
        </p>
      </div>
    </section>
  );
}
