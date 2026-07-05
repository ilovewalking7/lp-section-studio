import { ArrowRight, Sparkles, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "ヒーロー (SaaS)",
  category: "マーケティング",
  description: "アイブロウ・大見出し・CTA・社会的証明を備えたSaaSヒーロー。",
  align: "full",
};

const avatars = [
  { initials: "AK", tone: "bg-emerald-500/15 text-emerald-500" },
  { initials: "MR", tone: "bg-sky-500/15 text-sky-500" },
  { initials: "JT", tone: "bg-violet-500/15 text-violet-500" },
  { initials: "SY", tone: "bg-amber-500/15 text-amber-500" },
];

export default function HeroSaaS() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <section className="relative w-full overflow-hidden">
      {/* subtle grid backdrop */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_40%,transparent_100%)]"
        style={{
          backgroundImage:
            "linear-gradient(to right, hsl(var(--border)/0.5) 1px, transparent 1px), linear-gradient(to bottom, hsl(var(--border)/0.5) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />
      <div className="relative mx-auto max-w-5xl px-6 py-20 text-center sm:py-28">
        <Badge
          variant="secondary"
          className="mb-6 gap-1.5 rounded-full py-1 pl-1.5 pr-3"
        >
          <span className="grid size-5 place-items-center rounded-full bg-primary/10">
            <Sparkles className="size-3 text-primary" />
          </span>
          <span className="text-xs font-medium">
            {en ? "v2.0 — AI workflows now live" : "v2.0 — AI ワークフローを公開"}
          </span>
        </Badge>

        <h1 className="mx-auto max-w-3xl text-balance text-4xl font-semibold tracking-tight sm:text-6xl">
          {en ? (
            <>
              Bring your team's work into{" "}
              <span className="bg-gradient-to-br from-foreground to-foreground/55 bg-clip-text text-transparent">
                one quiet space.
              </span>
            </>
          ) : (
            <>
              チームの作業を、
              <span className="bg-gradient-to-br from-foreground to-foreground/55 bg-clip-text text-transparent">
                一つの静かな空間に。
              </span>
            </>
          )}
        </h1>

        <p className="mx-auto mt-6 max-w-xl text-pretty text-base text-muted-foreground sm:text-lg">
          {en
            ? "Planning, docs, and automation in one place. Stop juggling tools and get a workspace where you focus only on the work that matters."
            : "計画・ドキュメント・自動化をひとつに。煩雑なツール切替をやめて、重要な仕事だけに集中できるワークスペースを。"}
        </p>

        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button size="lg" className="group w-full sm:w-auto">
            {en ? "Start for free" : "無料で始める"}
            <ArrowRight className="transition-transform group-hover:translate-x-0.5" />
          </Button>
          <Button size="lg" variant="outline" className="w-full sm:w-auto">
            {en ? "Watch demo" : "デモを見る"}
          </Button>
        </div>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
          <div className="flex -space-x-2.5">
            {avatars.map((a) => (
              <span
                key={a.initials}
                className={cn(
                  "grid size-9 place-items-center rounded-full border-2 border-background text-xs font-semibold ring-1 ring-border",
                  a.tone
                )}
              >
                {a.initials}
              </span>
            ))}
          </div>
          <div className="flex flex-col items-center gap-0.5 sm:items-start">
            <div className="flex items-center gap-0.5 text-amber-500">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="size-4 fill-current" />
              ))}
            </div>
            <p className="text-sm text-muted-foreground">
              {en ? (
                <>
                  Trusted by{" "}
                  <span className="font-semibold text-foreground">2,400+</span>{" "}
                  teams
                </>
              ) : (
                <>
                  <span className="font-semibold text-foreground">2,400+</span>{" "}
                  チームに信頼されています
                </>
              )}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
