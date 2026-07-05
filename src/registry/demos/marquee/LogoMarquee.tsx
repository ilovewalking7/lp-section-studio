import { Aperture, Box, Hexagon, Orbit, Sparkles, Triangle, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "ロゴマーキー",
  category: "マーキー",
  description: "エッジフェードとホバー停止付きの単列ロゴクラウド。",
  align: "full",
  isNew: true,
  tags: ["marquee", "animation", "infinite", "logos"],
};

const LOGOS = [
  { name: "Nimbus", Icon: Hexagon },
  { name: "Voltext", Icon: Zap },
  { name: "Orbita", Icon: Orbit },
  { name: "Trianon", Icon: Triangle },
  { name: "Boxel", Icon: Box },
  { name: "Aperio", Icon: Aperture },
  { name: "Sparkle", Icon: Sparkles },
];

export default function LogoMarquee() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <div className="w-full py-8">
      <style>{`
        @keyframes logoMarqueeScroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .logo-marquee-track { animation: logoMarqueeScroll 28s linear infinite; }
        .logo-marquee-mask:hover .logo-marquee-track { animation-play-state: paused; }
      `}</style>
      <p className="mb-6 text-center text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
        {en ? "Trusted by leading brands" : "信頼されるブランド"}
      </p>
      <div
        className="logo-marquee-mask group relative overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
        }}
      >
        <div className="logo-marquee-track flex w-max items-center gap-12 pr-12">
          {[...LOGOS, ...LOGOS].map(({ name, Icon }, i) => (
            <div
              key={`${name}-${i}`}
              className={cn(
                "flex shrink-0 items-center gap-2 text-muted-foreground",
                "transition-colors hover:text-foreground",
              )}
            >
              <Icon className="size-6" />
              <span className="text-lg font-semibold tracking-tight">{name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
