import { useEffect, useRef, useState } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "チェックがstaggerする料金",
  category: "価格・オファー",
  description: "表示時にチェック項目が順番に立ち上がる料金カード。",
  align: "full",
  isNew: true,
  tags: ["pricing", "animation"],
};

const feats = [
  { ja: "無制限プロジェクト", en: "Unlimited projects" },
  { ja: "リアルタイム同期", en: "Real-time sync" },
  { ja: "チームコラボレーション", en: "Team collaboration" },
  { ja: "バージョン履歴", en: "Version history" },
  { ja: "高度な分析", en: "Advanced analytics" },
  { ja: "優先サポート", en: "Priority support" },
  { ja: "カスタムドメイン", en: "Custom domain" },
];

export default function AnimatedFeatureList() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShow(true);
          io.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div className="w-full bg-background px-4 py-16">
      <style>{`
        @keyframes afl-in { from{ opacity:0; transform:translateY(8px); } to{ opacity:1; transform:translateY(0); } }
        @keyframes afl-pop { 0%{ transform:scale(.3); } 60%{ transform:scale(1.15); } 100%{ transform:scale(1); } }
      `}</style>
      <div ref={ref} className="mx-auto max-w-md">
        <div className="rounded-2xl border border-border bg-card p-8 shadow-lg">
          <h3 className="text-lg font-semibold text-foreground">{en ? "Pro plan" : "プロプラン"}</h3>
          <div className="mt-3 flex items-baseline gap-1">
            <span className="text-4xl font-bold text-foreground">¥2,980</span>
            <span className="text-sm text-muted-foreground">{en ? "/mo" : "/ 月"}</span>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">{en ? "Everything you need to build for real." : "本気で作る人のためのすべて。"}</p>
          <ul className="mt-7 space-y-3 text-sm">
            {feats.map((f, i) => (
              <li
                key={f.ja}
                className={cn(
                  "flex items-center gap-3 text-foreground/90",
                  show ? "opacity-100" : "opacity-0"
                )}
                style={
                  show
                    ? {
                        animation: `afl-in .4s ease both`,
                        animationDelay: `${i * 90}ms`,
                      }
                    : undefined
                }
              >
                <span
                  className="flex size-5 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground"
                  style={
                    show
                      ? { animation: `afl-pop .4s ease both`, animationDelay: `${i * 90 + 80}ms` }
                      : undefined
                  }
                >
                  <Check className="size-3" />
                </span>
                {en ? f.en : f.ja}
              </li>
            ))}
          </ul>
          <Button className="mt-8 w-full">{en ? "Start 14-day free trial" : "14日間 無料で試す"}</Button>
        </div>
      </div>
    </div>
  );
}
