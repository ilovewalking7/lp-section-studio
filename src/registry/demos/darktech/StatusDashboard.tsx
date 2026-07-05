import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "ステータス・ダッシュボード",
  category: "ダークテック",
  description: "稼働状況とアップタイムバーを表示するサービスステータスボード。",
  align: "full",
  isNew: true,
  tags: ["dark", "developer", "tech"],
};

type Status = "operational" | "degraded" | "outage";

type Service = { name: string; status: Status; uptime: number; bars: Status[] };

const COLOR: Record<Status, string> = {
  operational: "bg-emerald-400",
  degraded: "bg-amber-400",
  outage: "bg-rose-500",
};
const LABEL_JA: Record<Status, string> = {
  operational: "稼働中",
  degraded: "低下",
  outage: "停止",
};
const LABEL_EN: Record<Status, string> = {
  operational: "Operational",
  degraded: "Degraded",
  outage: "Outage",
};
const DOT: Record<Status, string> = {
  operational: "text-emerald-400",
  degraded: "text-amber-400",
  outage: "text-rose-500",
};

function makeBars(_seed: number, badAt: number[] = []): Status[] {
  return Array.from({ length: 40 }, (_, i) =>
    badAt.includes(i) ? (i % 7 === 0 ? "outage" : "degraded") : "operational"
  ).reverse();
}

const SERVICES: Service[] = [
  { name: "API Gateway", status: "operational", uptime: 99.98, bars: makeBars(1) },
  { name: "Edge Runtime", status: "operational", uptime: 99.99, bars: makeBars(2) },
  { name: "Database", status: "degraded", uptime: 99.71, bars: makeBars(3, [3, 4, 5]) },
  { name: "Auth", status: "operational", uptime: 99.95, bars: makeBars(4) },
  { name: "Storage (S3)", status: "outage", uptime: 98.42, bars: makeBars(5, [0, 1, 2, 9]) },
];

export default function StatusDashboard() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const LABEL = en ? LABEL_EN : LABEL_JA;
  const allUp = SERVICES.every((s) => s.status === "operational");

  return (
    <section className="w-full bg-[#0a0a0f] px-6 py-16 text-zinc-200">
      <div className="mx-auto max-w-3xl">
        <div
          className={cn(
            "flex items-center justify-between rounded-xl border px-5 py-4",
            allUp
              ? "border-emerald-400/30 bg-emerald-400/[0.04]"
              : "border-amber-400/30 bg-amber-400/[0.04]"
          )}
        >
          <div className="flex items-center gap-3">
            <span className="relative flex size-3">
              <span
                className={cn(
                  "absolute inline-flex h-full w-full animate-ping rounded-full opacity-60",
                  allUp ? "bg-emerald-400" : "bg-amber-400"
                )}
              />
              <span
                className={cn(
                  "relative inline-flex size-3 rounded-full",
                  allUp ? "bg-emerald-400" : "bg-amber-400"
                )}
              />
            </span>
            <span className="text-sm font-medium text-white">
              {allUp
                ? en
                  ? "All systems operational"
                  : "全システム正常稼働中"
                : en
                  ? "Some services affected"
                  : "一部のサービスに影響あり"}
            </span>
          </div>
          <span className="font-mono text-xs text-zinc-500">
            {en ? "Updated: just now" : "最終更新: たった今"}
          </span>
        </div>

        <div className="mt-4 divide-y divide-white/5 rounded-xl border border-white/10 bg-[#0d1117]">
          {SERVICES.map((s) => (
            <div key={s.name} className="px-5 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className={cn("text-base leading-none", DOT[s.status])}>●</span>
                  <span className="text-sm font-medium text-white">{s.name}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs text-zinc-500">
                    {s.uptime.toFixed(2)}%
                  </span>
                  <span
                    className={cn(
                      "rounded-full px-2 py-0.5 font-mono text-[10px]",
                      s.status === "operational" && "bg-emerald-400/10 text-emerald-300",
                      s.status === "degraded" && "bg-amber-400/10 text-amber-300",
                      s.status === "outage" && "bg-rose-500/10 text-rose-300"
                    )}
                  >
                    {LABEL[s.status]}
                  </span>
                </div>
              </div>
              <div className="mt-3 flex items-end gap-[3px]">
                {s.bars.map((b, i) => (
                  <span
                    key={i}
                    title={LABEL[b]}
                    className={cn(
                      "h-7 flex-1 rounded-[2px] opacity-90 transition-opacity hover:opacity-100",
                      COLOR[b]
                    )}
                  />
                ))}
              </div>
              <div className="mt-1.5 flex justify-between font-mono text-[10px] text-zinc-600">
                <span>{en ? "90 days ago" : "90日前"}</span>
                <span>{en ? "Today" : "今日"}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
