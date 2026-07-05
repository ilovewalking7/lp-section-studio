import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "ヒーロー（中央スポットライト）",
  category: "ヒーロー・LP",
  description:
    "見出しの背後にやわらかなグロー／スポットライトを敷いた中央寄せヒーロー。上部にピル型のお知らせ（Vercel風）。",
  align: "full",
  isNew: true,
  tags: ["hero", "landing", "glow"],
  principle:
    "暗い背景に上方からのグローで見出しを照らし、視線を中央へ一点集中。ピル型告知→見出し→CTAの縦の階層が明快。",
};

export default function HeroCenteredGlow() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <section className="relative w-full overflow-hidden bg-background px-6 py-28 sm:py-36">
      {/* top spotlight glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[-12rem] size-[40rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,theme(colors.indigo.500/0.30),theme(colors.sky.500/0.12)_45%,transparent_70%)] blur-2xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 mx-auto h-px max-w-md bg-gradient-to-r from-transparent via-foreground/40 to-transparent"
      />

      <div className="relative mx-auto max-w-2xl text-center">
        {/* announcement pill */}
        <a
          href="#"
          className="group inline-flex items-center gap-2 rounded-full border border-border/70 bg-card/60 py-1 pl-1 pr-3 text-sm backdrop-blur transition-colors hover:border-border"
        >
          <span className="rounded-full bg-primary px-2.5 py-0.5 text-xs font-semibold text-primary-foreground">
            {en ? "New" : "新着"}
          </span>
          <span className="text-muted-foreground">
            {en ? "Edge Functions are now GA" : "Edge Functions が一般提供に"}
          </span>
          <ArrowUpRight className="size-3.5 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>

        <h1 className="mt-7 text-balance text-5xl font-semibold tracking-tight sm:text-7xl">
          {en ? (
            <>
              The cloud for developers,
              <br className="hidden sm:block" />
              without boundaries.
            </>
          ) : (
            <>
              開発者のための、
              <br className="hidden sm:block" />
              境界のないクラウド。
            </>
          )}
        </h1>

        <p className="mx-auto mt-6 max-w-lg text-pretty text-lg text-muted-foreground">
          {en
            ? "Just push to deploy. Ship globally with automatic scaling — you focus on the code."
            : "push するだけでデプロイ。グローバルに配信し、スケールは自動。あなたはコードに集中するだけ。"}
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button size="lg" className="group w-full sm:w-auto">
            {en ? "Start deploying" : "デプロイをはじめる"}
            <ArrowRight className="transition-transform group-hover:translate-x-0.5" />
          </Button>
          <Button size="lg" variant="outline" className="w-full sm:w-auto">
            {en ? "Documentation" : "ドキュメント"}
          </Button>
        </div>
      </div>
    </section>
  );
}
