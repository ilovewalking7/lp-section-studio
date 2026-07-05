import { Atom, Cloud, Cpu, Database, Globe, Layers, Shield, Workflow } from "lucide-react";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "デュアルマーキー",
  category: "マーキー",
  description: "上下で逆方向にスクロールする2列のロゴ帯。",
  align: "full",
  isNew: true,
  tags: ["marquee", "animation", "infinite", "dual"],
};

const ROW_A = [
  { name: "Cloudly", Icon: Cloud },
  { name: "Atomix", Icon: Atom },
  { name: "Globex", Icon: Globe },
  { name: "Layerly", Icon: Layers },
];
const ROW_B = [
  { name: "Coreon", Icon: Cpu },
  { name: "Datavault", Icon: Database },
  { name: "Shieldr", Icon: Shield },
  { name: "Flowly", Icon: Workflow },
];

type Item = { name: string; Icon: typeof Cloud };

function Row({ items, reverse }: { items: Item[]; reverse?: boolean }) {
  return (
    <div
      className="dual-marquee-mask group relative overflow-hidden"
      style={{
        maskImage:
          "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
      }}
    >
      <div
        className="flex w-max items-center gap-10 pr-10"
        style={{
          animation: `dualMarqueeScroll 24s linear infinite${reverse ? " reverse" : ""}`,
        }}
      >
        {[...items, ...items].map(({ name, Icon }, i) => (
          <div
            key={`${name}-${i}`}
            className="flex shrink-0 items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 text-foreground shadow-sm"
          >
            <Icon className="size-5 text-primary" />
            <span className="text-base font-semibold tracking-tight">{name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function DualMarquee() {
  return (
    <div className="w-full space-y-4 py-8 [&_.group:hover_*]:[animation-play-state:paused]">
      <style>{`
        @keyframes dualMarqueeScroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
      <Row items={ROW_A} />
      <Row items={ROW_B} reverse />
    </div>
  );
}
