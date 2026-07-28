import { useState } from "react";
import { Github, Slack, Database, Cloud, Webhook, Boxes } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "連携サービス一覧",
  category: "ダークテック",
  description: "トグルスイッチで管理する連携済みインテグレーション一覧。",
  align: "center",
  isNew: true,
  tags: ["dark", "developer", "tech"],
};

type Integration = {
  id: string;
  name: string;
  descJa: string;
  descEn: string;
  icon: typeof Github;
  tint: string;
  on: boolean;
};

const INITIAL: Integration[] = [
  { id: "gh", name: "GitHub", descJa: "リポジトリと自動デプロイ", descEn: "Repos and auto-deploys", icon: Github, tint: "text-zinc-200", on: true },
  { id: "sl", name: "Slack", descJa: "デプロイ通知を送信", descEn: "Send deploy notifications", icon: Slack, tint: "text-violet-400", on: true },
  { id: "pg", name: "Postgres", descJa: "マネージドデータベース", descEn: "Managed database", icon: Database, tint: "text-cyan-400", on: false },
  { id: "s3", name: "Object Storage", descJa: "アセットとアップロード", descEn: "Assets and uploads", icon: Cloud, tint: "text-emerald-400", on: true },
  { id: "wh", name: "Webhooks", descJa: "イベントをエンドポイントへ", descEn: "Events to your endpoints", icon: Webhook, tint: "text-amber-400", on: false },
];

function Toggle({
  on,
  onClick,
  label,
}: {
  on: boolean;
  onClick: () => void;
  /** 中身が空のスイッチなので、どのサービスの切替かを外から渡す */
  label: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-label={label}
      aria-checked={on}
      onClick={onClick}
      className={cn(
        "relative inline-flex h-5 w-9 shrink-0 items-center rounded-full transition-colors",
        on ? "bg-emerald-400" : "bg-white/10"
      )}
    >
      <span
        className={cn(
          "inline-block size-4 rounded-full bg-white shadow transition-transform",
          on ? "translate-x-4" : "translate-x-0.5"
        )}
      />
    </button>
  );
}

export default function IntegrationList() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const [items, setItems] = useState(INITIAL);
  const active = items.filter((i) => i.on).length;

  return (
    <div className="w-full max-w-lg rounded-xl border border-white/10 bg-[#0d1117] text-zinc-200 shadow-2xl shadow-black/40">
      <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
        <div className="flex items-center gap-2.5">
          <span className="grid size-8 place-items-center rounded-lg border border-white/10 bg-white/[0.03]">
            <Boxes className="size-4 text-emerald-400" />
          </span>
          <div>
            <h3 className="text-sm font-medium text-white">{en ? "Integrations" : "連携サービス"}</h3>
            <p className="font-mono text-xs text-zinc-500">
              {active}/{items.length} {en ? "enabled" : "有効"}
            </p>
          </div>
        </div>
      </div>
      <ul className="divide-y divide-white/5">
        {items.map((it) => {
          const Icon = it.icon;
          return (
            <li key={it.id} className="flex items-center gap-3 px-5 py-3.5">
              <span className="grid size-9 shrink-0 place-items-center rounded-lg border border-white/10 bg-[#0a0a0f]">
                <Icon className={cn("size-4", it.tint)} />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-white">{it.name}</span>
                  {it.on && (
                    <span className="rounded-full bg-emerald-400/10 px-1.5 py-0.5 font-mono text-[10px] text-emerald-300">
                      {en ? "Connected" : "接続済み"}
                    </span>
                  )}
                </div>
                <p className="truncate text-xs text-zinc-500">{en ? it.descEn : it.descJa}</p>
              </div>
              <Toggle
                on={it.on}
                label={it.name}
                onClick={() =>
                  setItems((arr) =>
                    arr.map((x) => (x.id === it.id ? { ...x, on: !x.on } : x))
                  )
                }
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
