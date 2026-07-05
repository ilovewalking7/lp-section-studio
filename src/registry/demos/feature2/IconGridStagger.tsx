import { useEffect, useRef, useState } from "react";
import {
  Bell,
  Calendar,
  ChartPie,
  Code2,
  Database,
  Fingerprint,
  GitBranch,
  Mail,
  Palette,
  Search,
  Settings2,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "スタッガー登場アイコン格子",
  category: "マーケティング",
  description:
    "12個の機能アイコンが時間差で次々に立ち上がる。ホバーでアイコンが弾む小気味よいグリッド。",
  align: "full",
  isNew: true,
  tags: ["feature", "bento", "animation"],
};

const ITEMS = [
  { icon: Search, label: "全文検索", labelEn: "Full-text search" },
  { icon: Bell, label: "通知", labelEn: "Notifications" },
  { icon: Calendar, label: "予定管理", labelEn: "Scheduling" },
  { icon: Mail, label: "メール連携", labelEn: "Email sync" },
  { icon: Users, label: "チーム共有", labelEn: "Team sharing" },
  { icon: Database, label: "データ保管", labelEn: "Data storage" },
  { icon: ChartPie, label: "分析", labelEn: "Analytics" },
  { icon: Code2, label: "API", labelEn: "API" },
  { icon: GitBranch, label: "バージョン管理", labelEn: "Version control" },
  { icon: Palette, label: "テーマ", labelEn: "Themes" },
  { icon: Fingerprint, label: "認証", labelEn: "Authentication" },
  { icon: Settings2, label: "詳細設定", labelEn: "Advanced settings" },
];

export default function IconGridStagger() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => e.isIntersecting && (setShown(true), obs.disconnect()),
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="w-full px-6 py-16">
      <style>{`
        @keyframes igs-in {
          from { opacity: 0; transform: translateY(14px) scale(.9); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
      <div ref={ref} className="mx-auto max-w-4xl">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            {en ? "Everything, in one app." : "ひとつのアプリに、すべて。"}
          </h2>
          <p className="mx-auto mt-3 max-w-md text-pretty text-muted-foreground">
            {en
              ? "Every tool you need is here from day one. Just start using it."
              : "必要な道具は最初から揃っています。あとは使うだけ。"}
          </p>
        </div>

        <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-6">
          {ITEMS.map((it, i) => {
            const Icon = it.icon;
            return (
              <div
                key={it.labelEn}
                className="group flex aspect-square flex-col items-center justify-center gap-2 rounded-2xl border bg-card p-3 text-center transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg"
                style={
                  shown
                    ? { animation: `igs-in .5s both`, animationDelay: `${i * 55}ms` }
                    : { opacity: 0 }
                }
              >
                <span
                  className={cn(
                    "inline-flex size-10 items-center justify-center rounded-xl bg-muted transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:scale-110"
                  )}
                >
                  <Icon className="size-5 text-foreground" />
                </span>
                <span className="text-xs font-medium text-muted-foreground">
                  {en ? it.labelEn : it.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
