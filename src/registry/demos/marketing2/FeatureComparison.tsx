import { Check, X, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "機能比較（他社 vs 自社）",
  category: "マーケティング",
  description:
    "他社と自社を機能ごとに対比し、優位性を視覚的に強調する比較ブロック。",
  align: "full",
  isNew: true,
  tags: ["marketing", "comparison"],
  principle:
    "並列比較は『差分』を際立たせる。自社列だけを強調配色にすることで、優位性を一目で認識させる。",
};

type CellValue = boolean | { ja: string; en: string };

type Row = {
  ja: string;
  en: string;
  others: CellValue;
  us: CellValue;
};

const ROWS: Row[] = [
  {
    ja: "セットアップ時間",
    en: "Setup time",
    others: { ja: "数週間", en: "Weeks" },
    us: { ja: "5分", en: "5 minutes" },
  },
  { ja: "無制限のワークスペース", en: "Unlimited workspaces", others: false, us: true },
  { ja: "リアルタイム共同編集", en: "Real-time collaboration", others: false, us: true },
  { ja: "AIによる自動最適化", en: "AI-powered optimization", others: false, us: true },
  { ja: "従量課金の隠れコスト", en: "Hidden usage-based fees", others: true, us: false },
  {
    ja: "24時間サポート",
    en: "24/7 support",
    others: { ja: "メールのみ", en: "Email only" },
    us: { ja: "チャット即応", en: "Instant chat" },
  },
  { ja: "オンボーディング支援", en: "Onboarding assistance", others: false, us: true },
];

function Cell({ value, accent }: { value: CellValue; accent?: boolean }) {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  if (typeof value !== "boolean") {
    return (
      <span
        className={cn(
          "text-sm",
          accent ? "font-medium text-foreground" : "text-muted-foreground"
        )}
      >
        {en ? value.en : value.ja}
      </span>
    );
  }
  return value ? (
    <span
      className={cn(
        "flex size-6 items-center justify-center rounded-full",
        accent
          ? "bg-emerald-500/15 text-emerald-500"
          : "bg-muted text-muted-foreground"
      )}
    >
      <Check className="size-3.5" strokeWidth={3} />
    </span>
  ) : (
    <span className="flex size-6 items-center justify-center rounded-full bg-muted/60 text-muted-foreground/60">
      <X className="size-3.5" strokeWidth={3} />
    </span>
  );
}

export default function FeatureComparison() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <section className="w-full px-6 py-12">
      <div className="mx-auto max-w-4xl">
        <div className="text-center">
          <Badge variant="secondary" className="rounded-full px-3 py-1">
            {en ? "Why teams choose us" : "なぜ選ばれるのか"}
          </Badge>
          <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
            {en
              ? "The difference is clear"
              : "他社との違いは、はっきりしています"}
          </h2>
          <p className="mx-auto mt-3 max-w-md text-pretty text-muted-foreground">
            {en
              ? "At the same price point, here's how much more you can do."
              : "同じ価格帯で、できることがこれだけ変わります。"}
          </p>
        </div>

        <div className="mt-10 overflow-hidden rounded-2xl border bg-card">
          <div className="grid grid-cols-[1.4fr_1fr_1fr] items-center border-b bg-muted/30 px-4 py-4 sm:px-6">
            <span className="text-sm font-medium text-muted-foreground">
              {en ? "Feature" : "機能"}
            </span>
            <span className="text-center text-sm font-medium text-muted-foreground">
              {en ? "Typical others" : "一般的な他社"}
            </span>
            <span className="flex items-center justify-center gap-1.5 text-center text-sm font-semibold text-primary">
              <Sparkles className="size-3.5" />
              {en ? "Us" : "自社"}
            </span>
          </div>

          {ROWS.map((row, i) => (
            <div
              key={row.ja}
              className={cn(
                "grid grid-cols-[1.4fr_1fr_1fr] items-center px-4 py-3.5 sm:px-6",
                i !== ROWS.length - 1 && "border-b"
              )}
            >
              <span className="pr-2 text-sm">{en ? row.en : row.ja}</span>
              <div className="flex justify-center">
                <Cell value={row.others} />
              </div>
              <div className="flex justify-center rounded-lg bg-primary/[0.04] py-1">
                <Cell value={row.us} accent />
              </div>
            </div>
          ))}
        </div>

        <p className="mt-4 text-center text-xs text-muted-foreground">
          {en
            ? "Comparison based on publicly available information as of June 2026."
            : "比較は2026年6月時点の公開情報に基づきます。"}
        </p>
      </div>
    </section>
  );
}
