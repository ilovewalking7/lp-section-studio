import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "ドーナツ統計",
  category: "ダッシュボード",
  description: "stroke-dasharray で描く SVG ドーナツチャートと内訳の凡例。",
  align: "center",
};

type Segment = { label: { ja: string; en: string }; value: number; color: string };

const SEGMENTS: Segment[] = [
  { label: { ja: "オーガニック", en: "Organic" }, value: 48, color: "hsl(217 91% 60%)" },
  { label: { ja: "紹介", en: "Referral" }, value: 27, color: "hsl(160 84% 39%)" },
  { label: { ja: "広告", en: "Paid ads" }, value: 17, color: "hsl(38 92% 50%)" },
  { label: { ja: "その他", en: "Other" }, value: 8, color: "hsl(263 70% 60%)" },
];

const TOTAL = SEGMENTS.reduce((s, x) => s + x.value, 0);
const R = 60;
const C = 2 * Math.PI * R;

export default function DonutStat() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  let offset = 0;
  const arcs = SEGMENTS.map((s) => {
    const frac = s.value / TOTAL;
    const dash = frac * C;
    const arc = { color: s.color, dash, gap: C - dash, rotation: (offset / TOTAL) * 360 };
    offset += s.value;
    return arc;
  });

  return (
    <Card className="w-full max-w-xs">
      <CardHeader>
        <CardTitle>{en ? "Traffic mix" : "トラフィック構成"}</CardTitle>
        <CardDescription>{en ? "By channel, last 30 days" : "過去30日間のチャネル別"}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-6">
        <div className="relative">
          <svg width="160" height="160" viewBox="0 0 160 160" className="-rotate-90">
            <circle cx="80" cy="80" r={R} fill="none" className="stroke-muted" strokeWidth="16" />
            {arcs.map((a, i) => (
              <circle
                key={i}
                cx="80"
                cy="80"
                r={R}
                fill="none"
                stroke={a.color}
                strokeWidth="16"
                strokeDasharray={`${a.dash} ${a.gap}`}
                strokeDashoffset={(-a.rotation / 360) * C}
                strokeLinecap="butt"
              />
            ))}
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-bold tabular-nums tracking-tight">{SEGMENTS[0].value}%</span>
            <span className="text-xs text-muted-foreground">{en ? SEGMENTS[0].label.en : SEGMENTS[0].label.ja}</span>
          </div>
        </div>
        <ul className="grid w-full grid-cols-2 gap-x-4 gap-y-2">
          {SEGMENTS.map((s) => (
            <li key={s.label.en} className="flex items-center justify-between gap-2 text-sm">
              <span className="flex min-w-0 items-center gap-2">
                <span className="size-2.5 shrink-0 rounded-full" style={{ backgroundColor: s.color }} />
                <span className="truncate text-muted-foreground">{en ? s.label.en : s.label.ja}</span>
              </span>
              <span className="font-medium tabular-nums">{s.value}%</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
