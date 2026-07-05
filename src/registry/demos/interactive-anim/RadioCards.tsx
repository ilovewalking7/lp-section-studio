import { useState } from "react";
import { Check, Rocket, Sparkles, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "ラジオカード",
  category: "インタラクション",
  description: "選択リングとチェックマークがアニメーションする選択式カード。",
  align: "center",
  isNew: true,
  tags: ["interaction", "animation", "radio"],
};

const PLANS = [
  { id: "starter", icon: Sparkles, name: "Starter", price: "¥0", desc: "個人の試用に最適", descEn: "Great for personal trials" },
  { id: "pro", icon: Zap, name: "Pro", price: "¥1,980", desc: "成長中のチーム向け", descEn: "For growing teams" },
  { id: "scale", icon: Rocket, name: "Scale", price: "¥4,980", desc: "大規模運用に対応", descEn: "Built for large-scale ops" },
] as const;

export default function RadioCards() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const [selected, setSelected] = useState("pro");

  return (
    <div
      role="radiogroup"
      aria-label={en ? "Select a plan" : "プランを選択"}
      className="grid w-full max-w-md gap-3 sm:grid-cols-3"
    >
      {PLANS.map((plan) => {
        const active = selected === plan.id;
        return (
          <button
            key={plan.id}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => setSelected(plan.id)}
            className={cn(
              "relative overflow-hidden rounded-xl border-2 p-4 text-left transition-all duration-200",
              active
                ? "border-primary bg-primary/5 shadow-md"
                : "border-border bg-card hover:border-primary/40 hover:shadow-sm"
            )}
          >
            <div
              className={cn(
                "absolute right-3 top-3 flex size-5 items-center justify-center rounded-full bg-primary text-primary-foreground transition-all duration-300 ease-[cubic-bezier(0.34,1.8,0.64,1)]",
                active ? "scale-100 opacity-100" : "scale-0 opacity-0"
              )}
            >
              <Check className="size-3.5" strokeWidth={3} />
            </div>
            <plan.icon
              className={cn(
                "size-5 transition-colors",
                active ? "text-primary" : "text-muted-foreground"
              )}
            />
            <div className="mt-3 font-semibold">{plan.name}</div>
            <div className="text-lg font-bold tracking-tight">{plan.price}</div>
            <div className="mt-0.5 text-xs text-muted-foreground">{en ? plan.descEn : plan.desc}</div>
          </button>
        );
      })}
    </div>
  );
}
