import { useEffect, useState } from "react";
import { Check, Loader2 } from "lucide-react";
import type { DemoMeta } from "@/registry";
import { cn } from "@/lib/utils";

export const meta: DemoMeta = {
  name: "ステップローダー",
  category: "ローダー・マイクロ",
  description: "自動で進行しループする多段ステップ進捗インジケータ。",
  align: "center",
  isNew: true,
  tags: ["loader", "animation", "micro", "steps"],
};

const STEPS = [
  { ja: "接続中", en: "Connecting" },
  { ja: "認証", en: "Authenticating" },
  { ja: "データ取得", en: "Fetching data" },
  { ja: "完了", en: "Done" },
];

export default function StepLoader() {
  const en = typeof document !== "undefined" && document.documentElement.lang === "en";
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setActive((a) => (a >= STEPS.length ? 0 : a + 1));
    }, 1100);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="w-full max-w-sm">
      <div className="flex items-start">
        {STEPS.map((step, i) => {
          const done = i < active;
          const current = i === active;
          return (
            <div key={step.ja} className="flex flex-1 flex-col items-center">
              <div className="flex w-full items-center">
                {i > 0 && (
                  <div className="h-0.5 flex-1 overflow-hidden rounded bg-muted">
                    <div
                      className="h-full rounded bg-primary transition-all duration-500 ease-out"
                      style={{ width: i <= active ? "100%" : "0%" }}
                    />
                  </div>
                )}
                <div
                  className={cn(
                    "flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 transition-colors duration-300",
                    done && "border-primary bg-primary text-primary-foreground",
                    current && "border-primary bg-card text-primary",
                    !done && !current && "border-muted bg-card text-muted-foreground",
                  )}
                >
                  {done ? (
                    <Check className="h-4 w-4" />
                  ) : current ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <span className="text-xs font-semibold">{i + 1}</span>
                  )}
                </div>
                {i < STEPS.length - 1 && (
                  <div className="h-0.5 flex-1 overflow-hidden rounded bg-muted">
                    <div
                      className="h-full rounded bg-primary transition-all duration-500 ease-out"
                      style={{ width: i < active ? "100%" : "0%" }}
                    />
                  </div>
                )}
              </div>
              <span
                className={cn(
                  "mt-2 text-[11px] font-medium transition-colors",
                  i <= active ? "text-foreground" : "text-muted-foreground",
                )}
              >
                {en ? step.en : step.ja}
              </span>
            </div>
          );
        })}
      </div>

      <p className="mt-6 text-center text-xs text-muted-foreground">
        {active >= STEPS.length
          ? en
            ? "All done — restarting soon"
            : "すべて完了 — まもなくリスタート"
          : `${en ? STEPS[active].en : STEPS[active].ja}…`}
      </p>
    </div>
  );
}
