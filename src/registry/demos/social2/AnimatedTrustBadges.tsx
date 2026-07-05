import { ShieldCheck, Award, Lock, Zap, Leaf } from "lucide-react";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "信頼バッジアニメ",
  category: "マーケティング",
  description: "認証・受賞バッジが順に浮かび上がり、ホバーで光沢が走るトラストバッジ列。",
  align: "full",
  isNew: true,
  tags: ["social-proof", "testimonial", "animation"],
};

const BADGES = [
  { id: "soc2", icon: ShieldCheck, label: "SOC 2 Type II", labelEn: "SOC 2 Type II", sub: "認証取得", subEn: "Certified", color: "from-emerald-500 to-teal-500" },
  { id: "gdpr", icon: Lock, label: "GDPR 準拠", labelEn: "GDPR Compliant", sub: "プライバシー", subEn: "Privacy", color: "from-sky-500 to-indigo-500" },
  { id: "award", icon: Award, label: "Best of 2025", labelEn: "Best of 2025", sub: "業界アワード", subEn: "Industry Award", color: "from-amber-500 to-orange-500" },
  { id: "uptime", icon: Zap, label: "99.9% 稼働", labelEn: "99.9% Uptime", sub: "SLA 保証", subEn: "SLA Backed", color: "from-violet-500 to-fuchsia-500" },
  { id: "carbon", icon: Leaf, label: "カーボンニュートラル", labelEn: "Carbon Neutral", sub: "サステナブル", subEn: "Sustainable", color: "from-lime-500 to-emerald-500" },
];

export default function AnimatedTrustBadges() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <section className="w-full px-6 py-12">
      <style>{`
        @keyframes social2BadgeIn { from{ opacity:0; transform: translateY(10px) scale(.95) } to{ opacity:1; transform:none } }
        .trust-badge { animation: social2BadgeIn .5s ease both }
        .trust-badge::after { content:""; position:absolute; inset:0; border-radius:1rem; background:linear-gradient(120deg, transparent 30%, rgba(255,255,255,.45) 50%, transparent 70%); transform: translateX(-120%); transition: transform .7s ease }
        .trust-badge:hover::after { transform: translateX(120%) }
        @media (prefers-reduced-motion: reduce){ .trust-badge{ animation:none } .trust-badge:hover::after{ transform:translateX(-120%) } }
      `}</style>
      <div className="mx-auto max-w-5xl">
        <h2 className="text-center text-3xl font-semibold tracking-tight">
          {en ? "Why you can trust us" : "安心して任せられる理由"}
        </h2>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          {BADGES.map((b, i) => (
            <div
              key={b.id}
              className="trust-badge relative flex items-center gap-3 overflow-hidden rounded-2xl border border-border bg-card px-5 py-4 shadow-sm"
              style={{ animationDelay: `${i * 90}ms` }}
            >
              <span className={`flex size-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${b.color} text-white`}>
                <b.icon className="size-5" />
              </span>
              <span className="leading-tight">
                <span className="block text-sm font-semibold text-foreground">{en ? b.labelEn : b.label}</span>
                <span className="block text-xs text-muted-foreground">{en ? b.subEn : b.sub}</span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
