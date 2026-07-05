import { useRef } from "react";
import {
  MousePointer2,
  Workflow,
  Lock,
  Gauge,
  Cloud,
  Wand2,
} from "lucide-react";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "ホバー・スポットライト格子",
  category: "マーケティング",
  description:
    "カーソルに追従する光のスポットライトがカードを照らす機能グリッド。CSS変数で軽量に実装。",
  align: "full",
  isNew: true,
  tags: ["feature", "bento", "animation"],
};

const ITEMS = [
  {
    icon: Wand2,
    titleJa: "魔法のような自動化",
    titleEn: "Magical automation",
    bodyJa: "繰り返し作業をワンクリックで。",
    bodyEn: "Repetitive tasks in one click.",
  },
  {
    icon: Workflow,
    titleJa: "柔軟なワークフロー",
    titleEn: "Flexible workflows",
    bodyJa: "チームの流れに合わせて組める。",
    bodyEn: "Built around how your team works.",
  },
  {
    icon: Lock,
    titleJa: "厳格な権限管理",
    titleEn: "Granular permissions",
    bodyJa: "メンバーごとに細かく制御。",
    bodyEn: "Fine-grained control per member.",
  },
  {
    icon: Gauge,
    titleJa: "計測できる成果",
    titleEn: "Measurable results",
    bodyJa: "KPIを常にウォッチ。",
    bodyEn: "Keep an eye on every KPI.",
  },
  {
    icon: Cloud,
    titleJa: "どこでも同期",
    titleEn: "Sync everywhere",
    bodyJa: "端末をまたいでシームレス。",
    bodyEn: "Seamless across devices.",
  },
  {
    icon: MousePointer2,
    titleJa: "直感的な操作",
    titleEn: "Intuitive controls",
    bodyJa: "学習コストはほぼゼロ。",
    bodyEn: "Almost no learning curve.",
  },
];

function SpotlightCard({
  icon: Icon,
  title,
  body,
}: {
  icon: typeof Wand2;
  title: string;
  body: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <div
      ref={ref}
      onMouseMove={(e) => {
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        el.style.setProperty("--mx", `${e.clientX - r.left}px`);
        el.style.setProperty("--my", `${e.clientY - r.top}px`);
      }}
      className="group relative overflow-hidden rounded-2xl border bg-card p-6 transition-colors"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(220px circle at var(--mx,50%) var(--my,50%), hsl(var(--primary)/.16), transparent 70%)",
        }}
      />
      <div className="relative">
        <span className="inline-flex size-11 items-center justify-center rounded-xl border bg-background">
          <Icon className="size-5 text-primary" />
        </span>
        <h3 className="mt-4 font-semibold tracking-tight">{title}</h3>
        <p className="mt-1.5 text-sm text-muted-foreground">{body}</p>
      </div>
    </div>
  );
}

export default function FeatureGridHoverSpotlight() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <section className="w-full px-6 py-16">
      <div className="mx-auto max-w-5xl">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            {en ? "Responds to every touch." : "触れるたびに、答える。"}
          </h2>
          <p className="mx-auto mt-3 max-w-md text-pretty text-muted-foreground">
            {en
              ? "A cursor-tracking spotlight guides attention naturally."
              : "カーソルに反応するスポットライトで、注目を自然に誘導します。"}
          </p>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {ITEMS.map((it) => (
            <SpotlightCard
              key={it.titleEn}
              icon={it.icon}
              title={en ? it.titleEn : it.titleJa}
              body={en ? it.bodyEn : it.bodyJa}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
