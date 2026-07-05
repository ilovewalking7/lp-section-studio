import { CreditCard, Headphones, RefreshCw, ShieldCheck } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "信頼バッジ列",
  category: "コンバージョン",
  description:
    "SSL・返金保証・30日無料・24時間対応などの安心バッジを並べた帯。",
  align: "full",
  level: "advanced",
  isNew: true,
  tags: ["trust", "authority", "badges"],
  principle:
    "第三者保証や安全性の象徴を並べる権威の原理が、決済直前の知覚リスクを下げて安心感を与え、カート離脱を抑える。",
};

type Badge = {
  icon: LucideIcon;
  titleJa: string;
  titleEn: string;
  subJa: string;
  subEn: string;
  accent: string;
};

const BADGES: Badge[] = [
  {
    icon: ShieldCheck,
    titleJa: "SSL 暗号化通信",
    titleEn: "SSL Encrypted",
    subJa: "256-bit セキュア決済",
    subEn: "256-bit secure checkout",
    accent: "text-emerald-500 bg-emerald-500/10",
  },
  {
    icon: RefreshCw,
    titleJa: "30日返金保証",
    titleEn: "30-Day Refund",
    subJa: "理由を問わず全額返金",
    subEn: "Full refund, no questions",
    accent: "text-sky-500 bg-sky-500/10",
  },
  {
    icon: CreditCard,
    titleJa: "カード不要トライアル",
    titleEn: "No-Card Trial",
    subJa: "30日間すべて無料",
    subEn: "Everything free for 30 days",
    accent: "text-violet-500 bg-violet-500/10",
  },
  {
    icon: Headphones,
    titleJa: "24時間サポート",
    titleEn: "24-Hour Support",
    subJa: "日本語で365日対応",
    subEn: "Available 365 days a year",
    accent: "text-amber-500 bg-amber-500/10",
  },
];

export default function TrustBadges() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <section className="w-full px-6 py-10">
      <div className="mx-auto max-w-5xl">
        <p className="mb-5 text-center text-xs font-medium uppercase tracking-widest text-muted-foreground">
          {en ? "Shop with confidence" : "安心してご利用いただけます"}
        </p>
        <div className="grid grid-cols-1 gap-3 rounded-2xl border bg-card p-3 sm:grid-cols-2 lg:grid-cols-4">
          {BADGES.map((b) => (
            <div
              key={b.titleJa}
              className="flex items-center gap-3 rounded-xl px-3 py-3 transition-colors hover:bg-muted/50"
            >
              <span
                className={`grid size-11 shrink-0 place-items-center rounded-xl ${b.accent}`}
              >
                <b.icon className="size-5" />
              </span>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold">
                  {en ? b.titleEn : b.titleJa}
                </p>
                <p className="truncate text-xs text-muted-foreground">
                  {en ? b.subEn : b.subJa}
                </p>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-4 text-center text-xs text-muted-foreground">
          {en ? (
            <>
              Trusted by{" "}
              <span className="font-semibold text-foreground">12,400+</span>{" "}
              companies. Average rating{" "}
              <span className="font-semibold text-foreground">4.9 / 5.0</span>
            </>
          ) : (
            <>
              すでに{" "}
              <span className="font-semibold text-foreground">12,400社</span>{" "}
              以上が導入。平均満足度{" "}
              <span className="font-semibold text-foreground">4.9 / 5.0</span>
            </>
          )}
        </p>
      </div>
    </section>
  );
}
