import { Aperture, Box, Cloud, Cpu, Hexagon, Orbit, Shield, Sparkles, Triangle, Zap } from "lucide-react";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "3列マーキー",
  category: "マーキー",
  description: "速度の異なる3列を重ねた密度の高いヒーロー帯。",
  align: "full",
  isNew: true,
  tags: ["marquee", "animation", "infinite", "hero"],
};

const ROW_1 = [
  { name: "Nimbus", Icon: Hexagon },
  { name: "Voltext", Icon: Zap },
  { name: "Orbita", Icon: Orbit },
  { name: "Aperio", Icon: Aperture },
];
const ROW_2 = [
  { name: "Cloudly", Icon: Cloud },
  { name: "Coreon", Icon: Cpu },
  { name: "Shieldr", Icon: Shield },
  { name: "Boxel", Icon: Box },
];
const ROW_3 = [
  { name: "Sparkle", Icon: Sparkles },
  { name: "Trianon", Icon: Triangle },
  { name: "Nebula", Icon: Orbit },
  { name: "Photon", Icon: Aperture },
];

type Item = { name: string; Icon: typeof Cloud };

function Row({ items, duration, reverse }: { items: Item[]; duration: number; reverse?: boolean }) {
  return (
    <div className="relative overflow-hidden">
      <div
        className="flex w-max items-center gap-4 pr-4"
        style={{
          animation: `threeRowScroll ${duration}s linear infinite${reverse ? " reverse" : ""}`,
        }}
      >
        {[...items, ...items, ...items].map(({ name, Icon }, i) => (
          <div
            key={`${name}-${i}`}
            className="flex shrink-0 items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-neutral-100 backdrop-blur-sm"
          >
            <Icon className="size-5 text-primary" />
            <span className="text-base font-semibold tracking-tight">{name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ThreeRowMarquee() {
  return (
    <div className="w-full py-8">
      <style>{`
        @keyframes threeRowScroll {
          from { transform: translateX(0); }
          to { transform: translateX(-33.333%); }
        }
      `}</style>
      <div
        className="group flex flex-col gap-4 overflow-hidden rounded-3xl bg-neutral-950 p-6 [&:hover_*]:[animation-play-state:paused]"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        }}
      >
        <Row items={ROW_1} duration={20} />
        <Row items={ROW_2} duration={30} reverse />
        <Row items={ROW_3} duration={25} />
      </div>
    </div>
  );
}
