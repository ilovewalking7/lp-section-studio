import {
  Activity,
  GitBranch,
  Lock,
  Workflow,
  Zap,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "機能セクション",
  category: "マーケティング",
  description: "大きな主役機能と補助カードを組み合わせた非対称ベント配置。",
  align: "full",
};

function MiniBars() {
  const bars = [38, 64, 52, 80, 46, 92, 70];
  return (
    <div className="flex h-24 items-end gap-1.5">
      {bars.map((h, i) => (
        <div
          key={i}
          className="flex-1 rounded-t bg-gradient-to-t from-primary/30 to-primary"
          style={{ height: `${h}%` }}
        />
      ))}
    </div>
  );
}

type Supporting = {
  icon: typeof Zap;
  titleJa: string;
  titleEn: string;
  bodyJa: string;
  bodyEn: string;
  accent: string;
};

const supporting: Supporting[] = [
  {
    icon: Workflow,
    titleJa: "ビジュアル自動化",
    titleEn: "Visual automation",
    bodyJa: "ノーコードで繰り返し作業をつなぎ、手作業を消し去ります。",
    bodyEn: "Connect repetitive tasks with no code and eliminate manual work.",
    accent: "text-violet-500 bg-violet-500/10",
  },
  {
    icon: Lock,
    titleJa: "標準で安全",
    titleEn: "Secure by default",
    bodyJa: "SOC 2 準拠、保存時暗号化、きめ細かな権限管理。",
    bodyEn: "SOC 2 compliant, encryption at rest, and fine-grained permissions.",
    accent: "text-emerald-500 bg-emerald-500/10",
  },
  {
    icon: GitBranch,
    titleJa: "開発者ファースト",
    titleEn: "Developer first",
    bodyJa: "型付きSDKとWebhookで、既存のスタックに自然に統合。",
    bodyEn: "Typed SDKs and webhooks that fit naturally into your existing stack.",
    accent: "text-sky-500 bg-sky-500/10",
  },
];

export default function FeatureSection() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <section className="w-full px-6 py-20">
      <div className="mx-auto max-w-5xl">
        <div className="max-w-2xl">
          <Badge variant="outline" className="mb-4 rounded-full border-primary/30 text-primary">
            {en ? "Platform" : "プラットフォーム"}
          </Badge>
          <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
            {en
              ? "Only the features you need, refined."
              : "必要な機能だけを、研ぎ澄まして。"}
          </h2>
          <p className="mt-4 text-pretty text-muted-foreground">
            {en
              ? "Substance over flash. Every feature is designed to make real work faster."
              : "派手さではなく実用性を。すべての機能は実際の作業を速くするために設計されています。"}
          </p>
        </div>

        <div className="mt-12 grid gap-4 lg:grid-cols-3 lg:grid-rows-2">
          {/* Hero feature spans 2 cols & 2 rows */}
          <div className="group relative overflow-hidden rounded-2xl border bg-card p-7 lg:col-span-2 lg:row-span-2">
            <div className="flex items-center gap-2">
              <span className="grid size-9 place-items-center rounded-lg bg-primary/10 text-primary">
                <Activity className="size-5" />
              </span>
              <span className="text-sm font-medium text-muted-foreground">
                {en ? "Real-time analytics" : "リアルタイム分析"}
              </span>
            </div>
            <h3 className="mt-5 text-2xl font-semibold tracking-tight">
              {en ? "Know what's happening, instantly." : "状況を、待たずに知る。"}
            </h3>
            <p className="mt-2 max-w-md text-sm text-muted-foreground">
              {en
                ? "Key metrics stream in live — no sampling, no lag. Decision speed becomes your edge."
                : "主要指標がライブで流れ込みます。サンプリングなし、遅延なし。意思決定の速度がそのまま競争力に。"}
            </p>

            <div className="mt-8 rounded-xl border bg-background/60 p-5">
              <div className="mb-3 flex items-baseline justify-between">
                <p className="text-sm text-muted-foreground">
                  {en ? "Weekly active" : "週間アクティブ"}
                </p>
                <p className="text-sm font-semibold text-emerald-500">+18.2%</p>
              </div>
              <MiniBars />
            </div>
          </div>

          {/* Tall accent card */}
          <div className="relative flex flex-col justify-between overflow-hidden rounded-2xl border bg-gradient-to-br from-primary/[0.08] to-transparent p-7 lg:row-span-2">
            <div>
              <span className="grid size-9 place-items-center rounded-lg bg-amber-500/10 text-amber-500">
                <Zap className="size-5" />
              </span>
              <h3 className="mt-5 text-lg font-semibold tracking-tight">
                {en ? "Speed you don't feel" : "体感ゼロの速度"}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {en
                  ? "Infrastructure running at the edge. Under 50ms responses anywhere in the world."
                  : "エッジで動くインフラ。世界中どこでも 50ms 未満の応答。"}
              </p>
            </div>
            <div className="mt-6 flex items-end gap-2">
              <span className="text-5xl font-semibold tracking-tight">42</span>
              <span className="pb-1.5 text-sm text-muted-foreground">
                {en ? "ms median" : "ms 中央値"}
              </span>
            </div>
          </div>
        </div>

        {/* Supporting row */}
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          {supporting.map((s) => (
            <div key={s.titleJa} className="rounded-2xl border bg-card p-6">
              <span
                className={cn(
                  "grid size-9 place-items-center rounded-lg",
                  s.accent
                )}
              >
                <s.icon className="size-5" />
              </span>
              <h3 className="mt-4 text-base font-semibold tracking-tight">
                {en ? s.titleEn : s.titleJa}
              </h3>
              <p className="mt-1.5 text-sm text-muted-foreground">
                {en ? s.bodyEn : s.bodyJa}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
