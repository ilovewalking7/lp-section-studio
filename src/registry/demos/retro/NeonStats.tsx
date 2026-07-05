import { Cpu, Users, Zap, Trophy } from "lucide-react";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "ネオン・スタッツ",
  category: "レトロ・Y2K",
  description: "発光する数値とアイコンを並べた、レトロフューチャーな実績スタッツ。",
  align: "full",
  isNew: true,
  tags: ["retro", "y2k", "neon", "stats"],
};

const stats = [
  { icon: Users, value: "120K+", label: "プレイヤー", labelEn: "Players", color: "#ff2e97" },
  { icon: Zap, value: "9.9M", label: "総スコア", labelEn: "Total score", color: "#05d9e8" },
  { icon: Trophy, value: "4,200", label: "達成バッジ", labelEn: "Badges earned", color: "#bef264" },
  { icon: Cpu, value: "99.9%", label: "稼働率", labelEn: "Uptime", color: "#c084fc" },
];

export default function NeonStats() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <section className="relative w-full overflow-hidden bg-[#0d0221] px-6 py-16">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "linear-gradient(rgba(124,58,237,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(124,58,237,0.4) 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        }}
      />
      <div className="relative mx-auto grid max-w-5xl gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map(({ icon: Icon, value, label, labelEn, color }) => (
          <div
            key={labelEn}
            className="rounded-xl border bg-[#1a0b2e]/70 p-6 text-center backdrop-blur transition-transform hover:-translate-y-1"
            style={{
              borderColor: `${color}66`,
              boxShadow: `0 0 22px ${color}40`,
            }}
          >
            <div
              className="mx-auto grid size-12 place-items-center rounded-full"
              style={{
                background: `${color}1a`,
                boxShadow: `inset 0 0 16px ${color}55`,
              }}
            >
              <Icon className="size-6" style={{ color, filter: `drop-shadow(0 0 6px ${color})` }} />
            </div>
            <p
              className="mt-4 font-mono text-3xl font-black tracking-tight text-white"
              style={{ textShadow: `0 0 16px ${color}` }}
            >
              {value}
            </p>
            <p className="mt-1 font-mono text-xs uppercase tracking-[0.2em] text-[#d8b4fe]">
              {en ? labelEn : label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
