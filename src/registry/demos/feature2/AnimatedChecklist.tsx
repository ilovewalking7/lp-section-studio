import { useEffect, useRef, useState } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "アニメーション・チェックリスト",
  category: "マーケティング",
  description:
    "ビューポートに入るとチェックマークがSVGストロークで順に描かれ、項目が点灯するリスト。",
  align: "full",
  isNew: true,
  tags: ["feature", "bento", "animation"],
};

const ITEMS = [
  {
    title: "セットアップ不要",
    titleEn: "No setup required",
    body: "アカウント作成後すぐに使い始められます。",
    bodyEn: "Start using it the moment you create an account.",
  },
  {
    title: "無制限のプロジェクト",
    titleEn: "Unlimited projects",
    body: "数の制限を気にせず作業できます。",
    bodyEn: "Work without worrying about any limits.",
  },
  {
    title: "リアルタイム共同編集",
    titleEn: "Real-time collaboration",
    body: "チーム全員が同時に編集可能。",
    bodyEn: "Your whole team can edit at the same time.",
  },
  {
    title: "自動バックアップ",
    titleEn: "Automatic backups",
    body: "変更は常に安全に保存されます。",
    bodyEn: "Every change is always saved safely.",
  },
  {
    title: "24時間サポート",
    titleEn: "24/7 support",
    body: "困ったときはいつでも相談できます。",
    bodyEn: "Reach out for help any time you're stuck.",
  },
];

export default function AnimatedChecklist() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const ref = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          ITEMS.forEach((_, i) =>
            setTimeout(() => setCount((c) => Math.max(c, i + 1)), i * 240)
          );
          obs.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="w-full px-6 py-16">
      <style>{`
        @keyframes acl-check { to { stroke-dashoffset: 0; } }
      `}</style>
      <div ref={ref} className="mx-auto max-w-2xl">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            {en ? "Everything, right from the start." : "すべて、はじめから揃っている。"}
          </h2>
          <p className="mx-auto mt-3 max-w-md text-pretty text-muted-foreground">
            {en
              ? "No extra fees, no fiddly setup. Everything you need is included."
              : "追加料金も、面倒な設定もなし。必要なものは全部込みです。"}
          </p>
        </div>

        <ul className="space-y-3">
          {ITEMS.map((it, i) => {
            const active = i < count;
            return (
              <li
                key={it.title}
                className={cn(
                  "flex items-start gap-4 rounded-2xl border p-4 transition-all duration-500",
                  active
                    ? "translate-x-0 border-primary/20 bg-card opacity-100"
                    : "-translate-x-2 bg-card/60 opacity-50"
                )}
              >
                <span
                  className={cn(
                    "mt-0.5 inline-flex size-7 shrink-0 items-center justify-center rounded-full transition-colors duration-300",
                    active ? "bg-emerald-500 text-white" : "border bg-background"
                  )}
                >
                  {active ? (
                    <svg viewBox="0 0 24 24" className="size-4" fill="none">
                      <path
                        d="M5 12.5l4.2 4.2L19 7"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        style={{
                          strokeDasharray: 30,
                          strokeDashoffset: 30,
                          animation: "acl-check .4s ease-out forwards",
                        }}
                      />
                    </svg>
                  ) : (
                    <Check className="size-4 text-muted-foreground/40" />
                  )}
                </span>
                <div>
                  <p className="font-medium tracking-tight">{en ? it.titleEn : it.title}</p>
                  <p className="mt-0.5 text-sm text-muted-foreground">{en ? it.bodyEn : it.body}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
