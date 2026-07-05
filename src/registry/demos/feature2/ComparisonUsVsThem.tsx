import { Check, X, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "他社比較テーブル",
  category: "マーケティング",
  description:
    "自社と他社を並べた比較表。自社列がハイライトされ、チェックが順に灯る演出付き。",
  align: "full",
  isNew: true,
  tags: ["feature", "bento", "animation"],
};

const ROWS = [
  {
    id: "setup",
    labelJa: "セットアップ時間",
    labelEn: "Setup time",
    us: { ja: "5分", en: "5 min" },
    them: { ja: "数日", en: "Days" },
  },
  {
    id: "members",
    labelJa: "無制限メンバー",
    labelEn: "Unlimited members",
    us: true,
    them: false,
  },
  {
    id: "sync",
    labelJa: "リアルタイム同期",
    labelEn: "Real-time sync",
    us: true,
    them: true,
  },
  {
    id: "automation",
    labelJa: "高度な自動化",
    labelEn: "Advanced automation",
    us: true,
    them: false,
  },
  {
    id: "support",
    labelJa: "24時間サポート",
    labelEn: "24/7 support",
    us: true,
    them: false,
  },
  {
    id: "cap",
    labelJa: "従量課金の上限",
    labelEn: "Usage cap",
    us: { ja: "なし", en: "None" },
    them: { ja: "あり", en: "Yes" },
  },
];

function Cell({ value }: { value: boolean | { ja: string; en: string } }) {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  if (typeof value === "object")
    return (
      <span className="text-sm font-medium">{en ? value.en : value.ja}</span>
    );
  return value ? (
    <span className="inline-flex size-7 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
      <Check className="size-4" />
    </span>
  ) : (
    <span className="inline-flex size-7 items-center justify-center rounded-full bg-muted text-muted-foreground">
      <X className="size-4" />
    </span>
  );
}

export default function ComparisonUsVsThem() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <section className="w-full px-6 py-16">
      <style>{`
        @keyframes cvt-row {
          from { opacity: 0; transform: translateX(-10px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>
      <div className="mx-auto max-w-3xl">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            {en ? "Why teams choose us." : "なぜ、選ばれるのか。"}
          </h2>
          <p className="mx-auto mt-3 max-w-md text-pretty text-muted-foreground">
            {en
              ? "The difference, made clear with facts and figures."
              : "数字と事実で、違いをはっきりと。"}
          </p>
        </div>

        <div className="overflow-hidden rounded-3xl border bg-card">
          <div className="grid grid-cols-[1.4fr_1fr_1fr] items-center border-b bg-muted/40 px-5 py-4">
            <span className="text-sm font-medium text-muted-foreground">
              {en ? "Feature" : "機能"}
            </span>
            <span className="flex items-center justify-center gap-1.5 text-sm font-semibold">
              <Sparkles className="size-4 text-primary" />
              {en ? "Us" : "自社"}
            </span>
            <span className="text-center text-sm font-medium text-muted-foreground">
              {en ? "Others" : "他社"}
            </span>
          </div>

          {ROWS.map((r, i) => (
            <div
              key={r.id}
              className="grid grid-cols-[1.4fr_1fr_1fr] items-center border-b px-5 py-4 last:border-0"
              style={{ animation: "cvt-row .5s both", animationDelay: `${i * 70}ms` }}
            >
              <span className="text-sm font-medium">
                {en ? r.labelEn : r.labelJa}
              </span>
              <div
                className={cn(
                  "flex justify-center rounded-xl py-2",
                  "bg-primary/5 ring-1 ring-inset ring-primary/15"
                )}
              >
                <Cell value={r.us} />
              </div>
              <div className="flex justify-center">
                <Cell value={r.them} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
