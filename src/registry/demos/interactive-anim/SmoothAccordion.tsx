import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "スムーズアコーディオン",
  category: "インタラクション",
  description: "grid-rows 0fr↔1fr で高さを滑らかに開閉し、シェブロンが回転する。",
  align: "center",
  isNew: true,
  tags: ["interaction", "animation", "accordion"],
};

const ITEMS = [
  {
    q: "無料プランには何が含まれますか？",
    qEn: "What's included in the free plan?",
    a: "基本機能のすべてと、月3プロジェクトまでの作成が可能です。クレジットカードは不要です。",
    aEn: "All core features and up to 3 projects per month. No credit card required.",
  },
  {
    q: "いつでも解約できますか？",
    qEn: "Can I cancel anytime?",
    a: "はい。ダッシュボードの設定からワンクリックでいつでも解約でき、違約金は一切かかりません。",
    aEn: "Yes. Cancel anytime in one click from your dashboard settings, with no penalty fees.",
  },
  {
    q: "チームで利用できますか？",
    qEn: "Can I use it with my team?",
    a: "Proプラン以上でメンバー招待・権限管理・共同編集に対応しています。",
    aEn: "Pro and higher support member invites, role management, and collaborative editing.",
  },
] as const;

export default function SmoothAccordion() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="w-full max-w-md space-y-2">
      {ITEMS.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.qEn} className="overflow-hidden rounded-xl border bg-card">
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-3 px-4 py-3.5 text-left text-sm font-medium transition-colors hover:bg-muted/50"
            >
              {en ? item.qEn : item.q}
              <ChevronDown
                className={cn(
                  "size-4 shrink-0 text-muted-foreground transition-transform duration-300",
                  isOpen && "rotate-180 text-primary"
                )}
              />
            </button>
            <div
              className={cn(
                "grid transition-[grid-template-rows] duration-300 ease-out",
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              )}
            >
              <div className="overflow-hidden">
                <p className="px-4 pb-4 text-sm leading-relaxed text-muted-foreground">
                  {en ? item.aEn : item.a}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
