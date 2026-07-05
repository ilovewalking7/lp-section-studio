import { Fragment } from "react";
import { Check, Minus, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "プラン比較マトリクス",
  category: "価格・オファー",
  description:
    "3プランの機能をチェック/ダッシュで比較。固定ヘッダーとおすすめ列のハイライト付き。",
  align: "full",
  level: "advanced",
  isNew: true,
  tags: ["pricing", "comparison", "matrix"],
  principle:
    "選択のパラドックス回避。機能差を一目で可視化し、おすすめ列を強調することで認知負荷を下げ、迷いによる離脱を防ぐ。",
};

type Cell = boolean | string;

const PLANS = ["Starter", "Pro", "Enterprise"] as const;
const RECOMMENDED = 1; // Pro

const PRICES = ["¥980", "¥4,800", "お問い合わせ"];
const PRICES_EN = ["$9", "$48", "Contact us"];

const GROUPS: {
  group: string;
  groupEn: string;
  rows: { label: string; labelEn: string; cells: Cell[]; cellsEn: Cell[] }[];
}[] = [
  {
    group: "基本機能",
    groupEn: "Core features",
    rows: [
      { label: "プロジェクト数", labelEn: "Projects", cells: ["3", "無制限", "無制限"], cellsEn: ["3", "Unlimited", "Unlimited"] },
      { label: "メンバー", labelEn: "Members", cells: ["1", "10", "無制限"], cellsEn: ["1", "10", "Unlimited"] },
      { label: "ストレージ", labelEn: "Storage", cells: ["5GB", "200GB", "1TB+"], cellsEn: ["5GB", "200GB", "1TB+"] },
    ],
  },
  {
    group: "コラボレーション",
    groupEn: "Collaboration",
    rows: [
      { label: "共同編集", labelEn: "Real-time editing", cells: [false, true, true], cellsEn: [false, true, true] },
      { label: "コメント / レビュー", labelEn: "Comments / reviews", cells: [false, true, true], cellsEn: [false, true, true] },
      { label: "バージョン履歴", labelEn: "Version history", cells: ["7日", "90日", "無期限"], cellsEn: ["7 days", "90 days", "Unlimited"] },
    ],
  },
  {
    group: "セキュリティ・運用",
    groupEn: "Security & operations",
    rows: [
      { label: "SSO / SAML", labelEn: "SSO / SAML", cells: [false, false, true], cellsEn: [false, false, true] },
      { label: "監査ログ", labelEn: "Audit logs", cells: [false, false, true], cellsEn: [false, false, true] },
      { label: "SLA 保証", labelEn: "SLA guarantee", cells: [false, false, "99.99%"], cellsEn: [false, false, "99.99%"] },
      { label: "専任サポート", labelEn: "Dedicated support", cells: [false, true, true], cellsEn: [false, true, true] },
    ],
  },
];

function CellView({ value, highlight }: { value: Cell; highlight: boolean }) {
  if (value === true)
    return (
      <Check
        className={cn(
          "mx-auto size-4",
          highlight ? "text-primary" : "text-emerald-500"
        )}
      />
    );
  if (value === false)
    return <Minus className="mx-auto size-4 text-muted-foreground/40" />;
  return (
    <span
      className={cn(
        "text-sm",
        highlight ? "font-semibold text-foreground" : "text-foreground/80"
      )}
    >
      {value}
    </span>
  );
}

export default function ComparisonMatrix() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <div className="w-full overflow-hidden rounded-xl border bg-card">
      <div className="max-h-[34rem] overflow-auto">
        <table className="w-full border-collapse text-left">
          <thead className="sticky top-0 z-10">
            <tr className="bg-card/95 backdrop-blur">
              <th className="w-1/3 p-4 align-bottom text-sm font-medium text-muted-foreground">
                {en ? "Feature" : "機能"}
              </th>
              {PLANS.map((plan, i) => (
                <th
                  key={plan}
                  className={cn(
                    "p-4 text-center align-bottom",
                    i === RECOMMENDED && "bg-primary/5"
                  )}
                >
                  <div className="flex flex-col items-center gap-1.5">
                    {i === RECOMMENDED && (
                      <Badge className="gap-1">
                        <Sparkles className="size-3" /> {en ? "Recommended" : "おすすめ"}
                      </Badge>
                    )}
                    <span className="text-base font-semibold">{plan}</span>
                    <span
                      className={cn(
                        "text-sm",
                        i === RECOMMENDED
                          ? "font-semibold text-primary"
                          : "text-muted-foreground"
                      )}
                    >
                      {en ? PRICES_EN[i] : PRICES[i]}
                    </span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {GROUPS.map((g) => (
              <Fragment key={g.groupEn}>
                <tr className="bg-muted/40">
                  <td
                    colSpan={PLANS.length + 1}
                    className="px-4 py-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground"
                  >
                    {en ? g.groupEn : g.group}
                  </td>
                </tr>
                {g.rows.map((row) => (
                  <tr
                    key={row.labelEn}
                    className="border-t border-border/60 transition-colors hover:bg-muted/30"
                  >
                    <td className="p-4 text-sm font-medium">{en ? row.labelEn : row.label}</td>
                    {(en ? row.cellsEn : row.cells).map((cell, i) => (
                      <td
                        key={i}
                        className={cn(
                          "p-4 text-center",
                          i === RECOMMENDED && "bg-primary/5"
                        )}
                      >
                        <CellView value={cell} highlight={i === RECOMMENDED} />
                      </td>
                    ))}
                  </tr>
                ))}
              </Fragment>
            ))}
          </tbody>
          <tfoot>
            <tr className="border-t bg-card">
              <td className="p-4" />
              {PLANS.map((plan, i) => (
                <td
                  key={plan}
                  className={cn("p-4", i === RECOMMENDED && "bg-primary/5")}
                >
                  <Button
                    className="w-full"
                    variant={i === RECOMMENDED ? "default" : "outline"}
                  >
                    {i === PLANS.length - 1 ? (en ? "Contact us" : "相談する") : (en ? "Choose" : "選ぶ")}
                  </Button>
                </td>
              ))}
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}
