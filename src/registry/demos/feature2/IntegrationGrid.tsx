import {
  Slack,
  Github,
  Figma,
  Chrome,
  Database,
  Mail,
  Cloud,
  Boxes,
  Webhook,
} from "lucide-react";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "連携サービスグリッド",
  category: "マーケティング",
  description:
    "中央のハブから各連携サービスへ脈打つ接続を描く、インテグレーション紹介グリッド。",
  align: "full",
  isNew: true,
  tags: ["feature", "bento", "animation"],
};

const APPS = [
  { icon: Slack, name: "Slack" },
  { icon: Github, name: "GitHub" },
  { icon: Figma, name: "Figma" },
  { icon: Chrome, name: "Chrome" },
  { icon: Database, name: "Postgres" },
  { icon: Mail, name: "Gmail" },
  { icon: Cloud, name: "AWS" },
  { icon: Webhook, name: "Webhook" },
];

export default function IntegrationGrid() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <section className="w-full px-6 py-16">
      <style>{`
        @keyframes ig-pulse {
          0%, 100% { transform: scale(1); box-shadow: 0 0 0 0 hsl(var(--primary)/.4); }
          50% { transform: scale(1.04); box-shadow: 0 0 0 10px hsl(var(--primary)/0); }
        }
        @keyframes ig-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
      `}</style>
      <div className="mx-auto max-w-4xl">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            {en ? "Connect with your favorite tools." : "お気に入りのツールと、つながる。"}
          </h2>
          <p className="mx-auto mt-3 max-w-md text-pretty text-muted-foreground">
            {en
              ? "Integrate with 100+ services. Keep your workflow, make it better."
              : "100以上のサービスと連携。ワークフローはそのままで、もっと便利に。"}
          </p>
        </div>

        <div className="relative">
          <div className="mb-8 flex justify-center">
            <span
              className="inline-flex size-20 items-center justify-center rounded-3xl border bg-card"
              style={{ animation: "ig-pulse 2.4s ease-in-out infinite" }}
            >
              <Boxes className="size-9 text-primary" />
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {APPS.map((a, i) => {
              const Icon = a.icon;
              return (
                <div
                  key={a.name}
                  className="group flex flex-col items-center gap-2 rounded-2xl border bg-card p-5 transition-colors hover:border-primary/40"
                  style={{
                    animation: "ig-float 3.5s ease-in-out infinite",
                    animationDelay: `${(i % 4) * 0.3}s`,
                  }}
                >
                  <span className="inline-flex size-12 items-center justify-center rounded-xl bg-muted transition-transform duration-300 group-hover:scale-110">
                    <Icon className="size-6 text-foreground" />
                  </span>
                  <span className="text-sm font-medium">{a.name}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
