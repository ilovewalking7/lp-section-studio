import { Cpu, Gauge, Layers3, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "主役機能スポットライト",
  category: "マーケティング",
  description:
    "ひとつの主力機能を大きく据え、周囲に補助機能を配置。中央に呼吸する光のスポットライト。",
  align: "full",
  isNew: true,
  tags: ["feature", "bento", "animation"],
};

const SUB = [
  {
    icon: Gauge,
    titleJa: "高速処理",
    titleEn: "High speed",
    bodyJa: "ミリ秒単位の応答性能。",
    bodyEn: "Millisecond response times.",
  },
  {
    icon: Layers3,
    titleJa: "拡張性",
    titleEn: "Scalability",
    bodyJa: "規模に合わせて自在に。",
    bodyEn: "Scales freely with your needs.",
  },
  {
    icon: ShieldCheck,
    titleJa: "安全性",
    titleEn: "Security",
    bodyJa: "標準で暗号化を実装。",
    bodyEn: "Encryption built in by default.",
  },
];

export default function FeatureSpotlight() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <section className="w-full px-6 py-16">
      <style>{`
        @keyframes fs-breathe {
          0%, 100% { opacity: .5; transform: scale(1); }
          50% { opacity: .85; transform: scale(1.12); }
        }
      `}</style>
      <div className="mx-auto max-w-5xl">
        <div className="relative overflow-hidden rounded-3xl border bg-card p-6 sm:p-10">
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/3 size-72 -translate-x-1/2 rounded-full bg-primary/25 blur-3xl"
            style={{ animation: "fs-breathe 5s ease-in-out infinite" }}
          />

          <div className="relative text-center">
            <span className="inline-flex size-16 items-center justify-center rounded-2xl border bg-background shadow-sm">
              <Cpu className="size-8 text-primary" />
            </span>
            <h2 className="mx-auto mt-5 max-w-lg text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
              {en
                ? "One engine powers everything."
                : "ひとつのエンジンが、すべてを動かす。"}
            </h2>
            <p className="mx-auto mt-3 max-w-md text-pretty text-muted-foreground">
              {en
                ? "A purpose-built core supports every feature behind the scenes — fast, and always on."
                : "独自の処理基盤が、あらゆる機能を裏側で支えます。だから速くて、止まらない。"}
            </p>
          </div>

          <div className="relative mt-10 grid gap-4 sm:grid-cols-3">
            {SUB.map((s) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.titleEn}
                  className={cn(
                    "group rounded-2xl border bg-background/70 p-5 backdrop-blur transition-transform duration-300 hover:-translate-y-1"
                  )}
                >
                  <span className="inline-flex size-10 items-center justify-center rounded-xl bg-muted transition-transform duration-300 group-hover:scale-110">
                    <Icon className="size-5 text-foreground" />
                  </span>
                  <h3 className="mt-3 font-semibold tracking-tight">
                    {en ? s.titleEn : s.titleJa}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {en ? s.bodyEn : s.bodyJa}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
