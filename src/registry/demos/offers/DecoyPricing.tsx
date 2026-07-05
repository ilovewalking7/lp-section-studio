import { useState } from "react";
import { Check, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "デコイ価格設定",
  category: "価格・オファー",
  description:
    "あえて割高な「おとり」を挟むことで、本命プランを明らかに最良の選択に見せる3択。",
  align: "full",
  level: "advanced",
  isNew: true,
  tags: ["pricing", "decoy", "psychology"],
  principle:
    "デコイ効果（おとり効果）。中位の不利なプランを基準点にすることで、上位プランの割安感が際立ち、本命への選択が誘導される。",
};

type Plan = {
  id: string;
  name: string;
  nameEn: string;
  price: number;
  unit: string;
  unitEn: string;
  perks: string[];
  perksEn: string[];
  decoy?: boolean;
  target?: boolean;
  note?: string;
  noteEn?: string;
};

const PLANS: Plan[] = [
  {
    id: "digital",
    name: "デジタル版",
    nameEn: "Digital",
    price: 600,
    unit: "/ 月",
    unitEn: "/ mo",
    perks: ["Web記事 読み放題", "アプリ閲覧"],
    perksEn: ["Unlimited web articles", "App access"],
  },
  {
    id: "print",
    name: "印刷版",
    nameEn: "Print",
    price: 1200,
    unit: "/ 月",
    unitEn: "/ mo",
    perks: ["紙の冊子を毎月配送", "Web記事は対象外"],
    perksEn: ["Printed issue delivered monthly", "No web articles"],
    decoy: true,
    note: "おとり",
    noteEn: "Decoy",
  },
  {
    id: "bundle",
    name: "デジタル＋印刷",
    nameEn: "Digital + Print",
    price: 1200,
    unit: "/ 月",
    unitEn: "/ mo",
    perks: ["Web記事 読み放題", "アプリ閲覧", "紙の冊子も毎月配送"],
    perksEn: ["Unlimited web articles", "App access", "Printed issue delivered monthly"],
    target: true,
    note: "本命",
    noteEn: "Best pick",
  },
];

function yen(n: number) {
  return "¥" + n.toLocaleString("ja-JP");
}

export default function DecoyPricing() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const [selected, setSelected] = useState("bundle");

  return (
    <div className="w-full space-y-5">
      <div className="space-y-1 text-center">
        <h3 className="text-2xl font-bold tracking-tight">{en ? "Choose your subscription" : "購読プランを選ぶ"}</h3>
        <p className="text-sm text-muted-foreground">
          {en
            ? "At the same price, getting both is clearly the better deal."
            : "同じ価格なら、両方もらえる方が断然お得です。"}
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {PLANS.map((p) => {
          const active = selected === p.id;
          return (
            <Card
              key={p.id}
              role="button"
              tabIndex={0}
              onClick={() => setSelected(p.id)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setSelected(p.id);
                }
              }}
              className={cn(
                "relative flex cursor-pointer flex-col transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                active && "ring-2 ring-primary",
                p.target && "border-primary shadow-md",
                p.decoy && "opacity-80"
              )}
            >
              {p.target && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge>{en ? "Best value" : "ベストバリュー"}</Badge>
                </div>
              )}
              <CardContent className="flex flex-1 flex-col gap-4 p-5">
                <div className="flex items-center justify-between">
                  <span className="font-semibold">{en ? p.nameEn : p.name}</span>
                  {p.note && (
                    <span
                      className={cn(
                        "rounded-full px-2 py-0.5 text-[10px] font-medium",
                        p.decoy
                          ? "bg-muted text-muted-foreground"
                          : "bg-primary/10 text-primary"
                      )}
                    >
                      {en ? p.noteEn : p.note}
                    </span>
                  )}
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold tracking-tight">
                    {yen(p.price)}
                  </span>
                  <span className="text-sm text-muted-foreground">{en ? p.unitEn : p.unit}</span>
                </div>
                <ul className="flex-1 space-y-2 text-sm">
                  {(en ? p.perksEn : p.perks).map((perk) => (
                    <li key={perk} className="flex items-start gap-2">
                      <Check
                        className={cn(
                          "mt-0.5 size-4 shrink-0",
                          p.decoy ? "text-muted-foreground/50" : "text-emerald-500"
                        )}
                      />
                      <span className={cn(p.decoy && "text-muted-foreground")}>
                        {perk}
                      </span>
                    </li>
                  ))}
                </ul>
                <Button
                  variant={active ? "default" : "outline"}
                  className="w-full"
                >
                  {active ? (
                    <>
                      {en ? "Selected" : "選択中"} <Check className="size-4" />
                    </>
                  ) : (
                    en ? "Choose this" : "これにする"
                  )}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <p className="flex items-center justify-center gap-1.5 text-center text-xs text-muted-foreground">
        {en ? "Same price as print" : "印刷版と同額"}
        <ArrowRight className="size-3.5" />
        {en ? "yet you also get digital — the rational best pick" : "なのにデジタルも付く「本命」が合理的に最良"}
      </p>
    </div>
  );
}
