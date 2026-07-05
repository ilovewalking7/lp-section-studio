import {
  ArrowRight,
  Zap,
  Shield,
  BarChart3,
  Globe,
  GitBranch,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "ヒーロー（ベントグリッド）",
  category: "ヒーロー・LP",
  description:
    "左にコピー、右に大小さまざまな機能タイルを並べた非対称ベントグリッドのヒーロー。",
  align: "full",
  isNew: true,
  tags: ["hero", "landing", "bento"],
  principle:
    "左の言葉と右の視覚情報をF型で分担。タイルの大小差がリズムを生み、最も伝えたい機能を最大面積で強調する。",
};

function Tile({
  className,
  icon,
  title,
  desc,
}: {
  className?: string;
  icon: React.ReactNode;
  title: string;
  desc?: string;
}) {
  return (
    <div
      className={cn(
        "group relative flex flex-col justify-between overflow-hidden rounded-2xl border bg-card p-4 transition-colors hover:border-primary/40",
        className
      )}
    >
      <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary [&_svg]:size-4">
        {icon}
      </div>
      <div className="mt-3">
        <div className="text-sm font-semibold">{title}</div>
        {desc && (
          <div className="mt-1 text-xs text-muted-foreground">{desc}</div>
        )}
      </div>
      <div className="pointer-events-none absolute -right-6 -top-6 size-20 rounded-full bg-primary/10 opacity-0 blur-2xl transition-opacity group-hover:opacity-100" />
    </div>
  );
}

export default function HeroBento() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <section className="w-full bg-background px-6 py-20 sm:py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2">
        {/* copy */}
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
            <span className="size-1.5 rounded-full bg-emerald-500" />
            {en ? "Everything in one place" : "すべてが、ひとつの場所に"}
          </span>
          <h1 className="mt-5 text-balance text-4xl font-semibold tracking-tight sm:text-6xl">
            {en ? (
              <>
                Every feature you need,
                <br className="hidden sm:block" />
                on one platform.
              </>
            ) : (
              <>
                必要な機能を、
                <br className="hidden sm:block" />
                ひとつのプラットフォームで。
              </>
            )}
          </h1>
          <p className="mt-5 max-w-md text-pretty text-muted-foreground">
            {en
              ? "Analytics, security, and deploys together. Consolidate scattered tools and lighten your team's cognitive load."
              : "分析・セキュリティ・デプロイをまとめて。点在するツールを統合し、チームの認知負荷を下げます。"}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button size="lg" className="group">
              {en ? "Get started" : "はじめる"}
              <ArrowRight className="transition-transform group-hover:translate-x-0.5" />
            </Button>
            <Button size="lg" variant="ghost">
              {en ? "All features" : "機能一覧"}
            </Button>
          </div>
        </div>

        {/* bento grid */}
        <div className="grid grid-cols-2 grid-rows-3 gap-3 sm:h-[26rem]">
          <Tile
            className="row-span-2"
            icon={<BarChart3 />}
            title={en ? "Real-time analytics" : "リアルタイム分析"}
            desc={en ? "Key metrics on one screen." : "主要指標を一画面で。"}
          />
          <Tile icon={<Zap />} title={en ? "Fast deploys" : "高速デプロイ"} />
          <Tile icon={<Shield />} title={en ? "Secure by default" : "既定で安全"} />
          <Tile
            className="col-span-2"
            icon={<Globe />}
            title={en ? "Global edge delivery" : "グローバルエッジ配信"}
            desc={en ? "Low latency worldwide." : "世界中で低遅延。"}
          />
          <Tile
            icon={<GitBranch />}
            title={en ? "Per-branch previews" : "ブランチごとのプレビュー"}
          />
        </div>
      </div>
    </section>
  );
}
