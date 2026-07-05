import { Flame, Snowflake, Leaf } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "グロー3カラムカード",
  category: "マーケティング",
  description:
    "ホバーで縁取りのグラデーション光が点灯し、上にせり上がる3枚の特徴カード。",
  align: "full",
  isNew: true,
  tags: ["feature", "bento", "animation"],
};

const CARDS = [
  {
    icon: Flame,
    title: "燃えるような速度",
    titleEn: "Blazing speed",
    body: "キャッシュとエッジ配信で、体感速度を最大化。待たせない体験を。",
    bodyEn: "Caching and edge delivery maximize perceived speed. An experience that never keeps you waiting.",
    glow: "from-orange-500 via-rose-500 to-amber-500",
    accent: "text-orange-500",
  },
  {
    icon: Snowflake,
    title: "氷のような安定",
    titleEn: "Ice-cold stability",
    body: "冗長化されたインフラで、99.99%の稼働率。止まらない安心を。",
    bodyEn: "Redundant infrastructure delivers 99.99% uptime. Peace of mind that never goes down.",
    glow: "from-sky-500 via-cyan-500 to-blue-500",
    accent: "text-sky-500",
  },
  {
    icon: Leaf,
    title: "自然な使い心地",
    titleEn: "Natural to use",
    body: "迷わない導線と心地よい余白。学ばなくても、すぐ手に馴染む。",
    bodyEn: "Clear flows and comfortable whitespace. It feels familiar from the first touch, no learning needed.",
    glow: "from-emerald-500 via-teal-500 to-green-500",
    accent: "text-emerald-500",
  },
];

export default function ThreeColGlowCards() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <section className="w-full px-6 py-16">
      <div className="mx-auto max-w-5xl">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            {en ? "Speed, stability, comfort." : "速さ、安定、心地よさ。"}
          </h2>
          <p className="mx-auto mt-3 max-w-md text-pretty text-muted-foreground">
            {en
              ? "All three, with no compromise, in one product."
              : "妥協しない三拍子を、ひとつのプロダクトに。"}
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-3">
          {CARDS.map((c) => {
            const Icon = c.icon;
            return (
              <div
                key={c.titleEn}
                className="group relative rounded-2xl p-px transition-transform duration-300 hover:-translate-y-1.5"
              >
                <div
                  aria-hidden
                  className={cn(
                    "absolute inset-0 rounded-2xl bg-gradient-to-br opacity-0 blur transition-opacity duration-500 group-hover:opacity-70",
                    c.glow
                  )}
                />
                <div
                  aria-hidden
                  className={cn(
                    "absolute inset-0 rounded-2xl bg-gradient-to-br opacity-30 transition-opacity duration-500 group-hover:opacity-100",
                    c.glow
                  )}
                />
                <div className="relative h-full rounded-2xl bg-card p-6">
                  <span className="inline-flex size-12 items-center justify-center rounded-xl border bg-background">
                    <Icon className={cn("size-6", c.accent)} />
                  </span>
                  <h3 className="mt-4 text-lg font-semibold tracking-tight">
                    {en ? c.titleEn : c.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">{en ? c.bodyEn : c.body}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
