import { useState } from "react";
import { Check, Minus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "比較マトリクス",
  category: "価格・オファー",
  description: "ホバーで列がハイライトされる機能比較表。",
  align: "full",
  isNew: true,
  tags: ["pricing", "animation"],
};

const cols = [
  { ja: "フリー", en: "Free" },
  { ja: "プロ", en: "Pro" },
  { ja: "ビジネス", en: "Business" },
] as const;
const prices = ["¥0", "¥2,480", "¥6,800"];
const UNLIMITED = { ja: "無制限", en: "Unlimited" };
const rows: { label: { ja: string; en: string }; vals: (boolean | { ja: string; en: string })[] }[] = [
  { label: { ja: "プロジェクト数", en: "Projects" }, vals: [{ ja: "3", en: "3" }, UNLIMITED, UNLIMITED] },
  { label: { ja: "メンバー", en: "Members" }, vals: [{ ja: "1", en: "1" }, { ja: "10", en: "10" }, UNLIMITED] },
  { label: { ja: "分析ダッシュボード", en: "Analytics dashboard" }, vals: [false, true, true] },
  { label: { ja: "優先サポート", en: "Priority support" }, vals: [false, true, true] },
  { label: { ja: "SSO / SAML", en: "SSO / SAML" }, vals: [false, false, true] },
  { label: { ja: "監査ログ", en: "Audit logs" }, vals: [false, false, true] },
];

function Cell({ v }: { v: boolean | { ja: string; en: string } }) {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  if (typeof v === "object")
    return <span className="font-medium text-foreground">{en ? v.en : v.ja}</span>;
  return v ? (
    <Check className="mx-auto size-5 text-primary" />
  ) : (
    <Minus className="mx-auto size-5 text-muted-foreground/40" />
  );
}

export default function ComparisonMatrix() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const [hi, setHi] = useState(1);
  return (
    <div className="w-full bg-background px-4 py-16">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          {en ? "Compare plans" : "プランを比較"}
        </h2>
        <p className="mt-3 text-muted-foreground">{en ? "Pick only the features you need." : "必要な機能だけを選びましょう。"}</p>
      </div>
      <div className="mx-auto mt-12 max-w-4xl overflow-x-auto rounded-2xl border border-border bg-card">
        <table className="w-full min-w-[560px] border-collapse text-sm">
          <thead>
            <tr>
              <td className="p-5 text-left" />
              {cols.map((c, i) => (
                <th
                  key={c.ja}
                  onMouseEnter={() => setHi(i)}
                  className={cn(
                    "p-5 text-center transition-colors",
                    hi === i ? "bg-primary/5" : ""
                  )}
                >
                  <div className="text-base font-semibold text-foreground">{en ? c.en : c.ja}</div>
                  <div className="mt-1 text-2xl font-bold text-foreground">{prices[i]}</div>
                  <div className="text-xs text-muted-foreground">{en ? "/mo" : "/ 月"}</div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.label.ja} className="border-t border-border">
                <td className="p-4 text-left font-medium text-foreground/90">{en ? r.label.en : r.label.ja}</td>
                {r.vals.map((v, i) => (
                  <td
                    key={i}
                    onMouseEnter={() => setHi(i)}
                    className={cn(
                      "p-4 text-center transition-colors",
                      hi === i ? "bg-primary/5" : ""
                    )}
                  >
                    <Cell v={v} />
                  </td>
                ))}
              </tr>
            ))}
            <tr className="border-t border-border">
              <td className="p-4" />
              {cols.map((c, i) => (
                <td
                  key={c.ja}
                  onMouseEnter={() => setHi(i)}
                  className={cn("p-4 text-center", hi === i ? "bg-primary/5" : "")}
                >
                  <Button size="sm" variant={i === 1 ? "default" : "outline"}>
                    {en ? "Choose" : "選ぶ"}
                  </Button>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
