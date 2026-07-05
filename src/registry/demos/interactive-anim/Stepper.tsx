import { useState } from "react";
import { Check, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "ステッパー",
  category: "インタラクション",
  description: "コネクターが伸び、完了時にチェックへ切り替わる進捗ステッパー。",
  align: "center",
  isNew: true,
  tags: ["interaction", "animation", "stepper"],
};

const STEPS_JA = ["カート", "配送先", "支払い", "完了"] as const;
const STEPS_EN = ["Cart", "Shipping", "Payment", "Done"] as const;

export default function Stepper() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const STEPS = en ? STEPS_EN : STEPS_JA;
  const [current, setCurrent] = useState(1);

  return (
    <div className="w-full max-w-md">
      <div className="flex items-center">
        {STEPS.map((label, i) => {
          const done = i < current;
          const active = i === current;
          return (
            <div key={STEPS_EN[i]} className={cn("flex items-center", i < STEPS.length - 1 && "flex-1")}>
              <div className="flex flex-col items-center gap-2">
                <div
                  className={cn(
                    "relative flex size-9 items-center justify-center rounded-full border-2 text-sm font-semibold transition-all duration-300",
                    done && "border-primary bg-primary text-primary-foreground",
                    active && "border-primary bg-background text-primary ring-4 ring-primary/15",
                    !done && !active && "border-muted-foreground/30 bg-background text-muted-foreground"
                  )}
                >
                  <Check
                    className={cn(
                      "absolute size-4 transition-all duration-300",
                      done ? "scale-100 opacity-100" : "scale-50 opacity-0"
                    )}
                  />
                  <span
                    className={cn(
                      "transition-all duration-200",
                      done ? "scale-50 opacity-0" : "scale-100 opacity-100"
                    )}
                  >
                    {i + 1}
                  </span>
                </div>
                <span
                  className={cn(
                    "absolute mt-11 whitespace-nowrap text-xs font-medium transition-colors",
                    active || done ? "text-foreground" : "text-muted-foreground"
                  )}
                >
                  {label}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div className="mx-1 h-0.5 flex-1 overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-primary transition-all duration-500 ease-out"
                    style={{ width: done ? "100%" : "0%" }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-12 flex items-center justify-between">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrent((c) => Math.max(0, c - 1))}
          disabled={current === 0}
        >
          <ChevronLeft className="size-4" />
          {en ? "Back" : "戻る"}
        </Button>
        <Button
          size="sm"
          onClick={() => setCurrent((c) => Math.min(STEPS.length - 1, c + 1))}
          disabled={current === STEPS.length - 1}
        >
          {en ? "Next" : "次へ"}
          <ChevronRight className="size-4" />
        </Button>
      </div>
    </div>
  );
}
