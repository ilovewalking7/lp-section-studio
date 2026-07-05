import { useRef, type CSSProperties } from "react";
import { BarChart3, Users, Globe, Bell } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "ベントーホバーカード",
  category: "カード演出",
  description: "小さなベントーグリッド。各タイルがホバーで浮き上がり光る。",
  align: "center",
  isNew: true,
  tags: ["card", "hover", "animation", "bento"],
};

const TILES = [
  { icon: Users, label: "ユーザー", labelEn: "Users", value: "12.4k", valueEn: "12.4k", span: "col-span-2", tint: "text-indigo-300" },
  { icon: BarChart3, label: "成長", labelEn: "Growth", value: "+28%", valueEn: "+28%", span: "", tint: "text-emerald-300" },
  { icon: Globe, label: "地域", labelEn: "Regions", value: "42", valueEn: "42", span: "", tint: "text-sky-300" },
  { icon: Bell, label: "通知", labelEn: "Alerts", value: "8 新着", valueEn: "8 new", span: "col-span-2", tint: "text-amber-300" },
];

function Tile({
  icon: Icon,
  label,
  labelEn,
  value,
  valueEn,
  span,
  tint,
}: (typeof TILES)[number]) {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const ref = useRef<HTMLDivElement>(null);
  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--x", `${e.clientX - r.left}px`);
    el.style.setProperty("--y", `${e.clientY - r.top}px`);
  }
  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      className={cn(
        "group/tile relative overflow-hidden rounded-xl border border-white/10 bg-white/[0.03] p-4 transition-transform duration-200 ease-out hover:-translate-y-1 hover:border-white/20",
        span
      )}
      style={{ "--x": "50%", "--y": "50%" } as CSSProperties}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover/tile:opacity-100"
        style={{
          background:
            "radial-gradient(120px circle at var(--x) var(--y), rgba(255,255,255,0.08), transparent 60%)",
        }}
      />
      <Icon className={cn("size-5", tint)} />
      <p className="mt-3 text-lg font-semibold text-white">{en ? valueEn : value}</p>
      <p className="text-xs text-slate-500">{en ? labelEn : label}</p>
    </div>
  );
}

export default function BentoHoverCard() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <div className="w-full max-w-sm rounded-2xl border border-white/10 bg-[#0b0d17] p-5 shadow-2xl shadow-black/40">
      <h3 className="mb-4 px-1 text-sm font-medium text-white">{en ? "Dashboard overview" : "ダッシュボード概要"}</h3>
      <div className="grid grid-cols-2 gap-3">
        {TILES.map((t) => (
          <Tile key={t.labelEn} {...t} />
        ))}
      </div>
    </div>
  );
}
