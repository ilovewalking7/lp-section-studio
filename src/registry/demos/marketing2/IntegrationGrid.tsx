import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "連携サービスグリッド",
  category: "マーケティング",
  description:
    "頭文字ロゴの連携タイルをグリッド表示。ホバーで浮き上がるインタラクション付き。",
  align: "full",
  isNew: true,
  tags: ["marketing", "integrations"],
  principle:
    "馴染みのあるサービスとの連携を並べると、エコシステムへの安心感と乗り換えコストの低さを訴求できる。",
};

type Integration = {
  name: string;
  initials: string;
  tone: string;
  category: string;
  categoryEn: string;
};

const INTEGRATIONS: Integration[] = [
  { name: "Slack", initials: "Sl", tone: "from-violet-500 to-fuchsia-500", category: "コミュニケーション", categoryEn: "Communication" },
  { name: "Notion", initials: "No", tone: "from-zinc-600 to-zinc-800", category: "ドキュメント", categoryEn: "Docs" },
  { name: "Figma", initials: "Fi", tone: "from-rose-500 to-orange-500", category: "デザイン", categoryEn: "Design" },
  { name: "GitHub", initials: "Gh", tone: "from-slate-600 to-slate-900", category: "開発", categoryEn: "Development" },
  { name: "Stripe", initials: "St", tone: "from-indigo-500 to-blue-600", category: "決済", categoryEn: "Payments" },
  { name: "Linear", initials: "Li", tone: "from-purple-500 to-indigo-500", category: "プロジェクト管理", categoryEn: "Project management" },
  { name: "Vercel", initials: "Ve", tone: "from-neutral-700 to-black", category: "ホスティング", categoryEn: "Hosting" },
  { name: "Sentry", initials: "Se", tone: "from-amber-500 to-rose-500", category: "監視", categoryEn: "Monitoring" },
  { name: "Segment", initials: "Sg", tone: "from-emerald-500 to-teal-500", category: "分析", categoryEn: "Analytics" },
  { name: "Zapier", initials: "Za", tone: "from-orange-500 to-amber-500", category: "自動化", categoryEn: "Automation" },
  { name: "Intercom", initials: "In", tone: "from-sky-500 to-blue-500", category: "サポート", categoryEn: "Support" },
  { name: "Datadog", initials: "Dd", tone: "from-violet-600 to-purple-700", category: "監視", categoryEn: "Monitoring" },
];

export default function IntegrationGrid() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <section className="w-full px-6 py-12">
      <div className="mx-auto max-w-5xl">
        <div className="text-center">
          <Badge variant="secondary" className="rounded-full px-3 py-1">
            {en ? "100+ integrations" : "100以上の連携"}
          </Badge>
          <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
            {en
              ? "Connects with the tools you already use"
              : "今お使いのツールと、そのままつながる"}
          </h2>
          <p className="mx-auto mt-3 max-w-md text-pretty text-muted-foreground">
            {en
              ? "Connect in one click — no config files, no code."
              : "ワンクリックで接続。設定ファイルもコードも不要です。"}
          </p>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {INTEGRATIONS.map((it) => (
            <button
              key={it.name}
              type="button"
              className="group flex items-center gap-3 rounded-2xl border bg-card p-4 text-left transition-all duration-200 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <span
                className={cn(
                  "flex size-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br text-sm font-semibold text-white shadow-sm transition-transform group-hover:scale-105",
                  it.tone
                )}
              >
                {it.initials}
              </span>
              <span className="min-w-0">
                <span className="block truncate text-sm font-medium">
                  {it.name}
                </span>
                <span className="block truncate text-xs text-muted-foreground">
                  {en ? it.categoryEn : it.category}
                </span>
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
