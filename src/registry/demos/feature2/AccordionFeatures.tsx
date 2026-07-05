import { useState } from "react";
import { Plus, Zap, Layers, Bot, Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "アコーディオン機能解説",
  category: "マーケティング",
  description:
    "クリックで高さがなめらかに開閉するアコーディオン。アイコンが回転し、内容がスッと現れる。",
  align: "full",
  isNew: true,
  tags: ["feature", "bento", "animation"],
};

const ITEMS = [
  {
    icon: Zap,
    title: "瞬時に立ち上がる",
    titleEn: "Spins up instantly",
    body: "サーバーレスのアーキテクチャで、起動の待ち時間はほぼゼロ。リクエストが来た瞬間に応答します。",
    bodyEn: "Serverless architecture means near-zero cold starts — it responds the moment a request arrives.",
  },
  {
    icon: Layers,
    title: "積み重ねられる拡張性",
    titleEn: "Scales by stacking",
    body: "モジュール単位で機能を追加。必要な分だけ載せて、不要になれば外せます。",
    bodyEn: "Add features module by module. Load only what you need, and remove them when you don't.",
  },
  {
    icon: Bot,
    title: "AIが先回りする",
    titleEn: "AI stays a step ahead",
    body: "利用パターンを学習し、次にやりたいことを提案。操作の手数を減らします。",
    bodyEn: "It learns your usage patterns and suggests what's next, cutting down on manual steps.",
  },
  {
    icon: Lock,
    title: "鍵のかかった安心",
    titleEn: "Locked-down peace of mind",
    body: "保存時も通信時も暗号化。アクセス権はロール単位で細かく制御できます。",
    bodyEn: "Encrypted at rest and in transit, with fine-grained, role-based access control.",
  },
];

export default function AccordionFeatures() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  const [open, setOpen] = useState(0);

  return (
    <section className="w-full px-6 py-16">
      <div className="mx-auto max-w-2xl">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            {en ? "Open up what you want to know." : "知りたいことから、開いていく。"}
          </h2>
        </div>

        <div className="space-y-3">
          {ITEMS.map((it, i) => {
            const isOpen = open === i;
            const Icon = it.icon;
            return (
              <div
                key={it.title}
                className={cn(
                  "overflow-hidden rounded-2xl border bg-card transition-colors",
                  isOpen && "border-primary/30"
                )}
              >
                <button
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center gap-3 px-5 py-4 text-left"
                >
                  <span
                    className={cn(
                      "inline-flex size-9 items-center justify-center rounded-lg border transition-colors",
                      isOpen ? "bg-primary/10 text-primary" : "bg-background"
                    )}
                  >
                    <Icon className="size-4" />
                  </span>
                  <span className="flex-1 font-medium tracking-tight">
                    {en ? it.titleEn : it.title}
                  </span>
                  <Plus
                    className={cn(
                      "size-5 text-muted-foreground transition-transform duration-300",
                      isOpen && "rotate-45 text-primary"
                    )}
                  />
                </button>
                <div
                  className={cn(
                    "grid transition-all duration-300 ease-out",
                    isOpen
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  )}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pb-5 pl-[4.25rem] text-sm text-muted-foreground">
                      {en ? it.bodyEn : it.body}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
