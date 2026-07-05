import { useEffect, useRef, useState } from "react";
import { Globe, Mail, Search, Share2, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "トラフィックソース",
  category: "ダッシュボード",
  description: "横棒が伸びる流入チャネル別トラフィック内訳。",
  align: "full",
  isNew: true,
  tags: ["dashboard", "animation"],
};

const SOURCES = [
  { label: "オーガニック検索", en: "Organic search", icon: Search, value: 8420, color: "bg-violet-500" },
  { label: "ダイレクト", en: "Direct", icon: Globe, value: 5210, color: "bg-sky-500" },
  { label: "ソーシャル", en: "Social", icon: Share2, value: 3640, color: "bg-emerald-500" },
  { label: "リファラル", en: "Referral", icon: Users, value: 2180, color: "bg-amber-500" },
  { label: "メール", en: "Email", icon: Mail, value: 1240, color: "bg-rose-500" },
];

export default function TrafficSources() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const ref = useRef<HTMLDivElement>(null);
  const [run, setRun] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => e.isIntersecting && setRun(true),
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const total = SOURCES.reduce((s, x) => s + x.value, 0);
  const max = Math.max(...SOURCES.map((s) => s.value));

  return (
    <div ref={ref} className="w-full rounded-2xl border bg-card p-5 text-card-foreground">
      <div className="mb-4 flex items-baseline justify-between">
        <h3 className="text-sm font-semibold">
          {en ? "Traffic sources" : "トラフィックソース"}
        </h3>
        <span className="text-xs tabular-nums text-muted-foreground">
          {en
            ? `${total.toLocaleString("en-US")} sessions total`
            : `計 ${total.toLocaleString("en-US")} セッション`}
        </span>
      </div>
      <ul className="space-y-3.5">
        {SOURCES.map((s, i) => {
          const Icon = s.icon;
          const pct = ((s.value / total) * 100).toFixed(1);
          return (
            <li key={s.label}>
              <div className="mb-1.5 flex items-center gap-2 text-sm">
                <Icon className="size-4 text-muted-foreground" />
                <span className="font-medium">{en ? s.en : s.label}</span>
                <span className="ml-auto tabular-nums text-muted-foreground">{pct}%</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-muted">
                <div
                  className={cn("h-full rounded-full", s.color)}
                  style={{
                    width: run ? `${(s.value / max) * 100}%` : "0%",
                    transition: "width 800ms ease-out",
                    transitionDelay: `${i * 90}ms`,
                  }}
                />
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
