import {
  Boxes,
  Hexagon,
  Orbit,
  Triangle,
  Layers,
  Aperture,
  Command,
  Sparkle,
} from "lucide-react";
import type { DemoMeta } from "@/registry";

export const meta: DemoMeta = {
  name: "ロゴマーキー",
  category: "ヒーロー・LP",
  description:
    "ダミーのブランドワードマークを横方向に無限スクロールさせるマーキー（CSSキーフレーム）。",
  align: "full",
  isNew: true,
  tags: ["hero", "landing", "marquee", "logos"],
  principle:
    "両端のフェードマスクで「続いている」感を出し、流れる動きが社会的証明の量を示唆。低彩度で本文の邪魔をしない。",
};

const LOGOS: { name: string; icon: React.ReactNode }[] = [
  { name: "Nebula", icon: <Orbit /> },
  { name: "Hexline", icon: <Hexagon /> },
  { name: "Stackly", icon: <Layers /> },
  { name: "Boxworks", icon: <Boxes /> },
  { name: "Apertur", icon: <Aperture /> },
  { name: "Trigon", icon: <Triangle /> },
  { name: "Cmdly", icon: <Command /> },
  { name: "Sparq", icon: <Sparkle /> },
];

export default function MarqueeLogos() {
  const en =
    typeof document !== "undefined" &&
    document.documentElement.lang === "en";
  return (
    <section className="w-full bg-background px-6 py-16">
      <p className="mb-8 text-center text-sm font-medium text-muted-foreground">
        {en
          ? "Trusted by forward-thinking teams worldwide"
          : "世界中の先進的なチームに選ばれています"}
      </p>

      <div className="relative mx-auto max-w-6xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
        <div className="flex w-max animate-[hero-marquee_28s_linear_infinite] gap-12 pr-12">
          {[...LOGOS, ...LOGOS].map((logo, i) => (
            <div
              key={i}
              className="flex shrink-0 items-center gap-2.5 text-muted-foreground/70 transition-colors hover:text-foreground [&_svg]:size-6"
            >
              {logo.icon}
              <span className="text-lg font-semibold tracking-tight">
                {logo.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes hero-marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
